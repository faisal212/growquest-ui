import { BADGES, TIERS } from '../../data'
import { Eyebrow, XPBar, Tag } from '../../atoms'
import { Avatar } from '../../art'
import { StatCard } from '../../components/StatCard'
import { BadgeGrid } from '../../components/BadgeGrid'
import { TierLadder } from '../../components/TierLadder'
import type { Persona, Tweaks } from '../../types'

interface ProfileScreenProps {
  persona: Persona
  tweaks: Tweaks
}

export default function ProfileScreen({ persona, tweaks }: ProfileScreenProps) {
  const xpMax = 12000
  const nextTier = TIERS.find((t) => persona.xp < t.min) ?? TIERS[TIERS.length - 1]
  const currentTier = [...TIERS].reverse().find((t) => persona.xp >= t.min) ?? TIERS[0]
  const activity = [2, 4, 3, 6, 5, 8, 7, 9, 6, 10, 11, 9, 12, 14]

  return (
    <div className="animate-fade-up w-full max-w-[1180px] mx-auto px-6 pt-6 pb-10 max-[720px]:px-3 max-[720px]:pt-4 max-[720px]:pb-8 grid gap-5">
      {/* Identity card */}
      <div className="panel p-6 grid gap-5 grid-cols-[auto_1fr] items-center max-[720px]:grid-cols-1 max-[720px]:text-center">
        <div className="relative">
          <Avatar seed={7} size={88} />
          <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-[6px] text-[11px] font-bold font-mono bg-accent-magenta text-[#05060A] border-2 border-bg">
            LV.{Math.floor(persona.xp / 1000)}
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px] flex-wrap">
            <h1 className="display m-0 text-[26px]">@{persona.handle}</h1>
            <Tag tone="accent">{persona.tier}</Tag>
            <Tag>JOINED · MAR 2026</Tag>
          </div>
          <div className="font-mono text-xs text-ink-dim">
            0xE63F6A · 356C10AC · growquest.io/@{persona.handle}
          </div>
          <XPBar
            value={persona.xp}
            max={xpMax}
            style={tweaks.xpStyle}
            label={`${currentTier.name} → ${nextTier.name}`}
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] max-[720px]:grid-cols-1">
        {/* Stats + activity chart */}
        <div className="panel p-5 flex flex-col gap-[18px]">
          <Eyebrow>// activity</Eyebrow>
          <div className="grid gap-[10px] grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
            <StatCard
              label="Total XP"
              value={persona.xp.toLocaleString()}
              trend={[5, 6, 7, 8, 10, 12]}
            />
            <StatCard label="Missions" value={persona.missionsDone} trend={[1, 2, 2, 3, 4, 4, 5]} />
            <StatCard
              label="Streak"
              value={`${persona.streak}d`}
              trend={[3, 5, 7, 6, 9, 12]}
              trendColor="var(--accent-amber)"
            />
            <StatCard
              label="Rewards"
              value={persona.rewardsClaimed}
              trend={[0, 0, 1, 1, 2, 2]}
              trendColor="var(--accent-lime)"
            />
          </div>
          <div>
            <Eyebrow>// xp over 14 days</Eyebrow>
            <div className="mt-3 flex items-end gap-[3px] h-[100px] p-[10px] rounded-[10px] bg-panel-2 border border-border">
              {activity.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[2px]"
                  style={{
                    height: `${(v / 14) * 100}%`,
                    background:
                      'linear-gradient(180deg, var(--color-primary) 0%, color-mix(in oklch, var(--color-primary) 40%, var(--accent-magenta)) 100%)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Badges */}
        <BadgeGrid badges={BADGES} />
      </div>

      {/* Tier ladder */}
      <TierLadder tiers={TIERS} currentXP={persona.xp} />
    </div>
  )
}
