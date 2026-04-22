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
  const tone = r.tone === 'accent' ? 'cyan' : r.tone

  return (
    <div className="panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          aspectRatio: compact ? '2 / 1' : '4 / 3',
          position: 'relative',
          background: 'var(--panel-2)',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        {r.imageUrl ? (
          <img
            src={r.imageUrl}
            alt={r.title}
            width={400}
            height={300}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${tone}) 20%, transparent) 0 8px, transparent 8px 18px)`,
              }}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
              <div
                style={{
                  width: compact ? 52 : 68,
                  height: compact ? 52 : 68,
                  borderRadius: 12,
                  background: `var(--accent-${tone})`,
                  color: '#05060A',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  fontSize: compact ? 9 : 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                }}
              >
                {r.kind.slice(0, 4)}
              </div>
            </div>
          </>
        )}
        {r.limited && (
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <Tag tone="magenta">LIMITED</Tag>
          </div>
        )}
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Tag>{r.stock}</Tag>
        </div>
      </div>
      <div
        style={{
          padding: compact ? 10 : 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flex: 1,
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: compact ? 13 : 14 }}>{r.title}</div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--ink-dim)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginTop: 2,
            }}
          >
            {r.kind}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            marginTop: 'auto',
          }}
        >
          <XPPill amount={r.cost.toLocaleString()} />
          <Button variant="primary" size="sm" disabled={!canAfford} onClick={() => onRedeem(r)}>
            {canAfford ? 'Redeem' : 'Locked'}
          </Button>
        </div>
      </div>
    </div>
  )
})
