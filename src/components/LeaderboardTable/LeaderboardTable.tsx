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

type ToneName = 'accent' | 'lime' | 'magenta' | 'amber'

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  streakEmoji?: string
  columnLabels?: ColumnLabels
  /** Optional map: tier display name → tone. Falls back to "accent" for unmapped tiers. */
  tierToneMap?: Record<string, ToneName>
  /** Label for the "YOU" tag on the current user's row. */
  youTag?: string
}

const DEFAULT_LABELS: Required<ColumnLabels> = {
  rank: 'rank',
  handle: 'insider',
  streak: 'streak',
  tier: 'tier',
  xp: 'xp',
}

const DEFAULT_TIER_TONES: Record<string, ToneName> = {
  Oracle: 'magenta',
  Ascendant: 'lime',
}

export const LeaderboardTable = memo(function LeaderboardTable({
  entries,
  streakEmoji = '🔥',
  columnLabels,
  tierToneMap,
  youTag = 'YOU',
}: LeaderboardTableProps) {
  const labels = { ...DEFAULT_LABELS, ...columnLabels }
  const tones = tierToneMap ?? DEFAULT_TIER_TONES
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
          style={{ background: p.me ? 'var(--leaderboard-mine-bg)' : 'var(--leaderboard-row-bg)' }}
        >
          <span
            className="mono font-bold"
            style={{ color: p.rank <= 3 ? 'var(--leaderboard-top-rank)' : 'var(--ink)' }}
          >
            {String(p.rank).padStart(2, '0')}
          </span>
          <span className="lb-identity">
            <Avatar seed={p.seed} size={28} />
            <span className="font-semibold text-[14px]">{p.handle}</span>
            {p.me && <Tag tone="accent">{youTag}</Tag>}
          </span>
          <span className="mono lb-streak text-[13px] text-accent-amber">
            {p.streak}
            {streakEmoji}
          </span>
          <span className="lb-tier">
            <Tag tone={tones[p.tier] ?? 'accent'}>{p.tier}</Tag>
          </span>
          <span className="mono lb-xp">{p.xp.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
})
