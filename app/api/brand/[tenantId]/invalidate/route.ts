import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { timingSafeEqual } from 'node:crypto'

/**
 * Admin-only cache bust. Called by the admin panel after editing a tenant's
 * brand config so the next read sees the new value without waiting for the
 * 24h TTL. Server-to-server only: caller proves itself with a shared secret in
 * the Authorization header.
 */
export async function POST(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const secret = process.env.BRAND_INVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'BRAND_INVALIDATE_SECRET is not configured' },
      { status: 500 }
    )
  }

  const auth = req.headers.get('authorization') ?? ''
  const provided = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : ''
  if (!secretsMatch(provided, secret)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { tenantId } = await params
  // 'max' is the canonical profile for an immediate, full bust — Next 16
  // deprecated the single-arg form. The fetch in fetchBrand.ts resets the
  // actual 24h TTL on the next read.
  revalidateTag(`brand:${tenantId}`, 'max')
  const revalidatedAt = new Date().toISOString()

  console.info(`[brand-invalidate] tenantId=${tenantId} at=${revalidatedAt}`)

  return NextResponse.json({ ok: true, tenantId, revalidatedAt })
}

/** Constant-time string compare to defeat timing-side-channel attacks. */
function secretsMatch(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}
