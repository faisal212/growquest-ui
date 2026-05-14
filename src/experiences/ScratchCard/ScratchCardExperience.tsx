import { useState } from 'react'

const TILE_COUNT = 16

export function ScratchCardExperience({
  reward = '200 XP',
  onComplete,
}: {
  reward?: string
  onComplete: () => void
}) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [completed, setCompleted] = useState(false)

  function revealTile(i: number) {
    if (completed) return
    setRevealed((prev) => {
      const next = new Set(prev)
      next.add(i)
      const pct = (next.size / TILE_COUNT) * 100
      if (pct >= 75 && !completed) {
        setCompleted(true)
        setTimeout(onComplete, 1500)
      }
      return next
    })
  }

  function revealAll() {
    const all = new Set(Array.from({ length: TILE_COUNT }, (_, i) => i))
    setRevealed(all)
    setCompleted(true)
    setTimeout(onComplete, 1500)
  }

  const pct = Math.round((revealed.size / TILE_COUNT) * 100)

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="relative w-[280px]">
        {/* Reward underneath */}
        <div className="h-[140px] grid place-items-center bg-panel-2 border border-border rounded-[10px]">
          <div className="text-center">
            <div className="text-[11px] text-ink-dim mb-1 font-mono uppercase tracking-[0.06em]">
              You won
            </div>
            <div className="text-[32px] font-extrabold text-primary">{reward}</div>
          </div>
        </div>
        {/* Scratch overlay */}
        <div
          className={`absolute inset-0 rounded-[10px] grid grid-cols-4 gap-0.5 p-0.5 ${completed ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
          {Array.from({ length: TILE_COUNT }, (_, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Scratch tile ${i + 1}`}
              onClick={() => revealTile(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') revealTile(i)
              }}
              onMouseEnter={(e) => {
                if (e.buttons === 1) revealTile(i)
              }}
              className={`rounded-md cursor-pointer transition-[background] duration-150 min-h-8 ${revealed.has(i) ? 'bg-transparent border-none' : 'bg-panel border border-border'}`}
            />
          ))}
        </div>
      </div>

      <div className={`text-xs text-center ${completed ? 'text-primary' : 'text-ink-dim'}`}>
        {completed ? `🎉 You revealed: ${reward}` : `Scratch to reveal… ${pct}% uncovered`}
      </div>

      {!completed && (
        <button
          onClick={revealAll}
          className="bg-transparent border-none cursor-pointer text-[11px] text-ink-dim underline"
        >
          Reveal all
        </button>
      )}
    </div>
  )
}
