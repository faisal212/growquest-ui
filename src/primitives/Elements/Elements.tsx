import { useState, useEffect } from 'react'

export function Eyebrow({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim">
      {dot !== false && (
        <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" />
      )}
      {children}
    </div>
  )
}

export function Tag({ children, tone = 'default' }: { children: React.ReactNode; tone?: string }) {
  const toneClasses: Record<string, string> = {
    default: 'text-ink-dim border-border bg-panel-2',
    accent:
      'text-primary border-[color-mix(in_oklch,var(--color-primary)_40%,transparent)] bg-primary-soft',
    lime: 'text-accent-lime border-[color-mix(in_oklch,var(--accent-lime)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-lime)_14%,transparent)]',
    magenta:
      'text-accent-magenta border-[color-mix(in_oklch,var(--accent-magenta)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-magenta)_14%,transparent)]',
    amber:
      'text-accent-amber border-[color-mix(in_oklch,var(--accent-amber)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-amber)_14%,transparent)]',
    ghost: 'text-ink-dim border-border bg-transparent',
  }
  const cls = toneClasses[tone] ?? toneClasses.default
  return <span className={`chip ${cls}`}>{children}</span>
}

export function XPPill({ amount, icon = true }: { amount: number | string; icon?: boolean }) {
  return (
    <span className="chip primary gap-1.5 font-semibold">
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
    <span className="mono text-accent-magenta">
      {h}:{m}:{s}
    </span>
  )
}

export function Sparkline({
  values,
  color = 'var(--color-primary)',
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
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-border" />
      {label && (
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
