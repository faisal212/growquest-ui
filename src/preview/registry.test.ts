import { describe, it, expect } from 'vitest'
import { FIELDS, GROUPS, fieldsForGroup, type FieldDef } from './registry'
import { DEFAULT_CONTENT, PALETTES } from '../config/defaults'

const byPath = new Map<string, FieldDef>(FIELDS.map((f) => [f.path, f]))

/** Walk an object to its leaves; arrays are leaves (list fields are wholesale). */
function leafPaths(obj: unknown, prefix: string): string[] {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return [prefix]
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    leafPaths(v, prefix ? `${prefix}.${k}` : k)
  )
}

describe('registry — drift guard', () => {
  it('registers every content leaf present in DEFAULT_CONTENT', () => {
    const expected = leafPaths(DEFAULT_CONTENT, 'content')
    const missing = expected.filter((p) => !byPath.has(p))
    expect(missing).toEqual([])
  })

  it('registers mode and both brand colors', () => {
    expect(byPath.get('mode')?.kind).toBe('mode')
    expect(byPath.get('brand.primary')?.kind).toBe('color')
    expect(byPath.get('brand.secondary')?.kind).toBe('color')
  })

  it('registers every panel-palette slot', () => {
    for (const key of Object.keys(PALETTES.dark)) {
      const f = byPath.get(`overrides.palette.${key}`)
      expect(f, `overrides.palette.${key}`).toBeDefined()
      expect(f?.kind).toBe('color')
    }
  })

  it('has no duplicate paths', () => {
    expect(FIELDS.length).toBe(byPath.size)
  })
})

describe('registry — grouping & routing', () => {
  it('every field belongs to a declared group', () => {
    const groupIds = new Set(GROUPS.map((g) => g.id))
    for (const f of FIELDS) expect(groupIds.has(f.group), f.path).toBe(true)
  })

  it('page groups carry a route; global/asset groups do not', () => {
    const onboarding = GROUPS.find((g) => g.id === 'onboarding')
    expect(onboarding?.route).toBe('/onboarding')
    expect(onboarding?.scope).toBe('page')
    const palette = GROUPS.find((g) => g.id === 'palette')
    expect(palette?.scope).toBe('global')
    expect(palette?.route).toBeUndefined()
  })

  it('onboarding copy is grouped under the onboarding (page) group', () => {
    expect(byPath.get('content.onboarding.titleBrand')?.group).toBe('onboarding')
    expect(byPath.get('content.onboarding.body')?.kind).toBe('textarea')
    expect(byPath.get('content.onboarding.stats')?.kind).toBe('list')
  })

  it('fieldsForGroup returns only that group, in registry order', () => {
    const fields = fieldsForGroup('palette')
    expect(fields.length).toBeGreaterThan(0)
    expect(fields.every((f) => f.group === 'palette')).toBe(true)
  })

  it('models brand colors and assets with the right kinds', () => {
    expect(byPath.get('assets.onboardingHero')?.kind).toBe('asset')
    expect(byPath.get('overrides.heroBanner.overlayMode')?.kind).toBe('select')
    expect(byPath.get('overrides.heroBanner.overlayMode')?.options).toEqual([
      'always',
      'eyebrow-only',
      'never',
    ])
    expect(byPath.get('overrides.missionCard.haloOpacity')?.kind).toBe('range')
  })
})
