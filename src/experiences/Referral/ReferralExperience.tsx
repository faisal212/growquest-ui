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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--ink-dim)',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 6,
          }}
        >
          Your referral link
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '10px 12px',
            background: 'var(--panel-2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <span
            style={{
              flex: 1,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--ink-dim)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {referralLink}
          </span>
          <button
            onClick={copyLink}
            style={{
              padding: '4px 10px',
              borderRadius: 5,
              border: '1px solid var(--border)',
              background: copied ? 'var(--accent)' : 'var(--panel)',
              color: copied ? '#05060A' : 'var(--ink)',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, color: 'var(--ink-dim)', marginBottom: 8 }}>Share via</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'x', label: '𝕏' },
            { id: 'whatsapp', label: '💬' },
            { id: 'linkedin', label: 'in' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => openShare(id)}
              style={{
                padding: '8px 14px',
                borderRadius: 6,
                border: '1px solid var(--border)',
                background: 'var(--panel-2)',
                color: 'var(--ink)',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>0 friends signed up · goal: 1</div>

      <Button variant="primary" disabled={!ready} onClick={onComplete} style={{ width: '100%' }}>
        Done
      </Button>
    </div>
  )
}
