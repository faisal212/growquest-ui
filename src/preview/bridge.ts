/**
 * Typed postMessage bridge between the editor host and the framed app.
 *
 * The configurator (host) renders the live app in an `<iframe>`. They are
 * same-origin but isolated documents, so they coordinate over `postMessage`.
 * All messages are namespaced (`gq-preview:`) and shape-validated; the
 * subscribe helper additionally pins the sender origin. Anything that fails
 * either check is dropped — foreign libraries and cross-origin frames cannot
 * drive the bridge.
 *
 * Host → frame: `applyPreview` (live theme), `navigate`, `setViewport`.
 * Frame → host: `ready`, `routeChanged`.
 */
import type { BrandConfig } from '../config/schema'

export const PREVIEW_NS = 'gq-preview:' as const

export type PreviewMessage =
  | { type: 'gq-preview:ready' }
  | { type: 'gq-preview:routeChanged'; route: string }
  | { type: 'gq-preview:applyPreview'; config: Partial<BrandConfig> }
  | { type: 'gq-preview:navigate'; route: string }
  | { type: 'gq-preview:setViewport'; width: number }

export interface SubscribeOptions {
  /** Only events whose `origin` exactly equals this are trusted. */
  expectedOrigin: string
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * Structural type guard. Returns true only for a known, well-formed
 * `gq-preview:` message. Used on every inbound postMessage before it is
 * trusted — keep this strict.
 */
export function isPreviewMessage(data: unknown): data is PreviewMessage {
  if (!isObject(data)) return false
  const type = data.type
  if (typeof type !== 'string' || !type.startsWith(PREVIEW_NS)) return false
  switch (type) {
    case 'gq-preview:ready':
      return true
    case 'gq-preview:routeChanged':
      return typeof data.route === 'string'
    case 'gq-preview:navigate':
      return typeof data.route === 'string'
    case 'gq-preview:applyPreview':
      return isObject(data.config)
    case 'gq-preview:setViewport':
      return typeof data.width === 'number' && Number.isFinite(data.width)
    default:
      return false
  }
}

/** Post a message to the framed app (host → frame). */
export function sendToFrame(frame: Window, msg: PreviewMessage, targetOrigin: string): void {
  frame.postMessage(msg, targetOrigin)
}

/** Post a message to the editor host (frame → host). */
export function sendToHost(msg: PreviewMessage, targetOrigin: string): void {
  if (typeof window === 'undefined' || !window.parent) return
  window.parent.postMessage(msg, targetOrigin)
}

/**
 * Listen for preview messages on `target`. Events are delivered to `handler`
 * only when the origin matches `expectedOrigin` AND the payload passes
 * `isPreviewMessage`. Returns an unsubscribe function.
 */
export function subscribePreviewMessages(
  target: Window,
  handler: (msg: PreviewMessage) => void,
  opts: SubscribeOptions
): () => void {
  const listener = (event: MessageEvent) => {
    if (event.origin !== opts.expectedOrigin) return
    if (!isPreviewMessage(event.data)) return
    handler(event.data)
  }
  target.addEventListener('message', listener)
  return () => target.removeEventListener('message', listener)
}
