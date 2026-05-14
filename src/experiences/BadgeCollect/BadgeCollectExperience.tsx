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
    <div className="flex flex-col gap-4 p-6">
      {/* Progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-ink-dim">
          <span>Badges collected</span>
          <span className={done ? 'text-accent-lime' : 'text-ink'}>
            {earnedCount}/{goal}
          </span>
        </div>
        <div className="h-1.5 bg-panel-2 rounded-[3px] overflow-hidden">
          <div
            className={`h-full rounded-[3px] transition-[width] duration-[400ms] ease-out ${done ? 'bg-accent-lime' : 'bg-accent'}`}
            style={{
              width: `${Math.min(100, (earnedCount / goal) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 gap-2">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-3 bg-panel-2 rounded-lg flex flex-col gap-1 border ${badge.got ? 'border-solid border-accent opacity-100' : 'border-dashed border-border opacity-45'}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[18px]">🏅</span>
              {badge.got && (
                <span className="text-[10px] text-[#05060A] bg-accent py-px px-1.5 rounded-[4px] font-bold">
                  ✓
                </span>
              )}
            </div>
            <div className="text-xs font-semibold">{badge.name}</div>
          </div>
        ))}
      </div>

      {!done && (
        <div className="text-xs text-ink-dim text-center">
          Keep completing missions to earn more badges
        </div>
      )}

      <Button variant="primary" disabled={!done} onClick={onComplete} className="w-full">
        {done
          ? 'Claim XP'
          : `Earn ${goal - earnedCount} more badge${goal - earnedCount !== 1 ? 's' : ''}`}
      </Button>
    </div>
  )
}
