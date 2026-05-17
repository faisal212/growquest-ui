import { Avatar } from '../../art'
import type { LeaderboardEntry } from '../../types'

interface PodiumProps {
  entries: LeaderboardEntry[]
  rankColors?: Record<number, string>
  platformHeights?: Record<number, number>
}

const DEFAULT_RANK_COLOR: Record<number, string> = {
  1: 'color-mix(in oklch, var(--color-primary) 50%, var(--color-secondary))',
  2: 'var(--color-primary)',
  3: 'var(--color-secondary)',
}
const DEFAULT_RANK_HEIGHT: Record<number, number> = { 1: 180, 2: 150, 3: 130 }

/** Trophy podium displaying the top 3 leaderboard entries with coloured platform blocks and avatar badges. */
export function Podium({ entries, rankColors, platformHeights }: PodiumProps) {
  const colors = rankColors ?? DEFAULT_RANK_COLOR
  const heights = platformHeights ?? DEFAULT_RANK_HEIGHT
  const top3 = entries.slice(0, 3)
  const display = [top3[1], top3[0], top3[2]].filter(Boolean)

  return (
    <div className="grid grid-cols-3 gap-3.5 mb-7">
      {display.map((p) => {
        const color = colors[p.rank] ?? 'var(--color-primary)'
        const height = heights[p.rank] ?? 120
        return (
          <div key={p.rank} className="flex flex-col items-center gap-2.5">
            <div className="relative">
              <Avatar seed={p.seed} size={56} />
              <div
                className="absolute -bottom-1.5 -right-1.5 w-[22px] h-[22px] rounded-[var(--r-tag-lg)] grid place-items-center font-mono text-[11px] font-bold border-2 border-bg text-[color:var(--podium-rank-fg)]"
                style={{ background: color }}
              >
                {p.rank}
              </div>
            </div>
            <div className="font-bold text-[14px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[color:var(--podium-handle)]">
              {p.handle}
            </div>
            <div className="mono text-[12px] text-[color:var(--podium-xp)]">
              {p.xp.toLocaleString()} XP
            </div>
            <div
              className="w-full rounded-t-lg border border-border border-b-0 relative overflow-hidden"
              style={{
                height,
                background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_8px,var(--podium-platform-pattern)_8px_9px)]" />
              <div className="absolute top-2.5 left-2.5 font-mono text-[28px] font-bold opacity-80 text-[color:var(--podium-rank-fg)]">
                {String(p.rank).padStart(2, '0')}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
