import { useState } from 'react'
import { MISSIONS, REWARDS } from '../../data'
import { Eyebrow, Button, Chip } from '../../atoms'
import { MissionTile } from '../../components/MissionTile'
import { MissionModal } from '../../components/MissionModal'
import { RewardCard } from '../../components/RewardCard'
import { FilterTabs } from '../../components/FilterTabs'
import { HeroBanner } from '../../components/HeroBanner'
import { ProfileSnapshotFromTweaks } from '../../components/ProfileSnapshot'
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

  const filtered = MISSIONS.filter((m) => {
    if (filter === 'ready') return m.progress[0] >= m.progress[1]
    if (filter === 'ongoing') return m.progress[0] < m.progress[1] && m.progress[0] > 0
    if (filter === 'new') return m.progress[0] === 0
    return true
  })

  return (
    <div className="fade-up screen-root w-full max-w-[1280px] mx-auto px-6 pt-6 pb-10 grid gap-5 grid-cols-1">
      {/* Hero + profile snapshot */}
      <div className="responsive-2col grid gap-5 grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <HeroBanner heroStyle={tweaks.heroStyle} />
        <ProfileSnapshotFromTweaks persona={persona} tweaks={tweaks} />
      </div>

      {/* Daily streak · Spin · Ready to collect */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <button onClick={openDaily} className="panel p-[18px] text-left relative overflow-hidden">
          <div
            className="absolute -top-5 -right-5 w-[120px] h-[120px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)',
            }}
          />
          <Eyebrow>// daily drop</Eyebrow>
          <div className="flex items-center gap-3 mt-[10px] mb-2">
            <div
              className="w-[38px] h-[38px] rounded-lg grid place-items-center font-bold font-mono text-base"
              style={{ background: 'var(--accent-amber)', color: '#05060A' }}
            >
              {persona.streak}
            </div>
            <div>
              <div className="font-semibold text-sm">Daily streak</div>
              <div className="text-xs" style={{ color: 'var(--ink-dim)' }}>
                Claim +50 XP every 24h
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[6px] rounded-[2px]"
                style={{
                  background: i < persona.streak % 7 ? 'var(--accent-amber)' : 'var(--panel-2)',
                  border: '1px solid var(--border)',
                }}
              />
            ))}
          </div>
        </button>

        <button onClick={openSpin} className="panel p-[18px] text-left relative overflow-hidden">
          <div
            className="absolute -top-[30px] -right-[30px] w-[120px] h-[120px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, var(--accent-magenta) 0%, transparent 70%)',
            }}
          />
          <Eyebrow>// lootbox</Eyebrow>
          <div className="flex items-center gap-3 mt-[10px] mb-2">
            <div
              className="w-[38px] h-[38px] rounded-lg grid place-items-center"
              style={{
                background: 'var(--accent-magenta)',
                color: '#05060A',
                animation: 'spinSlow 6s linear infinite',
              }}
            >
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
              <div className="font-semibold text-sm">Spin-to-win</div>
              <div className="text-xs" style={{ color: 'var(--ink-dim)' }}>
                1 free spin available
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono" style={{ color: 'var(--ink-faint)' }}>
            PRIZES: XP · MERCH · RARE DROP
          </div>
        </button>

        <div className="panel p-[18px] relative overflow-hidden">
          <Eyebrow>// ready to collect</Eyebrow>
          <div className="mt-[10px] mb-[10px] text-[13px]" style={{ color: 'var(--ink-dim)' }}>
            {persona.ready > 0
              ? `${persona.ready} reward${persona.ready > 1 ? 's' : ''} waiting.`
              : 'Complete a mission to collect rewards.'}
          </div>
          <Button
            variant="primary"
            style={{ width: '100%' }}
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
            {persona.ready > 0 ? `Collect (${persona.ready})` : 'No rewards yet'}
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
                <Eyebrow>// missions</Eyebrow>
                <h2 className="display mt-1 text-[22px]">Daily quests</h2>
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
                style={{
                  display: 'grid',
                  gap: 14,
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
                <Eyebrow>// rewards marketplace</Eyebrow>
                <h2 className="display mt-1 text-[22px]">Spend your XP</h2>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <Chip style={{ padding: '6px 10px' }}>
                  <span className="eyebrow mr-[6px]">balance</span>
                  <span className="mono font-bold" style={{ color: 'var(--accent)' }}>
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
              style={{
                display: 'grid',
                gap: 14,
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
              style={{
                display: 'grid',
                gap: 20,
                gridTemplateColumns: rewardsFirst ? colsRL : cols,
                alignItems: 'start',
              }}
              className="m-and-r"
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
