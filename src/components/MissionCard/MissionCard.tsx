import { memo } from 'react'
import { MissionIcon } from '../../art'
import { XPPill, Tag, Countdown } from '../../atoms'
import type { Mission } from '../../types'
import { toneColor } from '../../utils/toneColor'

export interface MissionCardProps {
  /** The mission data to render. */
  m: Mission
  /** Visual density. `compact` reduces padding and hides description text. @default 'comfortable' */
  density?: 'comfortable' | 'compact'
  /** Tile layout variant. `split` shows a hero gradient; `stack` is vertical; `list` is horizontal. @default 'split' */
  layout?: 'split' | 'stack' | 'list'
  /** Called when the user taps the tile to open the mission modal. */
  onOpen: (mission: Mission) => void
}

export const MissionCard = memo(function MissionCard({
  m,
  density = 'comfortable',
  layout = 'split',
  onOpen,
}: MissionCardProps) {
  const [done, total] = m.progress
  const pct = total > 0 ? done / total : 0
  const compact = density === 'compact'
  const padCls = compact ? 'p-3.5' : 'p-[18px]'

  if (layout === 'stack') {
    return (
      <button
        onClick={() => onOpen(m)}
        className={`mission-card text-left flex flex-col gap-2.5 ${padCls} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-xl transition-all duration-150`}
      >
        <div className="flex justify-between items-center">
          <div
            className="bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-8 h-8 rounded-md"
            style={{ color: toneColor(m.tone) }}
          >
            <MissionIcon type={m.type} size={18} />
          </div>
          {m.limited && (
            <Tag tone="magenta">
              LIMITED
              {m.endsAt ? (
                <>
                  {' '}
                  · <Countdown endsAt={m.endsAt} />
                </>
              ) : null}
            </Tag>
          )}
        </div>
        <div>
          <div
            className={`font-semibold mb-1 text-[color:var(--mission-card-title)] ${compact ? 'text-[13px]' : 'text-[15px]'}`}
          >
            {m.title}
          </div>
          {!compact && (
            <div className="text-xs text-[color:var(--mission-card-body)] leading-relaxed">
              {m.desc}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center gap-2.5 mt-auto">
          <XPPill amount={m.xp} />
          <span className="font-mono text-[11px] text-[color:var(--mission-card-body)]">
            {done}/{total}
          </span>
        </div>
        <div className="xpbar" style={{ height: 4 }}>
          <div className="fill" style={{ width: `${pct * 100}%` }} />
        </div>
      </button>
    )
  }

  if (layout === 'list') {
    return (
      <button
        onClick={() => onOpen(m)}
        className={`mission-card text-left flex items-center gap-3.5 ${padCls} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-[10px] w-full`}
      >
        <div
          className="bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-10 h-10 rounded-lg shrink-0"
          style={{ color: toneColor(m.tone) }}
        >
          <MissionIcon type={m.type} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-0.5 text-[color:var(--mission-card-title)]">
            {m.title}
          </div>
          <div className="text-xs text-[color:var(--mission-card-body)] overflow-hidden text-ellipsis whitespace-nowrap">
            {m.desc}
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          {m.limited && <Tag tone="magenta">LIMITED</Tag>}
          <span className="font-mono text-[11px] text-[color:var(--mission-card-body)]">
            {done}/{total}
          </span>
          <XPPill amount={m.xp} />
        </div>
      </button>
    )
  }

  // split (default)
  return (
    <button
      onClick={() => onOpen(m)}
      className={`mission-card text-left flex flex-col ${padCls} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-xl relative overflow-hidden`}
    >
      <div
        className="absolute top-0 right-0 w-20 h-20"
        style={{
          opacity: 'var(--mission-card-halo-opacity)',
          background: `radial-gradient(circle at 100% 0, ${toneColor(m.tone)} 0%, transparent 70%)`,
        }}
      />
      <div
        className={`flex justify-between items-start gap-2 relative ${compact ? 'mb-2.5' : 'mb-3.5'}`}
      >
        <div
          className="bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-[34px] h-[34px] rounded-[7px]"
          style={{ color: toneColor(m.tone) }}
        >
          <MissionIcon type={m.type} size={18} />
        </div>
        {m.limited && <Tag tone="magenta">⏱ LIMITED</Tag>}
      </div>
      <div
        className={`font-semibold mb-1 text-[color:var(--mission-card-title)] ${compact ? 'text-sm' : 'text-base'}`}
      >
        {m.title}
      </div>
      {!compact && (
        <div className="text-xs text-[color:var(--mission-card-body)] leading-relaxed mb-3.5">
          {m.desc}
        </div>
      )}
      <div className={`flex justify-between items-center gap-2.5 ${compact ? 'mt-2' : 'mt-auto'}`}>
        <XPPill amount={m.xp} />
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold tracking-[0.04em]"
          style={{
            background: toneColor(m.tone),
            color: 'var(--mission-card-cta-fg)',
          }}
        >
          GO
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path
              d="M1 5h8M5 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </button>
  )
})
