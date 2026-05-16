import { describe, it, expect } from 'vitest'
import { resolvePreviewMode } from './previewMode'
import type { AdminSession } from '../config/admin/adapter'

const adminOf = (tenantId: string): AdminSession => ({ tenantId, isAdmin: true })

describe('resolvePreviewMode', () => {
  it('is off when there is no preview param, even for an admin', () => {
    expect(
      resolvePreviewMode({ search: '?foo=1', session: adminOf('acme'), tenantId: 'acme' })
    ).toBe('off')
    expect(resolvePreviewMode({ search: '', session: adminOf('acme'), tenantId: 'acme' })).toBe(
      'off'
    )
  })

  it('is embed for preview=embed regardless of session (parent is already gated)', () => {
    expect(resolvePreviewMode({ search: '?preview=embed', session: null, tenantId: 'acme' })).toBe(
      'embed'
    )
    expect(
      resolvePreviewMode({ search: '?preview=embed', session: adminOf('acme'), tenantId: 'acme' })
    ).toBe('embed')
  })

  it('is editor for a truthy preview param + matching admin session', () => {
    for (const v of ['true', '1', 'yes']) {
      expect(
        resolvePreviewMode({ search: `?preview=${v}`, session: adminOf('acme'), tenantId: 'acme' })
      ).toBe('editor')
    }
  })

  it('is off when an editor is requested without an admin session', () => {
    expect(resolvePreviewMode({ search: '?preview=true', session: null, tenantId: 'acme' })).toBe(
      'off'
    )
  })

  it('is off when the session is not an admin', () => {
    expect(
      resolvePreviewMode({
        search: '?preview=true',
        session: { tenantId: 'acme', isAdmin: false },
        tenantId: 'acme',
      })
    ).toBe('off')
  })

  it('is off when the admin belongs to a different tenant', () => {
    expect(
      resolvePreviewMode({ search: '?preview=true', session: adminOf('globex'), tenantId: 'acme' })
    ).toBe('off')
  })

  it('treats falsey preview values as off', () => {
    expect(
      resolvePreviewMode({ search: '?preview=false', session: adminOf('acme'), tenantId: 'acme' })
    ).toBe('off')
    expect(
      resolvePreviewMode({ search: '?preview=0', session: adminOf('acme'), tenantId: 'acme' })
    ).toBe('off')
  })
})
