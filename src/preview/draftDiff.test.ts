import { describe, it, expect } from 'vitest'
import { changedFieldPaths, revertPath } from './draftDiff'
import type { BrandConfig } from '../config/schema'

const base = (): BrandConfig => ({
  mode: 'dark',
  brand: { primary: '#111', secondary: '#222' },
  content: { brand: { name: 'GrowQuest' } },
})

describe('changedFieldPaths', () => {
  const paths = ['mode', 'brand.primary', 'content.brand.name', 'content.onboarding.stats']

  it('is empty when draft equals loaded', () => {
    expect(changedFieldPaths(base(), base(), paths)).toEqual([])
  })

  it('lists the leaf paths that differ', () => {
    const draft = { ...base(), brand: { primary: '#999', secondary: '#222' } }
    expect(changedFieldPaths(base(), draft, paths)).toEqual(['brand.primary'])
  })

  it('detects array (list) value changes deeply', () => {
    const loaded = { ...base(), content: { onboarding: { stats: [{ key: 'XP', value: 'A' }] } } }
    const draft = { ...base(), content: { onboarding: { stats: [{ key: 'XP', value: 'B' }] } } }
    expect(changedFieldPaths(loaded, draft, paths)).toEqual(['content.onboarding.stats'])
  })

  it('only inspects the supplied field paths', () => {
    const draft = { ...base(), schemaVersion: 9 } as BrandConfig
    expect(changedFieldPaths(base(), draft, paths)).toEqual([])
  })
})

describe('revertPath', () => {
  it('restores an edited path to the loaded value', () => {
    const loaded = base()
    const draft = { ...base(), brand: { primary: '#999', secondary: '#222' } }
    const next = revertPath(draft, loaded, 'brand.primary')
    expect(next.brand.primary).toBe('#111')
    expect(draft.brand.primary).toBe('#999') // original not mutated
  })

  it('removes the path entirely when loaded had no value there', () => {
    const loaded = base()
    const draft = revertPath(
      { ...base(), content: { brand: { name: 'GrowQuest', tagline: 'edited' } } },
      loaded,
      'content.brand.tagline'
    )
    expect(draft.content?.brand && 'tagline' in draft.content.brand).toBe(false)
  })
})
