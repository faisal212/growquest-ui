import type { Tier } from '../../types'

interface TierLadderProps {
  tiers: Tier[]
  currentXP: number
}

/** Horizontal progression ladder showing all tiers. Highlights the tier the user currently occupies based on currentXP. */
export function TierLadder({ tiers, currentXP }: TierLadderProps) {
  const currentTier = [...tiers].reverse().find((t) => currentXP >= t.min) ?? tiers[0]

  return (
    <div className="panel p-5">
      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5">
        // tier ladder
      </div>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${tiers.length}, 1fr)` }}>
        {tiers.map((t, i) => {
          const isCurrent = currentTier.name === t.name
          const isPast = currentXP >= t.min
          return (
            <div
              key={t.name}
              className="p-3.5 rounded-[10px] border"
              style={{
                borderColor: isCurrent ? t.color : 'var(--border)',
                background: isCurrent
                  ? `color-mix(in oklch, ${t.color} 12%, transparent)`
                  : 'var(--panel-2)',
                opacity: isPast || isCurrent ? 1 : 0.5,
              }}
            >
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim">
                tier {String(i + 1).padStart(2, '0')}
              </div>
              <div
                className="font-bold text-[16px] mt-1"
                style={{ color: isCurrent ? t.color : 'var(--ink)' }}
              >
                {t.name}
              </div>
              <div className="font-mono text-[11px] text-ink-dim mt-0.5">
                {t.min.toLocaleString()}+ XP
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
