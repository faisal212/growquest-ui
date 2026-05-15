import { memo } from 'react'
import { Tag, XPPill, Button } from '../../atoms'
import type { Persona, Reward } from '../../types'

export interface RewardCardProps {
  r: Reward
  persona: Pick<Persona, 'xp'>
  onRedeem: (r: Reward) => void
  compact?: boolean
}

export const RewardCard = memo(function RewardCard({
  r,
  persona,
  onRedeem,
  compact = false,
}: RewardCardProps) {
  const canAfford = persona.xp >= r.cost
  const toneVar = `var(--tone-${r.tone})`

  return (
    <div className="bg-[var(--reward-card-bg)] border border-[color:var(--reward-card-border)] rounded-[var(--radius-card,14px)] overflow-hidden flex flex-col">
      <div
        className="relative bg-[var(--reward-card-image-bg)] border-b border-[color:var(--reward-card-image-border)] overflow-hidden"
        style={{ aspectRatio: compact ? '2 / 1' : '4 / 3' }}
      >
        {r.imageUrl ? (
          <img
            src={r.imageUrl}
            alt={r.title}
            width={400}
            height={300}
            loading="lazy"
            className="w-full h-full object-cover block"
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, ${toneVar} 20%, transparent) 0 8px, transparent 8px 18px)`,
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div
                className="rounded-xl text-[#05060A] grid place-items-center font-bold font-mono tracking-[0.1em] uppercase shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
                style={{
                  width: compact ? 52 : 68,
                  height: compact ? 52 : 68,
                  background: toneVar,
                  fontSize: compact ? 9 : 11,
                }}
              >
                {r.kind.slice(0, 4)}
              </div>
            </div>
          </>
        )}
        {r.limited && (
          <div className="absolute top-2.5 left-2.5">
            <Tag tone="secondary">LIMITED</Tag>
          </div>
        )}
        <div className="absolute top-2.5 right-2.5">
          <Tag>{r.stock}</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1" style={{ padding: compact ? 10 : 14 }}>
        <div>
          <div
            className="font-semibold text-[color:var(--reward-card-title)]"
            style={{ fontSize: compact ? 13 : 14 }}
          >
            {r.title}
          </div>
          <div className="text-[11px] text-[color:var(--reward-card-body)] font-mono uppercase tracking-[0.1em] mt-0.5">
            {r.kind}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <XPPill amount={r.cost.toLocaleString()} />
          <Button variant="primary" size="sm" disabled={!canAfford} onClick={() => onRedeem(r)}>
            {canAfford ? 'Redeem' : 'Locked'}
          </Button>
        </div>
      </div>
    </div>
  )
})
