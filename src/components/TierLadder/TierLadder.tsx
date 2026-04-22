import type { Tier } from '../../types'

interface TierLadderProps {
  tiers: Tier[]
  currentXP: number
}

/** Horizontal progression ladder showing all tiers. Highlights the tier the user currently occupies based on currentXP. */
export function TierLadder({ tiers, currentXP }: TierLadderProps) {
  const currentTier = [...tiers].reverse().find((t) => currentXP >= t.min) ?? tiers[0]

  return (
    <div className="panel" style={{ padding: 20 }}>
      <div className="mono-label" style={{ marginBottom: 14 }}>
        // tier ladder
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: `repeat(${tiers.length}, 1fr)`, gap: 10 }}
      >
        {tiers.map((t, i) => {
          const isCurrent = currentTier.name === t.name
          const isPast = currentXP >= t.min
          return (
            <div
              key={t.name}
              style={{
                padding: 14,
                borderRadius: 10,
                border: isCurrent ? `1px solid ${t.color}` : '1px solid var(--border)',
                background: isCurrent
                  ? `color-mix(in oklch, ${t.color} 12%, transparent)`
                  : 'var(--panel-2)',
                opacity: isPast || isCurrent ? 1 : 0.5,
              }}
            >
              <div className="mono-label">tier {String(i + 1).padStart(2, '0')}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  marginTop: 4,
                  color: isCurrent ? t.color : 'var(--ink)',
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--ink-dim)',
                  marginTop: 2,
                }}
              >
                {t.min.toLocaleString()}+ XP
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
