import { useState } from 'react'
import { REWARDS } from '../../data'
import { Eyebrow } from '../../atoms'
import { RewardCard } from '../../components/RewardCard'
import { FilterTabs } from '../../components/FilterTabs'
import type { Persona, Reward } from '../../types'

interface RewardsScreenProps {
  persona: Persona
  onRedeem: (r: Reward) => void
}

export default function RewardsScreen({ persona, onRedeem }: RewardsScreenProps) {
  const [kind, setKind] = useState('all')
  const filtered = REWARDS.filter((r) => kind === 'all' || r.kind === kind)

  return (
    <div className="animate-fade-up w-full max-w-[1280px] mx-auto px-6 pt-6 pb-10 max-[720px]:px-3 max-[720px]:pt-4 max-[720px]:pb-8">
      <div className="flex justify-between items-end gap-[14px] mb-5 flex-wrap">
        <div>
          <Eyebrow>// rewards marketplace</Eyebrow>
          <h1 className="display mt-[6px] mb-0 text-[30px]">Spend your XP</h1>
        </div>
        <div className="panel px-[14px] py-[10px] flex items-center gap-[10px]">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim">
            balance
          </span>
          <span className="mono text-lg font-bold text-accent">
            {persona.xp.toLocaleString()} XP
          </span>
        </div>
      </div>

      <div className="mb-[18px]">
        <FilterTabs
          options={['all', 'merch', 'digital', 'access', 'experience']}
          value={kind}
          onChange={setKind}
        />
      </div>

      <div className="grid gap-[14px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {filtered.map((r) => (
          <RewardCard key={r.id} r={r} persona={persona} onRedeem={onRedeem} />
        ))}
      </div>
    </div>
  )
}
