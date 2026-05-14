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
    <div className="flex flex-col items-center gap-6 py-8 px-6">
      <div className="w-[72px] h-[72px] rounded-[18px] bg-panel-2 border border-border grid place-items-center text-accent">
        <PlatformIcon platform={platform} />
      </div>

      <div className="text-center">
        <div className="font-bold text-[22px] tracking-[-0.02em] mb-1">{handle}</div>
        <div className="text-[13px] text-ink-dim">Follow us on {platform} to earn XP</div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Button
          variant="primary"
          onClick={() => {
            window.open(url, '_blank')
            setClicked(true)
          }}
          className="w-full"
        >
          Open {platform} ↗
        </Button>
        <Button
          variant={clicked ? 'primary' : 'ghost'}
          disabled={!clicked}
          onClick={onComplete}
          className="w-full"
        >
          I've followed
        </Button>
      </div>
    </div>
  )
}
