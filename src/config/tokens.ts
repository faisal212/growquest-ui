import { parse, oklch, formatHex, formatCss, type Oklch } from 'culori'
import type { BrandConfig, Mode, PanelPalette } from './schema'
import { PALETTES } from './defaults'

/**
 * Derive ~50 CSS-var (name → value) pairs from a BrandConfig.
 *
 * Pure function: no DOM touch, no globals, easy to test. All shade derivation
 * happens here (in JS, not via runtime color-mix), so the values written to
 * :root are concrete and the browser doesn't recompute them every paint.
 */
export function deriveTokens(cfg: BrandConfig): Record<string, string> {
  const out: Record<string, string> = {}
  const mode: Mode = cfg.mode
  const palette = mergePalette(PALETTES[mode], cfg.overrides?.palette)

  // Panel + ink palette. Component code (and Tailwind @theme) consumes these
  // names directly — the override path is live because BrandStyles emits at a
  // selector that wins over styles.css's html[data-theme] defaults.
  out['--panel'] = palette.panel
  out['--panel-2'] = palette.panel2
  out['--panel-hover'] = palette.panelHover
  out['--ink'] = palette.ink
  out['--ink-dim'] = palette.inkDim
  out['--ink-faint'] = palette.inkFaint
  out['--border'] = palette.border
  out['--border-strong'] = palette.borderStrong

  // Brand: primary
  const primary = parseSafe(cfg.brand.primary) ?? parseSafe('oklch(0.86 0.18 200)')!
  out['--color-primary'] = formatCss(primary) ?? cfg.brand.primary
  out['--color-primary-hover'] = formatCss(shift(primary, mode === 'dark' ? +0.04 : -0.06))!
  out['--color-primary-soft'] = withAlpha(primary, 0.18)
  out['--color-primary-faint'] = withAlpha(primary, 0.08)
  out['--on-primary'] = (primary.l ?? 0.5) > 0.62 ? '#0A0B10' : '#FFFFFF'

  // Brand: secondary (optional)
  if (cfg.brand.secondary) {
    const secondary = parseSafe(cfg.brand.secondary)
    if (secondary) {
      out['--color-secondary'] = formatCss(secondary)!
      out['--color-secondary-hover'] = formatCss(shift(secondary, mode === 'dark' ? +0.04 : -0.06))!
      out['--color-secondary-soft'] = withAlpha(secondary, 0.18)
      out['--on-secondary'] = (secondary.l ?? 0.5) > 0.62 ? '#0A0B10' : '#FFFFFF'
    }
  }

  // Halo gradient recipes (precomputed, written as full gradient values so
  // components can use bg-[var(--halo-primary)] / bg-[var(--halo-secondary)]
  // without runtime color-mix).
  out['--halo-primary'] = `radial-gradient(circle, ${out['--color-primary']} 0%, transparent 70%)`
  out['--halo-secondary'] = `radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)`

  // Radii (overridable)
  out['--radius-card'] = cfg.overrides?.radius?.card ?? '14px'
  out['--radius-button'] = cfg.overrides?.radius?.button ?? '8px'
  out['--radius-tag'] = cfg.overrides?.radius?.tag ?? '4px'
  out['--radius-modal'] = cfg.overrides?.radius?.modal ?? '16px'

  // Fonts (overridable)
  if (cfg.overrides?.fonts?.display) out['--font-display'] = cfg.overrides.fonts.display
  if (cfg.overrides?.fonts?.ui) out['--font-ui'] = cfg.overrides.fonts.ui
  if (cfg.overrides?.fonts?.mono) out['--font-mono'] = cfg.overrides.fonts.mono

  // Component-scoped fallbacks. These MUST be emitted unconditionally because
  // Tailwind v4's PostCSS preprocessing drops :root declarations in styles.css
  // after the first block. Owning the fallback values here makes BrandStyles
  // the single source of truth and survives any CSS-pipeline pruning.
  // cfg.overrides.* blocks below overwrite these when supplied.
  out['--mission-card-bg'] = 'var(--panel)'
  out['--mission-card-border'] = 'var(--border)'
  out['--mission-card-icon-bg'] = 'var(--panel-2)'
  out['--mission-card-icon-border'] = 'var(--border)'
  out['--mission-card-title'] = 'var(--ink)'
  out['--mission-card-body'] = 'var(--ink-dim)'
  out['--mission-card-cta-fg'] = '#05060A'
  out['--mission-card-halo-opacity'] = '0.25'

  out['--mission-modal-backdrop'] = 'color-mix(in oklch, #000 60%, transparent)'
  out['--mission-modal-bg'] = 'var(--panel)'
  out['--mission-modal-border'] = 'var(--border)'
  out['--mission-modal-header-border'] = 'var(--border)'
  out['--mission-modal-title'] = 'var(--ink)'
  out['--mission-modal-body'] = 'var(--ink-dim)'
  out['--mission-modal-close-bg'] = 'var(--panel-2)'
  out['--mission-modal-close-border'] = 'var(--border)'
  out['--mission-modal-close-icon'] = 'var(--ink)'

  out['--reward-card-bg'] = 'var(--panel)'
  out['--reward-card-border'] = 'var(--border)'
  out['--reward-card-image-bg'] = 'var(--panel-2)'
  out['--reward-card-image-border'] = 'var(--border)'
  out['--reward-card-title'] = 'var(--ink)'
  out['--reward-card-body'] = 'var(--ink-dim)'

  out['--profile-card-bg'] = 'var(--panel)'
  out['--profile-card-border'] = 'var(--border)'
  out['--profile-card-title'] = 'var(--ink)'
  // Default mirrors --ink-faint (not --ink-dim) so the stat-tile labels keep
  // their established visual weight when no override is supplied. Wallet line
  // uses --profile-card-wallet (also defaults to --ink-faint); they're
  // independently overridable but pixel-identical at default.
  out['--profile-card-body'] = 'var(--ink-faint)'
  out['--profile-card-stat-bg'] = 'var(--panel-2)'
  out['--profile-card-stat-border'] = 'var(--border)'
  out['--profile-card-wallet'] = 'var(--ink-faint)'

  out['--leaderboard-row-bg'] = 'transparent'
  out['--leaderboard-row-border'] = 'var(--border)'
  out['--leaderboard-head-bg'] = 'transparent'
  out['--leaderboard-head-text'] = 'var(--ink-dim)'
  out['--leaderboard-mine-bg'] = 'var(--color-primary-soft)'
  out['--leaderboard-top-rank'] = 'var(--color-primary)'

  // Tier 2 — onboarding card
  out['--onboarding-card-bg'] = 'var(--panel)'
  out['--onboarding-card-border'] = 'var(--border)'
  out['--onboarding-card-title'] = 'var(--ink)'
  out['--onboarding-card-body'] = 'var(--ink-dim)'
  out['--onboarding-card-hero-bg'] = 'var(--bg-2)'
  out['--onboarding-card-form-bg'] = 'transparent'
  out['--onboarding-card-stat-bg'] = 'var(--panel-2)'
  out['--onboarding-card-stat-border'] = 'var(--border)'
  out['--onboarding-card-brand-emphasis'] = 'var(--color-primary)'
  out['--onboarding-card-link'] = 'var(--color-primary)'

  // Tier 2 — top nav
  out['--topnav-bg'] = 'color-mix(in oklch, var(--bg) 80%, transparent)'
  out['--topnav-border'] = 'var(--border)'
  out['--topnav-link'] = 'var(--ink-dim)'
  out['--topnav-link-active'] = 'var(--ink)'
  out['--topnav-link-bg-active'] = 'var(--panel)'

  // Tier 2 — footer
  out['--footer-bg'] = 'transparent'
  out['--footer-border'] = 'var(--border)'
  out['--footer-text'] = 'var(--ink-faint)'
  out['--footer-brand'] = 'var(--ink)'

  // Tier 2 — hero banner
  out['--hero-banner-bg'] = 'var(--bg-2)'
  out['--hero-banner-border'] = 'var(--border)'
  out['--hero-banner-overlay'] =
    'linear-gradient(180deg, transparent 40%, color-mix(in oklch, var(--bg) 90%, transparent) 100%)'

  // Tier 2 — tier ladder
  out['--tier-ladder-current-mix'] = '12%'
  out['--tier-ladder-locked-opacity'] = '0.5'
  out['--tier-ladder-panel'] = 'var(--panel-2)'
  // --tier-ladder-panel-current is intentionally not emitted by default.
  // When unset, TierLadder.tsx falls back to a color-mix derived from the tier color.
  // Setting overrides.tierLadder.panelCurrent assigns a concrete value and wins via var() fallback chain.

  // Tier 2 — badge grid
  out['--badge-grid-bg'] = 'var(--panel-2)'
  out['--badge-grid-border'] = 'var(--border)'
  out['--badge-grid-locked-fg'] = 'var(--ink-faint)'

  // Tier 2 — stat card trend colors
  out['--stat-card-trend-default'] = 'var(--color-primary)'
  out['--stat-card-trend-streak'] = 'var(--color-secondary)'
  out['--stat-card-trend-rewards'] =
    'color-mix(in oklch, var(--color-primary) 50%, var(--color-secondary))'

  // Tier 2 — xp chart (profile activity)
  out['--xp-chart-gradient-from'] = 'var(--color-primary)'
  out['--xp-chart-gradient-to'] = 'var(--color-secondary)'

  // Per-component override slots. Each var only overwrites the default above
  // when explicitly supplied in cfg.overrides.*.
  const ov = cfg.overrides
  if (ov?.missionCard) {
    const r = ov.missionCard
    if (r.panel) out['--mission-card-bg'] = r.panel
    if (r.border) out['--mission-card-border'] = r.border
    const innerBg = r.iconBoxBg ?? r.panel2
    if (innerBg) out['--mission-card-icon-bg'] = innerBg
    if (r.iconBoxBorder) out['--mission-card-icon-border'] = r.iconBoxBorder
    if (r.title) out['--mission-card-title'] = r.title
    if (r.body) out['--mission-card-body'] = r.body
    if (r.ctaFg) out['--mission-card-cta-fg'] = r.ctaFg
    if (typeof r.haloOpacity === 'number')
      out['--mission-card-halo-opacity'] = String(r.haloOpacity)
  }

  if (ov?.missionModal) {
    const r = ov.missionModal
    if (r.backdrop) out['--mission-modal-backdrop'] = r.backdrop
    if (r.panel) out['--mission-modal-bg'] = r.panel
    if (r.border) out['--mission-modal-border'] = r.border
    if (r.headerBorder) out['--mission-modal-header-border'] = r.headerBorder
    if (r.title) out['--mission-modal-title'] = r.title
    if (r.body) out['--mission-modal-body'] = r.body
    if (r.closeBg) out['--mission-modal-close-bg'] = r.closeBg
    if (r.closeBorder) out['--mission-modal-close-border'] = r.closeBorder
    if (r.closeIcon) out['--mission-modal-close-icon'] = r.closeIcon
  }

  if (ov?.rewardCard) {
    const r = ov.rewardCard
    if (r.panel) out['--reward-card-bg'] = r.panel
    if (r.border) out['--reward-card-border'] = r.border
    const imgBg = r.imageArea ?? r.panel2
    if (imgBg) out['--reward-card-image-bg'] = imgBg
    if (r.imageAreaBorder) out['--reward-card-image-border'] = r.imageAreaBorder
    if (r.title) out['--reward-card-title'] = r.title
    if (r.body) out['--reward-card-body'] = r.body
  }

  if (ov?.profileCard) {
    const r = ov.profileCard
    if (r.panel) out['--profile-card-bg'] = r.panel
    if (r.border) out['--profile-card-border'] = r.border
    if (r.title) out['--profile-card-title'] = r.title
    if (r.body) out['--profile-card-body'] = r.body
    const statBg = r.statBg ?? r.panel2
    if (statBg) out['--profile-card-stat-bg'] = statBg
    if (r.statBorder) out['--profile-card-stat-border'] = r.statBorder
    if (r.walletColor) out['--profile-card-wallet'] = r.walletColor
  }

  if (ov?.leaderboardRow) {
    const r = ov.leaderboardRow
    if (r.rowPanel) out['--leaderboard-row-bg'] = r.rowPanel
    if (r.rowBorder) out['--leaderboard-row-border'] = r.rowBorder
    if (r.headPanel) out['--leaderboard-head-bg'] = r.headPanel
    if (r.headText) out['--leaderboard-head-text'] = r.headText
    if (r.mineHighlight) out['--leaderboard-mine-bg'] = r.mineHighlight
    if (r.topRankColor) out['--leaderboard-top-rank'] = r.topRankColor
  }

  if (ov?.onboardingCard) {
    const r = ov.onboardingCard
    if (r.panel) out['--onboarding-card-bg'] = r.panel
    if (r.border) out['--onboarding-card-border'] = r.border
    if (r.title) out['--onboarding-card-title'] = r.title
    if (r.body) out['--onboarding-card-body'] = r.body
    if (r.heroBg) out['--onboarding-card-hero-bg'] = r.heroBg
    if (r.formBg) out['--onboarding-card-form-bg'] = r.formBg
    const statBg = r.statTileBg ?? r.panel2
    if (statBg) out['--onboarding-card-stat-bg'] = statBg
    if (r.statTileBorder) out['--onboarding-card-stat-border'] = r.statTileBorder
    if (r.brandEmphasis) out['--onboarding-card-brand-emphasis'] = r.brandEmphasis
    if (r.linkColor) out['--onboarding-card-link'] = r.linkColor
  }

  if (ov?.topNav) {
    const r = ov.topNav
    if (r.panel) out['--topnav-bg'] = r.panel
    if (r.border) out['--topnav-border'] = r.border
    if (r.linkColor) out['--topnav-link'] = r.linkColor
    if (r.linkColorActive) out['--topnav-link-active'] = r.linkColorActive
    if (r.linkBgActive) out['--topnav-link-bg-active'] = r.linkBgActive
  }

  if (ov?.footer) {
    const r = ov.footer
    if (r.panel) out['--footer-bg'] = r.panel
    if (r.border) out['--footer-border'] = r.border
    if (r.textColor) out['--footer-text'] = r.textColor
    if (r.brandColor) out['--footer-brand'] = r.brandColor
  }

  if (ov?.heroBanner) {
    const r = ov.heroBanner
    if (r.panel) out['--hero-banner-bg'] = r.panel
    if (r.border) out['--hero-banner-border'] = r.border
    if (r.overlayGradient) out['--hero-banner-overlay'] = r.overlayGradient
  }

  if (ov?.tierLadder) {
    const r = ov.tierLadder
    if (typeof r.currentMixPercent === 'number') {
      out['--tier-ladder-current-mix'] = `${clamp(r.currentMixPercent, 0, 100)}%`
    }
    if (typeof r.lockedOpacity === 'number') {
      out['--tier-ladder-locked-opacity'] = String(clamp(r.lockedOpacity, 0, 1))
    }
    if (r.panel) out['--tier-ladder-panel'] = r.panel
    if (r.panelCurrent) out['--tier-ladder-panel-current'] = r.panelCurrent
  }

  if (ov?.badgeGrid) {
    const r = ov.badgeGrid
    if (r.panel) out['--badge-grid-bg'] = r.panel
    if (r.border) out['--badge-grid-border'] = r.border
    if (r.lockedFg) out['--badge-grid-locked-fg'] = r.lockedFg
  }

  if (ov?.statCard) {
    const r = ov.statCard
    if (r.trendDefault) out['--stat-card-trend-default'] = r.trendDefault
    if (r.trendStreak) out['--stat-card-trend-streak'] = r.trendStreak
    if (r.trendRewards) out['--stat-card-trend-rewards'] = r.trendRewards
  }

  if (ov?.xpChart) {
    const r = ov.xpChart
    if (r.gradientFrom) out['--xp-chart-gradient-from'] = r.gradientFrom
    if (r.gradientTo) out['--xp-chart-gradient-to'] = r.gradientTo
  }

  return out
}

function mergePalette(
  base: PanelPalette,
  partial: Partial<PanelPalette> | undefined
): PanelPalette {
  return partial ? { ...base, ...partial } : base
}

function parseSafe(value: string): Oklch | undefined {
  try {
    const parsed = parse(value)
    if (!parsed) return undefined
    return oklch(parsed)
  } catch {
    return undefined
  }
}

/** Shift lightness by delta in oklch space, clamped to [0, 1]. */
function shift(color: Oklch, delta: number): Oklch {
  return { ...color, l: clamp((color.l ?? 0.5) + delta, 0, 1) }
}

/** Return the color as an oklch() string with the supplied alpha. */
function withAlpha(color: Oklch, alpha: number): string {
  const hex = formatHex({ ...color, alpha: undefined }) ?? '#000000'
  const a = Math.round(clamp(alpha, 0, 1) * 255)
    .toString(16)
    .padStart(2, '0')
  return `${hex}${a}`
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}
