import { describe, it, expect } from 'vitest'
import { deepMerge } from './schema'

describe('deepMerge', () => {
  it('replaces arrays wholesale rather than element-merging by index', () => {
    const base = {
      onboarding: {
        body: 'default body',
        stats: [
          { key: 'XP', value: 'Daily' },
          { key: 'Tiers', value: '4 ranks' },
          { key: 'Drops', value: 'Weekly' },
        ],
      },
    }
    const merged = deepMerge(base, {
      onboarding: { stats: [{ key: 'POINTS', value: 'Hourly' }] },
    })
    // Wholesale replace: one tile in, one tile out (NOT 3 with index 0 patched).
    expect(merged.onboarding.stats).toHaveLength(1)
    expect(merged.onboarding.stats[0]).toEqual({ key: 'POINTS', value: 'Hourly' })
    // Sibling scalar still falls back to the default.
    expect(merged.onboarding.body).toBe('default body')
  })

  it('deep-merges nested objects and leaves untouched keys at their defaults', () => {
    const base = { a: { x: 1, y: 2 }, b: 'keep' }
    const merged = deepMerge(base, { a: { y: 9 } })
    expect(merged).toEqual({ a: { x: 1, y: 9 }, b: 'keep' })
  })

  it('returns base unchanged when partial is undefined', () => {
    const base = { a: 1 }
    expect(deepMerge(base, undefined)).toBe(base)
  })
})
