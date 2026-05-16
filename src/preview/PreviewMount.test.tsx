import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

const previewMode = vi.fn()
vi.mock('./usePreviewMode', () => ({
  usePreviewMode: (tenantId: string) => previewMode(tenantId),
}))
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  usePathname: () => '/missions',
}))

import { PreviewMount } from './PreviewMount'

describe('PreviewMount', () => {
  beforeEach(() => previewMode.mockReset())

  it('renders nothing in off mode', () => {
    previewMode.mockReturnValue('off')
    const { container } = render(<PreviewMount tenantId="acme" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('mounts the embed bridge in embed mode (announces ready to parent)', () => {
    previewMode.mockReturnValue('embed')
    const postMessage = vi.spyOn(window.parent, 'postMessage')
    render(<PreviewMount tenantId="acme" />)
    expect(postMessage).toHaveBeenCalledWith({ type: 'gq-preview:ready' }, expect.any(String))
  })

  it('lazily mounts the configurator chrome in editor mode', async () => {
    previewMode.mockReturnValue('editor')
    render(<PreviewMount tenantId="acme" />)
    await waitFor(() =>
      expect(screen.getByRole('region', { name: /design configurator/i })).toBeInTheDocument()
    )
  })
})
