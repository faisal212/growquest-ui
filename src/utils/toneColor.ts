import type { Tone } from '../types'

/**
 * Maps a mission/reward tone to its brand color CSS variable.
 * `'primary'` → `var(--color-primary)`; `'secondary'` → `var(--color-secondary)`.
 * Tenants control these by setting `brand.primary` / `brand.secondary` in BrandConfig.
 */
export function toneColor(tone: Tone): string {
  return tone === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)'
}
