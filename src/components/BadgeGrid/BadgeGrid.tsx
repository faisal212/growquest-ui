import { memo } from 'react'
import type { Badge } from '../../types'

const ACCENT_COLORS = ['cyan', 'magenta', 'lime', 'amber', 'violet']

interface BadgeGridProps {
  badges: Badge[]
  columns?: number
}

export const BadgeGrid = memo(function BadgeGrid({ badges, columns = 3 }: BadgeGridProps) {
  return (
    <div className="panel" style={{ padding: 20 }}>
      <div className="mono-label" style={{ marginBottom: 14 }}>
        // badges · {badges.filter((b) => b.got).length}/{badges.length}
      </div>
      <div style={{ display: 'grid', gap: 10, gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {badges.map((b, i) => (
          <div
            key={b.id}
            title={b.desc}
            style={{
              padding: 14,
              background: 'var(--panel-2)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              textAlign: 'center',
              opacity: b.got ? 1 : 0.4,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                margin: '0 auto 8px',
                borderRadius: 10,
                background: b.got ? `var(--accent-${ACCENT_COLORS[i % 5]})` : 'var(--panel)',
                display: 'grid',
                placeItems: 'center',
                border: '1px solid var(--border)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22">
                <polygon
                  points="11,2 20,7 20,15 11,20 2,15 2,7"
                  fill={b.got ? '#05060A' : 'var(--ink-faint)'}
                />
              </svg>
            </div>
            <div style={{ fontWeight: 600, fontSize: 12 }}>{b.name}</div>
            <div
              style={{
                fontSize: 10,
                color: 'var(--ink-faint)',
                marginTop: 2,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {b.got ? 'unlocked' : 'locked'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
