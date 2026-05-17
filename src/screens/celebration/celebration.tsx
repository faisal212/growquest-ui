import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Eyebrow, XPPill, Button, Chip } from '../../atoms'
import type { ClaimPayload } from '../../types'

const PARTICLE_COUNT = 28
const COLORS = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-primary)',
  'var(--color-secondary)',
]
// Stable random values computed once at module load — not during render.
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  angle: (i / PARTICLE_COUNT) * Math.PI * 2,
  dist: 200 + Math.random() * 280,
  delay: Math.random() * 300,
}))

export function CelebrationScreen({
  reward,
  onContinue,
}: {
  reward: ClaimPayload
  onContinue: () => void
}) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return createPortal(
    <div className="animate-fade-in fixed inset-0 z-[90] grid place-items-center overflow-hidden backdrop-blur bg-[color-mix(in_oklch,var(--bg)_92%,transparent)]">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2"
          style={{
            borderRadius: i % 2 ? 0 : 2,
            background: COLORS[i % 4],
            transform:
              phase >= 1
                ? `translate(${Math.cos(p.angle) * p.dist}px, ${Math.sin(p.angle) * p.dist}px) rotate(${i * 30}deg)`
                : 'translate(0,0)',
            opacity: phase >= 2 ? 0 : 1,
            transition: `transform 1200ms cubic-bezier(.2,.7,.2,1) ${p.delay}ms, opacity 800ms ease ${p.delay + 600}ms`,
          }}
        />
      ))}

      <div className="panel px-9 pt-9 pb-7 w-[min(520px,100%)] text-center relative z-[1] animate-[fadeUp_400ms_ease_both]">
        <div className="w-[140px] h-[140px] mx-auto mb-5 relative">
          <div className="absolute inset-0 rounded-full opacity-40 animate-[float_3s_ease-in-out_infinite] bg-[var(--halo-primary)]" />
          <svg
            viewBox="0 0 140 140"
            width="140"
            height="140"
            className="relative animate-[float_3s_ease-in-out_infinite]"
          >
            <defs>
              <linearGradient id="cel-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="var(--color-primary)" />
                <stop offset="1" stopColor="var(--color-secondary)" />
              </linearGradient>
            </defs>
            <polygon points="70,8 130,40 130,100 70,132 10,100 10,40" fill="url(#cel-grad)" />
            <polygon
              points="70,24 115,48 115,92 70,116 25,92 25,48"
              fill="var(--bg)"
              opacity="0.9"
            />
            <polygon points="70,40 102,56 102,84 70,100 38,84 38,56" fill="url(#cel-grad)" />
            <text
              x="70"
              y="78"
              textAnchor="middle"
              fontFamily="Space Grotesk"
              fontWeight="700"
              fontSize="22"
              fill="#05060A"
            >
              XP
            </text>
          </svg>
        </div>

        <Eyebrow>// quest complete</Eyebrow>
        <h1 className="display text-[32px] mt-2 mb-[10px]">
          <span className="text-primary">Level up!</span>
        </h1>
        <p className="text-sm leading-[1.6] mx-auto mb-5 max-w-[360px] text-ink-dim">
          You earned <strong className="text-ink">{(reward?.xp ?? 500).toLocaleString()} XP</strong>
          {reward?.title ? ` from "${reward.title}"` : ''}. Keep the streak going.
        </p>

        <div className="flex gap-2 justify-center mb-5 flex-wrap">
          <XPPill amount={`+${(reward?.xp ?? 500).toLocaleString()}`} />
          <Chip tone="primary">STREAK +1</Chip>
          <Chip tone="secondary">NEW BADGE</Chip>
        </div>

        <Button variant="primary" className="w-full" onClick={onContinue}>
          Continue the quest
        </Button>
      </div>
    </div>,
    document.body
  )
}

interface Prize {
  label: string
  tone: string
  xp: number
}

export function SpinModal({
  onClose,
  onPrize,
}: {
  onClose: () => void
  onPrize: (p: Prize) => void
}) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<Prize | null>(null)
  const prizes: Prize[] = [
    { label: '+250 XP', tone: 'primary', xp: 250 },
    { label: '+50 XP', tone: 'secondary', xp: 50 },
    { label: 'MERCH', tone: 'secondary', xp: 0 },
    { label: '+100 XP', tone: 'primary', xp: 100 },
    { label: 'RARE', tone: 'secondary', xp: 0 },
    { label: '+500 XP', tone: 'primary', xp: 500 },
    { label: 'TRY AGAIN', tone: 'dim', xp: 0 },
    { label: '+1000 XP', tone: 'primary', xp: 1000 },
  ]
  const [angle, setAngle] = useState(0)

  function spin() {
    setSpinning(true)
    setResult(null)
    const winIdx = 5
    const target = 1440 + (360 - winIdx * (360 / prizes.length) - 360 / prizes.length / 2)
    setAngle(target)
    setTimeout(() => {
      setSpinning(false)
      setResult(prizes[winIdx])
    }, 3400)
  }

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="modal w-[min(420px,100%)] p-7 text-center" role="dialog" aria-modal="true">
        <Eyebrow>// lootbox · spin to win</Eyebrow>
        <h2 className="display mt-2 mb-5 text-[24px]">Take your spin</h2>

        <div className="relative w-[280px] h-[280px] mx-auto mb-5">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 z-[2] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-primary [filter:drop-shadow(0_0_6px_var(--color-primary))]" />
          <svg
            viewBox="-100 -100 200 200"
            width="280"
            height="280"
            style={{
              transform: `rotate(${angle}deg)`,
              transition: spinning ? 'transform 3.2s cubic-bezier(.15,.9,.2,1)' : 'none',
            }}
          >
            {prizes.map((p, i) => {
              const a1 = (i / prizes.length) * Math.PI * 2 - Math.PI / 2
              const a2 = ((i + 1) / prizes.length) * Math.PI * 2 - Math.PI / 2
              const x1 = Math.cos(a1) * 95,
                y1 = Math.sin(a1) * 95
              const x2 = Math.cos(a2) * 95,
                y2 = Math.sin(a2) * 95
              const labelAngle = (a1 + a2) / 2
              const lx = Math.cos(labelAngle) * 60,
                ly = Math.sin(labelAngle) * 60
              const color = p.tone === 'dim' ? 'var(--panel-2)' : `var(--color-${p.tone})`
              return (
                <g key={i}>
                  <path
                    d={`M0 0 L${x1} ${y1} A95 95 0 0 1 ${x2} ${y2} Z`}
                    fill={color}
                    opacity={i % 2 ? 0.9 : 0.75}
                    stroke="var(--bg)"
                    strokeWidth="1"
                  />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Space Grotesk"
                    fontSize="10"
                    fontWeight="700"
                    fill="#05060A"
                    transform={`rotate(${(labelAngle * 180) / Math.PI + 90} ${lx} ${ly})`}
                  >
                    {p.label}
                  </text>
                </g>
              )
            })}
            <circle r="20" fill="var(--bg)" stroke="var(--border)" />
            <circle r="6" fill="var(--color-primary)" />
          </svg>
        </div>

        {result ? (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-[6px]">
              // you won
            </div>
            <div className="text-[24px] font-bold text-primary">{result.label}</div>
          </div>
        ) : (
          <div className="mb-4 text-[13px] text-ink-dim">1 spin remaining · free</div>
        )}

        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="flex-[2]"
            disabled={spinning}
            onClick={() => {
              if (result) {
                onPrize(result)
                onClose()
              } else spin()
            }}
          >
            {spinning ? 'Spinning…' : result ? 'Claim prize' : 'Spin'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export function DailyModal({
  onClose,
  onClaim,
  streak,
}: {
  onClose: () => void
  onClaim: (p: ClaimPayload) => void
  streak: number
}) {
  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="modal w-[min(480px,100%)] p-7" role="dialog" aria-modal="true">
        <Eyebrow>// daily drop</Eyebrow>
        <h2 className="display mt-2 mb-[6px] text-[24px]">Day {streak + 1} · keep it alive</h2>
        <p className="text-[13px] mb-[18px] text-ink-dim">
          Check in every 24h. Milestones at day 7, 14 and 30 drop bonus rewards.
        </p>

        <div className="grid grid-cols-7 gap-[6px] mb-[18px]">
          {Array.from({ length: 7 }).map((_, i) => {
            const done = i < streak % 7
            const isToday = i === streak % 7
            return (
              <div
                key={i}
                className="p-[10px] text-center rounded-[var(--r-inset)]"
                style={{
                  border: `1px solid ${isToday ? 'var(--color-primary)' : 'var(--border)'}`,
                  background: done
                    ? 'var(--color-primary-soft)'
                    : isToday
                      ? 'var(--panel-2)'
                      : 'transparent',
                }}
              >
                <div className="font-mono text-[9px] tracking-[0.1em] text-ink-dim">D{i + 1}</div>
                <div
                  className="font-bold text-[13px] mt-1"
                  style={{
                    color: done
                      ? 'var(--color-primary)'
                      : isToday
                        ? 'var(--ink)'
                        : 'var(--ink-faint)',
                  }}
                >
                  +{i === 6 ? '500' : '50'}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose}>
            Later
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => {
              onClaim({ title: 'Daily drop', xp: 50 })
              onClose()
            }}
          >
            Claim +50 XP
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
