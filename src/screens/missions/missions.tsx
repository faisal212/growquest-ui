import { useState } from 'react'
import { MISSIONS, REWARDS } from '../../data'
import { Eyebrow, Chip } from '../../atoms'
import { MissionCard } from '../../components/MissionCard'
import { MissionModal } from '../../components/MissionModal'
import { RewardCard } from '../../components/RewardCard'
import { FilterTabs } from '../../components/FilterTabs'
import { HeroBanner } from '../../components/HeroBanner'
import { ProfileCard } from '../../components/ProfileCard'
import { useContentSlice } from '../../config'
import type { Mission, Persona, Reward } from '../../types'

interface MissionsScreenProps {
  persona: Persona
  onClaim: (m: Mission) => void
  onRedeem: (r: Reward) => void
}

export default function MissionsScreen({ persona, onClaim, onRedeem }: MissionsScreenProps) {
  const [active, setActive] = useState<Mission | null>(null)
  const [filter, setFilter] = useState('all')
  const [rewardKind, setRewardKind] = useState('all')

  const t = useContentSlice('missions')

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
        <HeroBanner
          heroStyle="isometric"
          eyebrow={t.heroEyebrow}
          title={t.heroTitle}
          subtitle={t.heroSubtitle}
        />
        <ProfileCard persona={persona} xpStyle="segmented" />
      </div>

      {/* Missions */}
      <div>
        <div className="flex justify-between items-center gap-[14px] mb-[14px] flex-wrap">
          <div>
            <Eyebrow>{t.sectionEyebrow}</Eyebrow>
            <h2 className="display mt-1 text-[22px]">{t.sectionTitle}</h2>
          </div>
          <FilterTabs
            options={['all', 'new', 'ongoing', 'ready']}
            value={filter}
            onChange={setFilter}
            labels={t.filterLabels}
          />
        </div>
        <div className="grid gap-[14px] grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {filtered.map((m) => (
            <MissionCard key={m.id} m={m} density="comfortable" layout="split" onOpen={setActive} />
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div>
        <div className="flex justify-between items-center gap-[14px] mb-[14px] flex-wrap">
          <div>
            <Eyebrow>{t.rewardsEyebrow}</Eyebrow>
            <h2 className="display mt-1 text-[22px]">{t.rewardsTitle}</h2>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <Chip className="!py-[6px] !px-[10px]">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim mr-[6px]">
                {t.rewardsBalance}
              </span>
              <span className="mono font-bold text-primary">{persona.xp.toLocaleString()} XP</span>
            </Chip>
            <FilterTabs
              options={['all', 'merch', 'digital', 'access', 'experience']}
              value={rewardKind}
              onChange={setRewardKind}
              labels={t.rewardKindLabels}
            />
          </div>
        </div>
        <div className="grid gap-[14px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
          {REWARDS.filter((r) => rewardKind === 'all' || r.kind === rewardKind).map((r) => (
            <RewardCard key={r.id} r={r} persona={persona} onRedeem={onRedeem} compact={false} />
          ))}
        </div>
      </div>

      <MissionModal m={active} onClose={() => setActive(null)} onClaim={onClaim} />
    </div>
  )
}
