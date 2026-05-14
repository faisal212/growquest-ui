import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileCard } from './ProfileCard'
import type { Persona } from '../../types'

const persona: Persona = {
  handle: 'testuser',
  tier: 'Scout',
  xp: 1200,
  missionsDone: 5,
  rewardsClaimed: 0,
  streak: 3,
  ready: 1,
}

describe('ProfileCard', () => {
  it('renders the handle with @ prefix', () => {
    render(<ProfileCard persona={persona} xpStyle="plain" />)
    expect(screen.getByText('@testuser')).toBeInTheDocument()
  })

  it('renders the tier', () => {
    render(<ProfileCard persona={persona} xpStyle="plain" />)
    expect(screen.getByText('Scout')).toBeInTheDocument()
  })

  it('renders mission count as X/12', () => {
    render(<ProfileCard persona={persona} xpStyle="plain" />)
    expect(screen.getByText('5/12')).toBeInTheDocument()
  })

  it('renders streak in Xd format', () => {
    render(<ProfileCard persona={persona} xpStyle="plain" />)
    expect(screen.getByText('3d')).toBeInTheDocument()
  })

  it('renders the default wallet address', () => {
    render(<ProfileCard persona={persona} xpStyle="plain" />)
    expect(screen.getByText(/0xE63F6A/)).toBeInTheDocument()
  })

  it('renders a custom wallet address', () => {
    render(<ProfileCard persona={persona} xpStyle="plain" walletAddress="0xABCD" />)
    expect(screen.getByText('0xABCD')).toBeInTheDocument()
  })
})
