import type { BrandConfig } from './schema'
import { DEFAULT_CONFIG } from './defaults'

/**
 * Client-side BrandConfig pub/sub store. Deliberately culori-free and DOM-free
 * so end-user code (BrandProvider, on every page) can import it without pulling
 * `tokens.ts` → `culori` into the bundle. The token-deriving + DOM-writing half
 * lives in the preview-only `./apply` module, which calls `setCurrentBrand`.
 */

let currentConfig: BrandConfig = DEFAULT_CONFIG

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

/** Read the currently-applied BrandConfig (client-side runtime state). */
export function getCurrentBrand(): BrandConfig {
  return currentConfig
}

/**
 * Commit a new config and notify subscribers. Order matters: `currentConfig`
 * is updated BEFORE listeners fire, so a listener calling `getCurrentBrand()`
 * observes the new value. Called by `applyBrand` (./apply) after it has
 * written the derived CSS vars to the DOM.
 */
export function setCurrentBrand(cfg: BrandConfig): void {
  currentConfig = cfg
  for (const fn of listeners) fn(cfg)
}
