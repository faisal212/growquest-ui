import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders the label', () => {
    render(<StatCard label="Total XP" value={1250} trend={[10, 20, 15, 30]} />)
    expect(screen.getByText('Total XP')).toBeInTheDocument()
  })

  it('renders a numeric value', () => {
    render(<StatCard label="Missions" value={42} trend={[1, 2, 3, 4, 5]} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders a string value', () => {
    render(<StatCard label="Tier" value="Oracle" trend={[]} />)
    expect(screen.getByText('Oracle')).toBeInTheDocument()
  })

  it('renders with an empty trend array', () => {
    const { container } = render(<StatCard label="Streak" value={7} trend={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
