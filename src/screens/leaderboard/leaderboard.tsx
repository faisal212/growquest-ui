import { LEADERBOARD } from '../../data'
import { Eyebrow } from '../../atoms'
import { Podium } from '../../components/Podium'
import { LeaderboardTable } from '../../components/LeaderboardTable'
import { useContent, useBrand } from '../../config'
import type { Persona } from '../../types'

export default function LeaderboardScreen({ persona: _persona }: { persona: Persona }) {
  const eyebrow = useContent<string>('leaderboard.eyebrow')
  const title = useContent<string>('leaderboard.title')
  const subtitle = useContent<string>('leaderboard.subtitle')
  const columnLabels = useContent<{
    rank: string
    insider: string
    streak: string
    tier: string
    xp: string
  }>('leaderboard.columns')
  const streakEmoji = useContent<string>('leaderboard.streakEmoji')
  const youTag = useContent<string>('leaderboard.youTag')

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
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display mt-[6px] mb-1 text-[30px]">{title}</h1>
        <div className="text-sm text-ink-dim">{subtitle}</div>
      </div>
      <Podium entries={LEADERBOARD} rankColors={rankColors} platformHeights={platformHeights} />
      <LeaderboardTable
        entries={LEADERBOARD}
        columnLabels={{
          rank: columnLabels.rank,
          handle: columnLabels.insider,
          streak: columnLabels.streak,
          tier: columnLabels.tier,
          xp: columnLabels.xp,
        }}
        streakEmoji={streakEmoji}
        tierToneMap={tierTones}
        youTag={youTag}
      />
    </div>
  )
}
