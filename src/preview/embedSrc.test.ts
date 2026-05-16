import { describe, it, expect } from 'vitest'
import { buildEmbedSrc, DEVICE_PRESETS } from './embedSrc'

describe('buildEmbedSrc', () => {
  it('appends preview=embed to a bare path', () => {
    expect(buildEmbedSrc('/missions')).toBe('/missions?preview=embed')
  })

  it('preserves existing unrelated query params', () => {
    expect(buildEmbedSrc('/missions?foo=1&bar=2')).toBe('/missions?foo=1&bar=2&preview=embed')
  })

  it('replaces an existing preview param rather than duplicating it', () => {
    expect(buildEmbedSrc('/missions?preview=true')).toBe('/missions?preview=embed')
    expect(buildEmbedSrc('/p?preview=editor&x=1')).toBe('/p?x=1&preview=embed')
  })

  it('defaults an empty path to root', () => {
    expect(buildEmbedSrc('')).toBe('/?preview=embed')
  })
})

describe('DEVICE_PRESETS', () => {
  it('exposes desktop / tablet / mobile widths in descending order', () => {
    const ids = DEVICE_PRESETS.map((d) => d.id)
    expect(ids).toEqual(['desktop', 'tablet', 'mobile'])
    const widths = DEVICE_PRESETS.map((d) => d.width)
    expect(widths).toEqual([...widths].sort((a, b) => b - a))
    expect(DEVICE_PRESETS.find((d) => d.id === 'mobile')?.width).toBe(390)
  })
})
