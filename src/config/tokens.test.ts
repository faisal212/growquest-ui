import { describe, it, expect } from 'vitest'
import { deriveTokens } from './tokens'

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
})
