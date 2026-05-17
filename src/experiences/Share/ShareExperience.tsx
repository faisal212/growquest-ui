import { useState } from 'react'
import { Button } from '../../primitives/Button'

export function ShareExperience({
  shareText = 'Check out GrowQuest — earn XP for real actions!',
  shareUrl = 'https://growquest.io',
  onComplete,
}: {
  shareText?: string
  shareUrl?: string
  onComplete: () => void
}) {
  const [shared, setShared] = useState(false)

  function openShare(platform: string) {
    const enc = encodeURIComponent
    const urls: Record<string, string> = {
      x: `https://x.com/intent/tweet?text=${enc(shareText)}&url=${enc(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${enc(shareText + ' ' + shareUrl)}`,
    }
    window.open(urls[platform], '_blank')
    setShared(true)
  }

  function copyLink() {
    navigator.clipboard.writeText(shareUrl)
    setShared(true)
  }

  const platforms = [
    { id: 'x', label: '𝕏 X / Twitter' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'whatsapp', label: 'WhatsApp' },
  ]

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Preview card */}
      <div className="p-3.5 bg-panel-2 border border-border rounded-[var(--r-inset)]">
        <div className="font-semibold text-[13px] mb-1">{shareText}</div>
        <div className="text-[11px] text-ink-dim font-mono">{shareUrl}</div>
      </div>

      <div className="text-xs text-ink-dim">Share via</div>

      <div className="flex flex-col gap-2">
        {platforms.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => openShare(id)}
            className="py-2.5 px-3.5 rounded-[var(--r-btn)] border border-border bg-panel-2 text-ink text-[13px] font-medium cursor-pointer text-left"
          >
            {label} ↗
          </button>
        ))}
        <button
          onClick={copyLink}
          className="py-2.5 px-3.5 rounded-lg border border-border bg-panel-2 text-ink text-[13px] font-medium cursor-pointer text-left"
        >
          📋 Copy link
        </button>
      </div>

      <Button variant="primary" disabled={!shared} onClick={onComplete} className="w-full">
        Done
      </Button>
    </div>
  )
}
