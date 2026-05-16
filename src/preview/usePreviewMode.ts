'use client'

/**
 * CSR-only hook resolving the active {@link PreviewMode} for the rendered
 * tenant. Always `'off'` during SSR and the first client commit, so the editor
 * never affects the server payload or hydration. `embed` resolves
 * synchronously (the iframe child must wire its bridge immediately);
 * `editor` waits on the async admin-session adapter.
 */
import { useEffect, useState } from 'react'
import { resolvePreviewMode, type PreviewMode } from './previewMode'
import { getAdminSessionAdapter } from '../config/admin/adapter'

export function usePreviewMode(tenantId: string): PreviewMode {
  const [mode, setMode] = useState<PreviewMode>('off')

  useEffect(() => {
    const search = window.location.search

    // embed needs no admin lookup — parent host is already gated. This must
    // resolve client-only AFTER mount (reads window.location; running it
    // during SSR/first render would risk a hydration mismatch), which is the
    // rule's sanctioned "sync from an external system after mount" case.
    if (resolvePreviewMode({ search, session: null, tenantId }) === 'embed') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode('embed')
      return
    }

    let cancelled = false
    getAdminSessionAdapter()
      .getAdminSession()
      .then((session) => {
        if (cancelled) return
        setMode(resolvePreviewMode({ search, session, tenantId }))
      })
      .catch(() => {
        if (!cancelled) setMode('off')
      })
    return () => {
      cancelled = true
    }
  }, [tenantId])

  return mode
}
