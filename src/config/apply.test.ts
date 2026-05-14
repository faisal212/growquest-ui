import { describe, it, expect, beforeEach } from 'vitest'
import { applyBrand } from './apply'

describe('applyBrand', () => {
  beforeEach(() => {
    // Reset :root inline styles between tests.
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute('data-theme')
  })

  it('writes data-theme on :root', () => {
    applyBrand({ mode: 'light', brand: { primary: '#FF8C00' } })
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('writes brand color CSS vars to :root inline style', () => {
    applyBrand({ mode: 'dark', brand: { primary: '#FF8C00' } })
    const style = document.documentElement.style
    expect(style.getPropertyValue('--color-primary')).not.toBe('')
    expect(style.getPropertyValue('--color-primary-hover')).not.toBe('')
    expect(style.getPropertyValue('--on-primary')).not.toBe('')
  })

  it('removes stale CSS vars when a subsequent call drops them', () => {
    applyBrand({
      mode: 'dark',
      brand: { primary: '#FF8C00', secondary: '#2DACA9' },
    })
    expect(document.documentElement.style.getPropertyValue('--color-secondary')).not.toBe('')
    applyBrand({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(document.documentElement.style.getPropertyValue('--color-secondary')).toBe('')
  })

  it('is idempotent — calling twice with the same config produces the same result', () => {
    applyBrand({ mode: 'dark', brand: { primary: '#FF8C00' } })
    const first = document.documentElement.style.cssText
    applyBrand({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(document.documentElement.style.cssText).toBe(first)
  })

  it('drops a tenant override back to the unconditional default on a subsequent apply', () => {
    applyBrand({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: {
        missionTile: { surface: '#1A0E00' },
        leaderboardRow: { mineHighlight: '#FF8C0030' },
        tones: { accent: '#FF00FF' },
      },
    })
    const style = document.documentElement.style
    expect(style.getPropertyValue('--mission-tile-bg')).toBe('#1A0E00')
    expect(style.getPropertyValue('--leaderboard-mine-bg')).toBe('#FF8C0030')
    expect(style.getPropertyValue('--tone-accent')).toBe('#FF00FF')

    applyBrand({ mode: 'dark', brand: { primary: '#FF8C00' } })
    // Without overrides, deriveTokens emits the unconditional fallbacks. The
    // overrides are gone, but the slots themselves point back at their default
    // semantic-token values (BrandStyles is the single source of truth).
    expect(style.getPropertyValue('--mission-tile-bg')).toBe('var(--panel)')
    expect(style.getPropertyValue('--leaderboard-mine-bg')).toBe('var(--color-primary-soft)')
    expect(style.getPropertyValue('--tone-accent')).toBe('var(--accent-cyan)')
  })
})
