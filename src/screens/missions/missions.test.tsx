import { describe, it, expect, vi } from 'vitest'
import { renderWithBrand } from '../../test/renderWithBrand'
import { DEFAULT_CONFIG } from '../../config/defaults'
import MissionsScreen from './missions'
import type { Persona } from '../../types'

const persona: Persona = {
  handle: 'alpha',
  xp: 9840,
  missionsDone: 7,
  rewardsClaimed: 2,
  streak: 12,
  tier: 'Voyager',
  ready: 2,
}

const renderMissions = () =>
  renderWithBrand(
    <MissionsScreen persona={persona} onClaim={vi.fn()} onRedeem={vi.fn()} />,
    DEFAULT_CONFIG
  )

describe('MissionsScreen — desktop two-column layout', () => {
  it('lays missions and rewards in a 2.2fr/1fr two-column grid', () => {
    const { container } = renderMissions()
    const html = container.innerHTML
    expect(html).toContain('grid-cols-[minmax(0,2.2fr)_minmax(300px,1fr)]')
  })

  it('shows the mission grid at 3 per row on desktop', () => {
    const { container } = renderMissions()
    const card = container.querySelector('.mission-card')
    expect(card).not.toBeNull()
    // The mission grid (the card's parent) is the 3-up grid at desktop.
    expect(card!.parentElement!.className).toContain('grid-cols-3')
  })

  it('does not pin either column — both flow with the page on desktop', () => {
    const { container } = renderMissions()
    const missionsCol = container.querySelector('.mission-card')!.closest('.min-w-0')!
    const rewardsCol = container.querySelector('[class*="reward-card-bg"]')!.closest('.min-w-0')!
    expect(missionsCol).not.toBeNull()
    expect(rewardsCol).not.toBeNull()
    expect(missionsCol.className).not.toContain('lg:sticky')
    expect(rewardsCol.className).not.toContain('lg:sticky')
  })

  it('shows the rewards rail at 2 per row on desktop', () => {
    const { container } = renderMissions()
    const reward = container.querySelector('[class*="reward-card-bg"]')
    expect(reward).not.toBeNull()
    // The reward grid is the card's parent.
    expect(reward!.parentElement!.className).toContain('grid-cols-2')
  })

  it('still renders both the missions and rewards sections', () => {
    const { container } = renderMissions()
    expect(container.querySelectorAll('.mission-card').length).toBeGreaterThan(0)
    // Rewards marketplace renders RewardCard "Redeem"/"Locked" CTAs.
    expect(container.textContent ?? '').toMatch(/Redeem|Locked/)
  })
})
