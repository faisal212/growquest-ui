import { HeroArt } from '../../art'
import { Eyebrow } from '../../atoms'

interface HeroBannerProps {
  heroStyle: string
  title?: string
  subtitle?: string
  eyebrow?: string
}

/** Full-bleed banner composing HeroArt with an overlaid eyebrow, title, and subtitle. Drives the top hero area of the Missions screen. */
export function HeroBanner({
  heroStyle,
  title = "Founders' Path",
  subtitle = 'Complete 8 of 12 missions to unlock the Ascendant lootbox.',
  eyebrow = '// current season · week 04',
}: HeroBannerProps) {
  return (
    <div className="hero-banner">
      <div className="hero-banner-bg">
        <HeroArt variant={heroStyle} />
      </div>
      <div className="hero-banner-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display m-0 text-[26px] tracking-[-0.02em]">{title}</h2>
        <div className="text-[13px] text-ink-dim max-w-[420px]">{subtitle}</div>
      </div>
    </div>
  )
}
