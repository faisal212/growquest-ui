import { HeroArt } from '../../art'
import { Eyebrow } from '../../atoms'
import { useAsset, useBrand } from '../../config'
import { HeroMedia } from '../HeroMedia/HeroMedia'

interface HeroBannerProps {
  heroStyle: string
  title?: string
  subtitle?: string
  eyebrow?: string
}

/**
 * Full-bleed banner composing HeroArt (or a tenant-supplied missionsHero image)
 * with an overlaid eyebrow, title, and subtitle. Drives the top hero area of
 * the Missions screen.
 *
 * `overrides.heroBanner.overlayMode` controls the text overlay:
 *   - `'always'` (default): render eyebrow + title + subtitle + dark-fade gradient.
 *   - `'eyebrow-only'`: render only the eyebrow (gradient stays for legibility).
 *   - `'never'`: render no visible overlay and no gradient. The image fills the
 *     banner edge to edge; the title is kept in DOM as `sr-only` for a11y/SEO.
 */
export function HeroBanner({
  heroStyle,
  title = "Founders' Path",
  subtitle = 'Complete 8 of 12 missions to unlock the Ascendant lootbox.',
  eyebrow = '// current season · week 04',
}: HeroBannerProps) {
  const missionsHero = useAsset('missionsHero')
  const overlayMode = useBrand().overrides?.heroBanner?.overlayMode ?? 'always'

  const showOverlay = overlayMode !== 'never'
  const showTitle = overlayMode === 'always'
  const showSubtitle = overlayMode === 'always'

  return (
    <div className="hero-banner">
      <div className="hero-banner-bg">
        <HeroMedia asset={missionsHero} fallback={<HeroArt variant={heroStyle} />} alt={title} />
      </div>
      {showOverlay && (
        <div className="hero-banner-content">
          <Eyebrow>{eyebrow}</Eyebrow>
          {showTitle && <h2 className="display m-0 text-[26px] tracking-[-0.02em]">{title}</h2>}
          {showSubtitle && <div className="text-[13px] text-ink-dim max-w-[420px]">{subtitle}</div>}
        </div>
      )}
      {!showTitle && <h2 className="sr-only">{title}</h2>}
    </div>
  )
}
