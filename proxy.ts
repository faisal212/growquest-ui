import { NextRequest, NextResponse } from 'next/server'
import { parseTenant } from './src/config/tenant'

/**
 * Resolve tenant from the Host header on every request and forward it to the
 * server tree via the `x-tenant-id` request header. app/layout.tsx reads it
 * via headers() and passes the id to fetchBrand().
 */
export function proxy(req: NextRequest) {
  const tenantId = parseTenant(req.headers.get('host'))
  const headers = new Headers(req.headers)
  headers.set('x-tenant-id', tenantId)
  return NextResponse.next({ request: { headers } })
}

export const config = {
  // Skip static assets, Next.js internals, and the API route itself (the API
  // already gets the tenantId from its URL path; no need to inject a header).
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
