import { Sparkline } from '../../atoms'

export interface StatCardProps {
  label: string
  value: string | number
  trend: number[]
  trendColor?: string
}

/** Single metric card with a label, large value, and a sparkline trend chart. Used in the profile activity grid. */
export function StatCard({ label, value, trend, trendColor }: StatCardProps) {
  return (
    <div className="p-3.5 rounded-[var(--r-inset)] bg-[var(--profile-card-stat-bg)] border border-[color:var(--profile-card-stat-border)]">
      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-1.5">
        {label}
      </div>
      <div className="flex justify-between items-end">
        <span className="font-bold text-[22px]">{value}</span>
        <Sparkline values={trend} color={trendColor} />
      </div>
    </div>
  )
}
