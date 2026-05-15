import type { BrandConfig } from './schema'
import { deepMerge } from './schema'
import { DEFAULT_CONFIG } from './defaults'
import { deriveTokens } from './tokens'

let currentConfig: BrandConfig = DEFAULT_CONFIG
const previousKeys = new Set<string>()

type BrandListener = (cfg: BrandConfig) => void
const listeners = new Set<BrandListener>()

/**
 * Subscribe to client-side BrandConfig changes. Used by BrandProvider so that
 * a runtime `applyBrand(newCfg)` call re-renders the React tree with the new
 * content/assets/recipe values.
 */
export function subscribeBrand(fn: BrandListener): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

/**
 * Apply a brand config: derive tokens, write CSS vars to :root, set data-theme,
 * notify any subscribed BrandProvider so React consumers re-render.
 *
 * On the server (no document) this is a no-op — server-side rendering goes
 * through <BrandProvider value={cfg}> directly. On the client it's the runtime
 * swap entry point (dev console / future CMS preview).
 */
export function applyBrand(input: Partial<BrandConfig>): void {
  const cfg: BrandConfig = {
    mode: input.mode ?? DEFAULT_CONFIG.mode,
    brand: input.brand ?? DEFAULT_CONFIG.brand,
    content: input.content,
    assets: input.assets,
    overrides: deepMerge(DEFAULT_CONFIG.overrides ?? {}, input.overrides),
  }
  currentConfig = cfg

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

  for (const fn of listeners) fn(cfg)
}

/** Read the currently-applied BrandConfig (client-side runtime state). */
export function getCurrentBrand(): BrandConfig {
  return currentConfig
}
