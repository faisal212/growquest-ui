import { describe, it, expect } from 'vitest'
import { subscribeBrand, getCurrentBrand, setCurrentBrand } from './brandStore'
import { DEFAULT_CONFIG } from './defaults'
import type { BrandConfig } from './schema'

const CFG_A: BrandConfig = { mode: 'dark', brand: { primary: '#FF8C00' } }
const CFG_B: BrandConfig = { mode: 'light', brand: { primary: '#2DACA9' } }

describe('brandStore', () => {
  it('getCurrentBrand returns DEFAULT_CONFIG before any setCurrentBrand', () => {
    // Module-level state: assert identity only on a fresh import would be ideal,
    // but the contract we guarantee is "defaults until set" — DEFAULT_CONFIG is
    // the documented initial value.
    expect(getCurrentBrand()).toBe(DEFAULT_CONFIG)
  })

  it('setCurrentBrand updates the value getCurrentBrand returns', () => {
    setCurrentBrand(CFG_A)
    expect(getCurrentBrand()).toBe(CFG_A)
    setCurrentBrand(CFG_B)
    expect(getCurrentBrand()).toBe(CFG_B)
  })

  it('notifies subscribers with the new config', () => {
    const seen: BrandConfig[] = []
    const unsub = subscribeBrand((c) => seen.push(c))
    setCurrentBrand(CFG_A)
    setCurrentBrand(CFG_B)
    expect(seen).toEqual([CFG_A, CFG_B])
    unsub()
  })

  it('unsubscribe stops further notifications', () => {
    let count = 0
    const unsub = subscribeBrand(() => count++)
    setCurrentBrand(CFG_A)
    unsub()
    setCurrentBrand(CFG_B)
    expect(count).toBe(1)
  })

  it('currentConfig is updated BEFORE listeners fire (observable order)', () => {
    let observedInsideListener: BrandConfig | undefined
    const unsub = subscribeBrand(() => {
      observedInsideListener = getCurrentBrand()
    })
    setCurrentBrand(CFG_A)
    expect(observedInsideListener).toBe(CFG_A)
    unsub()
  })
})
