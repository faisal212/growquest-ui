/**
 * Admin-session boundary for the design configurator.
 *
 * The configurator only mounts for a logged-in tenant admin. Real consumers
 * have an auth system with a session cookie; this repo (a UI library + demo)
 * does not, so admin identity is resolved through a pluggable adapter. The
 * default adapter reads a demo `gq_admin` cookie whose value is the tenantId
 * the bearer may administer. Consumers inject their own adapter via
 * `setAdminSessionAdapter()` (e.g. one that verifies their real session).
 */

export interface AdminSession {
  /** Tenant this admin may edit. Must match the rendered tenant to unlock the editor. */
  tenantId: string
  isAdmin: boolean
}

export interface AdminSessionAdapter {
  /** Resolve the current admin session, or null when not an admin. */
  getAdminSession(): Promise<AdminSession | null>
}

/**
 * Parse the demo `gq_admin` cookie. Its value is the tenantId the bearer may
 * administer (`gq_admin=acme` → admin of `acme`). Absent or empty → null.
 * Pure: takes the raw `document.cookie` string so it is trivially testable.
 */
export function parseAdminCookie(cookieString: string | null | undefined): AdminSession | null {
  if (!cookieString) return null
  for (const part of cookieString.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    const name = part.slice(0, eq).trim()
    if (name !== 'gq_admin') continue
    const raw = part.slice(eq + 1).trim()
    if (!raw) return null
    let value = raw
    try {
      value = decodeURIComponent(raw)
    } catch {
      // Malformed escape sequence — fall back to the raw value.
    }
    if (!value) return null
    return { tenantId: value, isAdmin: true }
  }
  return null
}

/** Default adapter: reads `document.cookie` (client-only; null during SSR). */
const cookieAdminAdapter: AdminSessionAdapter = {
  async getAdminSession() {
    if (typeof document === 'undefined') return null
    return parseAdminCookie(document.cookie)
  },
}

let activeAdapter: AdminSessionAdapter = cookieAdminAdapter

/** Get the active admin-session adapter (the cookie adapter unless overridden). */
export function getAdminSessionAdapter(): AdminSessionAdapter {
  return activeAdapter
}

/** Install a custom admin-session adapter (consumers wire their real auth here). */
export function setAdminSessionAdapter(adapter: AdminSessionAdapter): void {
  activeAdapter = adapter
}

/** Restore the default cookie adapter. Primarily for tests. */
export function resetAdminSessionAdapter(): void {
  activeAdapter = cookieAdminAdapter
}
