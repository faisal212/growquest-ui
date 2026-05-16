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
})
