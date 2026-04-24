import { useState } from 'react'
import { Button } from '../../primitives/Button'

type Platform = 'Instagram' | 'Twitter' | 'YouTube' | 'Telegram' | 'Facebook'

function PlatformIcon({ platform }: { platform: string }) {
  const p = platform as Platform
  if (p === 'Instagram')
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    )
  if (p === 'Twitter')
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  if (p === 'YouTube')
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
      </svg>
    )
  if (p === 'Telegram')
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinejoin="round" />
      </svg>
    )
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  )
}

export function FollowSocialExperience({
  platform = 'Instagram',
  handle = '@growquest',
  url = 'https://instagram.com/growquest',
  onComplete,
}: {
  platform?: string
  handle?: string
  url?: string
  onComplete: () => void
}) {
  const [clicked, setClicked] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: 'var(--panel-2)',
          border: '1px solid var(--border)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--accent)',
        }}
      >
        <PlatformIcon platform={platform} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>
          {handle}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-dim)' }}>
          Follow us on {platform} to earn XP
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        <Button
          variant="primary"
          onClick={() => {
            window.open(url, '_blank')
            setClicked(true)
          }}
          style={{ width: '100%' }}
        >
          Open {platform} ↗
        </Button>
        <Button
          variant={clicked ? 'primary' : 'ghost'}
          disabled={!clicked}
          onClick={onComplete}
          style={{ width: '100%' }}
        >
          I've followed
        </Button>
      </div>
    </div>
  )
}
