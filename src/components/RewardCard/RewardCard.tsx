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
  const onToneColor =
    r.tone === 'secondary' ? 'var(--on-secondary, var(--on-primary))' : 'var(--on-primary)'

  // Compact = the narrow rewards rail. A portrait product tile: tall 4:3
  // hero, 2-line clamped title, cost on its own line, full-width CTA pinned
  // to the bottom so every tile is the same height and nothing collides.
  if (compact) {
    return (
      <div
        className={`relative bg-[var(--reward-card-bg)] border border-[color:var(--reward-card-border)] rounded-[var(--r-panel)] overflow-hidden flex flex-col h-full${
          canAfford ? '' : ' opacity-60'
        }`}
      >
        {r.limited && (
          <div
            data-testid="reward-limited-accent"
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] z-10"
            style={{ background: 'var(--tone-secondary)' }}
          />
        )}
        <div
          className="relative bg-[var(--reward-card-image-bg)] border-b border-[color:var(--reward-card-image-border)] overflow-hidden"
          style={{ aspectRatio: '4 / 3' }}
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
                  background: `linear-gradient(150deg, color-mix(in oklch, ${toneVar} 24%, var(--reward-card-image-bg)), color-mix(in oklch, ${toneVar} 7%, var(--reward-card-image-bg)))`,
                }}
              />
              <div className="absolute inset-0 grid place-items-center px-3">
                <div
                  data-testid="reward-placeholder-label"
                  className="font-mono font-bold tracking-[0.2em] uppercase text-center text-[15px] leading-tight"
                  style={{ color: toneVar }}
                >
                  {r.kind}
                </div>
              </div>
            </>
          )}
          {!canAfford && (
            <div className="absolute top-2.5 right-2.5">
              <Tag tone="secondary">Locked</Tag>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1 p-3">
          <div>
            <div
              title={r.title}
              className="font-semibold text-[color:var(--reward-card-title)] text-[14px] leading-[1.3] line-clamp-2 min-h-[2.6em]"
            >
              {r.title}
            </div>
            <div className="text-[11px] text-[color:var(--reward-card-body)] font-mono uppercase tracking-[0.1em] mt-0.5">
              {r.kind}
            </div>
          </div>
          <div className="mt-auto">
            <XPPill amount={r.cost.toLocaleString()} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--reward-card-bg)] border border-[color:var(--reward-card-border)] rounded-[var(--r-panel)] overflow-hidden flex flex-col">
      <div
        className="relative bg-[var(--reward-card-image-bg)] border-b border-[color:var(--reward-card-image-border)] overflow-hidden"
        style={{ aspectRatio: '4 / 3' }}
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
                className="rounded-xl grid place-items-center font-bold font-mono tracking-[0.1em] uppercase shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
                style={{
                  width: 68,
                  height: 68,
                  background: toneVar,
                  // Contrast-aware against the tone background (mirrors MissionCard).
                  color: onToneColor,
                  fontSize: 11,
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
      <div className="flex flex-col gap-2 flex-1 p-[14px]">
        <div>
          <div className="font-semibold text-[color:var(--reward-card-title)] text-[14px]">
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
