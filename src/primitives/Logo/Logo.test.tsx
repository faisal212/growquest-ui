import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo, BrandLockup } from './Logo'

describe('Logo', () => {
  it('renders an SVG', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('accepts a custom size', () => {
    const { container } = render(<Logo size={48} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('48')
    expect(svg?.getAttribute('height')).toBe('48')
  })
})

describe('BrandLockup', () => {
  it('renders the default name', () => {
    render(<BrandLockup />)
    expect(screen.getByText('GrowQuest')).toBeInTheDocument()
  })

  it('renders a custom name', () => {
    render(<BrandLockup name="MyBrand" />)
    expect(screen.getByText('MyBrand')).toBeInTheDocument()
  })

  it('renders the version chip', () => {
    render(<BrandLockup version="v2.0" />)
    expect(screen.getByText('v2.0')).toBeInTheDocument()
  })
})
