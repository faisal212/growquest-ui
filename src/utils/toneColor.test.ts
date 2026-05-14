import { describe, it, expect } from 'vitest'
import { toneColor } from './toneColor'

describe('toneColor', () => {
  it('maps accent to --tone-accent var (remappable via overrides.tones)', () => {
    expect(toneColor('accent')).toBe('var(--tone-accent)')
  })

  it('maps lime to --tone-lime', () => {
    expect(toneColor('lime')).toBe('var(--tone-lime)')
  })

  it('maps magenta to --tone-magenta', () => {
    expect(toneColor('magenta')).toBe('var(--tone-magenta)')
  })

  it('maps amber to --tone-amber', () => {
    expect(toneColor('amber')).toBe('var(--tone-amber)')
  })
})
