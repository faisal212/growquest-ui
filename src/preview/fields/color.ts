/**
 * Colour normalisation for the editor. The spec stores brand/recipe colours as
 * `oklch()` (perceptually uniform, wide-gamut). Inputs may arrive as hex,
 * oklch, or other CSS colours; `var()`/gradients are passed through untouched
 * so a tenant's token references keep working.
 */
import { parse, converter } from 'culori'

const toOklch = converter('oklch')

function round(n: number, p: number): number {
  const f = 10 ** p
  return Math.round(n * f) / f
}

/** Convert any parseable CSS colour to a canonical `oklch(L C H)` string. */
export function normalizeToOklch(input: string): string {
  const parsed = parse(input)
  if (!parsed) return input
  const c = toOklch(parsed)
  if (!c) return input
  const L = round(c.l ?? 0, 4)
  const C = round(c.c ?? 0, 4)
  const H = round(c.h ?? 0, 2)
  return `oklch(${L} ${C} ${H})`
}

/**
 * The value to feed a swatch's `background`. Browsers natively render
 * `oklch()`, hex, and `var()`, so this is an identity seam — it exists so
 * call sites read intentionally and gain one place to add a fallback later.
 */
export function toCssColor(input: string): string {
  return input
}
