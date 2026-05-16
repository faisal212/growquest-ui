import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { getTenantConfig } from '../../../../src/config/fakeApi'
import { validateBrandConfig } from '../../../../src/config/validate'
import { getBrandStore, authorizeAdminRequest } from '../../../../src/config/store/adapter'

/**
 * Brand-config API. Reads/writes go through the pluggable BrandStoreAdapter
 * (mock in this repo; real consumers inject a DB-backed one). 404 for unknown
 * tenants keeps the validator + fetchBrand fallback path exercised in dev.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params
  const config = await getBrandStore().get(tenantId)

  if (!config) {
    return NextResponse.json(
      { error: 'unknown tenant', tenantId, fallback: getTenantConfig('default') },
      { status: 404 }
    )
  }

  return NextResponse.json(config, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
      ETag: `"${tenantId}-v${config.schemaVersion ?? 1}"`,
    },
  })
}

/**
 * Persist a tenant's brand config (the configurator's Save). Admin-gated by
 * the request's session cookie (demo: `gq_admin` must match the tenant). The
 * body is run through validateBrandConfig before storage, then the brand
 * cache tag is busted so the next read is fresh.
 */
export async function PUT(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params

  if (!authorizeAdminRequest(req.headers.get('cookie'), tenantId)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 })
  }

  const config = validateBrandConfig(body)
  config.tenantId = tenantId
  await getBrandStore().put(tenantId, config)
  revalidateTag(`brand:${tenantId}`, 'max')

  return NextResponse.json({ ok: true, tenantId }, { status: 200 })
}
