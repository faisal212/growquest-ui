import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TierLadder } from './TierLadder'
import type { Tier } from '../../types'

const tiers: Tier[] = [
  { name: 'Initiate', min: 0, color: '#ffffff' },
  { name: 'Scout', min: 1000, color: '#06b6d4' },
  { name: 'Oracle', min: 5000, color: '#d946ef' },
]

describe('TierLadder', () => {
  it('renders the tier ladder header', () => {
    render(<TierLadder tiers={tiers} currentXP={1500} />)
    expect(screen.getByText(/tier ladder/)).toBeInTheDocument()
  })

  it('renders all tier names', () => {
    render(<TierLadder tiers={tiers} currentXP={1500} />)
    expect(screen.getByText('Initiate')).toBeInTheDocument()
    expect(screen.getByText('Scout')).toBeInTheDocument()
    expect(screen.getByText('Oracle')).toBeInTheDocument()
  })

  it('renders min XP for each tier', () => {
    render(<TierLadder tiers={tiers} currentXP={0} />)
    expect(screen.getByText(/5,000/)).toBeInTheDocument()
    expect(screen.getByText(/1,000/)).toBeInTheDocument()
  })

  it('renders without crashing when currentXP is 0', () => {
    const { container } = render(<TierLadder tiers={tiers} currentXP={0} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
