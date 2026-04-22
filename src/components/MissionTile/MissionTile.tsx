import { MissionIcon } from '../../art'
import { XPPill, Tag, Countdown } from '../../atoms'
import type { Mission } from '../../types'
import { toneColor } from '../../utils/toneColor'

export interface MissionTileProps {
  /** The mission data to render. */
  m: Mission
  /** Visual density. `compact` reduces padding and hides description text. @default 'comfortable' */
  density?: 'comfortable' | 'compact'
  /** Tile layout variant. `split` shows a hero gradient; `stack` is vertical; `list` is horizontal. @default 'split' */
  layout?: 'split' | 'stack' | 'list'
  /** Called when the user taps the tile to open the mission modal. */
  onOpen: (mission: Mission) => void
}

/** Renders a single gamification mission as a tile. Supports split / stack / list layouts and comfortable / compact density. */
export function MissionTile({
  m,
  density = 'comfortable',
  layout = 'split',
  onOpen,
}: MissionTileProps) {
  const [done, total] = m.progress
  const pct = total > 0 ? done / total : 0
  const compact = density === 'compact'
  const padding = compact ? 14 : 18

  if (layout === 'stack') {
    return (
      <button
        onClick={() => onOpen(m)}
        className="mission-tile"
        style={{
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding,
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          transition: 'all 160ms ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            className="icon-box"
            style={{ width: 32, height: 32, borderRadius: 6, color: toneColor(m.tone) }}
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
          <div style={{ fontWeight: 600, fontSize: compact ? 13 : 15, marginBottom: 4 }}>
            {m.title}
          </div>
          {!compact && (
            <div style={{ fontSize: 12, color: 'var(--ink-dim)', lineHeight: 1.5 }}>{m.desc}</div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            marginTop: 'auto',
          }}
        >
          <XPPill amount={m.xp} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
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
        className="mission-tile"
        style={{
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding,
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          width: '100%',
        }}
      >
        <div
          className="icon-box"
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            color: toneColor(m.tone),
            flexShrink: 0,
          }}
        >
          <MissionIcon type={m.type} size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{m.title}</div>
          <div
            style={{
              fontSize: 12,
              color: 'var(--ink-dim)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {m.desc}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {m.limited && <Tag tone="magenta">LIMITED</Tag>}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
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
      className="mission-tile"
      style={{
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        padding,
        background: 'var(--panel)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: `radial-gradient(circle at 100% 0, var(--accent-${m.tone === 'accent' ? 'cyan' : m.tone}) 0%, transparent 70%)`,
          opacity: 0.25,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 8,
          marginBottom: compact ? 10 : 14,
          position: 'relative',
        }}
      >
        <div
          className="icon-box"
          style={{ width: 34, height: 34, borderRadius: 7, color: toneColor(m.tone) }}
        >
          <MissionIcon type={m.type} size={18} />
        </div>
        {m.limited && <Tag tone="magenta">⏱ LIMITED</Tag>}
      </div>
      <div style={{ fontWeight: 600, fontSize: compact ? 14 : 16, marginBottom: 4 }}>{m.title}</div>
      {!compact && (
        <div style={{ fontSize: 12, color: 'var(--ink-dim)', lineHeight: 1.5, marginBottom: 14 }}>
          {m.desc}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          marginTop: compact ? 8 : 'auto',
        }}
      >
        <XPPill amount={m.xp} />
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 10px',
            background: toneColor(m.tone),
            color: '#05060A',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.04em',
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
}
