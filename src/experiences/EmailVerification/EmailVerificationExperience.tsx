import { useEffect, useState } from 'react'
import { Button } from '../../primitives/Button'
import { MissionIcon } from '../../art'

export function EmailVerificationExperience({
  email,
  onComplete,
}: {
  email?: string
  onComplete: () => void
}) {
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown <= 0) return
    const id = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000)
    return () => clearInterval(id)
  }, [countdown])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: 'var(--panel-2)',
          border: '1px solid var(--border)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--accent)',
        }}
      >
        <MissionIcon type="verify_email" size={32} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Check your inbox</div>
        <div style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>
          We sent a verification link to{' '}
          {email ? <strong style={{ color: 'var(--ink)' }}>{email}</strong> : 'your email address'}.
          <br />
          Click the link to verify your address.
        </div>
      </div>

      <button
        disabled={countdown > 0}
        onClick={() => setCountdown(30)}
        style={{
          background: 'none',
          border: 'none',
          cursor: countdown > 0 ? 'not-allowed' : 'pointer',
          fontSize: 12,
          color: countdown > 0 ? 'var(--ink-dim)' : 'var(--accent)',
          textDecoration: countdown > 0 ? 'none' : 'underline',
        }}
      >
        {countdown > 0 ? `Resend in ${countdown}s` : 'Resend email'}
      </button>

      <Button variant="primary" onClick={onComplete} style={{ width: '100%' }}>
        I've verified my email
      </Button>
    </div>
  )
}
