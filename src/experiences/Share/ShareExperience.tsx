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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      {/* Preview card */}
      <div
        style={{
          padding: 14,
          background: 'var(--panel-2)',
          border: '1px solid var(--border)',
          borderRadius: 10,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{shareText}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-dim)', fontFamily: 'var(--font-mono)' }}>
          {shareUrl}
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>Share via</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {platforms.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => openShare(id)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--panel-2)',
              color: 'var(--ink)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            {label} ↗
          </button>
        ))}
        <button
          onClick={copyLink}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--panel-2)',
            color: 'var(--ink)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          📋 Copy link
        </button>
      </div>

      <Button variant="primary" disabled={!shared} onClick={onComplete} style={{ width: '100%' }}>
        Done
      </Button>
    </div>
  )
}
