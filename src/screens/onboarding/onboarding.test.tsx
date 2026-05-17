import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithBrand } from '../../test/renderWithBrand'
import { DEFAULT_CONFIG } from '../../config/defaults'
import type { BrandConfig } from '../../config/schema'
import OnboardingScreen from './onboarding'

const withStats = (stats: { key: string; value: string }[]): BrandConfig => ({
  ...DEFAULT_CONFIG,
  content: { onboarding: { stats } },
})

const renderOnboarding = (config: BrandConfig) =>
  renderWithBrand(<OnboardingScreen onEnter={() => {}} heroStyle="" />, config)

afterEach(() => {
  vi.restoreAllMocks()
})

describe('OnboardingScreen — stat tiles', () => {
  it('does not emit a duplicate-key warning when stats share/blank their key', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    // Mirrors what the configurator's "+ Add" produces: blank ({key:''}) stats.
    renderOnboarding(
      withStats([
        { key: '', value: 'Alpha' },
        { key: '', value: 'Beta' },
      ])
    )
    const keyWarning = err.mock.calls.find((args) =>
      args.some((a) => typeof a === 'string' && /unique "key" prop/.test(a))
    )
    expect(keyWarning).toBeUndefined()
  })

  it('renders every stat tile even when keys collide', () => {
    renderOnboarding(
      withStats([
        { key: '', value: 'Alpha' },
        { key: '', value: 'Beta' },
      ])
    )
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('a malformed string stat item does not trigger a missing-key warning (index-key hardening)', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    // Simulates the pre-fix corruption shape reaching render defensively.
    renderOnboarding(withStats(['' as unknown as { key: string; value: string }]))
    const keyWarning = err.mock.calls.find((args) =>
      args.some((a) => typeof a === 'string' && /unique "key" prop/.test(a))
    )
    expect(keyWarning).toBeUndefined()
  })

  it('renders the default stats unchanged', () => {
    renderOnboarding(DEFAULT_CONFIG)
    expect(screen.getByText('XP')).toBeInTheDocument()
    expect(screen.getByText('Tiers')).toBeInTheDocument()
    expect(screen.getByText('Drops')).toBeInTheDocument()
    expect(screen.getByText('4 ranks')).toBeInTheDocument()
  })
})

describe('OnboardingScreen — design-config wiring (characterization)', () => {
  // Locked across the inline-style → Tailwind-class refactor: the recipe
  // tokens must remain present in the markup (style attr today, className
  // after). Green before AND after — proves the refactor preserves wiring.
  it('wires every onboardingCard recipe surface to its CSS var', () => {
    const { container } = renderWithBrand(
      <OnboardingScreen onEnter={() => {}} heroStyle="" />,
      DEFAULT_CONFIG
    )
    const html = container.innerHTML
    for (const token of [
      'var(--onboarding-card-bg)',
      'var(--onboarding-card-border)',
      'var(--onboarding-card-hero-bg)',
      'var(--onboarding-card-title)',
      'var(--onboarding-card-body)',
      'var(--onboarding-card-brand-emphasis)',
      'var(--onboarding-card-stat-bg)',
      'var(--onboarding-card-stat-border)',
      'var(--onboarding-card-link)',
    ]) {
      expect(html).toContain(token)
    }
  })
})
