/**
 * Resolve which preview mode a render is in. Pure and CSR-driven — the editor
 * never exists during SSR.
 *
 * - `embed`  — the app is the iframe child of the editor (`?preview=embed`).
 *   It installs the bridge listener but renders no editor UI. No admin check:
 *   the parent host is already admin-gated and the bridge is same-origin only.
 * - `editor` — a truthy `?preview` param AND an admin session whose tenant
 *   matches the rendered tenant. This mounts the configurator chrome.
 * - `off`    — everything else (no param, falsey param, missing/foreign/non-
 *   admin session). The default end-user path; zero editor footprint.
 */
import type { AdminSession } from '../config/admin/adapter'

export type PreviewMode = 'off' | 'embed' | 'editor'

export interface ResolvePreviewModeInput {
  /** `window.location.search`, e.g. `"?preview=true"`. */
  search: string
  session: AdminSession | null
  /** The tenant the page is rendering for. */
  tenantId: string
}

const TRUTHY = new Set(['true', '1', 'yes'])

export function resolvePreviewMode(input: ResolvePreviewModeInput): PreviewMode {
  const param = new URLSearchParams(input.search).get('preview')
  if (param === null) return 'off'
  if (param === 'embed') return 'embed'
  if (!TRUTHY.has(param.toLowerCase())) return 'off'

  const { session, tenantId } = input
  if (session && session.isAdmin && session.tenantId === tenantId) return 'editor'
  return 'off'
}
