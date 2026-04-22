import { useState, useEffect } from 'react'

export function Eyebrow({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <div className="eyebrow">
      {dot !== false && (
        <span
          style={{
            width: 6,
            height: 6,
            background: 'var(--accent)',
            borderRadius: 99,
            boxShadow: '0 0 8px var(--accent)',
          }}
        />
      )}
      {children}
    </div>
  )
}

export function Tag({ children, tone = 'default' }: { children: React.ReactNode; tone?: string }) {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      color: 'var(--ink-dim)',
      borderColor: 'var(--border)',
      background: 'var(--panel-2)',
    },
    accent: {
      color: 'var(--accent)',
      borderColor: 'color-mix(in oklch, var(--accent) 40%, transparent)',
      background: 'var(--accent-soft)',
    },
    lime: {
      color: 'var(--accent-lime)',
      borderColor: 'color-mix(in oklch, var(--accent-lime) 40%, transparent)',
      background: 'color-mix(in oklch, var(--accent-lime) 14%, transparent)',
    },
    magenta: {
      color: 'var(--accent-magenta)',
      borderColor: 'color-mix(in oklch, var(--accent-magenta) 40%, transparent)',
      background: 'color-mix(in oklch, var(--accent-magenta) 14%, transparent)',
    },
    amber: {
      color: 'var(--accent-amber)',
      borderColor: 'color-mix(in oklch, var(--accent-amber) 40%, transparent)',
      background: 'color-mix(in oklch, var(--accent-amber) 14%, transparent)',
    },
    ghost: { color: 'var(--ink-dim)', borderColor: 'var(--border)', background: 'transparent' },
  }
  const s = styles[tone] ?? styles.default
  return (
    <span className="chip" style={s}>
      {children}
    </span>
  )
}

export function XPPill({ amount, icon = true }: { amount: number | string; icon?: boolean }) {
  return (
    <span className="chip accent xp-pill">
      {icon && (
        <svg width="10" height="10" viewBox="0 0 10 10">
          <polygon
            points="5,0 6.3,3.7 10,3.7 7,6 8.2,10 5,7.6 1.8,10 3,6 0,3.7 3.7,3.7"
            fill="currentColor"
          />
        </svg>
      )}
      {amount} XP
    </span>
  )
}

export function Countdown({ endsAt }: { endsAt: number }) {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(i)
  }, [])
  const ms = Math.max(0, endsAt - now)
  const h = Math.floor(ms / 3.6e6)
    .toString()
    .padStart(2, '0')
  const m = Math.floor((ms % 3.6e6) / 6e4)
    .toString()
    .padStart(2, '0')
  const s = Math.floor((ms % 6e4) / 1000)
    .toString()
    .padStart(2, '0')
  return (
    <span className="mono" style={{ color: 'var(--accent-magenta)' }}>
      {h}:{m}:{s}
    </span>
  )
}

export function Sparkline({
  values,
  color = 'var(--accent)',
  w = 80,
  h = 24,
}: {
  values: number[]
  color?: string
  w?: number
  h?: number
}) {
  const min = Math.min(...values),
    max = Math.max(...values)
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w
      const y = h - ((v - min) / (max - min || 1)) * (h - 2) - 1
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export function Divider({ label }: { label?: string }) {
  return (
    <div className="divider">
      <div className="divider-line" />
      {label && <span className="eyebrow">{label}</span>}
      <div className="divider-line" />
    </div>
  )
}
