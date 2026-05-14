import type { AssetMap, AssetEntry } from './schema'
import { useBrandState } from './BrandProvider'

const preloaded = new Set<string>()

/**
 * Read one asset entry by name. Resolves from BrandProvider context.
 * Outside a provider, returns undefined.
 */
export function useAsset(name: keyof AssetMap): AssetEntry | undefined {
  const { assets } = useBrandState()
  return assets[name]
}

/**
 * Preload one or more assets via <link rel="preload">. Idempotent per asset src
 * (won't re-inject the same link if already preloaded). Call from a route's
 * component after first render to hint the browser to fetch upcoming hero
 * images / Lotties early.
 */
export function preloadAssets(entries: AssetEntry[]): void {
  if (typeof document === 'undefined') return
  for (const entry of entries) {
    if (!entry?.src || preloaded.has(entry.src)) continue
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = entry.src
    link.as = entry.type === 'JSON' ? 'fetch' : 'image'
    if (entry.type === 'JSON') link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    preloaded.add(entry.src)
  }
}
