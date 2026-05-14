import { NextResponse } from 'next/server'
import { TENANTS, getTenantConfig } from '../../../../src/config/fakeApi'

/**
 * Fake brand-config API. Real backend swaps this for a KV/Postgres lookup
 * behind the same HTTP shape. Returns 404 for unknown tenants so the validator
 * + fetchBrand fallback path is exercised in dev.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params
  const config = TENANTS[tenantId]

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
