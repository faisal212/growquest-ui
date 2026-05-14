import { useEffect, useState } from 'react'
import { Button } from '../../primitives/Button'
import { Input } from '../../primitives/Input'

export function EmailVerificationExperience({
  email,
  onComplete,
}: {
  email?: string
  onComplete: () => void
}) {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown <= 0) return
    const id = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000)
    return () => clearInterval(id)
  }, [countdown])

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="text-center">
        <div className="font-semibold text-[15px] mb-1">Enter the 6-digit code</div>
        <div className="text-[13px] text-ink-dim">Sent to {email ?? 'your email'}</div>
      </div>

      <Input
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="000000"
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
        className="font-mono text-[28px] tracking-[0.35em] text-center py-3 px-4"
      />

      <Button variant="primary" disabled={otp.length < 6} onClick={onComplete} className="w-full">
        Verify
      </Button>

      <button
        disabled={countdown > 0}
        onClick={() => setCountdown(30)}
        className={`bg-transparent border-none text-xs text-center ${countdown > 0 ? 'cursor-not-allowed text-ink-dim no-underline' : 'cursor-pointer text-primary underline'}`}
      >
        {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
      </button>
    </div>
  )
}
