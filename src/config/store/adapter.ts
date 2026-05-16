/**
 * Persistence boundary for saved tenant brand configs.
 *
 * Real consumers back this with their DB/KV; this repo ships an in-memory mock
 * seeded from the fake-API tenants so the editor's Save round-trips end-to-end
 * in dev/tests. Consumers inject their own via `setBrandStore()`.
 *
 * `authorizeAdminRequest` gates the PUT endpoint server-side by reusing the
 * (tested) `parseAdminCookie` on the request's Cookie header — same demo
 * identity model as the client adapter; real consumers replace both.
 */
import type { BrandConfig } from '../schema'
import { TENANTS } from '../fakeApi'
import { parseAdminCookie } from '../admin/adapter'

export interface BrandStoreAdapter {
  get(tenantId: string): Promise<BrandConfig | null>
  put(tenantId: string, cfg: BrandConfig): Promise<void>
}

function createMemoryStore(): BrandStoreAdapter {
  const writes = new Map<string, BrandConfig>()
  return {
    async get(tenantId) {
      return writes.get(tenantId) ?? TENANTS[tenantId] ?? null
    },
    async put(tenantId, cfg) {
      writes.set(tenantId, cfg)
    },
  }
}

let active: BrandStoreAdapter = createMemoryStore()

export function getBrandStore(): BrandStoreAdapter {
  return active
}
export function setBrandStore(store: BrandStoreAdapter): void {
  active = store
}
export function resetBrandStore(): void {
  active = createMemoryStore()
}

export function authorizeAdminRequest(
  cookieHeader: string | null | undefined,
  tenantId: string
): boolean {
  const session = parseAdminCookie(cookieHeader)
  return !!session && session.isAdmin && session.tenantId === tenantId
}
