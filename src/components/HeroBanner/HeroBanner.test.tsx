import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroBanner } from './HeroBanner'

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
})
