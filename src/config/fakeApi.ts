import type { BrandConfig } from './schema'

/**
 * Hardcoded tenant configs for the Next.js demo. Served via
 * app/api/brand/[tenantId]/route.ts. Real backend swaps this for a KV/Postgres
 * lookup behind the same HTTP shape.
 */
export const TENANTS: Record<string, BrandConfig> = {
  default: {
    schemaVersion: 1,
    tenantId: 'default',
    mode: 'dark',
    brand: {
      primary: 'oklch(0.86 0.18 200)',
      secondary: 'oklch(0.72 0.25 340)',
    },
  },

  acme: {
    schemaVersion: 1,
    tenantId: 'acme',
    mode: 'light',
    brand: {
      primary: '#FF8C00',
      secondary: '#2DACA9',
    },
    logos: {
      nav: '/logos/acme.svg',
    },
    content: {
      missions: {
        sectionTitle: 'Acme Quests',
        sectionEyebrow: '// acme campaign',
        rewardsTitle: 'Acme rewards',
      },
    },
    overrides: {
      missionCard: {
        surface: '#FFFFFF',
        border: '#FF8C00',
        ctaFg: '#FFFFFF',
      },
      missionModal: {
        closeBg: '#FF8C00',
        closeIcon: '#FFFFFF',
      },
      tones: {
        accent: '#FF8C00',
      },
    },
  },

  globex: {
    schemaVersion: 1,
    tenantId: 'globex',
    mode: 'dark',
    brand: {
      primary: 'oklch(0.72 0.25 340)',
      secondary: 'oklch(0.83 0.18 75)',
    },
    content: {
      missions: {
        sectionTitle: 'Globex objectives',
      },
    },
  },

  // Override-heavy tenant used by scripts/loud-smoke.mjs to visually verify
  // that every Tier 1 copy key and Tier 2 visual recipe flows end-to-end.
  loud: {
    schemaVersion: 1,
    tenantId: 'loud',
    mode: 'dark',
    brand: { primary: '#FF8C00', secondary: '#2DACA9' },
    content: {
      brand: { name: 'LoudCo', version: 'v9.9', tagline: 'maximum vibes' },
      nav: { missions: 'Quests', leaderboard: 'Ranks', profile: 'Me' },
      footer: {
        terms: 'Legal',
        privacy: 'Privacy',
        changelog: 'Updates',
        poweredByPrefix: 'Brought to you by',
      },
      onboarding: {
        eyebrow: '// loud · step one of many',
        titleLead: 'Join the',
        titleBrand: 'LoudCo',
        titleTrail: 'movement.',
        body: 'Loud body copy. Different vibes entirely.',
        stats: [
          { key: 'POINTS', value: 'Hourly' },
          { key: 'Ranks', value: '9 ranks' },
          { key: 'Drops', value: 'Daily' },
        ],
        emailLabel: 'your email',
        emailPlaceholder: 'name@loud.co',
        cta: 'Go loud',
        microcopyLeft: '// loud microcopy',
        microcopyRight: 'SSO yes',
        chipPrimary: 'LOUD · ALPHA',
        chipSecondary: 'LAUNCH COHORT',
      },
      leaderboard: {
        eyebrow: '// loud leaderboard',
        title: 'The summit',
        subtitle: 'Loud subtitle here',
        columns: { rank: '#', insider: 'who', streak: 'fire', tier: 'rank', xp: 'pts' },
        streakEmoji: '⚡',
        youTag: 'ME',
      },
      profile: {
        joinedTag: '{month}/{year}',
        walletLine: '{handle} @ {wallet}',
        activityEyebrow: '// loud activity',
        xpChartEyebrow: '// loud chart',
        statLabels: { totalXP: 'POINTS', missions: 'QUESTS', streak: 'STREAK', rewards: 'PRIZES' },
        badgesEyebrow: 'achievements',
        badgeUnlocked: 'WON',
        badgeLocked: 'WIP',
        tierLadderEyebrow: '// loud ladder',
        tierLabelPrefix: 'rank',
        tierXPSuffix: ' pts',
      },
      missions: {
        heroEyebrow: '// loud hero',
        heroTitle: 'Loud Path',
        heroSubtitle: 'A different subtitle',
        filterLabels: { all: 'ALL', new: 'FRESH', ongoing: 'WIP', ready: 'DONE' },
      },
    },
    overrides: {
      onboardingCard: {
        surface: '#1a0e00',
        heroBg: '#0a0500',
        statTileBg: '#2a1500',
        brandEmphasis: '#FF8C00',
        linkColor: '#FF8C00',
      },
      topNav: {
        surface: 'rgba(20,10,0,0.85)',
        border: '#FF8C00',
        linkColor: '#aa6600',
        linkColorActive: '#FF8C00',
        linkBgActive: 'rgba(255,140,0,0.15)',
      },
      footer: {
        border: '#FF8C00',
        textColor: '#aa6600',
        brandColor: '#FF8C00',
      },
      heroBanner: {
        surface: '#0a0500',
        border: '#FF8C00',
        overlayGradient: 'linear-gradient(180deg, transparent 30%, rgba(20,10,0,0.95) 100%)',
      },
      tierLadder: { currentMixPercent: 40, lockedOpacity: 0.2, surface: '#1a0e00' },
      badgeGrid: {
        surface: '#1a0e00',
        border: '#FF8C00',
        unlockedTones: ['#FF8C00', '#FFD700', '#FF1493'],
        lockedFg: '#3a2500',
      },
      podium: {
        rankColors: { '1': '#FFD700', '2': '#C0C0C0', '3': '#CD7F32' },
        platformHeights: { '1': 200, '2': 140, '3': 100 },
      },
      statCard: { trendDefault: '#FF8C00', trendStreak: '#FFD700', trendRewards: '#FF1493' },
      xpChart: { gradientFrom: '#FF8C00', gradientTo: '#FFD700' },
      leaderboardRow: {
        tierTones: {
          Oracle: 'amber',
          Ascendant: 'magenta',
          Voyager: 'lime',
          Scout: 'accent',
        },
      },
      tones: { accent: '#FF8C00', lime: '#2DACA9', magenta: '#FF1493', amber: '#FFD700' },
    },
    assets: {
      onboardingHero: { src: '/test-assets/loud-onboarding-hero.png', type: 'IMG' },
      missionsHero: { src: '/test-assets/loud-missions-hero.png', type: 'IMG' },
    },
  },
}

/** Resolve a tenantId to its config. Unknown tenants fall back to `default`. */
export function getTenantConfig(tenantId: string): BrandConfig {
  return TENANTS[tenantId] ?? TENANTS.default
}
