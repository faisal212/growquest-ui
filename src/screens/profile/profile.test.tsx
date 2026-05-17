import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ProfileScreen from './profile'
import { BrandProvider, DEFAULT_CONFIG } from '../../config'
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

const renderProfile = () =>
  render(
    <BrandProvider value={DEFAULT_CONFIG}>
      <ProfileScreen persona={persona} />
    </BrandProvider>
  )

describe('ProfileScreen — design-config wiring', () => {
  it('themes the identity/section surfaces via the profileCard recipe, not the global palette', () => {
    const { container } = renderProfile()
    const html = container.innerHTML
    expect(html).toContain('var(--profile-card-bg)')
    expect(html).toContain('var(--profile-card-border)')
  })

  it('themes the handle + wallet line via the profileCard recipe', () => {
    const { container } = renderProfile()
    const html = container.innerHTML
    expect(html).toContain('var(--profile-card-title)')
    expect(html).toContain('var(--profile-card-wallet)')
  })

  it('themes the stat-tile surfaces via the profileCard stat recipe', () => {
    const { container } = renderProfile()
    const html = container.innerHTML
    expect(html).toContain('var(--profile-card-stat-bg)')
    expect(html).toContain('var(--profile-card-stat-border)')
  })

  it('does not pin Profile surfaces to the generic .panel utility', () => {
    const { container } = renderProfile()
    // The identity card, activity panel, badge + tier wrappers must not be
    // .panel (= var(--panel)); they must follow the configurable recipe.
    expect(container.querySelectorAll('.panel').length).toBe(0)
  })
})
