'use client'

import { useState, type ReactNode } from 'react'
import type { AssetEntry } from '../../config/schema'

interface HeroMediaProps {
  /** Optional tenant-supplied image asset. When present and of type IMG/GIF, replaces the fallback. */
  asset?: AssetEntry
  /** Procedural / illustrative element rendered when no usable asset is supplied or the image fails to load. */
  fallback: ReactNode
  /** Alt text for the image. Falls back to empty string for decorative use. */
  alt?: string
  className?: string
}

/**
 * Renders a tenant-supplied hero image when available, otherwise the procedural fallback.
 *
 * Supports static `IMG` and animated `GIF` types. `JSON` (Lottie) gracefully falls
 * through to the fallback — the player is intentionally deferred until a tenant
 * actually needs it.
 *
 * When `asset.mobileSrc` is set, the image is wrapped in a `<picture>` with a
 * `<source media="(max-width: 720px)" srcSet={mobileSrc}>` ahead of the inner
 * `<img>`. The browser fetches only the matching URL (desktop pulls `src`, mobile
 * pulls `mobileSrc`). Selection happens at HTML parse time — no client JS needed.
 *
 * On image load error (404, network failure, blocked domain) we swap to the fallback
 * so a tenant with a stale URL never sees a broken-image icon.
 */
export function HeroMedia({ asset, fallback, alt = '', className }: HeroMediaProps) {
  const [errored, setErrored] = useState(false)
  const usable = asset && (asset.type === 'IMG' || asset.type === 'GIF') && !errored
  if (!usable) return <>{fallback}</>

  const img = (
    <img
      src={asset.src}
      alt={alt}
      loading="eager"
      decoding="async"
      onError={() => setErrored(true)}
      className={className ?? 'block w-full h-full object-cover'}
    />
  )

  if (!asset.mobileSrc) return img
  return (
    <picture>
      <source media="(max-width: 720px)" srcSet={asset.mobileSrc} />
      {img}
    </picture>
  )
}
