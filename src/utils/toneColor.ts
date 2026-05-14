import type { Tone } from '../types'

/**
 * Maps a mission/reward tone to its CSS custom property string.
 * Resolves to --tone-{name}, which defaults to the matching --accent-* var
 * and is remappable via BrandConfig.overrides.tones.
 */
export function toneColor(tone: Tone): string {
  return `var(--tone-${tone})`
}
