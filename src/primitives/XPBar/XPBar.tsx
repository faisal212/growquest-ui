export interface XPBarProps {
  value: number
  max: number
  style?: string
  segments?: number
  label?: string
}

export function XPBar({ value, max, style = 'segmented', segments = 10, label }: XPBarProps) {
  const pct = Math.max(0, Math.min(1, value / max))

  if (style === 'plain') {
    return (
      <div>
        {label && (
          <div className="xpbar-label">
            <span>{label}</span>
            <span>
              {value}/{max}
            </span>
          </div>
        )}
        <div className="xpbar">
          <div className="fill" style={{ width: `${pct * 100}%` }} />
        </div>
      </div>
    )
  }

  if (style === 'segmented') {
    const on = Math.round(pct * segments)
    return (
      <div>
        {label && (
          <div className="xpbar-label">
            <span>{label}</span>
            <span>
              {value}/{max}
            </span>
          </div>
        )}
        <div className="xp-seg">
          {Array.from({ length: segments }).map((_, i) => (
            <div key={i} className={`seg ${i < on ? 'on' : ''}`} />
          ))}
        </div>
      </div>
    )
  }

  if (style === 'ring') {
    const r = 30,
      c = 2 * Math.PI * r
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--panel-2)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            transform="rotate(-90 40 40)"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 6px var(--accent))',
              transition: 'stroke-dashoffset 800ms ease',
            }}
          />
          <text
            x="40"
            y="44"
            textAnchor="middle"
            fontFamily="JetBrains Mono"
            fontSize="13"
            fontWeight="700"
            fill="currentColor"
          >
            {Math.round(pct * 100)}%
          </text>
        </svg>
        {label && (
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-dim)',
              }}
            >
              {label}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }}>
              {value}/{max}
            </div>
          </div>
        )}
      </div>
    )
  }

  // notched (default fallback)
  return (
    <div>
      {label && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 6,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--ink-dim)',
          }}
        >
          <span>{label}</span>
          <span>
            {value}/{max}
          </span>
        </div>
      )}
      <div
        style={{
          position: 'relative',
          height: 14,
          border: '1px solid var(--border)',
          borderRadius: 3,
          background: 'var(--panel-2)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 2,
            background: `linear-gradient(90deg, var(--accent) 0%, var(--accent) ${pct * 100}%, transparent ${pct * 100}%)`,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0 9px, color-mix(in oklch, var(--bg) 60%, transparent) 9px 10px)',
          }}
        />
      </div>
    </div>
  )
}
