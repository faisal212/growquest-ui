import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroBanner } from './HeroBanner'
import { DEFAULT_CONFIG } from '../../config/defaults'
import type { BrandConfig } from '../../config/schema'
import { renderWithBrand } from '../../test/renderWithBrand'

describe('HeroBanner', () => {
  it('renders the default title', () => {
    render(<HeroBanner heroStyle="isometric" />)
    expect(screen.getByText("Founders' Path")).toBeInTheDocument()
  })

  it('renders a custom title', () => {
    render(<HeroBanner heroStyle="orbital" title="Season Two" />)
    expect(screen.getByText('Season Two')).toBeInTheDocument()
  })

  it('renders a custom subtitle', () => {
    render(<HeroBanner heroStyle="grid-poster" subtitle="Complete all missions." />)
    expect(screen.getByText('Complete all missions.')).toBeInTheDocument()
  })

  it('renders the default eyebrow', () => {
    render(<HeroBanner heroStyle="pixel" />)
    expect(screen.getByText(/week 04/)).toBeInTheDocument()
  })

  it('renders a custom eyebrow', () => {
    render(<HeroBanner heroStyle="isometric" eyebrow="// season 02 · week 01" />)
    expect(screen.getByText('// season 02 · week 01')).toBeInTheDocument()
  })

  describe('overlayMode', () => {
    const withOverlayMode = (mode: 'always' | 'eyebrow-only' | 'never'): BrandConfig => ({
      ...DEFAULT_CONFIG,
      overrides: {
        ...DEFAULT_CONFIG.overrides,
        heroBanner: { overlayMode: mode },
      },
    })

    it("'always' (default) renders eyebrow, title, and subtitle visibly", () => {
      renderWithBrand(
        <HeroBanner heroStyle="isometric" title="Path X" />,
        withOverlayMode('always')
      )
      expect(screen.getByText(/week 04/)).toBeInTheDocument()
      const title = screen.getByText('Path X')
      expect(title).toBeInTheDocument()
      expect(title).not.toHaveClass('sr-only')
      expect(screen.getByText(/Complete 8 of 12 missions/)).toBeInTheDocument()
    })

    it("'eyebrow-only' renders only the eyebrow; title becomes sr-only and subtitle is removed", () => {
      renderWithBrand(
        <HeroBanner heroStyle="isometric" title="Path X" />,
        withOverlayMode('eyebrow-only')
      )
      expect(screen.getByText(/week 04/)).toBeInTheDocument()
      // Title is still present in DOM for a11y but with the sr-only utility applied.
      const title = screen.getByText('Path X')
      expect(title.tagName).toBe('H2')
      expect(title).toHaveClass('sr-only')
      // Subtitle is removed entirely.
      expect(screen.queryByText(/Complete 8 of 12 missions/)).not.toBeInTheDocument()
    })

    it("'never' suppresses the visible overlay while preserving an sr-only h2", () => {
      const { container } = renderWithBrand(
        <HeroBanner heroStyle="isometric" title="Path X" />,
        withOverlayMode('never')
      )
      // No visible content container, no eyebrow, no subtitle.
      expect(container.querySelector('.hero-banner-content')).toBeNull()
      expect(screen.queryByText(/week 04/)).not.toBeInTheDocument()
      expect(screen.queryByText(/Complete 8 of 12 missions/)).not.toBeInTheDocument()
      // h2 is still in DOM as sr-only so screen readers receive the heading.
      const title = screen.getByText('Path X')
      expect(title.tagName).toBe('H2')
      expect(title).toHaveClass('sr-only')
    })
  })
})
