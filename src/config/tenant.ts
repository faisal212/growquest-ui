/**
 * Resolve a tenant ID from a Host header value or a window.location.hostname.
 *
 * Convention: leftmost subdomain label IS the tenantId, unless it's a reserved
 * label (`www`, `growquest`, `localhost`, IP segments). Bare apex or reserved
 * → returns 'default'.
 *
 * Examples:
 *   parseTenant('acme.growquest.io')        → 'acme'
 *   parseTenant('globex.localhost:3000')    → 'globex'
 *   parseTenant('localhost:3000')           → 'default'
 *   parseTenant('www.growquest.io')         → 'default'
 *   parseTenant('growquest.io')             → 'default'
 *   parseTenant('127.0.0.1:3000')           → 'default'
 */
const RESERVED = new Set(['www', 'growquest', 'localhost', 'app', 'api'])

export function parseTenant(host: string | null | undefined): string {
  if (!host) return 'default'
  const noPort = host.split(':')[0].toLowerCase().trim()
  if (!noPort) return 'default'

  // IP address → no tenant
  if (/^\d+\.\d+\.\d+\.\d+$/.test(noPort)) return 'default'

  const parts = noPort.split('.')
  if (parts.length < 2) return 'default' // bare 'localhost' or single-label

  const first = parts[0]
  if (RESERVED.has(first)) return 'default'

  return first
}
