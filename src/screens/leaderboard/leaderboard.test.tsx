import { describe, it, expect } from 'vitest'
import { renderWithBrand } from '../../test/renderWithBrand'
import { DEFAULT_CONFIG } from '../../config/defaults'
import LeaderboardScreen from './leaderboard'
import type { Persona } from '../../types'

const persona: Persona = {
  handle: 'alpha',
  xp: 9840,
  missionsDone: 7,
  rewardsClaimed: 2,
  streak: 12,
  tier: 'Voyager',
  ready: 0,
}

describe('LeaderboardScreen — header is tenant-themeable', () => {
  it('wires the eyebrow / title / subtitle to the leaderboardHeader recipe', () => {
    const { container } = renderWithBrand(<LeaderboardScreen persona={persona} />, DEFAULT_CONFIG)
    const html = container.innerHTML
    expect(html).toContain('var(--leaderboard-eyebrow)')
    expect(html).toContain('var(--leaderboard-eyebrow-dot)')
    expect(html).toContain('var(--leaderboard-title)')
    expect(html).toContain('var(--leaderboard-subtitle)')
  })

  it('does not pin the title/subtitle to the generic ink utilities', () => {
    const { container } = renderWithBrand(<LeaderboardScreen persona={persona} />, DEFAULT_CONFIG)
    const h1 = container.querySelector('h1')
    expect(h1?.className ?? '').toContain('var(--leaderboard-title)')
  })
})
