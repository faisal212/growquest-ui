import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrandProvider } from './BrandProvider'
import { useContent } from './content'
import { DEFAULT_CONFIG } from './defaults'
import { renderWithBrand } from '../test/renderWithBrand'

describe('useContent', () => {
  it('returns the default value for a known path', () => {
    function Probe() {
      return <span>{useContent<string>('missions.sectionTitle')}</span>
    }
    renderWithBrand(<Probe />)
    expect(screen.getByText('Daily quests')).toBeInTheDocument()
  })

  it('overrides resolve when supplied via BrandProvider value', () => {
    function Title() {
      return <span data-testid="title">{useContent<string>('missions.sectionTitle')}</span>
    }
    render(
      <BrandProvider
        value={{
          ...DEFAULT_CONFIG,
          content: { missions: { sectionTitle: 'Acme Quests' } },
        }}
      >
        <Title />
      </BrandProvider>
    )
    expect(screen.getByTestId('title').textContent).toBe('Acme Quests')
  })

  it('falls back to default when no provider is present', () => {
    function Probe() {
      return <span data-testid="missing">{useContent<string>('missions.sectionTitle')}</span>
    }
    render(<Probe />)
    expect(screen.getByTestId('missing').textContent).toBe('Daily quests')
  })

  it('returns empty string for an unknown path', () => {
    function Probe() {
      return <span data-testid="missing">{useContent<string>('nope.does.not.exist')}</span>
    }
    renderWithBrand(<Probe />)
    expect(screen.getByTestId('missing').textContent).toBe('')
  })

  it('exposes defaults for every Tier 1 section', () => {
    function Probe() {
      return (
        <>
          <span data-testid="brand">{useContent<string>('brand.name')}</span>
          <span data-testid="nav">{useContent<string>('nav.missions')}</span>
          <span data-testid="footer">{useContent<string>('footer.terms')}</span>
          <span data-testid="onboarding">{useContent<string>('onboarding.cta')}</span>
          <span data-testid="leaderboard">{useContent<string>('leaderboard.title')}</span>
          <span data-testid="profile">{useContent<string>('profile.activityEyebrow')}</span>
          <span data-testid="missions-hero">{useContent<string>('missions.heroTitle')}</span>
        </>
      )
    }
    renderWithBrand(<Probe />)
    expect(screen.getByTestId('brand').textContent).toBe('GrowQuest')
    expect(screen.getByTestId('nav').textContent).toBe('Missions')
    expect(screen.getByTestId('footer').textContent).toBe('Terms of Service')
    expect(screen.getByTestId('onboarding').textContent).toBe('Enter the quest')
    expect(screen.getByTestId('leaderboard').textContent).toBe('The ascent')
    expect(screen.getByTestId('profile').textContent).toBe('// activity')
    expect(screen.getByTestId('missions-hero').textContent).toBe("Founders' Path")
  })

  it('partial section overrides fall back to defaults for unset keys', () => {
    function Probe() {
      return (
        <>
          <span data-testid="overridden">{useContent<string>('profile.activityEyebrow')}</span>
          <span data-testid="default">{useContent<string>('profile.xpChartEyebrow')}</span>
        </>
      )
    }
    render(
      <BrandProvider
        value={{
          ...DEFAULT_CONFIG,
          content: { profile: { activityEyebrow: '// vibes' } },
        }}
      >
        <Probe />
      </BrandProvider>
    )
    expect(screen.getByTestId('overridden').textContent).toBe('// vibes')
    expect(screen.getByTestId('default').textContent).toBe('// xp over 14 days')
  })
})
