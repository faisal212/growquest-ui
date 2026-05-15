export { applyBrand, getCurrentBrand, subscribeBrand } from './apply'
export { BrandProvider, useBrandState } from './BrandProvider'
export { useContent } from './content'
export { interpolate } from './interpolate'
export { useAsset, preloadAssets } from './assets'
export { deriveTokens } from './tokens'
export { DEFAULT_CONFIG, DEFAULT_CONTENT, SURFACES } from './defaults'
export type {
  BrandConfig,
  BrandColors,
  ContentMap,
  AssetMap,
  AssetEntry,
  Mode,
  Overrides,
  SurfacePalette,
  LogoSet,
  RadiusSet,
  FontSet,
} from './schema'

/** Convenience: read the current BrandConfig from BrandProvider context. */
import { useBrandState } from './BrandProvider'
import type { BrandConfig } from './schema'
export function useBrand(): BrandConfig {
  return useBrandState().config
}
