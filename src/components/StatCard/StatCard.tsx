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
    <div className="stat-card">
      <div className="mono-label" style={{ marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontWeight: 700, fontSize: 22 }}>{value}</span>
        <Sparkline values={trend} color={trendColor} />
      </div>
    </div>
  )
}
