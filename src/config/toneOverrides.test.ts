import { describe, it, expect } from 'vitest'
import { deriveTokens } from './tokens'
import { toneColor } from '../utils/toneColor'

const BASE = { mode: 'dark' as const, brand: { primary: '#FF8C00' } }

describe('tone palette override', () => {
  it('toneColor always returns the --tone-* var, regardless of brand config', () => {
    expect(toneColor('accent')).toBe('var(--tone-accent)')
    expect(toneColor('lime')).toBe('var(--tone-lime)')
    expect(toneColor('magenta')).toBe('var(--tone-magenta)')
    expect(toneColor('amber')).toBe('var(--tone-amber)')
  })

  it('emits --tone-lime when overrides.tones.lime is supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: { tones: { lime: '#00FF00' } },
    })
    expect(tokens['--tone-lime']).toBe('#00FF00')
    // Other tones not emitted (defaults from :root take over).
    expect(tokens['--tone-accent']).toBeUndefined()
  })

  it('emits all four tone overrides independently', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        tones: { accent: '#111', lime: '#222', magenta: '#333', amber: '#444' },
      },
    })
    expect(tokens['--tone-accent']).toBe('#111')
    expect(tokens['--tone-lime']).toBe('#222')
    expect(tokens['--tone-magenta']).toBe('#333')
    expect(tokens['--tone-amber']).toBe('#444')
  })
})
