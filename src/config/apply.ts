import type { BrandConfig } from './schema'
import { deepMerge } from './schema'
import { DEFAULT_CONFIG } from './defaults'
import { deriveTokens } from './tokens'
import { setCurrentBrand } from './brandStore'

const previousKeys = new Set<string>()

/**
 * Apply a brand config: derive tokens, write CSS vars to :root, set data-theme,
 * then commit to the store so subscribed BrandProviders re-render.
 *
 * Preview-only: this is the sole client-side caller of `deriveTokens`
 * (→ `tokens.ts` → `culori`). It must NOT be statically imported by any
 * always-loaded component — `EmbedBridge` dynamic-imports it so the culori
 * graph stays out of the end-user bundle. The store half (subscribe /
 * getCurrentBrand) lives in the culori-free `./brandStore`.
 *
 * On the server (no document) the DOM block is skipped — server-side rendering
 * goes through <BrandProvider value={cfg}> directly. On the client it's the
 * runtime swap entry point (configurator preview / dev console).
 */
export function applyBrand(input: Partial<BrandConfig>): void {
  const cfg: BrandConfig = {
    mode: input.mode ?? DEFAULT_CONFIG.mode,
    brand: input.brand ?? DEFAULT_CONFIG.brand,
    content: input.content,
    assets: input.assets,
    overrides: deepMerge(DEFAULT_CONFIG.overrides ?? {}, input.overrides),
  }

  if (typeof document !== 'undefined') {
    const root = document.documentElement
    root.dataset.theme = cfg.mode

    const tokens = deriveTokens(cfg)
    for (const key of previousKeys) {
      if (!(key in tokens)) root.style.removeProperty(key)
    }
    previousKeys.clear()
    for (const [key, value] of Object.entries(tokens)) {
      root.style.setProperty(key, value)
      previousKeys.add(key)
    }
  }

  setCurrentBrand(cfg)
}
