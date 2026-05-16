import { describe, it, expect, afterEach } from 'vitest'
import {
  parseAdminCookie,
  getAdminSessionAdapter,
  setAdminSessionAdapter,
  resetAdminSessionAdapter,
} from './adapter'

describe('parseAdminCookie', () => {
  it('returns null for absent / empty cookie strings', () => {
    expect(parseAdminCookie(null)).toBeNull()
    expect(parseAdminCookie(undefined)).toBeNull()
    expect(parseAdminCookie('')).toBeNull()
  })

  it('returns null when no gq_admin cookie is present', () => {
    expect(parseAdminCookie('foo=1; bar=2')).toBeNull()
  })

  it('returns null when gq_admin is present but empty', () => {
    expect(parseAdminCookie('gq_admin=')).toBeNull()
  })

  it('reads the tenantId from a lone gq_admin cookie', () => {
    expect(parseAdminCookie('gq_admin=acme')).toEqual({ tenantId: 'acme', isAdmin: true })
  })

  it('finds gq_admin among other cookies regardless of position', () => {
    expect(parseAdminCookie('foo=1; gq_admin=globex; bar=2')).toEqual({
      tenantId: 'globex',
      isAdmin: true,
    })
  })

  it('URL-decodes the cookie value', () => {
    expect(parseAdminCookie('gq_admin=ac%20me')).toEqual({ tenantId: 'ac me', isAdmin: true })
  })
})

describe('admin session adapter registry', () => {
  afterEach(() => {
    resetAdminSessionAdapter()
    document.cookie = 'gq_admin=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })

  it('default adapter resolves a session from document.cookie', async () => {
    document.cookie = 'gq_admin=acme'
    const session = await getAdminSessionAdapter().getAdminSession()
    expect(session).toEqual({ tenantId: 'acme', isAdmin: true })
  })

  it('default adapter resolves null with no admin cookie', async () => {
    const session = await getAdminSessionAdapter().getAdminSession()
    expect(session).toBeNull()
  })

  it('setAdminSessionAdapter swaps the active adapter', async () => {
    setAdminSessionAdapter({
      getAdminSession: async () => ({ tenantId: 'injected', isAdmin: true }),
    })
    const session = await getAdminSessionAdapter().getAdminSession()
    expect(session).toEqual({ tenantId: 'injected', isAdmin: true })
  })
})
