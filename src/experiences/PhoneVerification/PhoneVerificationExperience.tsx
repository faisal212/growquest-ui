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
      <div className="flex flex-col gap-5 p-6">
        <div className="text-center">
          <div className="font-semibold text-[15px] mb-1">Enter the 6-digit code</div>
          <div className="text-[13px] text-ink-dim">
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
          className="font-mono text-[28px] tracking-[0.35em] text-center py-3 px-4"
        />

        <Button variant="primary" disabled={otp.length < 6} onClick={onComplete} className="w-full">
          Verify
        </Button>

        <button
          onClick={() => {
            setStep('phone')
            setOtp('')
          }}
          className="bg-transparent border-none cursor-pointer text-xs text-primary underline text-center"
        >
          Change number
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div>
        <div className="text-xs text-ink-dim mb-1.5">Country</div>
        <select
          className="input w-full"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {COUNTRY_CODES.map(({ code, flag, name }) => (
            <option key={code} value={code}>
              {flag} {name} ({code})
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-xs text-ink-dim mb-1.5">Phone number</div>
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
        className="w-full"
      >
        Send OTP
      </Button>
    </div>
  )
}
