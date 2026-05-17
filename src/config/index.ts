export { getCurrentBrand, subscribeBrand } from './brandStore'
export { applyBrand } from './apply'
export { BrandProvider, useBrandState } from './BrandProvider'
export { useContentSlice } from './content'
export { interpolate } from './interpolate'
export { useAsset, preloadAssets } from './assets'
export { deriveTokens } from './tokens'
export { DEFAULT_CONFIG, DEFAULT_CONTENT, PALETTES } from './defaults'
export type {
  BrandConfig,
  BrandColors,
  ContentMap,
  AssetMap,
  AssetEntry,
  Mode,
  Overrides,
  PanelPalette,
  RadiusSet,
  FontSet,
} from './schema'

/** Convenience: read the current BrandConfig from BrandProvider context. */
import { useBrandState } from './BrandProvider'
import type { BrandConfig } from './schema'
export function useBrand(): BrandConfig {
  return useBrandState().config
}
