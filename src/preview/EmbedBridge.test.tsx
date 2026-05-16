import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'

const push = vi.fn()
let pathname = '/missions'
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => pathname,
}))

import { EmbedBridge } from './EmbedBridge'

const ORIGIN = window.location.origin

function postFromParent(data: unknown) {
  window.dispatchEvent(new MessageEvent('message', { data, origin: ORIGIN }))
}

describe('EmbedBridge', () => {
  beforeEach(() => {
    push.mockClear()
    pathname = '/missions'
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute('data-theme')
  })
  afterEach(() => vi.restoreAllMocks())

  it('announces ready to the parent on mount', () => {
    const postMessage = vi.spyOn(window.parent, 'postMessage')
    render(<EmbedBridge />)
    expect(postMessage).toHaveBeenCalledWith({ type: 'gq-preview:ready' }, expect.any(String))
  })

  it('applies an inbound preview config to the live document', async () => {
    render(<EmbedBridge />)
    postFromParent({
      type: 'gq-preview:applyPreview',
      config: { mode: 'light', brand: { primary: '#FF8C00' } },
    })
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('light'))
  })

  it('routes on an inbound navigate message', () => {
    render(<EmbedBridge />)
    postFromParent({ type: 'gq-preview:navigate', route: '/profile' })
    expect(push).toHaveBeenCalledWith('/profile')
  })

  it('ignores a cross-origin message', () => {
    render(<EmbedBridge />)
    window.dispatchEvent(
      new MessageEvent('message', {
        data: { type: 'gq-preview:navigate', route: '/evil' },
        origin: 'http://evil.example',
      })
    )
    expect(push).not.toHaveBeenCalled()
  })
})
