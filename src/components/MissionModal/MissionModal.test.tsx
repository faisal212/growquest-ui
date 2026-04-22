import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MissionModal } from './MissionModal'
import type { Mission } from '../../types'

vi.mock('react-dom', async () => {
  const actual = await vi.importActual<typeof import('react-dom')>('react-dom')
  return { ...actual, createPortal: (node: React.ReactNode) => node }
})

const socialMission: Mission = {
  id: 'm-test',
  type: 'social',
  title: 'Follow us',
  desc: 'Follow on social media',
  xp: 100,
  progress: [0, 1],
  tone: 'accent',
}

describe('MissionModal', () => {
  it('renders nothing when mission is null', () => {
    const { container } = render(<MissionModal m={null} onClose={vi.fn()} onClaim={vi.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('social mission: primary button steps through Launch → Verify → Claim', () => {
    render(<MissionModal m={socialMission} onClose={vi.fn()} onClaim={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Launch mission' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Launch mission' }))
    expect(screen.getByRole('button', { name: 'Verify completion' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Verify completion' }))
    expect(screen.getByRole('button', { name: /Claim/ })).toBeInTheDocument()
  })

  it('social mission: step 2 fires onClaim and onClose', () => {
    const onClaim = vi.fn()
    const onClose = vi.fn()
    render(<MissionModal m={socialMission} onClose={onClose} onClaim={onClaim} />)
    fireEvent.click(screen.getByRole('button', { name: 'Launch mission' }))
    fireEvent.click(screen.getByRole('button', { name: 'Verify completion' }))
    fireEvent.click(screen.getByRole('button', { name: /Claim/ }))
    expect(onClaim).toHaveBeenCalledWith(socialMission)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('close button fires onClose', () => {
    const onClose = vi.fn()
    render(<MissionModal m={socialMission} onClose={onClose} onClaim={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
