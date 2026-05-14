import { describe, it, expect } from 'vitest'
import { deriveTokens } from './tokens'

const BASE = { mode: 'dark' as const, brand: { primary: '#FF8C00' } }

describe('deriveTokens — per-component overrides', () => {
  it('emits component-scoped + tone defaults unconditionally', () => {
    // BrandStyles is the single source of truth for these vars — Tailwind v4
    // drops them from styles.css :root, so they must always land in the
    // server-rendered <style> block.
    const tokens = deriveTokens(BASE)
    expect(tokens['--mission-tile-bg']).toBe('var(--panel)')
    expect(tokens['--mission-tile-halo-opacity']).toBe('0.25')
    expect(tokens['--mission-tile-cta-fg']).toBe('#05060A')
    expect(tokens['--mission-modal-bg']).toBe('var(--panel)')
    expect(tokens['--reward-card-bg']).toBe('var(--panel)')
    expect(tokens['--profile-card-bg']).toBe('var(--panel)')
    expect(tokens['--leaderboard-mine-bg']).toBe('var(--color-primary-soft)')
    expect(tokens['--tone-accent']).toBe('var(--accent-cyan)')
    expect(tokens['--tone-lime']).toBe('var(--accent-lime)')
    expect(tokens['--tone-magenta']).toBe('var(--accent-magenta)')
    expect(tokens['--tone-amber']).toBe('var(--accent-amber)')
  })

  it('emits MissionTile slots when missionTile override is supplied', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        missionTile: {
          surface: '#1A0E00',
          border: '#FF8C00',
          ctaFg: '#FFFFFF',
          haloOpacity: 0.5,
        },
      },
    })
    expect(tokens['--mission-tile-bg']).toBe('#1A0E00')
    expect(tokens['--mission-tile-border']).toBe('#FF8C00')
    expect(tokens['--mission-tile-cta-fg']).toBe('#FFFFFF')
    expect(tokens['--mission-tile-halo-opacity']).toBe('0.5')
  })

  it('iconBoxBg shorthand falls back to surface2', () => {
    const fromExplicit = deriveTokens({
      ...BASE,
      overrides: { missionTile: { iconBoxBg: '#111' } },
    })
    const fromSurface2 = deriveTokens({
      ...BASE,
      overrides: { missionTile: { surface2: '#222' } },
    })
    expect(fromExplicit['--mission-tile-icon-bg']).toBe('#111')
    expect(fromSurface2['--mission-tile-icon-bg']).toBe('#222')
  })

  it('emits MissionModal slots independently', () => {
    const tokens = deriveTokens({
      ...BASE,
      overrides: {
        missionModal: {
          backdrop: 'rgba(50,0,0,0.7)',
          surface: '#000',
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
        rewardCard: { surface: '#111', imageArea: '#222', title: '#FFF' },
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
        profileCard: { surface: '#111', statBg: '#222', walletColor: '#888' },
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
})
