import { useState } from 'react'
import { Button } from '../../primitives/Button'
import { Input } from '../../primitives/Input'

const COUNTRY_CODES = [
  { code: '+1', flag: '🇺🇸', name: 'US' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+92', flag: '🇵🇰', name: 'PK' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+91', flag: '🇮🇳', name: 'IN' },
  { code: '+49', flag: '🇩🇪', name: 'DE' },
  { code: '+33', flag: '🇫🇷', name: 'FR' },
  { code: '+61', flag: '🇦🇺', name: 'AU' },
]

export function PhoneVerificationExperience({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [countryCode, setCountryCode] = useState('+1')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')

  if (step === 'otp') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
            Enter the 6-digit code
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-dim)' }}>
            Sent to {countryCode} {phone}
          </div>
        </div>

        <Input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 28,
            letterSpacing: '0.35em',
            textAlign: 'center',
            padding: '12px 16px',
          }}
        />

        <Button
          variant="primary"
          disabled={otp.length < 6}
          onClick={onComplete}
          style={{ width: '100%' }}
        >
          Verify
        </Button>

        <button
          onClick={() => {
            setStep('phone')
            setOtp('')
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            color: 'var(--accent)',
            textDecoration: 'underline',
            textAlign: 'center',
          }}
        >
          Change number
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <div>
        <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginBottom: 6 }}>Country</div>
        <select
          className="input"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          style={{ width: '100%' }}
        >
          {COUNTRY_CODES.map(({ code, flag, name }) => (
            <option key={code} value={code}>
              {flag} {name} ({code})
            </option>
          ))}
        </select>
      </div>

      <div>
        <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginBottom: 6 }}>Phone number</div>
        <Input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
        />
      </div>

      <Button
        variant="primary"
        disabled={phone.length < 6}
        onClick={() => setStep('otp')}
        style={{ width: '100%' }}
      >
        Send OTP
      </Button>
    </div>
  )
}
