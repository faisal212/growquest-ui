import { Avatar } from '../../art'
import type { LeaderboardEntry } from '../../types'

interface PodiumProps {
  entries: LeaderboardEntry[]
  rankColors?: Record<number, string>
  platformHeights?: Record<number, number>
}

const DEFAULT_RANK_COLOR: Record<number, string> = {
  1: 'var(--accent-amber)',
  2: 'var(--accent-cyan)',
  3: 'var(--accent-magenta)',
}
const DEFAULT_RANK_HEIGHT: Record<number, number> = { 1: 180, 2: 150, 3: 130 }

/** Trophy podium displaying the top 3 leaderboard entries with coloured platform blocks and avatar badges. */
export function Podium({ entries, rankColors, platformHeights }: PodiumProps) {
  const colors = rankColors ?? DEFAULT_RANK_COLOR
  const heights = platformHeights ?? DEFAULT_RANK_HEIGHT
  const top3 = entries.slice(0, 3)
  const display = [top3[1], top3[0], top3[2]].filter(Boolean)

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}
    >
      {display.map((p) => {
        const color = colors[p.rank] ?? 'var(--accent)'
        const height = heights[p.rank] ?? 120
        return (
          <div
            key={p.rank}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            <div style={{ position: 'relative' }}>
              <Avatar seed={p.seed} size={56} />
              <div
                style={{
                  position: 'absolute',
                  bottom: -6,
                  right: -6,
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  background: color,
                  color: '#05060A',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  border: '2px solid var(--bg)',
                }}
              >
                {p.rank}
              </div>
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {p.handle}
            </div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--ink-dim)' }}>
              {p.xp.toLocaleString()} XP
            </div>
            <div
              style={{
                width: '100%',
                height,
                background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                border: '1px solid var(--border)',
                borderBottom: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent 0 8px, rgba(0,0,0,0.12) 8px 9px)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#05060A',
                  opacity: 0.8,
                }}
              >
                {String(p.rank).padStart(2, '0')}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
