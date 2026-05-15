import { LEADERBOARD } from '../../data'
import { Eyebrow } from '../../atoms'
import { Podium } from '../../components/Podium'
import { LeaderboardTable } from '../../components/LeaderboardTable'
import { useContentSlice, useBrand } from '../../config'
import type { Persona } from '../../types'

export default function LeaderboardScreen({ persona: _persona }: { persona: Persona }) {
  const t = useContentSlice('leaderboard')

  const brand = useBrand()
  const tierTones = brand.overrides?.leaderboardRow?.tierTones
  const podium = brand.overrides?.podium

  const rankColors = podium?.rankColors
    ? (Object.fromEntries(Object.entries(podium.rankColors).filter(([, v]) => v != null)) as Record<
        number,
        string
      >)
    : undefined
  const platformHeights = podium?.platformHeights
    ? (Object.fromEntries(
        Object.entries(podium.platformHeights).filter(([, v]) => v != null)
      ) as Record<number, number>)
    : undefined

  return (
    <div className="animate-fade-up w-full max-w-[1080px] mx-auto px-6 pt-6 pb-10 max-[720px]:px-3 max-[720px]:pt-4 max-[720px]:pb-8">
      <div className="mb-5">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="display mt-[6px] mb-1 text-[30px]">{t.title}</h1>
        <div className="text-sm text-ink-dim">{t.subtitle}</div>
      </div>
      <Podium entries={LEADERBOARD} rankColors={rankColors} platformHeights={platformHeights} />
      <LeaderboardTable
        entries={LEADERBOARD}
        columnLabels={{
          rank: t.columns.rank,
          handle: t.columns.insider,
          streak: t.columns.streak,
          tier: t.columns.tier,
          xp: t.columns.xp,
        }}
        streakEmoji={t.streakEmoji}
        tierToneMap={tierTones}
        youTag={t.youTag}
      />
    </div>
  )
}
