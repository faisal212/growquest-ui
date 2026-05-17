import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MissionCard } from './MissionCard'
import type { Mission } from '../../types'

const mission: Mission = {
  id: 'm1',
  type: 'quiz',
  title: 'Brand Knowledge Quiz',
  desc: 'Test what you know about the brand',
  xp: 150,
  progress: [0, 1],
  tone: 'primary',
}

describe('MissionCard', () => {
  it('renders the mission title', () => {
    render(<MissionCard m={mission} onOpen={vi.fn()} />)
    expect(screen.getByText('Brand Knowledge Quiz')).toBeInTheDocument()
  })

  it('renders the mission description in comfortable density', () => {
    render(<MissionCard m={mission} onOpen={vi.fn()} density="comfortable" />)
    expect(screen.getByText('Test what you know about the brand')).toBeInTheDocument()
  })

  it('hides the description in compact density', () => {
    render(<MissionCard m={mission} onOpen={vi.fn()} density="compact" />)
    expect(screen.queryByText('Test what you know about the brand')).not.toBeInTheDocument()
  })

  it('calls onOpen with the mission when clicked', () => {
    const onOpen = vi.fn()
    render(<MissionCard m={mission} onOpen={onOpen} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onOpen).toHaveBeenCalledWith(mission)
  })

  it('renders in list layout', () => {
    render(<MissionCard m={mission} onOpen={vi.fn()} layout="list" />)
    expect(screen.getByText('Brand Knowledge Quiz')).toBeInTheDocument()
  })

  it('renders in stack layout', () => {
    render(<MissionCard m={mission} onOpen={vi.fn()} layout="stack" />)
    expect(screen.getByText('Brand Knowledge Quiz')).toBeInTheDocument()
  })

  it('shows LIMITED tag for limited missions', () => {
    render(<MissionCard m={{ ...mission, limited: true }} onOpen={vi.fn()} />)
    expect(screen.getByText(/LIMITED/)).toBeInTheDocument()
  })

  it('GO button uses the primary contrast token for primary-tone missions', () => {
    render(<MissionCard m={mission} onOpen={vi.fn()} />)
    const go = screen.getByText('GO')
    expect(go.getAttribute('style')).toContain('var(--mission-card-cta-fg)')
  })

  it('GO button uses the secondary contrast token for secondary-tone missions', () => {
    render(<MissionCard m={{ ...mission, tone: 'secondary' }} onOpen={vi.fn()} />)
    const go = screen.getByText('GO')
    expect(go.getAttribute('style')).toContain('var(--mission-card-cta-fg-on-secondary)')
  })
})
