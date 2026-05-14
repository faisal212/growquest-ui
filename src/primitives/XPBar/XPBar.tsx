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
          <div className="flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim">
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
          <div className="flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim">
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
      <div className="inline-flex items-center gap-3">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--panel-2)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="6"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            transform="rotate(-90 40 40)"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 6px var(--color-primary))',
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
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-dim">
              {label}
            </div>
            <div className="font-mono text-sm font-bold">
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
        <div className="flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim">
          <span>{label}</span>
          <span>
            {value}/{max}
          </span>
        </div>
      )}
      <div className="relative h-3.5 border border-border rounded-[3px] bg-panel-2 overflow-hidden">
        <div
          className="absolute inset-0.5 rounded-sm"
          style={{
            background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) ${pct * 100}%, transparent ${pct * 100}%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0 9px, color-mix(in oklch, var(--bg) 60%, transparent) 9px 10px)',
          }}
        />
      </div>
    </div>
  )
}
