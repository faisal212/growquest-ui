import { useEffect, useState } from 'react'
import { Button } from '../../primitives/Button'

type VideoKind =
  | { kind: 'youtube'; id: string }
  | { kind: 'vimeo'; id: string }
  | { kind: 'native' }

function detectVideoType(url: string): VideoKind {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (ytMatch) return { kind: 'youtube', id: ytMatch[1] }
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return { kind: 'vimeo', id: vimeoMatch[1] }
  return { kind: 'native' }
}

export function VideoExperience({ url, onComplete }: { url: string; onComplete: () => void }) {
  const [ready, setReady] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const parsed = detectVideoType(url)

  useEffect(() => {
    if (parsed.kind === 'native') return
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(id)
          setReady(true)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [parsed.kind])

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="relative pb-[56.25%] bg-panel-2 rounded-lg overflow-hidden">
        {parsed.kind === 'youtube' && (
          <iframe
            title="YouTube video player"
            className="absolute inset-0 w-full h-full border-none"
            src={`https://www.youtube.com/embed/${parsed.id}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
        {parsed.kind === 'vimeo' && (
          <iframe
            title="Vimeo video player"
            className="absolute inset-0 w-full h-full border-none"
            src={`https://player.vimeo.com/video/${parsed.id}?autoplay=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        )}
        {parsed.kind === 'native' && (
          <video
            className="absolute inset-0 w-full h-full"
            src={url}
            controls
            onEnded={() => setReady(true)}
          >
            <track kind="captions" />
          </video>
        )}
      </div>
      {parsed.kind !== 'native' && !ready && (
        <div className="text-xs text-ink-dim text-center">Button available in {countdown}s</div>
      )}
      <Button variant="primary" disabled={!ready} onClick={onComplete} className="w-full">
        I've watched it
      </Button>
    </div>
  )
}
