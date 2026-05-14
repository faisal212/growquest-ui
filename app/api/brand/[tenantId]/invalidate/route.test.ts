import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { revalidateTagMock } = vi.hoisted(() => ({ revalidateTagMock: vi.fn() }))
vi.mock('next/cache', () => ({ revalidateTag: revalidateTagMock }))

import { POST } from './route'

function makeRequest(authorization?: string): Request {
  const headers = new Headers()
  if (authorization !== undefined) headers.set('authorization', authorization)
  return new Request('http://localhost/api/brand/acme/invalidate', {
    method: 'POST',
    headers,
  })
}

const params = Promise.resolve({ tenantId: 'acme' })

describe('POST /api/brand/[tenantId]/invalidate', () => {
  beforeEach(() => {
    revalidateTagMock.mockReset()
    process.env.BRAND_INVALIDATE_SECRET = 'test-secret'
  })

  afterEach(() => {
    delete process.env.BRAND_INVALIDATE_SECRET
  })

  it('returns 500 when BRAND_INVALIDATE_SECRET is unset', async () => {
    delete process.env.BRAND_INVALIDATE_SECRET
    const res = await POST(makeRequest('Bearer test-secret'), { params })
    expect(res.status).toBe(500)
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })

  it('returns 401 when Authorization header is missing', async () => {
    const res = await POST(makeRequest(), { params })
    expect(res.status).toBe(401)
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })

  it('returns 401 when Authorization header has the wrong secret', async () => {
    const res = await POST(makeRequest('Bearer wrong-secret'), { params })
    expect(res.status).toBe(401)
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })

  it('returns 200 and calls revalidateTag on correct secret', async () => {
    const res = await POST(makeRequest('Bearer test-secret'), { params })
    expect(res.status).toBe(200)
    const body = (await res.json()) as { ok: boolean; tenantId: string; revalidatedAt: string }
    expect(body.ok).toBe(true)
    expect(body.tenantId).toBe('acme')
    expect(typeof body.revalidatedAt).toBe('string')
    expect(revalidateTagMock).toHaveBeenCalledOnce()
    expect(revalidateTagMock).toHaveBeenCalledWith('brand:acme', 'max')
  })
})
