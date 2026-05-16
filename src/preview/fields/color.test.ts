import { describe, it, expect } from 'vitest'
import { parse, converter } from 'culori'
import { normalizeToOklch, toCssColor } from './color'

const toRgb = converter('rgb')

function channelsClose(a: string, b: string, tol = 0.02) {
  const ca = toRgb(parse(a))
  const cb = toRgb(parse(b))
  if (!ca || !cb) throw new Error(`unparseable: ${a} / ${b}`)
  expect(Math.abs(ca.r - cb.r)).toBeLessThan(tol)
  expect(Math.abs(ca.g - cb.g)).toBeLessThan(tol)
  expect(Math.abs(ca.b - cb.b)).toBeLessThan(tol)
}

describe('normalizeToOklch', () => {
  it('converts hex to an oklch() string', () => {
    const out = normalizeToOklch('#FF8C00')
    expect(out.startsWith('oklch(')).toBe(true)
  })

  it('round-trips hex → oklch → colour without drifting', () => {
    channelsClose('#FF8C00', normalizeToOklch('#FF8C00'))
    channelsClose('#2DACA9', normalizeToOklch('#2DACA9'))
  })

  it('keeps an existing oklch value parseable and equivalent', () => {
    const out = normalizeToOklch('oklch(0.86 0.18 200)')
    expect(out.startsWith('oklch(')).toBe(true)
    channelsClose('oklch(0.86 0.18 200)', out)
  })

  it('passes through values it cannot parse (var(), gradients)', () => {
    expect(normalizeToOklch('var(--color-primary)')).toBe('var(--color-primary)')
  })
})

describe('toCssColor', () => {
  it('returns a renderable colour for a swatch', () => {
    channelsClose('#FF8C00', toCssColor(normalizeToOklch('#FF8C00')))
  })

  it('passes unparseable values through so var() still renders', () => {
    expect(toCssColor('var(--x)')).toBe('var(--x)')
  })
})
