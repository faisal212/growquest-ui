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
    <div
      className="panel"
      style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar seed={7} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700 }}>@{persona.handle}</span>
            <Tag tone="accent">{persona.tier}</Tag>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)' }}>
            {walletAddress}
          </div>
        </div>
      </div>
      <XPBar value={persona.xp} max={xpMax} style={xpStyle} label={label} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { k: 'Missions', v: `${persona.missionsDone}/12` },
          { k: 'XP', v: persona.xp.toLocaleString() },
          { k: 'Streak', v: `${persona.streak}d` },
        ].map((s) => (
          <div key={s.k} className="stat-cell">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
              }}
            >
              {s.k}
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{s.v}</div>
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
