import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LeaderboardTable } from './LeaderboardTable'
import type { LeaderboardEntry } from '../../types'

const entries: LeaderboardEntry[] = [
  { rank: 1, handle: 'alpha_user', xp: 5000, streak: 7, tier: 'Oracle', me: false, seed: 1 },
  { rank: 2, handle: 'beta_user', xp: 4000, streak: 3, tier: 'Scout', me: true, seed: 2 },
  { rank: 3, handle: 'gamma_user', xp: 3000, streak: 1, tier: 'Scout', me: false, seed: 3 },
]

describe('LeaderboardTable', () => {
  it('renders all user handles', () => {
    render(<LeaderboardTable entries={entries} />)
    expect(screen.getByText('alpha_user')).toBeInTheDocument()
    expect(screen.getByText('beta_user')).toBeInTheDocument()
    expect(screen.getByText('gamma_user')).toBeInTheDocument()
  })

  it('highlights the current user with a YOU chip', () => {
    render(<LeaderboardTable entries={entries} />)
    expect(screen.getByText('YOU')).toBeInTheDocument()
  })

  it('renders default column labels', () => {
    render(<LeaderboardTable entries={entries} />)
    expect(screen.getByText('rank')).toBeInTheDocument()
    expect(screen.getByText('insider')).toBeInTheDocument()
    expect(screen.getByText('xp')).toBeInTheDocument()
  })

  it('renders custom column labels', () => {
    render(<LeaderboardTable entries={entries} columnLabels={{ handle: 'member', xp: 'points' }} />)
    expect(screen.getByText('member')).toBeInTheDocument()
    expect(screen.getByText('points')).toBeInTheDocument()
  })

  it('renders xp values formatted with locale separator', () => {
    render(<LeaderboardTable entries={entries} />)
    expect(screen.getByText('5,000')).toBeInTheDocument()
  })

  it('renders tier tags', () => {
    render(<LeaderboardTable entries={entries} />)
    expect(screen.getByText('Oracle')).toBeInTheDocument()
  })
})
