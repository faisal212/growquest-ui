/**
 * Brand/theme configuration contract.
 *
 * Tenants hand us a BrandConfig; applyBrand() validates, derives ~50 CSS vars,
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

/** Copy strings, keyed by dotted path. Sparse — only override what differs from defaults. */
export interface ContentMap {
  missions: {
    sectionEyebrow: string
    sectionTitle: string
    rewardsEyebrow: string
    rewardsTitle: string
    rewardsBalance: string
    dailyDrop: {
      eyebrow: string
      title: string
      subtitle: string
    }
    spin: {
      eyebrow: string
      title: string
      subtitle: string
      prizes: string
    }
    readyToCollect: {
      eyebrow: string
      empty: string
      buttonEmpty: string
      buttonReady: (n: number) => string
      waiting: (n: number) => string
    }
  }
}

export interface AssetEntry {
  src: string
  type: 'GIF' | 'JSON' | 'IMG'
}

export interface AssetMap {
  onboardingHero?: AssetEntry
  navBackground?: AssetEntry
  endGameImage?: AssetEntry
  nftMinting?: AssetEntry
  onboardWelcoming?: AssetEntry
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
  /** Override leaderboard row + head + highlight colors. */
  leaderboardRow?: LeaderboardRowRecipe
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
