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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          background: 'var(--panel-2)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {parsed.kind === 'youtube' && (
          <iframe
            title="YouTube video player"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src={`https://www.youtube.com/embed/${parsed.id}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
        {parsed.kind === 'vimeo' && (
          <iframe
            title="Vimeo video player"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src={`https://player.vimeo.com/video/${parsed.id}?autoplay=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        )}
        {parsed.kind === 'native' && (
          <video
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            src={url}
            controls
            onEnded={() => setReady(true)}
          >
            <track kind="captions" />
          </video>
        )}
      </div>
      {parsed.kind !== 'native' && !ready && (
        <div style={{ fontSize: 12, color: 'var(--ink-dim)', textAlign: 'center' }}>
          Button available in {countdown}s
        </div>
      )}
      <Button variant="primary" disabled={!ready} onClick={onComplete} style={{ width: '100%' }}>
        I've watched it
      </Button>
    </div>
  )
}
