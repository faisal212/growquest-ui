import { describe, it, expect } from 'vitest'
import { toneColor } from './toneColor'

describe('toneColor', () => {
  it('maps primary to --color-primary', () => {
    expect(toneColor('primary')).toBe('var(--color-primary)')
  })

  it('maps secondary to --color-secondary', () => {
    expect(toneColor('secondary')).toBe('var(--color-secondary)')
  })
})
