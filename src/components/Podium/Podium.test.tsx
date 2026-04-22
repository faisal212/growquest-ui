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
})
