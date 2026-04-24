import { useEffect, useState } from 'react'
import { Button } from '../../primitives/Button'

export function ReadArticleExperience({
  url,
  onComplete,
}: {
  url?: string
  onComplete: () => void
}) {
  const [opened, setOpened] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!opened) return
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id)
          setDone(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [opened])

  const progress = opened ? Math.round(((60 - secondsLeft) / 60) * 100) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24 }}>
      <div
        style={{
          padding: 16,
          background: 'var(--panel-2)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: 'var(--ink-dim)',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Article
        </div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>How XP &amp; Levels work in GrowQuest</div>
        {url && (
          <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>
            {url.replace(/^https?:\/\//, '')}
          </div>
        )}
      </div>

      {!opened ? (
        <Button
          variant="ghost"
          onClick={() => {
            if (url) window.open(url, '_blank')
            setOpened(true)
          }}
          style={{ width: '100%' }}
        >
          Open article ↗
        </Button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              color: 'var(--ink-dim)',
            }}
          >
            <span>{done ? 'Reading complete!' : `Reading… ${secondsLeft}s remaining`}</span>
            <span>{progress}%</span>
          </div>
          <div
            style={{ height: 4, background: 'var(--panel-2)', borderRadius: 2, overflow: 'hidden' }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'var(--accent)',
                transition: 'width 1s linear',
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      )}

      <Button variant="primary" disabled={!done} onClick={onComplete} style={{ width: '100%' }}>
        Mark as read
      </Button>
    </div>
  )
}
