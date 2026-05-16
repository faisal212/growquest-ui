import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const replace = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace, push: vi.fn() }),
  usePathname: () => '/missions',
}))

import { DesignConfigurator } from './DesignConfigurator'

describe('DesignConfigurator', () => {
  beforeEach(() => replace.mockClear())

  it('frames the live app at the current route in embed mode', () => {
    render(<DesignConfigurator tenantId="acme" />)
    const frame = screen.getByTitle(/live preview/i) as HTMLIFrameElement
    expect(frame.getAttribute('src')).toBe('/missions?preview=embed')
  })

  it('defaults to the desktop device width', () => {
    render(<DesignConfigurator tenantId="acme" />)
    const frame = screen.getByTitle(/live preview/i) as HTMLIFrameElement
    expect(frame.style.width).toBe('1440px')
  })

  it('resizes the frame when a device preset is chosen', () => {
    render(<DesignConfigurator tenantId="acme" />)
    fireEvent.click(screen.getByRole('button', { name: 'Mobile' }))
    const frame = screen.getByTitle(/live preview/i) as HTMLIFrameElement
    expect(frame.style.width).toBe('390px')
  })

  it('exits preview by replacing the route without the preview param', () => {
    render(<DesignConfigurator tenantId="acme" />)
    fireEvent.click(screen.getByRole('button', { name: /exit/i }))
    expect(replace).toHaveBeenCalledWith('/missions')
  })
})
