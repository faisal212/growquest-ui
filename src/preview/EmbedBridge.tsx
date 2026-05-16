'use client'

/**
 * Mounted inside the editor's iframe (preview=embed). Renders nothing — it is
 * pure wiring. It announces `ready` to the host, applies inbound preview
 * configs to the live document via the existing {@link applyBrand} runtime,
 * routes on `navigate`, and reports its own route changes back so the host can
 * suppress redundant auto-navigation.
 *
 * Trust boundary: only same-origin messages are accepted (the host is the
 * same Next app on the same origin); {@link subscribePreviewMessages} also
 * shape-validates every payload.
 */
import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { applyBrand } from '../config/apply'
import { sendToHost, subscribePreviewMessages } from './bridge'

export function EmbedBridge() {
  const router = useRouter()
  const pathname = usePathname()
  const lastReported = useRef<string | null>(null)

  useEffect(() => {
    const origin = window.location.origin
    const stop = subscribePreviewMessages(
      window,
      (msg) => {
        if (msg.type === 'gq-preview:applyPreview') {
          applyBrand(msg.config)
        } else if (msg.type === 'gq-preview:navigate') {
          router.push(msg.route)
        }
      },
      { expectedOrigin: origin }
    )
    sendToHost({ type: 'gq-preview:ready' }, origin)
    return stop
  }, [router])

  useEffect(() => {
    if (lastReported.current === pathname) return
    lastReported.current = pathname
    sendToHost({ type: 'gq-preview:routeChanged', route: pathname }, window.location.origin)
  }, [pathname])

  return null
}
