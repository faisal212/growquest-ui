import { describe, it, expect, vi, afterEach } from 'vitest'

vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }))

import { GET, PUT } from './route'
import { resetBrandStore } from '../../../../src/config/store/adapter'

const params = (tenantId: string) => ({ params: Promise.resolve({ tenantId }) })

function putReq(tenantId: string, body: unknown, cookie?: string) {
  return new Request(`http://localhost/api/brand/${tenantId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  })
}

describe('PUT /api/brand/[tenantId]', () => {
  afterEach(() => resetBrandStore())

  it('rejects an unauthenticated write with 401', async () => {
    const res = await PUT(
      putReq('acme', { mode: 'dark', brand: { primary: '#111' } }),
      params('acme')
    )
    expect(res.status).toBe(401)
  })

  it('rejects an admin of a different tenant with 401', async () => {
    const res = await PUT(
      putReq('acme', { mode: 'dark', brand: { primary: '#111' } }, 'gq_admin=globex'),
      params('acme')
    )
    expect(res.status).toBe(401)
  })

  it('persists a valid config for an authorized admin and GET reflects it', async () => {
    const res = await PUT(
      putReq('acme', { mode: 'dark', brand: { primary: '#abcdef' } }, 'gq_admin=acme'),
      params('acme')
    )
    expect(res.status).toBe(200)
    const got = await GET(new Request('http://localhost/api/brand/acme'), params('acme'))
    const json = await got.json()
    expect(json.brand.primary).toBe('#abcdef')
  })
})
