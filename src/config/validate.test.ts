import { describe, it, expect } from 'vitest'
import { validateBrandConfig } from './validate'
import { DEFAULT_CONFIG } from './defaults'

describe('validateBrandConfig', () => {
  it('returns DEFAULT_CONFIG when input is not an object', () => {
    expect(validateBrandConfig(null)).toEqual(DEFAULT_CONFIG)
    expect(validateBrandConfig('not an object')).toEqual(DEFAULT_CONFIG)
    expect(validateBrandConfig(undefined)).toEqual(DEFAULT_CONFIG)
    expect(validateBrandConfig([])).toEqual(DEFAULT_CONFIG)
  })

  it('passes through a valid full config', () => {
    const input = {
      schemaVersion: 1,
      tenantId: 'acme',
      mode: 'light',
      brand: { primary: '#FF8C00', secondary: '#2DACA9' },
      content: { missions: { sectionTitle: 'Acme Quests' } },
      overrides: { tones: { accent: '#FF8C00' } },
    }
    const result = validateBrandConfig(input)
    expect(result.mode).toBe('light')
    expect(result.brand.primary).toBe('#FF8C00')
    expect(result.brand.secondary).toBe('#2DACA9')
    expect(result.tenantId).toBe('acme')
    expect(result.content).toEqual(input.content)
    expect(result.overrides).toEqual(input.overrides)
  })

  it('falls back when mode is invalid', () => {
    const result = validateBrandConfig({
      mode: 'sepia',
      brand: { primary: '#FF8C00' },
    })
    expect(result.mode).toBe(DEFAULT_CONFIG.mode)
  })

  it('falls back to default brand when primary is missing', () => {
    const result = validateBrandConfig({ mode: 'dark' })
    expect(result.brand).toEqual(DEFAULT_CONFIG.brand)
  })

  it('drops invalid secondary but keeps valid primary', () => {
    const result = validateBrandConfig({
      mode: 'dark',
      brand: { primary: '#FF8C00', secondary: 12345 },
    })
    expect(result.brand.primary).toBe('#FF8C00')
    expect(result.brand.secondary).toBeUndefined()
  })

  it('defaults schemaVersion to 1 when absent', () => {
    const result = validateBrandConfig({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
    })
    expect(result.schemaVersion).toBe(1)
  })

  it('drops non-object overrides/content/assets without failing', () => {
    const result = validateBrandConfig({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: 'oops',
      content: null,
      assets: 42,
    })
    expect(result.overrides).toBeUndefined()
    expect(result.content).toBeUndefined()
    expect(result.assets).toBeUndefined()
  })
})
