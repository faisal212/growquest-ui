import type { Tone } from '../types'

/** Maps a mission/reward tone to its CSS custom property string. 'accent' uses the current accent variable. */
export function toneColor(tone: Tone): string {
  return `var(--accent-${tone === 'accent' ? 'cyan' : tone})`
}
