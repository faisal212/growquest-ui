import { Avatar } from '../../art'
import { XPBar, Tag } from '../../atoms'
import type { Persona, Tweaks } from '../../types'

interface ProfileSnapshotProps {
  persona: Persona
  xpStyle: string
  xpMax?: number
  label?: string
  walletAddress?: string
}

/** Compact profile card showing avatar, handle, tier badge, XP bar, and key stats. Used in the missions sidebar and profile screen. */
export function ProfileSnapshot({
  persona,
  xpStyle,
  xpMax = 12000,
  label = 'Progress to Ascendant',
  walletAddress = '0xE63F6A · 356C10AC',
}: ProfileSnapshotProps) {
  return (
    <div className="panel p-[18px] flex flex-col gap-3.5">
      <div className="flex items-center gap-3">
        <Avatar seed={7} size={44} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold">@{persona.handle}</span>
            <Tag tone="accent">{persona.tier}</Tag>
          </div>
          <div className="font-mono text-[11px] text-ink-faint">{walletAddress}</div>
        </div>
      </div>
      <XPBar value={persona.xp} max={xpMax} style={xpStyle} label={label} />
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: 'Missions', v: `${persona.missionsDone}/12` },
          { k: 'XP', v: persona.xp.toLocaleString() },
          { k: 'Streak', v: `${persona.streak}d` },
        ].map((s) => (
          <div key={s.k} className="p-2.5 bg-panel-2 border border-border rounded-lg text-center">
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-ink-faint">
              {s.k}
            </div>
            <div className="font-bold text-[14px] mt-0.5">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// convenience re-export for callers that only need the xpStyle from tweaks
export function ProfileSnapshotFromTweaks({
  persona,
  tweaks,
}: {
  persona: Persona
  tweaks: Tweaks
}) {
  return <ProfileSnapshot persona={persona} xpStyle={tweaks.xpStyle} />
}
