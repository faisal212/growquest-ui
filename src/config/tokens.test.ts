import { describe, it, expect } from 'vitest'
import { oklch, parse } from 'culori'
import { deriveTokens } from './tokens'

const lightnessOf = (value: string): number => oklch(parse(value)!)!.l!

describe('deriveTokens', () => {
  it('derives the full panel palette for dark mode', () => {
    const tokens = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(tokens['--panel']).toBe('#0E1018')
    expect(tokens['--ink']).toBe('#E8EBF2')
    expect(tokens['--ink-dim']).toBe('#8B93A7')
  })

  it('derives the full panel palette for light mode', () => {
    const tokens = deriveTokens({ mode: 'light', brand: { primary: '#FF8C00' } })
    expect(tokens['--panel']).toBe('#FFFFFF')
    expect(tokens['--ink']).toBe('#0A0B10')
  })

  it('writes primary as the verbatim input, parsed to a valid color string', () => {
    const tokens = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(tokens['--color-primary']).toMatch(/oklch|rgb|#/)
  })

  it('derives on-primary as white for dark primaries and as ink for light primaries', () => {
    const darkPrim = deriveTokens({ mode: 'dark', brand: { primary: '#101010' } })
    const lightPrim = deriveTokens({ mode: 'dark', brand: { primary: '#FFEE88' } })
    expect(darkPrim['--on-primary']).toBe('#FFFFFF')
    expect(lightPrim['--on-primary']).toBe('#0A0B10')
  })

  it('emits halo gradient tokens', () => {
    const tokens = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(tokens['--halo-primary']).toContain('radial-gradient')
    expect(tokens['--halo-secondary']).toContain('radial-gradient')
  })

  it('bakes the resolved secondary color into --halo-secondary when secondary is set', () => {
    const tokens = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00', secondary: '#2DACA9' },
    })
    expect(tokens['--halo-secondary']).toContain(tokens['--color-secondary'])
    expect(tokens['--halo-secondary']).not.toContain('var(')
  })

  it('falls back to a var() reference for --halo-secondary when no secondary', () => {
    const tokens = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(tokens['--color-secondary']).toBeUndefined()
    expect(tokens['--halo-secondary']).toContain('var(--color-secondary)')
  })

  it('fails a non-finite numeric override safe to the lower bound, not "NaN%"', () => {
    const tokens = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: { tierLadder: { currentMixPercent: NaN } },
    })
    expect(tokens['--tier-ladder-current-mix']).toBe('0%')
    expect(tokens['--tier-ladder-current-mix']).not.toContain('NaN')
  })

  it('honors radius overrides', () => {
    const tokens = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: { radius: { card: '0px', button: '2px' } },
    })
    expect(tokens['--radius-card']).toBe('0px')
    expect(tokens['--radius-button']).toBe('2px')
    expect(tokens['--radius-tag']).toBe('4px')
  })

  it('emits the derived radius tier vars as calc() expressions off the base tokens', () => {
    const tokens = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(tokens['--radius-card']).toBe('14px')
    expect(tokens['--r-panel']).toBe('var(--radius-card)')
    expect(tokens['--r-mission']).toBe('calc(var(--radius-card) - 2px)')
    expect(tokens['--r-inset']).toBe('max(0px, calc(var(--radius-card) - 4px))')
    expect(tokens['--r-btn']).toBe('var(--radius-button)')
    expect(tokens['--r-btn-sm']).toBe('max(0px, calc(var(--radius-button) - 3px))')
    expect(tokens['--r-tag']).toBe('var(--radius-tag)')
    expect(tokens['--r-tag-lg']).toBe('calc(var(--radius-tag) + 2px)')
    expect(tokens['--r-modal']).toBe('var(--radius-modal)')
  })

  it('keeps tier vars as live calc references so admin overrides flow through', () => {
    const tokens = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: { radius: { card: '24px' } },
    })
    expect(tokens['--radius-card']).toBe('24px')
    expect(tokens['--r-mission']).toBe('calc(var(--radius-card) - 2px)')
  })

  it('falls back to default palette when overrides.palette is partial', () => {
    const tokens = deriveTokens({
      mode: 'light',
      brand: { primary: '#FF8C00' },
      overrides: { palette: { panel: '#000000' } },
    })
    expect(tokens['--panel']).toBe('#000000')
    expect(tokens['--ink']).toBe('#0A0B10')
  })

  it('skips secondary tokens when secondary not supplied', () => {
    const tokens = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(tokens['--color-secondary']).toBeUndefined()
  })

  it('emits the stock dark page background pair unchanged when bg not overridden', () => {
    const tokens = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(tokens['--bg']).toBe('#05060A')
    expect(tokens['--bg-2']).toBe('#0B0D14')
  })

  it('emits the stock light page background pair unchanged when bg not overridden', () => {
    const tokens = deriveTokens({ mode: 'light', brand: { primary: '#FF8C00' } })
    expect(tokens['--bg']).toBe('#F4F3EE')
    expect(tokens['--bg-2']).toBe('#EDECE6')
  })

  it('uses an overridden bg verbatim and derives a lighter bg-2 in dark mode', () => {
    const tokens = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: { palette: { bg: '#1a0033' } },
    })
    expect(tokens['--bg']).toBe('#1a0033')
    expect(lightnessOf(tokens['--bg-2'])).toBeGreaterThan(lightnessOf('#1a0033'))
  })

  it('derives a darker bg-2 from an overridden bg in light mode', () => {
    const tokens = deriveTokens({
      mode: 'light',
      brand: { primary: '#FF8C00' },
      overrides: { palette: { bg: '#fbeaff' } },
    })
    expect(tokens['--bg']).toBe('#fbeaff')
    expect(lightnessOf(tokens['--bg-2'])).toBeLessThan(lightnessOf('#fbeaff'))
  })

  it('emits contrast-aware podium defaults and applies podium overrides', () => {
    const def = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(def['--podium-rank-fg']).toBe('var(--on-primary)')
    expect(def['--podium-platform-pattern']).toBe('rgba(0,0,0,0.12)')

    const ov = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: {
        podium: { rankFg: '#ffffff', platformPattern: 'rgba(255,255,255,0.2)' },
      },
    })
    expect(ov['--podium-rank-fg']).toBe('#ffffff')
    expect(ov['--podium-platform-pattern']).toBe('rgba(255,255,255,0.2)')
  })

  it('emits leaderboard-header defaults and applies leaderboardHeader overrides', () => {
    const def = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(def['--leaderboard-eyebrow']).toBe('var(--ink-dim)')
    expect(def['--leaderboard-eyebrow-dot']).toBe('var(--color-primary)')
    expect(def['--leaderboard-title']).toBe('var(--ink)')
    expect(def['--leaderboard-subtitle']).toBe('var(--ink-dim)')

    const ov = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: {
        leaderboardHeader: {
          eyebrow: '#111',
          eyebrowDot: '#222',
          title: '#333',
          subtitle: '#444',
        },
      },
    })
    expect(ov['--leaderboard-eyebrow']).toBe('#111')
    expect(ov['--leaderboard-eyebrow-dot']).toBe('#222')
    expect(ov['--leaderboard-title']).toBe('#333')
    expect(ov['--leaderboard-subtitle']).toBe('#444')
  })

  it('emits podium text defaults and applies podium handle/xp overrides', () => {
    const def = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(def['--podium-handle']).toBe('var(--ink)')
    expect(def['--podium-xp']).toBe('var(--ink-dim)')

    const ov = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: { podium: { handle: '#abc', xp: '#def' } },
    })
    expect(ov['--podium-handle']).toBe('#abc')
    expect(ov['--podium-xp']).toBe('#def')
  })

  it('emits the badge-grid unlocked-fg default and applies its override', () => {
    const def = deriveTokens({ mode: 'dark', brand: { primary: '#FF8C00' } })
    expect(def['--badge-grid-unlocked-fg']).toBe('#05060A')

    const ov = deriveTokens({
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: { badgeGrid: { unlockedFg: '#00ff00' } },
    })
    expect(ov['--badge-grid-unlocked-fg']).toBe('#00ff00')
  })
})
