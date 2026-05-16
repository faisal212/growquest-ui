import { describe, it, expect, afterEach } from 'vitest'
import { getBrandStore, setBrandStore, resetBrandStore, authorizeAdminRequest } from './adapter'
import type { BrandConfig } from '../schema'

const cfg = (primary: string): BrandConfig => ({
  mode: 'dark',
  brand: { primary },
})

describe('default brand store', () => {
  afterEach(() => resetBrandStore())

  it('reads the seeded tenant config (fakeApi) before any write', async () => {
    const acme = await getBrandStore().get('acme')
    expect(acme?.tenantId).toBe('acme')
  })

  it('returns null for an unknown tenant', async () => {
    expect(await getBrandStore().get('nope')).toBeNull()
  })

  it('put then get returns the stored config, overriding the seed', async () => {
    await getBrandStore().put('acme', cfg('#123456'))
    const acme = await getBrandStore().get('acme')
    expect(acme?.brand.primary).toBe('#123456')
  })

  it('resetBrandStore clears writes back to the seed', async () => {
    await getBrandStore().put('acme', cfg('#000'))
    resetBrandStore()
    const acme = await getBrandStore().get('acme')
    expect(acme?.brand.primary).not.toBe('#000')
  })

  it('setBrandStore swaps the active store', async () => {
    setBrandStore({
      get: async () => cfg('#abcdef'),
      put: async () => {},
    })
    expect((await getBrandStore().get('x'))?.brand.primary).toBe('#abcdef')
  })
})

describe('authorizeAdminRequest', () => {
  it('denies when there is no admin cookie', () => {
    expect(authorizeAdminRequest(null, 'acme')).toBe(false)
    expect(authorizeAdminRequest('foo=1', 'acme')).toBe(false)
  })

  it('allows when gq_admin matches the target tenant', () => {
    expect(authorizeAdminRequest('gq_admin=acme', 'acme')).toBe(true)
  })

  it('denies when the admin cookie is for a different tenant', () => {
    expect(authorizeAdminRequest('gq_admin=globex', 'acme')).toBe(false)
  })
})
