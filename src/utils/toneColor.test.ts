import { describe, it, expect } from 'vitest'
import { toneColor } from './toneColor'

describe('toneColor', () => {
  it('maps accent to cyan variable', () => {
    expect(toneColor('accent')).toBe('var(--accent-cyan)')
  })

  it('passes through lime', () => {
    expect(toneColor('lime')).toBe('var(--accent-lime)')
  })

  it('passes through magenta', () => {
    expect(toneColor('magenta')).toBe('var(--accent-magenta)')
  })

  it('passes through amber', () => {
    expect(toneColor('amber')).toBe('var(--accent-amber)')
  })
})
