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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        padding: 24,
      }}
    >
      <div style={{ position: 'relative', width: 280 }}>
        {/* Reward underneath */}
        <div
          style={{
            height: 140,
            display: 'grid',
            placeItems: 'center',
            background: 'var(--panel-2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 11,
                color: 'var(--ink-dim)',
                marginBottom: 4,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              You won
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{reward}</div>
          </div>
        </div>
        {/* Scratch overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 10,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            padding: 2,
            pointerEvents: completed ? 'none' : 'auto',
          }}
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
              style={{
                background: revealed.has(i) ? 'transparent' : 'var(--panel)',
                border: revealed.has(i) ? 'none' : '1px solid var(--border)',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s',
                minHeight: 32,
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          color: completed ? 'var(--accent)' : 'var(--ink-dim)',
          textAlign: 'center',
        }}
      >
        {completed ? `🎉 You revealed: ${reward}` : `Scratch to reveal… ${pct}% uncovered`}
      </div>

      {!completed && (
        <button
          onClick={revealAll}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 11,
            color: 'var(--ink-dim)',
            textDecoration: 'underline',
          }}
        >
          Reveal all
        </button>
      )}
    </div>
  )
}
