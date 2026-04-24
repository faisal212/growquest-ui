import { useState } from 'react'
import { Button } from '../../primitives/Button'
import { Input } from '../../primitives/Input'

export function InviteExperience({ onComplete }: { onComplete: () => void }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState<string[]>([])

  function sendInvite() {
    if (!email.includes('@')) return
    setSent((prev) => [...prev, email])
    setEmail('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Input
          type="email"
          placeholder="friend@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendInvite()
          }}
          style={{ flex: 1 }}
        />
        <button
          onClick={sendInvite}
          disabled={!email.includes('@')}
          style={{
            padding: '0 16px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: email.includes('@') ? 'var(--accent)' : 'var(--panel-2)',
            color: email.includes('@') ? '#05060A' : 'var(--ink-dim)',
            fontSize: 12,
            fontWeight: 700,
            cursor: email.includes('@') ? 'pointer' : 'not-allowed',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s',
          }}
        >
          Send
        </button>
      </div>

      {sent.length === 0 ? (
        <div
          style={{ fontSize: 12, color: 'var(--ink-dim)', textAlign: 'center', padding: '12px 0' }}
        >
          No invites sent yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {sent.map((e, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                background: 'var(--panel-2)',
                borderRadius: 6,
                fontSize: 12,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'var(--accent-lime, #84cc16)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#05060A',
                }}
              >
                ✓
              </span>
              <span style={{ color: 'var(--ink)', flex: 1 }}>{e}</span>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="primary"
        disabled={sent.length === 0}
        onClick={onComplete}
        style={{ width: '100%' }}
      >
        {sent.length === 0
          ? 'Send at least 1 invite'
          : `Done · ${sent.length} invite${sent.length !== 1 ? 's' : ''} sent`}
      </Button>
    </div>
  )
}
