import { describe, it, expect, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePreviewMode } from './usePreviewMode'
import { resetAdminSessionAdapter } from '../config/admin/adapter'

function setSearch(search: string) {
  window.history.replaceState({}, '', `/${search}`)
}

describe('usePreviewMode', () => {
  afterEach(() => {
    resetAdminSessionAdapter()
    document.cookie = 'gq_admin=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setSearch('')
  })

  it('returns off when no preview param is present', async () => {
    setSearch('?foo=1')
    const { result } = renderHook(() => usePreviewMode('acme'))
    // give the async admin resolution a tick
    await waitFor(() => expect(result.current).toBe('off'))
  })

  it('returns embed synchronously for ?preview=embed', () => {
    setSearch('?preview=embed')
    const { result } = renderHook(() => usePreviewMode('acme'))
    expect(result.current).toBe('embed')
  })

  it('resolves to editor when preview=true and the admin cookie matches', async () => {
    setSearch('?preview=true')
    document.cookie = 'gq_admin=acme'
    const { result } = renderHook(() => usePreviewMode('acme'))
    await waitFor(() => expect(result.current).toBe('editor'))
  })

  it('stays off when preview=true but the admin cookie is for another tenant', async () => {
    setSearch('?preview=true')
    document.cookie = 'gq_admin=globex'
    const { result } = renderHook(() => usePreviewMode('acme'))
    await waitFor(() => expect(result.current).toBe('off'))
  })
})
