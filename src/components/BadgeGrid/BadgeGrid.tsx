import { memo } from 'react'
import type { Badge } from '../../types'

const ACCENT_COLORS = ['cyan', 'magenta', 'lime', 'amber', 'violet']

interface BadgeGridProps {
  badges: Badge[]
  columns?: number
}

export const BadgeGrid = memo(function BadgeGrid({ badges, columns = 3 }: BadgeGridProps) {
  return (
    <div className="panel p-5">
      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5">
        // badges · {badges.filter((b) => b.got).length}/{badges.length}
      </div>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {badges.map((b, i) => (
          <div
            key={b.id}
            title={b.desc}
            className="p-3.5 bg-panel-2 border border-border rounded-[10px] text-center"
            style={{ opacity: b.got ? 1 : 0.4 }}
          >
            <div
              className="w-11 h-11 mx-auto mb-2 rounded-[10px] grid place-items-center border border-border"
              style={{
                background: b.got ? `var(--accent-${ACCENT_COLORS[i % 5]})` : 'var(--panel)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22">
                <polygon
                  points="11,2 20,7 20,15 11,20 2,15 2,7"
                  fill={b.got ? '#05060A' : 'var(--ink-faint)'}
                />
              </svg>
            </div>
            <div className="font-semibold text-[12px]">{b.name}</div>
            <div className="text-[10px] text-ink-faint mt-0.5 font-mono uppercase tracking-[0.08em]">
              {b.got ? 'unlocked' : 'locked'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
