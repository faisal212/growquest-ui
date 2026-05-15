import { HeroArt } from '../../art'
import { Eyebrow } from '../../atoms'
import { useAsset } from '../../config'
import { HeroMedia } from '../HeroMedia/HeroMedia'

interface HeroBannerProps {
  heroStyle: string
  title?: string
  subtitle?: string
  eyebrow?: string
}

/** Full-bleed banner composing HeroArt (or a tenant-supplied missionsHero image) with an overlaid eyebrow, title, and subtitle. Drives the top hero area of the Missions screen. */
export function HeroBanner({
  heroStyle,
  title = "Founders' Path",
  subtitle = 'Complete 8 of 12 missions to unlock the Ascendant lootbox.',
  eyebrow = '// current season · week 04',
}: HeroBannerProps) {
  const missionsHero = useAsset('missionsHero')
  return (
    <div className="hero-banner">
      <div className="hero-banner-bg">
        <HeroMedia asset={missionsHero} fallback={<HeroArt variant={heroStyle} />} alt={title} />
      </div>
      <div className="hero-banner-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display m-0 text-[26px] tracking-[-0.02em]">{title}</h2>
        <div className="text-[13px] text-ink-dim max-w-[420px]">{subtitle}</div>
      </div>
    </div>
  )
}
