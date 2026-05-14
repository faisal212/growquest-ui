import { useState } from 'react'
import { Button } from '../../primitives/Button'

export function ReferralExperience({
  referralLink = 'https://app.growquest.io/ref/demo-abc123',
  onComplete,
}: {
  referralLink?: string
  onComplete: () => void
}) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const ready = copied || shared

  function copyLink() {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setShared(true)
    })
  }

  function openShare(platform: string) {
    const enc = encodeURIComponent
    const urls: Record<string, string> = {
      x: `https://x.com/intent/tweet?text=${enc('Join me on GrowQuest! ' + referralLink)}`,
      whatsapp: `https://wa.me/?text=${enc('Join me on GrowQuest! ' + referralLink)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${enc(referralLink)}`,
    }
    window.open(urls[platform], '_blank')
    setShared(true)
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div>
        <div className="text-[11px] text-ink-dim font-mono uppercase tracking-[0.06em] mb-1.5">
          Your referral link
        </div>
        <div className="flex gap-2 py-2.5 px-3 bg-panel-2 border border-border rounded-lg items-center">
          <span className="flex-1 font-mono text-xs text-ink-dim overflow-hidden text-ellipsis whitespace-nowrap">
            {referralLink}
          </span>
          <button
            onClick={copyLink}
            className={`py-1 px-2.5 rounded-[5px] border border-border text-[11px] font-semibold cursor-pointer whitespace-nowrap transition-all duration-150 ${copied ? 'bg-accent' : 'bg-panel text-ink'}`}
            style={copied ? { color: '#05060A' } : undefined}
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>

      <div>
        <div className="text-[11px] text-ink-dim mb-2">Share via</div>
        <div className="flex gap-2">
          {[
            { id: 'x', label: '𝕏' },
            { id: 'whatsapp', label: '💬' },
            { id: 'linkedin', label: 'in' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => openShare(id)}
              className="py-2 px-3.5 rounded-md border border-border bg-panel-2 text-ink text-sm font-bold cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-ink-dim">0 friends signed up · goal: 1</div>

      <Button variant="primary" disabled={!ready} onClick={onComplete} className="w-full">
        Done
      </Button>
    </div>
  )
}
