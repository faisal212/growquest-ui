import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BadgeGrid } from './BadgeGrid'
import type { Badge } from '../../types'

const badges: Badge[] = [
  { id: 'b1', name: 'Early Bird', got: true, desc: 'Joined in the first week' },
  { id: 'b2', name: 'Veteran', got: false, desc: 'Completed 100 missions' },
  { id: 'b3', name: 'Streak King', got: true, desc: '30-day streak' },
]

describe('BadgeGrid', () => {
  it('renders all badge names', () => {
    render(<BadgeGrid badges={badges} />)
    expect(screen.getByText('Early Bird')).toBeInTheDocument()
    expect(screen.getByText('Veteran')).toBeInTheDocument()
    expect(screen.getByText('Streak King')).toBeInTheDocument()
  })

  it('shows the correct earned/total count', () => {
    render(<BadgeGrid badges={badges} />)
    expect(screen.getByText(/2\/3/)).toBeInTheDocument()
  })

  it('shows unlocked label for earned badges', () => {
    render(<BadgeGrid badges={badges} />)
    const unlocked = screen.getAllByText('unlocked')
    expect(unlocked.length).toBe(2)
  })

  it('shows locked label for unearned badges', () => {
    render(<BadgeGrid badges={badges} />)
    expect(screen.getByText('locked')).toBeInTheDocument()
  })

  it('renders nothing in the grid for an empty array', () => {
    render(<BadgeGrid badges={[]} />)
    expect(screen.getByText(/0\/0/)).toBeInTheDocument()
  })

  it('fills the unlocked badge icon from a themeable token, not a hardcoded near-black', () => {
    const { container } = render(<BadgeGrid badges={badges} />)
    const fills = Array.from(container.querySelectorAll('polygon')).map((p) =>
      p.getAttribute('fill')
    )
    expect(fills).toContain('var(--badge-grid-unlocked-fg)')
    expect(fills).not.toContain('#05060A')
  })
})
