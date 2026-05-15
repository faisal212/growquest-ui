/**
 * Brand/theme configuration contract.
 *
 * Tenants hand us a BrandConfig; applyBrand() validates, derives ~80 CSS vars,
 * writes them to :root, and populates the content/asset stores. Components never
 * see this object directly — they read tokens via Tailwind utilities or hooks.
 */

export type Mode = 'dark' | 'light'

export interface BrandColors {
  /** Required. Hex or oklch(). Hover/soft/faint/on-primary are derived from this. */
  primary: string
  /** Optional. Same derivation rules as primary. */
  secondary?: string
}

export interface LogoSet {
  /** Onboarding hero logo (mobile + desktop share unless asset overrides). */
  onboarding?: string
  /** Top-nav logo. */
  nav?: string
  /** End-game / celebration logo. */
  endGame?: string
}

/** Tone palette names referenced by tier-tone mapping, badge rotation, etc. */
export type ToneName = 'accent' | 'lime' | 'magenta' | 'amber'

/** Copy strings, keyed by dotted path. Sparse — only override what differs from defaults. */
export interface ContentMap {
  brand: {
    /** Wordmark rendered in the header lockup and the footer. */
    name: string
    /** Optional build/version tag shown beside the wordmark. */
    version: string
    /** Footer tagline ("multi-tenant growth OS"). */
    tagline: string
  }
  nav: {
    missions: string
    leaderboard: string
    profile: string
  }
  footer: {
    terms: string
    privacy: string
    changelog: string
    /** Lead-in before the wordmark ("Powered by"). */
    poweredByPrefix: string
  }
  onboarding: {
    eyebrow: string
    /** First half of the h1 ("Become a"). */
    titleLead: string
    /** Brand-name highlight inside the h1 (defaults to brand.name; leave blank to reuse). */
    titleBrand: string
    /** Second half of the h1 ("insider."). */
    titleTrail: string
    body: string
    /** Three stat tiles below the body. */
    stats: { key: string; value: string }[]
    emailLabel: string
    emailPlaceholder: string
    /** Template with {terms} + {privacy} anchors. */
    consent: string
    consentTermsLabel: string
    consentPrivacyLabel: string
    cta: string
    microcopyLeft: string
    microcopyRight: string
    chipPrimary: string
    chipSecondary: string
  }
  leaderboard: {
    eyebrow: string
    title: string
    subtitle: string
    columns: {
      rank: string
      insider: string
      streak: string
      tier: string
      xp: string
    }
    streakEmoji: string
    youTag: string
  }
  profile: {
    /** Template with {month} + {year} anchors. */
    joinedTag: string
    /** Template with {wallet} + {handle} anchors. */
    walletLine: string
    activityEyebrow: string
    xpChartEyebrow: string
    statLabels: {
      totalXP: string
      missions: string
      streak: string
      rewards: string
    }
    badgesEyebrow: string
    badgeUnlocked: string
    badgeLocked: string
    tierLadderEyebrow: string
    tierLabelPrefix: string
    tierXPSuffix: string
  }
  missions: {
    sectionEyebrow: string
    sectionTitle: string
    rewardsEyebrow: string
    rewardsTitle: string
    rewardsBalance: string
    heroEyebrow: string
    heroTitle: string
    heroSubtitle: string
    filterLabels: {
      all: string
      new: string
      ongoing: string
      ready: string
    }
    rewardKindLabels: {
      all: string
      merch: string
      digital: string
      access: string
      experience: string
    }
  }
}

export interface AssetEntry {
  /** Desktop / default image URL. */
  src: string
  type: 'GIF' | 'JSON' | 'IMG'
  /**
   * Optional mobile variant. When set, HeroMedia emits a `<picture>` wrapper
   * with a `<source media="(max-width: 720px)" srcSet={mobileSrc}>` ahead of
   * the inner `<img src={src}>`. Browsers fetch only the matching URL, so
   * desktop never downloads the mobile asset and vice versa. SSR-rendered,
   * no client JS needed. Ignored for type `'JSON'`.
   */
  mobileSrc?: string
}

export interface AssetMap {
  /** Onboarding left-pane image. When set, replaces the procedural HeroArt SVG and hides the decorative chip row. */
  onboardingHero?: AssetEntry
  navBackground?: AssetEntry
  endGameImage?: AssetEntry
  nftMinting?: AssetEntry
  onboardWelcoming?: AssetEntry
  /** Missions hero banner image. When set, replaces the procedural HeroArt SVG behind the text overlay. */
  missionsHero?: AssetEntry
}

export interface SurfacePalette {
  surface: string
  surface2: string
  surface3: string
  surfaceHover: string
  onSurface: string
  onSurfaceDim: string
  onSurfaceFaint: string
  border: string
  borderStrong: string
}

export interface RadiusSet {
  card?: string
  button?: string
  tag?: string
  modal?: string
}

export interface FontSet {
  display?: string
  ui?: string
  mono?: string
}

/** Slots shared across most card-like components. Every field is optional. */
export interface ComponentSurfaceRecipe {
  /** Primary background. */
  surface?: string
  /** Inner sub-surface (icon container, image area, stat tile). */
  surface2?: string
  /** Outer border. */
  border?: string
  /** Primary text color. */
  title?: string
  /** Secondary/dim text color. */
  body?: string
}

export interface MissionCardRecipe extends ComponentSurfaceRecipe {
  /** Overrides surface2 for the icon container only. */
  iconBoxBg?: string
  iconBoxBorder?: string
  /** Foreground color of the tone-tinted "GO" CTA. Default `#05060A`. */
  ctaFg?: string
  /** Halo gradient opacity on the split layout. Default 0.25. */
  haloOpacity?: number
}

export interface MissionModalRecipe extends ComponentSurfaceRecipe {
  /** Dim overlay behind the modal. Default `color-mix(in oklch, #000 60%, transparent)`. */
  backdrop?: string
  /** Bottom border on the modal header. */
  headerBorder?: string
  closeBg?: string
  closeBorder?: string
  /** SVG stroke color on the close button. */
  closeIcon?: string
}

export interface RewardCardRecipe extends ComponentSurfaceRecipe {
  /** Background behind the artwork (or the placeholder pattern when no image). */
  imageArea?: string
  imageAreaBorder?: string
}

export interface ProfileCardRecipe extends ComponentSurfaceRecipe {
  /** Background for the inner stat tiles. */
  statBg?: string
  statBorder?: string
  /** Color for the mono wallet-address line. */
  walletColor?: string
}

export interface LeaderboardRowRecipe {
  rowSurface?: string
  rowBorder?: string
  headSurface?: string
  headText?: string
  /** Highlight color behind the current user's row. */
  mineHighlight?: string
  /** Rank-number color for ranks 1–3. */
  topRankColor?: string
  /** Map of tier name → tone for the Tag rendered in the tier column. */
  tierTones?: Record<string, ToneName>
}

export interface OnboardingCardRecipe extends ComponentSurfaceRecipe {
  /** Left hero pane bg (currently `bg-bg-2`). */
  heroBg?: string
  /** Right form pane bg (defaults to the wrapper surface). */
  formBg?: string
  /** Background for the 3 stat tiles. */
  statTileBg?: string
  statTileBorder?: string
  /** Highlight color on the brand-name span inside the h1. */
  brandEmphasis?: string
  /** Inline link color (Terms / Privacy buttons inside consent). */
  linkColor?: string
}

export interface TopNavRecipe {
  surface?: string
  border?: string
  linkColor?: string
  linkColorActive?: string
  linkBgActive?: string
}

export interface FooterRecipe {
  surface?: string
  border?: string
  textColor?: string
  /** Color for the bolded wordmark inside "Powered by X". */
  brandColor?: string
}

export interface HeroBannerRecipe {
  surface?: string
  border?: string
  /** Overlay gradient applied above the art. */
  overlayGradient?: string
}

export interface TierLadderRecipe {
  /** Mix-percentage used for the current-tier surface tint, 0..100. Default 12. */
  currentMixPercent?: number
  /** Opacity of past/locked tier cards, 0..1. Default 0.5. */
  lockedOpacity?: number
  surface?: string
  surfaceCurrent?: string
}

export interface BadgeGridRecipe {
  surface?: string
  border?: string
  /**
   * Raw color string rotation for unlocked badges (CSS values; can be `var(--tone-*)`,
   * a hex, or any CSS color). Default mirrors the 5-tone accent palette.
   */
  unlockedTones?: string[]
  /** SVG icon fill for locked badges. */
  lockedFg?: string
}

export interface PodiumRecipe {
  /** Override rank platform colors (rank 1..3). */
  rankColors?: { '1'?: string; '2'?: string; '3'?: string }
  /** Override rank platform heights in px (rank 1..3). */
  platformHeights?: { '1'?: number; '2'?: number; '3'?: number }
}

export interface StatCardRecipe {
  /** Trend color for the default sparkline (totalXP, missions). */
  trendDefault?: string
  /** Trend color for the streak sparkline. */
  trendStreak?: string
  /** Trend color for the rewards sparkline. */
  trendRewards?: string
}

export interface XpChartRecipe {
  /** Top of the activity bar gradient. Default `var(--color-primary)`. */
  gradientFrom?: string
  /** Bottom of the activity bar gradient. Default `var(--accent-magenta)`. */
  gradientTo?: string
}

/** Override the tone-color palette. Affects every component that calls toneColor(). */
export interface ToneOverrides {
  accent?: string
  lime?: string
  magenta?: string
  amber?: string
}

export interface Overrides {
  /** Override the per-mode surface/ink palette. Rarely needed. */
  surface?: Partial<SurfacePalette>
  /** Override corner radii. */
  radius?: RadiusSet
  /** Override font stacks. */
  fonts?: FontSet
  /** Override mission-card-specific surfaces, borders, icon box, CTA. */
  missionCard?: MissionCardRecipe
  /** Override mission-modal backdrop, surfaces, header, close button. */
  missionModal?: MissionModalRecipe
  /** Override reward-card surfaces and the image area. */
  rewardCard?: RewardCardRecipe
  /** Override profile-snapshot card surfaces and stat tiles. */
  profileCard?: ProfileCardRecipe
  /** Override leaderboard row + head + highlight colors + tier-tone map. */
  leaderboardRow?: LeaderboardRowRecipe
  /** Override the onboarding-card wrapper, hero pane, stat tiles, brand emphasis. */
  onboardingCard?: OnboardingCardRecipe
  /** Override the top-nav surface, border, link colors. */
  topNav?: TopNavRecipe
  /** Override the app-footer surface, border, text, brand color. */
  footer?: FooterRecipe
  /** Override the hero-banner surface, border, overlay gradient. */
  heroBanner?: HeroBannerRecipe
  /** Override the tier-ladder current-tier mix, locked opacity, surfaces. */
  tierLadder?: TierLadderRecipe
  /** Override the badge-grid surface, unlocked-tone rotation, locked fg. */
  badgeGrid?: BadgeGridRecipe
  /** Override the leaderboard podium rank colors + platform heights. */
  podium?: PodiumRecipe
  /** Override the stat-card sparkline trend colors per semantic. */
  statCard?: StatCardRecipe
  /** Override the profile activity-chart gradient. */
  xpChart?: XpChartRecipe
  /** Remap the tone palette (accent/lime/magenta/amber → arbitrary colors). */
  tones?: ToneOverrides
}

export interface BrandConfig {
  /** Schema version. Bumped on breaking changes. Optional in input; defaults to 1. */
  schemaVersion?: number
  /** Tenant identifier echoed by the API for debugging. Not used for rendering. */
  tenantId?: string
  mode: Mode
  brand: BrandColors
  logos?: LogoSet
  /** Sparse content overrides. Falls back to defaults for any unset key. */
  content?: DeepPartial<ContentMap>
  assets?: AssetMap
  overrides?: Overrides
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

/** Deep-merge `partial` into `base`, returning a new object. Used to apply sparse user config on top of defaults. */
export function deepMerge<T>(base: T, partial: DeepPartial<T> | undefined): T {
  if (!partial) return base
  if (typeof base !== 'object' || base === null) return (partial as T) ?? base
  const out: Record<string, unknown> = Array.isArray(base)
    ? ([...(base as unknown[])] as unknown as Record<string, unknown>)
    : { ...(base as Record<string, unknown>) }
  for (const key of Object.keys(partial)) {
    const a = (base as Record<string, unknown>)[key]
    const b = (partial as Record<string, unknown>)[key]
    if (b === undefined) continue
    if (
      a &&
      typeof a === 'object' &&
      !Array.isArray(a) &&
      b &&
      typeof b === 'object' &&
      !Array.isArray(b)
    ) {
      out[key] = deepMerge(a, b as DeepPartial<typeof a>)
    } else {
      out[key] = b
    }
  }
  return out as T
}
