'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { BrandConfig, ContentMap, AssetMap } from './schema'
import { deepMerge } from './schema'
import { DEFAULT_CONTENT, DEFAULT_CONFIG } from './defaults'

const DEFAULT_ASSETS: AssetMap = DEFAULT_CONFIG.assets ?? {}
import { subscribeBrand } from './apply'

/**
 * Resolved brand state — what the provider actually exposes to consumers.
 * BrandConfig is the input; this is the output after deep-merging defaults.
 */
export interface BrandState {
  config: BrandConfig
  content: ContentMap
  assets: AssetMap
}

const DEFAULT_STATE: BrandState = {
  config: DEFAULT_CONFIG,
  content: DEFAULT_CONTENT,
  assets: {},
}

const BrandContext = createContext<BrandState>(DEFAULT_STATE)

/**
 * Wrap the React tree once per request (server-side) and once on the client
 * (during hydration). `value` is the BrandConfig fetched for the current tenant.
 *
 * On the client, subscribes to applyBrand() runtime swaps so dev-console /
 * future CMS-preview updates re-render the tree.
 */
export function BrandProvider({ value, children }: { value: BrandConfig; children: ReactNode }) {
  // `override` is set only by client-side applyBrand() calls. SSR + first
  // client render use the `value` prop directly so hydration matches.
  const [override, setOverride] = useState<BrandConfig | null>(null)
  useEffect(() => subscribeBrand(setOverride), [])

  const current = override ?? value
  const state = useMemo<BrandState>(
    () => ({
      config: current,
      content: deepMerge(DEFAULT_CONTENT, current.content),
      assets: deepMerge(DEFAULT_ASSETS, current.assets),
    }),
    [current]
  )
  return <BrandContext.Provider value={state}>{children}</BrandContext.Provider>
}

/** Read the entire resolved brand state. Most callers want useContentSlice / useAsset / useBrand instead. */
export function useBrandState(): BrandState {
  return useContext(BrandContext)
}
