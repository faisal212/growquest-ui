'use client'

/**
 * Editor host chrome. A fixed full-viewport overlay: slim toolbar (device
 * segmented control · Save · Discard · Exit) and the right Inspector, with the
 * live tenant app framed at real device widths so its media queries fire.
 *
 * Data flow: fetch the tenant config → seed `useDraft` → every (debounced)
 * draft change is posted to the frame as `applyPreview`, which the embedded
 * `EmbedBridge` applies via the existing `applyBrand()` runtime. The frame
 * announces `ready` (and route changes); we flush the latest draft on `ready`
 * so a frame reload/navigation re-receives the in-progress edits.
 *
 * The chrome is deliberately self-contained (hardcoded `gqdc-*` palette): the
 * host document carries the tenant's CSS variables, so theming the tooling
 * with them would let a wild tenant palette distort the editor.
 *
 * Phase 3 wires Save/Discard persistence + accordion→route auto-navigation.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { BrandConfig } from '../config/schema'
import { DEFAULT_CONFIG } from '../config/defaults'
import { validateBrandConfig } from '../config/validate'
import { useDebouncedCallback } from '@tanstack/react-pacer'
import { buildEmbedSrc, DEVICE_PRESETS, type DevicePreset } from './embedSrc'
import { sendToFrame, subscribePreviewMessages } from './bridge'
import { nextNavigation } from './autoNav'
import { useDraft } from './useDraft'
import { Inspector } from './Inspector'
import { CHROME_CSS } from './chromeCss'

export interface DesignConfiguratorProps {
  tenantId: string
}

export function DesignConfigurator({ tenantId }: DesignConfiguratorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [device, setDevice] = useState<DevicePreset['id']>('desktop')
  const [loaded, setLoaded] = useState<BrandConfig>(DEFAULT_CONFIG)

  const frameRef = useRef<HTMLIFrameElement>(null)
  const readyRef = useRef(false)
  const latestRef = useRef<BrandConfig>(loaded)
  const routeRef = useRef(pathname)

  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  // Opening a page group / editing its fields brings that page into the
  // frame. Debounced so dragging a slider doesn't thrash navigation; global
  // groups and already-current routes are filtered by nextNavigation.
  const activateGroup = useDebouncedCallback(
    (groupId: string) => {
      const route = nextNavigation(groupId, routeRef.current)
      const win = frameRef.current?.contentWindow
      if (route && win) {
        routeRef.current = route // optimistic; confirmed by routeChanged
        sendToFrame(win, { type: 'gq-preview:navigate', route }, origin)
      }
    },
    { wait: 250 }
  )

  const pushToFrame = useCallback(
    (cfg: BrandConfig) => {
      latestRef.current = cfg
      const win = frameRef.current?.contentWindow
      if (readyRef.current && win) {
        sendToFrame(win, { type: 'gq-preview:applyPreview', config: cfg }, origin)
      }
    },
    [origin]
  )

  const { draft, set, reset, discard, commitSaved, isModified, isDirty } = useDraft(loaded, {
    onApply: pushToFrame,
  })

  const [saving, setSaving] = useState(false)
  const save = useCallback(async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/brand/${encodeURIComponent(tenantId)}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(draft),
      })
      if (res.ok) commitSaved()
    } catch {
      /* keep dirty; admin can retry */
    } finally {
      setSaving(false)
    }
  }, [tenantId, draft, commitSaved])

  // Load the tenant config to seed the draft. Falls back to defaults on any
  // failure so the editor always opens (mirrors fetchBrand's contract).
  useEffect(() => {
    let cancelled = false
    fetch(`/api/brand/${encodeURIComponent(tenantId)}`, {
      headers: { Accept: 'application/json' },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled && json) setLoaded(validateBrandConfig(json))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [tenantId])

  // Track the frame handshake; flush the latest draft when it (re)mounts.
  useEffect(() => {
    const stop = subscribePreviewMessages(
      window,
      (msg) => {
        if (msg.type === 'gq-preview:ready') {
          readyRef.current = true
          const win = frameRef.current?.contentWindow
          if (win) {
            sendToFrame(win, { type: 'gq-preview:applyPreview', config: latestRef.current }, origin)
          }
        } else if (msg.type === 'gq-preview:routeChanged') {
          routeRef.current = msg.route
        }
      },
      { expectedOrigin: origin }
    )
    return stop
  }, [origin])

  const src = useMemo(() => {
    const search = typeof window !== 'undefined' ? window.location.search : ''
    return buildEmbedSrc(`${pathname}${search}`)
  }, [pathname])

  const width = DEVICE_PRESETS.find((d) => d.id === device)?.width ?? 1440

  return (
    <div className="gqdc-root" role="region" aria-label="Design configurator">
      <style>{CHROME_CSS}</style>

      <div className="gqdc-top">
        <span className="gqdc-brand">
          <span className="gqdc-dot" />
          GrowQuest Studio
          <span className="gqdc-tenant">· {tenantId}</span>
        </span>

        <div className="gqdc-seg" role="group" aria-label="Device preview width">
          {DEVICE_PRESETS.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={device === d.id}
              onClick={() => setDevice(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="gqdc-actions">
          <button
            type="button"
            className="gqdc-btn gqdc-save"
            disabled={!isDirty || saving}
            onClick={save}
          >
            {isDirty && <span className="gqdc-dirty" />}
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            className="gqdc-btn gqdc-ghost"
            disabled={!isDirty || saving}
            onClick={discard}
          >
            Discard
          </button>
          <button
            type="button"
            className="gqdc-btn gqdc-ghost"
            onClick={() => router.replace(pathname)}
          >
            Exit
          </button>
        </div>
      </div>

      <div className="gqdc-body">
        <div className="gqdc-stage">
          <iframe
            ref={frameRef}
            title="Live preview"
            className="gqdc-frame"
            src={src}
            style={{ width: `${width}px` }}
          />
        </div>
        <aside className="gqdc-inspector" aria-label="Inspector">
          <div className="gqdc-insp-h">
            Inspector
            {isDirty && <span className="gqdc-insp-dirty">unsaved</span>}
          </div>
          <Inspector
            draft={draft}
            isModified={isModified}
            onSet={set}
            onReset={reset}
            onActivateGroup={activateGroup}
          />
        </aside>
      </div>
    </div>
  )
}
