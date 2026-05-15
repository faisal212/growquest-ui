import { Avatar } from '../../art'
import { XPBar, Tag } from '../../atoms'
import type { Persona } from '../../types'

interface ProfileCardProps {
  persona: Persona
  xpStyle: string
  xpMax?: number
  label?: string
  walletAddress?: string
}

/** Compact profile card showing avatar, handle, tier badge, XP bar, and key stats. Used in the missions sidebar and profile screen. */
export function ProfileCard({
  persona,
  xpStyle,
  xpMax = 12000,
  label = 'Progress to Ascendant',
  walletAddress = '0xE63F6A · 356C10AC',
}: ProfileCardProps) {
  return (
    <div
      className="bg-[var(--profile-card-bg)] border border-[color:var(--profile-card-border)] rounded-[var(--radius-card,14px)] p-[18px] flex flex-col gap-3.5"
      style={{ containerType: 'inline-size' }}
    >
      <div className="flex items-center gap-3">
        <Avatar seed={7} size={44} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[color:var(--profile-card-title)]">
              @{persona.handle}
            </span>
            <Tag tone="primary">{persona.tier}</Tag>
          </div>
          <div className="font-mono text-[11px] text-[color:var(--profile-card-wallet)]">
            {walletAddress}
          </div>
        </div>
      </div>
      <XPBar value={persona.xp} max={xpMax} style={xpStyle} label={label} />
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: 'Missions', v: `${persona.missionsDone}/12` },
          { k: 'XP', v: persona.xp.toLocaleString() },
          { k: 'Streak', v: `${persona.streak}d` },
        ].map((s) => (
          <div
            key={s.k}
            className="p-2.5 bg-[var(--profile-card-stat-bg)] border border-[color:var(--profile-card-stat-border)] rounded-lg text-center"
          >
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[color:var(--profile-card-body)]">
              {s.k}
            </div>
            <div className="font-bold text-[14px] mt-0.5 text-[color:var(--profile-card-title)]">
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
