import type { BrandConfig } from './schema'
import { deriveTokens } from './tokens'

/**
 * Server-rendered <style id="__brand"> block. Inline-prints every CSS var the
 * tenant overrides so the browser has the correct paint-relevant values
 * BEFORE parsing any JS. This is the no-FOUC mechanism.
 */
export function BrandStyles({ config }: { config: BrandConfig }) {
  const tokens = deriveTokens(config)
  const body = `:root{${Object.entries(tokens)
    .map(([k, v]) => `${k}:${escapeCss(v)}`)
    .join(';')}}`
  return <style id="__brand" dangerouslySetInnerHTML={{ __html: body }} />
}

/**
 * Conservative CSS value escape. Strips `</style` sequences and anything that
 * looks like it's trying to break out of the style context.
 */
function escapeCss(value: string): string {
  return value.replace(/<\/style/gi, '<\\/style')
}
