import type { BrandConfig, ContentMap, SurfacePalette, Mode } from './schema'

/** Per-mode surface/ink palette. Matches the values currently in styles.css. */
export const SURFACES: Record<Mode, SurfacePalette> = {
  dark: {
    surface: '#0E1018',
    surface2: '#141722',
    surface3: '#1A1E2C',
    surfaceHover: '#1A1E2C',
    onSurface: '#E8EBF2',
    onSurfaceDim: '#8B93A7',
    onSurfaceFaint: '#555C6E',
    border: 'oklch(0.28 0.015 270)',
    borderStrong: 'oklch(0.38 0.02 270)',
  },
  light: {
    surface: '#FFFFFF',
    surface2: '#F9F8F4',
    surface3: '#F0EFE9',
    surfaceHover: '#F0EFE9',
    onSurface: '#0A0B10',
    onSurfaceDim: '#5A6275',
    onSurfaceFaint: '#9099AA',
    border: 'oklch(0.88 0.006 270)',
    borderStrong: 'oklch(0.78 0.01 270)',
  },
}

export const DEFAULT_CONTENT: ContentMap = {
  brand: {
    name: 'GrowQuest',
    version: 'v1.4',
    tagline: 'multi-tenant growth OS',
  },
  nav: {
    missions: 'Missions',
    leaderboard: 'Leaderboard',
    profile: 'Profile',
  },
  footer: {
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    changelog: 'Changelog',
    poweredByPrefix: 'Powered by',
  },
  onboarding: {
    eyebrow: '// onboarding · step 1 / 3',
    titleLead: 'Become a',
    titleBrand: '',
    titleTrail: 'insider.',
    body: 'Unlock exclusive perks, shape the roadmap, and earn XP toward rewards. Daily missions, limited drops, and a spin-to-win lootbox — yours when you join.',
    stats: [
      { key: 'XP', value: 'Daily' },
      { key: 'Tiers', value: '4 ranks' },
      { key: 'Drops', value: 'Weekly' },
    ],
    emailLabel: 'work email',
    emailPlaceholder: 'you@company.com',
    consent: 'I agree to the {terms} and acknowledge the {privacy}.',
    consentTermsLabel: 'Terms',
    consentPrivacyLabel: 'Privacy Policy',
    cta: 'Enter the quest',
    microcopyLeft: '// 2,481 insiders joined this week',
    microcopyRight: 'SSO · SAML ok',
    chipPrimary: 'QUEST · 01 OPEN',
    chipSecondary: 'FOUNDERS COHORT',
  },
  leaderboard: {
    eyebrow: '// season 04 leaderboard',
    title: 'The ascent',
    subtitle: 'Season resets in 12 days · top 10 receive Oracle airdrop',
    columns: {
      rank: 'rank',
      insider: 'insider',
      streak: 'streak',
      tier: 'tier',
      xp: 'xp',
    },
    streakEmoji: '🔥',
    youTag: 'YOU',
  },
  profile: {
    joinedTag: 'JOINED · {month} {year}',
    walletLine: '{wallet} · {handle}',
    activityEyebrow: '// activity',
    xpChartEyebrow: '// xp over 14 days',
    statLabels: {
      totalXP: 'Total XP',
      missions: 'Missions',
      streak: 'Streak',
      rewards: 'Rewards',
    },
    badgesEyebrow: 'badges',
    badgeUnlocked: 'unlocked',
    badgeLocked: 'locked',
    tierLadderEyebrow: '// tier ladder',
    tierLabelPrefix: 'tier',
    tierXPSuffix: '+ XP',
  },
  missions: {
    sectionEyebrow: '// missions',
    sectionTitle: 'Daily quests',
    rewardsEyebrow: '// rewards marketplace',
    rewardsTitle: 'Spend your XP',
    rewardsBalance: 'balance',
    heroEyebrow: '// current season · week 04',
    heroTitle: "Founders' Path",
    heroSubtitle: 'Complete 8 of 12 missions to unlock the Ascendant lootbox.',
    filterLabels: {
      all: 'all',
      new: 'new',
      ongoing: 'ongoing',
      ready: 'ready',
    },
    rewardKindLabels: {
      all: 'all',
      merch: 'merch',
      digital: 'digital',
      access: 'access',
      experience: 'experience',
    },
  },
}

export const DEFAULT_CONFIG: BrandConfig = {
  mode: 'dark',
  brand: {
    primary: 'oklch(0.86 0.18 200)',
    secondary: 'oklch(0.72 0.25 340)',
  },
  // Default hero imagery. Both onboardingHero and missionsHero ship real
  // branded artwork from the GrowQuest CDN. Dimensions match the actual pane
  // aspect ratios: onboarding flips from portrait at >720px to landscape at
  // ≤720px (grid collapse); missions stays landscape but narrows on mobile.
  // Browsers fetch only the matching URL via <picture><source media>. Tenants
  // override via `config.assets.{onboardingHero,missionsHero}`. If a URL fails
  // to load, HeroMedia falls back to the procedural <HeroArt />. Whether the
  // visible title/subtitle overlay renders on top is controlled by
  // `overrides.heroBanner.overlayMode` ('always' | 'eyebrow-only' | 'never').
  assets: {
    onboardingHero: {
      src: 'https://cdn.grow-quest.com/uploads/testing/achievement-illustration%20(1)%20(1).png',
      type: 'IMG',
      mobileSrc: 'https://cdn.grow-quest.com/uploads/testing/achievement-banner%20(1)%20(1).png',
    },
    missionsHero: {
      src: 'https://cdn.grow-quest.com/uploads/testing/missions-header.png',
      type: 'IMG',
      mobileSrc: 'https://cdn.grow-quest.com/uploads/testing/missions-header-720x360.png',
    },
  },
}
