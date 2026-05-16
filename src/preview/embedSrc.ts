/**
 * Helpers for the editor's iframe stage: the embed URL and the device-width
 * presets shown in the toolbar segmented control.
 */

export interface DevicePreset {
  id: 'desktop' | 'tablet' | 'mobile'
  label: string
  /** CSS px the iframe is set to — real widths so tenant media queries fire. */
  width: number
}

export const DEVICE_PRESETS: readonly DevicePreset[] = [
  { id: 'desktop', label: 'Desktop', width: 1440 },
  { id: 'tablet', label: 'Tablet', width: 834 },
  { id: 'mobile', label: 'Mobile', width: 390 },
]

/**
 * Build the iframe `src` for the framed app: take the host's current
 * path+query, drop any inbound `preview` param, and force `preview=embed`.
 * Keeps every other query param so deep-linked state survives the frame.
 */
export function buildEmbedSrc(path: string): string {
  const safe = path && path.length > 0 ? path : '/'
  const qIndex = safe.indexOf('?')
  const pathname = qIndex === -1 ? safe : safe.slice(0, qIndex)
  const params = new URLSearchParams(qIndex === -1 ? '' : safe.slice(qIndex + 1))
  params.delete('preview')
  params.set('preview', 'embed')
  return `${pathname}?${params.toString()}`
}
