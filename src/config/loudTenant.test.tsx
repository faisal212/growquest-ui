import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import OnboardingScreen from '../screens/onboarding'
import LeaderboardScreen from '../screens/leaderboard'
import { HeroBanner } from '../components/HeroBanner'
import { TENANTS } from './fakeApi'
import { renderWithBrand } from '../test/renderWithBrand'

const LOUD = TENANTS.loud

describe('Loud-tenant flow — Tier 1 + Tier 2 visual smoke', () => {
  it('renders onboarding copy from the loud tenant content map', () => {
    renderWithBrand(<OnboardingScreen heroStyle="iso-cube" onEnter={() => {}} />, LOUD)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain('Join the')
    expect(h1.textContent).toContain('LoudCo')
    expect(h1.textContent).toContain('movement.')
    expect(screen.getByText('Loud body copy. Different vibes entirely.')).toBeInTheDocument()
    // Decorative chips are intentionally hidden when onboardingHero is supplied;
    // the asset-render test below validates that suppression separately.
    expect(screen.getByText('your email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('name@loud.co')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Go loud/ })).toBeInTheDocument()
    expect(screen.getByText('// loud microcopy')).toBeInTheDocument()
    expect(screen.getByText('SSO yes')).toBeInTheDocument()
    // Stat tile values
    expect(screen.getByText('POINTS')).toBeInTheDocument()
    expect(screen.getByText('Hourly')).toBeInTheDocument()
    expect(screen.getByText('9 ranks')).toBeInTheDocument()
  })

  it('renders the tenant-supplied onboardingHero image and hides the chip row', () => {
    renderWithBrand(<OnboardingScreen heroStyle="iso-cube" onEnter={() => {}} />, LOUD)

    const img = screen.getByRole('img', { name: /Join the LoudCo movement/ })
    expect(img).toHaveAttribute('src', '/test-assets/loud-onboarding-hero.png')
    // Decorative chips suppressed when an image is supplied.
    expect(screen.queryByText('LOUD · ALPHA')).not.toBeInTheDocument()
    expect(screen.queryByText('LAUNCH COHORT')).not.toBeInTheDocument()
  })

  it('renders the tenant-supplied missionsHero image and hides the visible overlay (overlayMode: never)', () => {
    const { container } = renderWithBrand(
      <HeroBanner heroStyle="iso-cube" title="Loud Path" />,
      LOUD
    )

    const img = screen.getByRole('img', { name: 'Loud Path' })
    expect(img).toHaveAttribute('src', '/test-assets/loud-missions-hero.png')
    // The loud tenant sets overlayMode: 'never' — no visible content container or eyebrow.
    expect(container.querySelector('.hero-banner-content')).toBeNull()
    // The h2 stays in DOM as sr-only so the heading semantic is preserved.
    const title = screen.getByText('Loud Path')
    expect(title.tagName).toBe('H2')
    expect(title).toHaveClass('sr-only')
  })

  it('renders leaderboard copy + column labels from the loud tenant', () => {
    renderWithBrand(
      <LeaderboardScreen persona={{ handle: 'me', xp: 9840, tier: 'Voyager' } as never} />,
      LOUD
    )

    expect(screen.getByText('// loud leaderboard')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('The summit')
    expect(screen.getByText('Loud subtitle here')).toBeInTheDocument()
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('who')).toBeInTheDocument()
    expect(screen.getByText('fire')).toBeInTheDocument()
    expect(screen.getByText('pts')).toBeInTheDocument()
  })
})
