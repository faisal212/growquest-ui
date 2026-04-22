import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { XPBar } from './XPBar'

describe('XPBar', () => {
  it('renders the label when provided', () => {
    render(<XPBar value={50} max={100} label="Level 4" />)
    expect(screen.getByText('Level 4')).toBeInTheDocument()
  })

  it('renders value/max display', () => {
    render(<XPBar value={750} max={1000} label="Progress" />)
    expect(screen.getByText('750/1000')).toBeInTheDocument()
  })

  it('renders without label', () => {
    const { container } = render(<XPBar value={25} max={100} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders plain style', () => {
    render(<XPBar value={40} max={100} style="plain" label="XP" />)
    expect(screen.getByText('XP')).toBeInTheDocument()
  })

  it('renders ring style', () => {
    render(<XPBar value={60} max={100} style="ring" label="Ring" />)
    expect(screen.getByText('Ring')).toBeInTheDocument()
  })

  it('renders segmented style with correct segment count', () => {
    const { container } = render(<XPBar value={5} max={10} style="segmented" segments={10} />)
    const segs = container.querySelectorAll('.seg')
    expect(segs.length).toBe(10)
  })
})
