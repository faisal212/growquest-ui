import type { BrandConfig } from './schema'
import { validateBrandConfig } from './validate'
import { DEFAULT_CONFIG } from './defaults'

/**
 * Fetch a BrandConfig for the given tenant. Hits `${BRAND_API_BASE}/api/brand/${tenantId}`.
 * On any failure (network error, non-2xx, malformed JSON, validator drop) returns
 * DEFAULT_CONFIG — never throws. Caller sees a always-renderable config.
 *
 * Works from both Next.js Server Components (during SSR) and Client Components
 * (for runtime revalidation). Server-side caching: Next.js's fetch() cache
 * extends Response with `revalidate` — we accept 5 min freshness, 1h stale.
 */
export async function fetchBrand(tenantId: string): Promise<BrandConfig> {
  const base = getBaseUrl()
  const url = `${base}/api/brand/${encodeURIComponent(tenantId)}`

  try {
    const res = await fetch(url, {
      next: { revalidate: 300, tags: [`brand:${tenantId}`] },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      logFetchError(tenantId, `HTTP ${res.status}`)
      return DEFAULT_CONFIG
    }
    const json: unknown = await res.json()
    return validateBrandConfig(json)
  } catch (err) {
    logFetchError(tenantId, err instanceof Error ? err.message : String(err))
    return DEFAULT_CONFIG
  }
}

function getBaseUrl(): string {
  // Server: prefer the explicit env var; fall back to localhost in dev.
  // Client: relative path works (`fetch('/api/brand/...')`).
  if (typeof window === 'undefined') {
    return (
      process.env.BRAND_API_BASE ??
      process.env.NEXT_PUBLIC_BRAND_API_BASE ??
      `http://localhost:${process.env.PORT ?? '3000'}`
    )
  }
  return ''
}

function logFetchError(tenantId: string, reason: string): void {
  console.warn(`[fetchBrand] failed for tenant=${tenantId}: ${reason}; using default`)
}
