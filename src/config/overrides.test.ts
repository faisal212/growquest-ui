import { describe, it, expect } from 'vitest'
import { deriveTokens } from './tokens'

const BASE = { mode: 'dark' as const, brand: { primary: '#FF8C00' } }

describe('deriveTokens — per-component overrides', () => {
  it('emits component-scoped + tone defaults unconditionally', () => {
    // BrandStyles is the single source of truth for these vars — Tailwind v4
    // drops them from styles.css :root, so they must always land in the
    // server-rendered <style> block.
    const tokens = deriveTokens(BASE)
    expect(tokens['--mission-card-bg']).toBe('var(--panel)')
    expect(tokens['--mission-card-halo-opacity']).toBe('0.25')
    expect(tokens['--mission-card-cta-fg']).toBe('#05060A')
    expect(tokens['--mission-modal-bg']).toBe('var(--panel)')
    expect(tokens['--reward-card-bg']).toBe('var(--panel)')
    expect(tokens['--profile-card-bg']).toBe('var(--panel)')
    expect(tokens['--leaderboard-mine-bg']).toBe('var(--color-primary-soft)')
    expect(tokens['--tone-accent']).toBe('var(--accent-cyan)')
    expect(tokens['--tone-lime']).toBe('var(--accent-lime)')
    expect(tokens['--tone-magenta']).toBe('var(--accent-magenta)')
    expect(tokens['--tone-amber']).toBe('var(--accent-amber)')
  })

  it('emits MissionCard slots when missionCard override is supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        missionCard: {
          panel: '#1A0E00',
          border: '#FF8C00',
          ctaFg: '#FFFFFF',
          haloOpacity: 0.5,
        },
      },
    })
    expect(tokens['--mission-card-bg']).toBe('#1A0E00')
    expect(tokens['--mission-card-border']).toBe('#FF8C00')
    expect(tokens['--mission-card-cta-fg']).toBe('#FFFFFF')
    expect(tokens['--mission-card-halo-opacity']).toBe('0.5')
  })

  it('iconBoxBg shorthand falls back to panel2', () => {
    const fromExplicit = deriveTokens({
      ...BASE,
      overrides: { missionCard: { iconBoxBg: '#111' } },
    })
    const fromPanel2 = deriveTokens({
      ...BASE,
      overrides: { missionCard: { panel2: '#222' } },
    })
    expect(fromExplicit['--mission-card-icon-bg']).toBe('#111')
    expect(fromPanel2['--mission-card-icon-bg']).toBe('#222')
  })

  it('emits MissionModal slots independently', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        missionModal: {
          backdrop: 'rgba(50,0,0,0.7)',
          panel: '#000',
          closeBg: '#FF8C00',
          closeIcon: '#FFFFFF',
        },
      },
    })
    expect(tokens['--mission-modal-backdrop']).toBe('rgba(50,0,0,0.7)')
    expect(tokens['--mission-modal-bg']).toBe('#000')
    expect(tokens['--mission-modal-close-bg']).toBe('#FF8C00')
    expect(tokens['--mission-modal-close-icon']).toBe('#FFFFFF')
  })

  it('emits RewardCard slots', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        rewardCard: { panel: '#111', imageArea: '#222', title: '#FFF' },
      },
    })
    expect(tokens['--reward-card-bg']).toBe('#111')
    expect(tokens['--reward-card-image-bg']).toBe('#222')
    expect(tokens['--reward-card-title']).toBe('#FFF')
  })

  it('emits ProfileCard slots', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        profileCard: { panel: '#111', statBg: '#222', walletColor: '#888' },
      },
    })
    expect(tokens['--profile-card-bg']).toBe('#111')
    expect(tokens['--profile-card-stat-bg']).toBe('#222')
    expect(tokens['--profile-card-wallet']).toBe('#888')
  })

  it('emits LeaderboardRow slots including mine highlight', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        leaderboardRow: {
          mineHighlight: '#FF8C0030',
          topRankColor: '#FFD700',
          headText: '#888',
        },
      },
    })
    expect(tokens['--leaderboard-mine-bg']).toBe('#FF8C0030')
    expect(tokens['--leaderboard-top-rank']).toBe('#FFD700')
    expect(tokens['--leaderboard-head-text']).toBe('#888')
  })

  it('emits Tier 2 fallback vars unconditionally', () => {
    const tokens = deriveTokens(BASE)
    expect(tokens['--onboarding-card-bg']).toBe('var(--panel)')
    expect(tokens['--onboarding-card-brand-emphasis']).toBe('var(--color-primary)')
    expect(tokens['--topnav-link']).toBe('var(--ink-dim)')
    expect(tokens['--footer-text']).toBe('var(--ink-faint)')
    expect(tokens['--hero-banner-bg']).toBe('var(--bg-2)')
    expect(tokens['--tier-ladder-current-mix']).toBe('12%')
    expect(tokens['--tier-ladder-locked-opacity']).toBe('0.5')
    expect(tokens['--badge-grid-bg']).toBe('var(--panel-2)')
    expect(tokens['--stat-card-trend-default']).toBe('var(--color-primary)')
    expect(tokens['--stat-card-trend-streak']).toBe('var(--accent-amber)')
    expect(tokens['--xp-chart-gradient-from']).toBe('var(--color-primary)')
    expect(tokens['--xp-chart-gradient-to']).toBe('var(--accent-magenta)')
  })

  it('emits onboardingCard slots when supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        onboardingCard: {
          panel: '#FFFFFF',
          heroBg: '#0B0D14',
          statTileBg: '#F9F8F4',
          brandEmphasis: '#FF8C00',
          linkColor: '#FF8C00',
        },
      },
    })
    expect(tokens['--onboarding-card-bg']).toBe('#FFFFFF')
    expect(tokens['--onboarding-card-hero-bg']).toBe('#0B0D14')
    expect(tokens['--onboarding-card-stat-bg']).toBe('#F9F8F4')
    expect(tokens['--onboarding-card-brand-emphasis']).toBe('#FF8C00')
    expect(tokens['--onboarding-card-link']).toBe('#FF8C00')
  })

  it('onboardingCard.statTileBg falls back to panel2', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: { onboardingCard: { panel2: '#ABC' } },
    })
    expect(tokens['--onboarding-card-stat-bg']).toBe('#ABC')
  })

  it('emits topNav slots when supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        topNav: {
          panel: '#000',
          linkColor: '#888',
          linkColorActive: '#FF8C00',
          linkBgActive: '#FF8C0010',
        },
      },
    })
    expect(tokens['--topnav-bg']).toBe('#000')
    expect(tokens['--topnav-link']).toBe('#888')
    expect(tokens['--topnav-link-active']).toBe('#FF8C00')
    expect(tokens['--topnav-link-bg-active']).toBe('#FF8C0010')
  })

  it('emits footer slots when supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        footer: { panel: '#111', textColor: '#888', brandColor: '#FF8C00' },
      },
    })
    expect(tokens['--footer-bg']).toBe('#111')
    expect(tokens['--footer-text']).toBe('#888')
    expect(tokens['--footer-brand']).toBe('#FF8C00')
  })

  it('emits heroBanner slots when supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        heroBanner: {
          panel: '#0B0D14',
          border: '#FF8C00',
          overlayGradient: 'linear-gradient(180deg, transparent, #000)',
        },
      },
    })
    expect(tokens['--hero-banner-bg']).toBe('#0B0D14')
    expect(tokens['--hero-banner-border']).toBe('#FF8C00')
    expect(tokens['--hero-banner-overlay']).toBe('linear-gradient(180deg, transparent, #000)')
  })

  it('tierLadder clamps mix and opacity values', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        tierLadder: { currentMixPercent: 150, lockedOpacity: -0.5, panel: '#ABC' },
      },
    })
    expect(tokens['--tier-ladder-current-mix']).toBe('100%')
    expect(tokens['--tier-ladder-locked-opacity']).toBe('0')
    expect(tokens['--tier-ladder-panel']).toBe('#ABC')
  })

  it('emits statCard trend colors when supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        statCard: { trendDefault: '#111', trendStreak: '#222', trendRewards: '#333' },
      },
    })
    expect(tokens['--stat-card-trend-default']).toBe('#111')
    expect(tokens['--stat-card-trend-streak']).toBe('#222')
    expect(tokens['--stat-card-trend-rewards']).toBe('#333')
  })

  it('emits xpChart gradient when supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: { xpChart: { gradientFrom: '#FF8C00', gradientTo: '#FF1493' } },
    })
    expect(tokens['--xp-chart-gradient-from']).toBe('#FF8C00')
    expect(tokens['--xp-chart-gradient-to']).toBe('#FF1493')
  })

  it('emits badgeGrid panel + lockedFg when supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: { badgeGrid: { panel: '#111', border: '#222', lockedFg: '#555' } },
    })
    expect(tokens['--badge-grid-bg']).toBe('#111')
    expect(tokens['--badge-grid-border']).toBe('#222')
    expect(tokens['--badge-grid-locked-fg']).toBe('#555')
  })
})
