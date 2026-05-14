import { memo } from 'react'
import { Avatar } from '../../art'
import { Tag } from '../../atoms'
import type { LeaderboardEntry } from '../../types'

interface ColumnLabels {
  rank?: string
  handle?: string
  streak?: string
  tier?: string
  xp?: string
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  streakEmoji?: string
  columnLabels?: ColumnLabels
}

const DEFAULT_LABELS: Required<ColumnLabels> = {
  rank: 'rank',
  handle: 'insider',
  streak: 'streak',
  tier: 'tier',
  xp: 'xp',
}

export const LeaderboardTable = memo(function LeaderboardTable({
  entries,
  streakEmoji = '🔥',
  columnLabels,
}: LeaderboardTableProps) {
  const labels = { ...DEFAULT_LABELS, ...columnLabels }
  return (
    <div className="panel overflow-hidden">
      <div className="lb-head lb-row">
        <span>{labels.rank}</span>
        <span>{labels.handle}</span>
        <span className="lb-streak">{labels.streak}</span>
        <span className="lb-tier">{labels.tier}</span>
        <span className="lb-cell-right">{labels.xp}</span>
      </div>
      {entries.map((p) => (
        <div
          key={p.rank}
          className="lb-row"
          style={{ background: p.me ? 'var(--accent-soft)' : 'transparent' }}
        >
          <span
            className="mono font-bold"
            style={{ color: p.rank <= 3 ? 'var(--accent)' : 'var(--ink)' }}
          >
            {String(p.rank).padStart(2, '0')}
          </span>
          <span className="lb-identity">
            <Avatar seed={p.seed} size={28} />
            <span className="font-semibold text-[14px]">{p.handle}</span>
            {p.me && <Tag tone="accent">YOU</Tag>}
          </span>
          <span className="mono lb-streak text-[13px] text-accent-amber">
            {p.streak}
            {streakEmoji}
          </span>
          <span className="lb-tier">
            <Tag
              tone={p.tier === 'Oracle' ? 'magenta' : p.tier === 'Ascendant' ? 'lime' : 'accent'}
            >
              {p.tier}
            </Tag>
          </span>
          <span className="mono lb-xp">{p.xp.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
})
