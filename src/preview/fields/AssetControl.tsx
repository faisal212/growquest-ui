'use client'

/**
 * World-class asset editor (phase 1, URL-backed). Live preview thumbnail,
 * Desktop/Mobile variant tabs, auto-detected type badge, load/size status,
 * per-asset guidance, Clear→built-in, and an inert Upload affordance that
 * activates the moment an {@link AssetUploadAdapter} is injected (phase 2).
 * The stored value stays a plain `AssetEntry` so schema/validate/store/
 * consumption are untouched.
 */
import { useEffect, useState } from 'react'
import type { FieldDef } from '../registry'
import type { AssetEntry } from '../../config/schema'
import { detectAssetType, assetMetaFor, probeImage } from './assetMeta'
import { getAssetUploadAdapter } from '../../config/upload/adapter'

type Status =
  | { k: 'idle' }
  | { k: 'checking' }
  | { k: 'ok'; w: number; h: number }
  | { k: 'error' }
  | { k: 'lottie' }

interface AssetControlProps {
  id: string
  def: FieldDef
  value: unknown
  onChange(value: unknown): void
}

export function AssetControl({ id, def, value, onChange }: AssetControlProps) {
  const a = (value ?? undefined) as AssetEntry | undefined
  const [tab, setTab] = useState<'desktop' | 'mobile'>('desktop')
  const url = tab === 'desktop' ? (a?.src ?? '') : (a?.mobileSrc ?? '')
  const meta = assetMetaFor(def.path)
  const type = detectAssetType(a?.src)
  const adapter = getAssetUploadAdapter()
  const [status, setStatus] = useState<Status>({ k: 'idle' })

  // Probe the active URL after mount whenever it changes. setState in an
  // effect is the sanctioned "sync from an external system (the image
  // loader) after mount" case — same justification as usePreviewMode's
  // scoped disable; doing this during render would kick network work in
  // render. The probe is naturally throttled by the field's own debounce.
  useEffect(() => {
    if (!url) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus({ k: 'idle' })
      return
    }
    if (detectAssetType(url) === 'JSON') {
      setStatus({ k: 'lottie' })
      return
    }
    let alive = true

    setStatus({ k: 'checking' })
    probeImage(url)
      .then(({ w, h }) => alive && setStatus({ k: 'ok', w, h }))
      .catch(() => alive && setStatus({ k: 'error' }))
    return () => {
      alive = false
    }
  }, [url])

  const commit = (next: Partial<AssetEntry>) => {
    const base: AssetEntry = { src: '', type: 'IMG', ...(a ?? {}) }
    const merged = { ...base, ...next }
    onChange({ ...merged, type: detectAssetType(merged.src) })
  }
  const onUrl = (v: string) => (tab === 'desktop' ? commit({ src: v }) : commit({ mobileSrc: v }))

  const statusText =
    status.k === 'ok'
      ? `✓ ${status.w}×${status.h}`
      : status.k === 'checking'
        ? '⏳ resolving image…'
        : status.k === 'error'
          ? '⚠ couldn’t load this URL'
          : status.k === 'lottie'
            ? 'ⓘ Lottie — falls back to built-in for now'
            : 'Currently: built-in art'
  const statusClass = `gqdc-asset-status gqdc-asset-status-${status.k}`

  return (
    <span className="gqdc-f-asset">
      <span className="gqdc-asset-meta">
        <span className="gqdc-asset-hint">{meta.hint}</span>
        <span className="gqdc-asset-badge">{type}</span>
      </span>

      <span className="gqdc-asset-tabs" role="group" aria-label={`${def.label} variant`}>
        <button
          type="button"
          aria-label="desktop variant"
          aria-pressed={tab === 'desktop'}
          onClick={() => setTab('desktop')}
        >
          Desktop
        </button>
        <button
          type="button"
          aria-label="mobile variant"
          aria-pressed={tab === 'mobile'}
          onClick={() => setTab('mobile')}
        >
          Mobile{a?.mobileSrc ? '' : ' ·opt'}
        </button>
      </span>

      <span className="gqdc-asset-preview" aria-hidden>
        {url && status.k === 'ok' ? (
          <img src={url} alt="" />
        ) : (
          <span className="gqdc-asset-preview-empty">
            {status.k === 'checking'
              ? '⏳'
              : status.k === 'error'
                ? '⚠'
                : status.k === 'lottie'
                  ? 'Lottie'
                  : 'built-in art'}
          </span>
        )}
      </span>

      <span className="gqdc-asset-row">
        <input
          id={id}
          aria-label={`${def.label} URL`}
          className="gqdc-f-input"
          placeholder={tab === 'desktop' ? 'Paste image URL' : 'Paste mobile image URL (optional)'}
          value={url}
          onChange={(e) => onUrl(e.target.value)}
        />
        <button
          type="button"
          className="gqdc-asset-upload"
          aria-label="Upload image"
          disabled={!adapter}
          title={adapter ? 'Upload an image' : 'Storage not connected'}
        >
          ⬆
        </button>
      </span>

      <span className={statusClass}>{statusText}</span>
      <span className="gqdc-asset-foot">
        <span className="gqdc-asset-rec">{meta.recommended}</span>
        {a && (
          <button
            type="button"
            className="gqdc-asset-clear"
            aria-label={`Clear ${def.label}`}
            onClick={() => onChange(undefined)}
          >
            Clear → built-in
          </button>
        )}
      </span>
    </span>
  )
}
