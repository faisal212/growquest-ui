import { memo } from 'react'
import { useContent } from '../../config'
import type { Badge } from '../../types'

const DEFAULT_UNLOCKED_TONES = [
  'var(--accent-cyan)',
  'var(--accent-magenta)',
  'var(--accent-lime)',
  'var(--accent-amber)',
  'var(--accent-violet)',
]

interface BadgeGridProps {
  badges: Badge[]
  columns?: number
  /** Raw color rotation for unlocked badge backgrounds. Modulo by length per index. */
  unlockedTones?: string[]
}

export const BadgeGrid = memo(function BadgeGrid({
  badges,
  columns = 3,
  unlockedTones,
}: BadgeGridProps) {
  const badgesEyebrow = useContent<string>('profile.badgesEyebrow')
  const unlockedLabel = useContent<string>('profile.badgeUnlocked')
  const lockedLabel = useContent<string>('profile.badgeLocked')
  const tones = unlockedTones && unlockedTones.length > 0 ? unlockedTones : DEFAULT_UNLOCKED_TONES
  const unlockedCount = badges.filter((b) => b.got).length

  return (
    <div className="panel p-5">
      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5">
        // {badgesEyebrow} · {unlockedCount}/{badges.length}
      </div>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {badges.map((b, i) => (
          <div
            key={b.id}
            title={b.desc}
            className="p-3.5 rounded-[10px] text-center"
            style={{
              background: 'var(--badge-grid-bg)',
              border: '1px solid var(--badge-grid-border)',
              opacity: b.got ? 1 : 0.4,
            }}
          >
            <div
              className="w-11 h-11 mx-auto mb-2 rounded-[10px] grid place-items-center border border-border"
              style={{
                background: b.got ? tones[i % tones.length] : 'var(--panel)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22">
                <polygon
                  points="11,2 20,7 20,15 11,20 2,15 2,7"
                  fill={b.got ? '#05060A' : 'var(--badge-grid-locked-fg)'}
                />
              </svg>
            </div>
            <div className="font-semibold text-[12px]">{b.name}</div>
            <div className="text-[10px] text-ink-faint mt-0.5 font-mono uppercase tracking-[0.08em]">
              {b.got ? unlockedLabel : lockedLabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
