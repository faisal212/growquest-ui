import { Button } from '../../primitives/Button'
import type { Badge } from '../../types'

const DEFAULT_BADGES: Badge[] = [
  { id: 'b1', name: 'First Quest', got: true, desc: 'Completed your first mission.' },
  { id: 'b2', name: 'Streak ×7', got: true, desc: '7-day streak maintained.' },
  { id: 'b3', name: 'Evangelist', got: false, desc: 'Refer 10 teammates.' },
  { id: 'b4', name: 'Lorekeeper', got: false, desc: 'Complete all weekly quizzes.' },
]

export function BadgeCollectExperience({
  badges = DEFAULT_BADGES,
  goal = 3,
  earned,
  onComplete,
}: {
  badges?: Badge[]
  goal?: number
  earned?: number
  onComplete: () => void
}) {
  const earnedCount = earned ?? badges.filter((b) => b.got).length
  const done = earnedCount >= goal

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      {/* Progress */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--ink-dim)',
          }}
        >
          <span>Badges collected</span>
          <span style={{ color: done ? 'var(--accent-lime)' : 'var(--ink)' }}>
            {earnedCount}/{goal}
          </span>
        </div>
        <div
          style={{ height: 6, background: 'var(--panel-2)', borderRadius: 3, overflow: 'hidden' }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, (earnedCount / goal) * 100)}%`,
              background: done ? 'var(--accent-lime)' : 'var(--accent)',
              transition: 'width 0.4s ease',
              borderRadius: 3,
            }}
          />
        </div>
      </div>

      {/* Badge grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {badges.map((badge) => (
          <div
            key={badge.id}
            style={{
              padding: 12,
              background: 'var(--panel-2)',
              border: `1px ${badge.got ? 'solid' : 'dashed'} ${badge.got ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 8,
              opacity: badge.got ? 1 : 0.45,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 18 }}>🏅</span>
              {badge.got && (
                <span
                  style={{
                    fontSize: 10,
                    background: 'var(--accent)',
                    color: '#05060A',
                    padding: '1px 6px',
                    borderRadius: 4,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{badge.name}</div>
          </div>
        ))}
      </div>

      {!done && (
        <div style={{ fontSize: 12, color: 'var(--ink-dim)', textAlign: 'center' }}>
          Keep completing missions to earn more badges
        </div>
      )}

      <Button variant="primary" disabled={!done} onClick={onComplete} style={{ width: '100%' }}>
        {done
          ? 'Claim XP'
          : `Earn ${goal - earnedCount} more badge${goal - earnedCount !== 1 ? 's' : ''}`}
      </Button>
    </div>
  )
}
