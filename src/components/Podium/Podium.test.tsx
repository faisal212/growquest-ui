import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Podium } from './Podium'
import type { LeaderboardEntry } from '../../types'

const entries: LeaderboardEntry[] = [
  { rank: 1, handle: 'gold_user', xp: 5000, streak: 7, tier: 'Oracle', me: false, seed: 1 },
  { rank: 2, handle: 'silver_user', xp: 4000, streak: 3, tier: 'Scout', me: false, seed: 2 },
  { rank: 3, handle: 'bronze_user', xp: 3000, streak: 1, tier: 'Scout', me: false, seed: 3 },
]

describe('Podium', () => {
  it('renders all three user handles', () => {
    render(<Podium entries={entries} />)
    expect(screen.getByText('gold_user')).toBeInTheDocument()
    expect(screen.getByText('silver_user')).toBeInTheDocument()
    expect(screen.getByText('bronze_user')).toBeInTheDocument()
  })

  it('renders XP values with locale formatting', () => {
    render(<Podium entries={entries} />)
    expect(screen.getByText(/5,000 XP/)).toBeInTheDocument()
  })

  it('renders rank numbers', () => {
    render(<Podium entries={entries} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('colors the rank badge via the contrast-aware podium token, not a hardcoded near-black', () => {
    const { container } = render(<Podium entries={entries} />)
    const badge = screen.getByText('1')
    expect(badge.className).toContain('var(--podium-rank-fg)')
    expect(container.innerHTML).not.toContain('#05060A')
  })

  it('colors the platform numeral via the podium rank-fg token', () => {
    render(<Podium entries={entries} />)
    const numeral = screen.getByText('01')
    expect(numeral.className).toContain('var(--podium-rank-fg)')
  })

  it('draws the platform stripe pattern from a themeable token, not a hardcoded rgba', () => {
    const { container } = render(<Podium entries={entries} />)
    expect(container.innerHTML).toContain('var(--podium-platform-pattern)')
    expect(container.innerHTML).not.toContain('rgba(0,0,0,0.12)')
  })

  it('colors the @handle via the podium-handle token, not the global ink', () => {
    render(<Podium entries={entries} />)
    expect(screen.getByText('gold_user').className).toContain('var(--podium-handle)')
  })

  it('colors the XP line via the podium-xp token, not the global ink-dim', () => {
    render(<Podium entries={entries} />)
    const xp = screen.getByText(/5,000 XP/)
    expect(xp.className).toContain('var(--podium-xp)')
    expect(xp.className).not.toContain('text-ink-dim')
  })
})
