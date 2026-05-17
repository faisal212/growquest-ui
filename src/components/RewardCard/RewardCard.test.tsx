import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RewardCard } from './RewardCard'
import type { Reward } from '../../types'

const reward: Reward = {
  id: 'r1',
  title: 'Branded T-Shirt',
  cost: 500,
  stock: 'In stock',
  tone: 'primary',
  kind: 'merch',
}

describe('RewardCard', () => {
  it('renders the reward title', () => {
    render(<RewardCard r={reward} persona={{ xp: 1000 }} onRedeem={vi.fn()} />)
    expect(screen.getByText('Branded T-Shirt')).toBeInTheDocument()
  })

  it('renders the reward kind', () => {
    render(<RewardCard r={reward} persona={{ xp: 1000 }} onRedeem={vi.fn()} />)
    expect(screen.getByText('merch')).toBeInTheDocument()
  })

  it('renders the stock indicator', () => {
    render(<RewardCard r={reward} persona={{ xp: 1000 }} onRedeem={vi.fn()} />)
    expect(screen.getByText('In stock')).toBeInTheDocument()
  })

  it('shows Redeem when user can afford', () => {
    render(<RewardCard r={reward} persona={{ xp: 1000 }} onRedeem={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Redeem' })).toBeEnabled()
  })

  it('shows Locked and disables button when user cannot afford', () => {
    render(<RewardCard r={reward} persona={{ xp: 100 }} onRedeem={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Locked' })).toBeDisabled()
  })

  it('calls onRedeem with the reward when Redeem is clicked', () => {
    const onRedeem = vi.fn()
    render(<RewardCard r={reward} persona={{ xp: 1000 }} onRedeem={onRedeem} />)
    fireEvent.click(screen.getByRole('button', { name: 'Redeem' }))
    expect(onRedeem).toHaveBeenCalledWith(reward)
  })

  it('renders LIMITED tag for limited rewards', () => {
    render(
      <RewardCard r={{ ...reward, limited: true }} persona={{ xp: 1000 }} onRedeem={vi.fn()} />
    )
    expect(screen.getByText('LIMITED')).toBeInTheDocument()
  })

  it('placeholder box uses the primary contrast token for primary-tone rewards', () => {
    render(<RewardCard r={reward} persona={{ xp: 1000 }} onRedeem={vi.fn()} />)
    const box = screen.getByText('merc') // r.kind.slice(0,4)
    const style = box.getAttribute('style') ?? ''
    expect(style).toContain('var(--on-primary)')
    expect(style).not.toContain('on-secondary')
  })

  it('placeholder box uses the secondary contrast token for secondary-tone rewards', () => {
    render(
      <RewardCard r={{ ...reward, tone: 'secondary' }} persona={{ xp: 1000 }} onRedeem={vi.fn()} />
    )
    const box = screen.getByText('merc')
    expect(box.getAttribute('style')).toContain('var(--on-secondary, var(--on-primary))')
  })

  it('renders image when imageUrl is provided', () => {
    render(
      <RewardCard
        r={{ ...reward, imageUrl: 'https://example.com/img.jpg' }}
        persona={{ xp: 1000 }}
        onRedeem={vi.fn()}
      />
    )
    expect(screen.getByRole('img', { name: 'Branded T-Shirt' })).toBeInTheDocument()
  })
})
