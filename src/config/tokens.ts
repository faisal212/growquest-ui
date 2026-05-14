import { parse, oklch, formatHex, formatCss, type Oklch } from 'culori'
import type { BrandConfig, Mode, SurfacePalette } from './schema'
import { SURFACES } from './defaults'

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
  const surface = mergeSurface(SURFACES[mode], cfg.overrides?.surface)

  // Surface / ink
  out['--surface'] = surface.surface
  out['--surface-2'] = surface.surface2
  out['--surface-3'] = surface.surface3
  out['--surface-hover'] = surface.surfaceHover
  out['--on-surface'] = surface.onSurface
  out['--on-surface-dim'] = surface.onSurfaceDim
  out['--on-surface-faint'] = surface.onSurfaceFaint
  out['--border-token'] = surface.border
  out['--border-strong-token'] = surface.borderStrong

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
  // components can use bg-[var(--halo-amber)] without runtime color-mix).
  out['--halo-amber'] = `radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)`
  out['--halo-magenta'] = `radial-gradient(circle, var(--accent-magenta) 0%, transparent 70%)`
  out['--halo-primary'] = `radial-gradient(circle, ${out['--color-primary']} 0%, transparent 70%)`

  // Radii (overridable)
  out['--radius-card'] = cfg.overrides?.radius?.card ?? '14px'
  out['--radius-button'] = cfg.overrides?.radius?.button ?? '8px'
  out['--radius-tag'] = cfg.overrides?.radius?.tag ?? '4px'
  out['--radius-modal'] = cfg.overrides?.radius?.modal ?? '16px'

  // Fonts (overridable)
  if (cfg.overrides?.fonts?.display) out['--font-display'] = cfg.overrides.fonts.display
  if (cfg.overrides?.fonts?.ui) out['--font-ui'] = cfg.overrides.fonts.ui
  if (cfg.overrides?.fonts?.mono) out['--font-mono'] = cfg.overrides.fonts.mono

  // Component-scoped + tone fallbacks. These MUST be emitted unconditionally
  // because Tailwind v4's PostCSS preprocessing drops :root declarations in
  // styles.css after the first block. Owning the fallback values here makes
  // BrandStyles the single source of truth and survives any CSS-pipeline
  // pruning. cfg.overrides.* blocks below overwrite these when supplied.
  out['--tone-accent'] = 'var(--accent-cyan)'
  out['--tone-lime'] = 'var(--accent-lime)'
  out['--tone-magenta'] = 'var(--accent-magenta)'
  out['--tone-amber'] = 'var(--accent-amber)'

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
  out['--profile-card-body'] = 'var(--ink-dim)'
  out['--profile-card-stat-bg'] = 'var(--panel-2)'
  out['--profile-card-stat-border'] = 'var(--border)'
  out['--profile-card-wallet'] = 'var(--ink-faint)'

  out['--leaderboard-row-bg'] = 'transparent'
  out['--leaderboard-row-border'] = 'var(--border)'
  out['--leaderboard-head-bg'] = 'transparent'
  out['--leaderboard-head-text'] = 'var(--ink-dim)'
  out['--leaderboard-mine-bg'] = 'var(--color-primary-soft)'
  out['--leaderboard-top-rank'] = 'var(--color-primary)'

  // Per-component override slots. Each var only overwrites the default above
  // when explicitly supplied in cfg.overrides.*.
  const ov = cfg.overrides
  if (ov?.missionCard) {
    const r = ov.missionCard
    if (r.surface) out['--mission-card-bg'] = r.surface
    if (r.border) out['--mission-card-border'] = r.border
    const innerBg = r.iconBoxBg ?? r.surface2
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
    if (r.surface) out['--mission-modal-bg'] = r.surface
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
    if (r.surface) out['--reward-card-bg'] = r.surface
    if (r.border) out['--reward-card-border'] = r.border
    const imgBg = r.imageArea ?? r.surface2
    if (imgBg) out['--reward-card-image-bg'] = imgBg
    if (r.imageAreaBorder) out['--reward-card-image-border'] = r.imageAreaBorder
    if (r.title) out['--reward-card-title'] = r.title
    if (r.body) out['--reward-card-body'] = r.body
  }

  if (ov?.profileCard) {
    const r = ov.profileCard
    if (r.surface) out['--profile-card-bg'] = r.surface
    if (r.border) out['--profile-card-border'] = r.border
    if (r.title) out['--profile-card-title'] = r.title
    if (r.body) out['--profile-card-body'] = r.body
    const statBg = r.statBg ?? r.surface2
    if (statBg) out['--profile-card-stat-bg'] = statBg
    if (r.statBorder) out['--profile-card-stat-border'] = r.statBorder
    if (r.walletColor) out['--profile-card-wallet'] = r.walletColor
  }

  if (ov?.leaderboardRow) {
    const r = ov.leaderboardRow
    if (r.rowSurface) out['--leaderboard-row-bg'] = r.rowSurface
    if (r.rowBorder) out['--leaderboard-row-border'] = r.rowBorder
    if (r.headSurface) out['--leaderboard-head-bg'] = r.headSurface
    if (r.headText) out['--leaderboard-head-text'] = r.headText
    if (r.mineHighlight) out['--leaderboard-mine-bg'] = r.mineHighlight
    if (r.topRankColor) out['--leaderboard-top-rank'] = r.topRankColor
  }

  if (ov?.tones) {
    if (ov.tones.accent) out['--tone-accent'] = ov.tones.accent
    if (ov.tones.lime) out['--tone-lime'] = ov.tones.lime
    if (ov.tones.magenta) out['--tone-magenta'] = ov.tones.magenta
    if (ov.tones.amber) out['--tone-amber'] = ov.tones.amber
  }

  return out
}

function mergeSurface(
  base: SurfacePalette,
  partial: Partial<SurfacePalette> | undefined
): SurfacePalette {
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
