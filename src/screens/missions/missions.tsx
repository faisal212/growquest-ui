import { useState } from 'react'
import { MISSIONS, REWARDS } from '../../data'
import { Eyebrow, Button, Chip } from '../../atoms'
import { MissionTile } from '../../components/MissionTile'
import { MissionModal } from '../../components/MissionModal'
import { RewardCard } from '../../components/RewardCard'
import { FilterTabs } from '../../components/FilterTabs'
import { HeroBanner } from '../../components/HeroBanner'
import { ProfileSnapshotFromTweaks } from '../../components/ProfileSnapshot'
import { useContent } from '../../config'
import type { Mission, Persona, Tweaks, Reward } from '../../types'

interface MissionsScreenProps {
  persona: Persona
  tweaks: Tweaks
  onClaim: (m: Mission) => void
  onRedeem: (r: Reward) => void
  openSpin: () => void
  openDaily: () => void
}

export default function MissionsScreen({
  persona,
  tweaks,
  onClaim,
  onRedeem,
  openSpin,
  openDaily,
}: MissionsScreenProps) {
  const [active, setActive] = useState<Mission | null>(null)
  const [filter, setFilter] = useState('all')
  const [rewardKind, setRewardKind] = useState('all')
  const tileLayout = tweaks.tileLayout
  const density = tweaks.tileDensity

  const dailyEyebrow = useContent<string>('missions.dailyDrop.eyebrow')
  const dailyTitle = useContent<string>('missions.dailyDrop.title')
  const dailySubtitle = useContent<string>('missions.dailyDrop.subtitle')
  const spinEyebrow = useContent<string>('missions.spin.eyebrow')
  const spinTitle = useContent<string>('missions.spin.title')
  const spinSubtitle = useContent<string>('missions.spin.subtitle')
  const spinPrizes = useContent<string>('missions.spin.prizes')
  const collectEyebrow = useContent<string>('missions.readyToCollect.eyebrow')
  const collectEmpty = useContent<string>('missions.readyToCollect.empty')
  const collectButtonEmpty = useContent<string>('missions.readyToCollect.buttonEmpty')
  const collectButtonReady = useContent<(n: number) => string>(
    'missions.readyToCollect.buttonReady'
  )
  const collectWaiting = useContent<(n: number) => string>('missions.readyToCollect.waiting')
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
        <ProfileSnapshotFromTweaks persona={persona} tweaks={tweaks} />
      </div>

      {/* Daily streak · Spin · Ready to collect */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <button onClick={openDaily} className="panel p-[18px] text-left relative overflow-hidden">
          <div className="absolute -top-5 -right-5 w-[120px] h-[120px] rounded-full opacity-30 bg-[image:var(--halo-amber)]" />
          <Eyebrow>{dailyEyebrow}</Eyebrow>
          <div className="flex items-center gap-3 mt-[10px] mb-2">
            <div className="w-[38px] h-[38px] rounded-lg grid place-items-center font-bold font-mono text-base bg-accent-amber text-[#05060A]">
              {persona.streak}
            </div>
            <div>
              <div className="font-semibold text-sm">{dailyTitle}</div>
              <div className="text-xs text-ink-dim">{dailySubtitle}</div>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[6px] rounded-[2px] border border-border"
                style={{
                  background: i < persona.streak % 7 ? 'var(--accent-amber)' : 'var(--panel-2)',
                }}
              />
            ))}
          </div>
        </button>

        <button onClick={openSpin} className="panel p-[18px] text-left relative overflow-hidden">
          <div className="absolute -top-[30px] -right-[30px] w-[120px] h-[120px] rounded-full opacity-30 bg-[image:var(--halo-magenta)]" />
          <Eyebrow>{spinEyebrow}</Eyebrow>
          <div className="flex items-center gap-3 mt-[10px] mb-2">
            <div className="w-[38px] h-[38px] rounded-lg grid place-items-center bg-accent-magenta text-[#05060A] animate-[spinSlow_6s_linear_infinite]">
              <svg width="22" height="22" viewBox="0 0 22 22">
                <polygon
                  points="11,2 20,7 20,15 11,20 2,15 2,7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="11" cy="11" r="3" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm">{spinTitle}</div>
              <div className="text-xs text-ink-dim">{spinSubtitle}</div>
            </div>
          </div>
          <div className="text-[11px] font-mono text-ink-faint">{spinPrizes}</div>
        </button>

        <div className="panel p-[18px] relative overflow-hidden">
          <Eyebrow>{collectEyebrow}</Eyebrow>
          <div className="mt-[10px] mb-[10px] text-[13px] text-ink-dim">
            {persona.ready > 0 ? collectWaiting(persona.ready) : collectEmpty}
          </div>
          <Button
            variant="primary"
            className="w-full"
            disabled={persona.ready === 0}
            onClick={() =>
              onClaim({
                id: 'bundle',
                type: 'bundle',
                title: 'Reward bundle',
                xp: 500,
                desc: '',
                progress: [1, 1],
                tone: 'accent',
              })
            }
          >
            {persona.ready > 0 ? collectButtonReady(persona.ready) : collectButtonEmpty}
          </Button>
        </div>
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
                  <MissionTile
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
                  <MissionTile
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
                  <span className="mono font-bold text-accent">
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
