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
    <div className="flex flex-col gap-5 p-6">
      <div className="p-4 bg-panel-2 border border-border rounded-[var(--r-inset)] flex flex-col gap-2">
        <div className="text-xs text-ink-dim font-mono uppercase tracking-[0.06em]">Article</div>
        <div className="font-semibold text-[15px]">How XP &amp; Levels work in GrowQuest</div>
        {url && <div className="text-xs text-ink-dim">{url.replace(/^https?:\/\//, '')}</div>}
      </div>

      {!opened ? (
        <Button
          variant="ghost"
          onClick={() => {
            if (url) window.open(url, '_blank')
            setOpened(true)
          }}
          className="w-full"
        >
          Open article ↗
        </Button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-ink-dim">
            <span>{done ? 'Reading complete!' : `Reading… ${secondsLeft}s remaining`}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-panel-2 rounded-sm overflow-hidden">
            <div
              className="h-full bg-primary rounded-sm transition-[width] duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <Button variant="primary" disabled={!done} onClick={onComplete} className="w-full">
        Mark as read
      </Button>
    </div>
  )
}
