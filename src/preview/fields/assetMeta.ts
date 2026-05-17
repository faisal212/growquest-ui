/**
 * Pure helpers for the Asset control: URL → type detection, per-asset
 * guidance copy, and a testable image probe. No React, no DOM mutation —
 * trivially unit-tested.
 */
import type { AssetEntry } from '../../config/schema'

type AssetType = AssetEntry['type']

/**
 * Infer the stored `type` from the URL extension (query/hash stripped):
 * `.json` → JSON (Lottie), `.gif` → GIF, everything else (incl. extensionless
 * CDN URLs and empty) → IMG. Keeps `type` out of the UI — it's derived.
 */
export function detectAssetType(url: string | undefined): AssetType {
  if (!url) return 'IMG'
  const path = url.split(/[?#]/)[0].toLowerCase()
  if (path.endsWith('.json')) return 'JSON'
  if (path.endsWith('.gif')) return 'GIF'
  return 'IMG'
}

export interface AssetMeta {
  /** What setting this asset does in the rendered app. */
  hint: string
  /** Recommended dimensions / formats. */
  recommended: string
}

const META: Record<string, AssetMeta> = {
  'assets.onboardingHero': {
    hint: 'Replaces the built-in illustration on Onboarding. Setting it also hides the decorative chips.',
    recommended: 'Recommended ≥1600×900, landscape · JPG / PNG / WebP / GIF',
  },
  'assets.missionsHero': {
    hint: 'Replaces the built-in art behind the Missions hero banner text.',
    recommended: 'Recommended ≥1600×600, wide · JPG / PNG / WebP / GIF',
  },
}

const DEFAULT_META: AssetMeta = {
  hint: 'Replaces the built-in artwork. Clear to restore it.',
  recommended: 'Recommended a large landscape image · JPG / PNG / WebP / GIF',
}

/** Guidance for a registry asset path, with a safe generic fallback. */
export function assetMetaFor(path: string): AssetMeta {
  return META[path] ?? DEFAULT_META
}

/**
 * Resolve an image URL to its natural dimensions. `makeImg` is injectable so
 * tests drive load/error without the network.
 */
export function probeImage(
  url: string,
  makeImg: () => HTMLImageElement = () => new Image()
): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = makeImg()
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight })
    img.onerror = () => reject(new Error('image failed to load'))
    img.src = url
  })
}
