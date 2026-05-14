import { describe, it, expect } from 'vitest'
import { TENANTS, getTenantConfig } from './fakeApi'
import { validateBrandConfig } from './validate'

describe('fakeApi', () => {
  it('seeds at least default + acme + globex', () => {
    expect(TENANTS.default).toBeDefined()
    expect(TENANTS.acme).toBeDefined()
    expect(TENANTS.globex).toBeDefined()
  })

  it('every seeded tenant passes validateBrandConfig roundtrip', () => {
    for (const [id, config] of Object.entries(TENANTS)) {
      const normalized = validateBrandConfig(config)
      expect(normalized.mode, id).toBe(config.mode)
      expect(normalized.brand.primary, id).toBe(config.brand.primary)
    }
  })

  it('getTenantConfig returns matching tenant', () => {
    expect(getTenantConfig('acme').tenantId).toBe('acme')
    expect(getTenantConfig('globex').tenantId).toBe('globex')
  })

  it('getTenantConfig falls back to default for unknown tenant', () => {
    expect(getTenantConfig('unknown-tenant').tenantId).toBe('default')
    expect(getTenantConfig('').tenantId).toBe('default')
  })

  it('acme tenant has content + override slots populated', () => {
    expect(TENANTS.acme.content?.missions?.sectionTitle).toBe('Acme Quests')
    expect(TENANTS.acme.overrides?.missionTile?.surface).toBe('#FFFFFF')
  })
})
