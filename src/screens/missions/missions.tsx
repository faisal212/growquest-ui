import { useState } from 'react'
import { MISSIONS, REWARDS } from '../../data'
import { Eyebrow, Chip } from '../../atoms'
import { MissionCard } from '../../components/MissionCard'
import { MissionModal } from '../../components/MissionModal'
import { RewardCard } from '../../components/RewardCard'
import { FilterTabs } from '../../components/FilterTabs'
import { HeroBanner } from '../../components/HeroBanner'
import { ProfileCardFromTweaks } from '../../components/ProfileCard'
import { useContent } from '../../config'
import type { Mission, Persona, Tweaks, Reward } from '../../types'

interface MissionsScreenProps {
  persona: Persona
  tweaks: Tweaks
  onClaim: (m: Mission) => void
  onRedeem: (r: Reward) => void
}

export default function MissionsScreen({
  persona,
  tweaks,
  onClaim,
  onRedeem,
}: MissionsScreenProps) {
  const [active, setActive] = useState<Mission | null>(null)
  const [filter, setFilter] = useState('all')
  const [rewardKind, setRewardKind] = useState('all')
  const tileLayout = tweaks.tileLayout
  const density = tweaks.tileDensity

  const sectionEyebrow = useContent<string>('missions.sectionEyebrow')
  const sectionTitle = useContent<string>('missions.sectionTitle')
  const rewardsEyebrow = useContent<string>('missions.rewardsEyebrow')
  const rewardsTitle = useContent<string>('missions.rewardsTitle')
  const rewardsBalanceLabel = useContent<string>('missions.rewardsBalance')

  const filtered = MISSIONS.filter((m) => {
    if (filter === 'ready') return m.progress[0] >= m.progress[1]
    if (filter === 'ongoing') return m.progress[0] < m.progress[1] && m.progress[0] > 0
    if (filter === 'new') return m.progress[0] === 0
    return true
  })

  return (
    <div className="animate-fade-up w-full max-w-[1280px] mx-auto px-6 pt-6 pb-10 max-[720px]:px-3 max-[720px]:pt-4 max-[720px]:pb-8 grid gap-5 grid-cols-1">
      {/* Hero + profile snapshot */}
      <div className="grid gap-5 grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] [&>*]:min-w-0 max-[720px]:grid-cols-1">
        <HeroBanner heroStyle={tweaks.heroStyle} />
        <ProfileCardFromTweaks persona={persona} tweaks={tweaks} />
      </div>

      {/* Missions + Rewards (layout-aware) */}
      {(() => {
        const rl = tweaks.rewardsLayout || 'stacked'
        const sideBySide = rl === 'side-by-side' || rl === 'rewards-left'
        const rewardsFirst = rl === 'rewards-left'
        const colMin = sideBySide
          ? density === 'compact'
            ? 160
            : 190
          : density === 'compact'
            ? 220
            : 280
        const rewardColMin = sideBySide
          ? density === 'compact'
            ? 160
            : 200
          : density === 'compact'
            ? 200
            : 240

        const missionsBlock = (
          <div key="missions">
            <div className="flex justify-between items-center gap-[14px] mb-[14px] flex-wrap">
              <div>
                <Eyebrow>{sectionEyebrow}</Eyebrow>
                <h2 className="display mt-1 text-[22px]">{sectionTitle}</h2>
              </div>
              <FilterTabs
                options={['all', 'new', 'ongoing', 'ready']}
                value={filter}
                onChange={setFilter}
              />
            </div>
            {tileLayout === 'list' ? (
              <div className="flex flex-col gap-[10px]">
                {filtered.map((m) => (
                  <MissionCard
                    key={m.id}
                    m={m}
                    density={density}
                    layout="list"
                    onOpen={setActive}
                  />
                ))}
              </div>
            ) : (
              <div
                className="grid gap-[14px]"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(${colMin}px, 1fr))`,
                }}
              >
                {filtered.map((m) => (
                  <MissionCard
                    key={m.id}
                    m={m}
                    density={density}
                    layout={sideBySide ? 'stack' : tileLayout}
                    onOpen={setActive}
                  />
                ))}
              </div>
            )}
          </div>
        )

        const rewardsBlock = (
          <div key="rewards">
            <div className="flex justify-between items-center gap-[14px] mb-[14px] flex-wrap">
              <div>
                <Eyebrow>{rewardsEyebrow}</Eyebrow>
                <h2 className="display mt-1 text-[22px]">{rewardsTitle}</h2>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <Chip className="!py-[6px] !px-[10px]">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim mr-[6px]">
                    {rewardsBalanceLabel}
                  </span>
                  <span className="mono font-bold text-primary">
                    {persona.xp.toLocaleString()} XP
                  </span>
                </Chip>
                <FilterTabs
                  options={['all', 'merch', 'digital', 'access', 'experience']}
                  value={rewardKind}
                  onChange={setRewardKind}
                />
              </div>
            </div>
            <div
              className="grid gap-[14px]"
              style={{
                gridTemplateColumns: sideBySide
                  ? 'repeat(2, minmax(0, 1fr))'
                  : `repeat(auto-fill, minmax(${rewardColMin}px, 1fr))`,
              }}
            >
              {REWARDS.filter((r) => rewardKind === 'all' || r.kind === rewardKind).map((r) => (
                <RewardCard
                  key={r.id}
                  r={r}
                  persona={persona}
                  onRedeem={onRedeem}
                  compact={sideBySide}
                />
              ))}
            </div>
          </div>
        )

        if (sideBySide) {
          const ratio = tweaks.rewardsRatio || 'balanced'
          const cols =
            ratio === 'missions-heavy'
              ? 'minmax(0, 2.2fr) minmax(0, 1fr)'
              : ratio === 'rewards-heavy'
                ? 'minmax(0, 1fr) minmax(0, 2fr)'
                : 'minmax(0, 1.4fr) minmax(0, 1fr)'
          const colsRL =
            ratio === 'missions-heavy'
              ? 'minmax(0, 1fr) minmax(0, 2.2fr)'
              : ratio === 'rewards-heavy'
                ? 'minmax(0, 2fr) minmax(0, 1fr)'
                : 'minmax(0, 1fr) minmax(0, 1.4fr)'
          return (
            <div
              className="grid gap-5 items-start max-[720px]:!grid-cols-1"
              style={{
                gridTemplateColumns: rewardsFirst ? colsRL : cols,
              }}
            >
              {rewardsFirst ? rewardsBlock : missionsBlock}
              {rewardsFirst ? missionsBlock : rewardsBlock}
            </div>
          )
        }
        return (
          <>
            {missionsBlock}
            {rewardsBlock}
          </>
        )
      })()}

      <MissionModal m={active} onClose={() => setActive(null)} onClaim={onClaim} />
    </div>
  )
}
