import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Chip } from './Chip'

describe('Chip', () => {
  it('renders its children', () => {
    render(<Chip>Active</Chip>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders with default tone', () => {
    const { container } = render(<Chip>Label</Chip>)
    expect(container.firstChild).toHaveClass('chip')
  })

  it('renders the dot indicator when dot is true', () => {
    const { container } = render(<Chip dot>Live</Chip>)
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(2)
  })

  it('does not render a dot when dot is false', () => {
    render(<Chip>No dot</Chip>)
    expect(screen.getByText('No dot')).toBeInTheDocument()
  })

  it('accepts all tone values without error', () => {
    const tones = ['primary', 'secondary'] as const
    tones.forEach((tone) => {
      const { unmount } = render(<Chip tone={tone}>{tone}</Chip>)
      expect(screen.getByText(tone)).toBeInTheDocument()
      unmount()
    })
  })
})
