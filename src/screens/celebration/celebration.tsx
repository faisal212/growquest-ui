import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Eyebrow, XPPill, Button, Chip } from '../../atoms'
import type { ClaimPayload } from '../../types'

const PARTICLE_COUNT = 28
const COLORS = [
  'var(--accent-cyan)',
  'var(--accent-magenta)',
  'var(--accent-lime)',
  'var(--accent-amber)',
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
    <div
      className="fade-in fixed inset-0 z-[90] grid place-items-center overflow-hidden backdrop-blur"
      style={{ background: 'color-mix(in oklch, var(--bg) 92%, transparent)' }}
    >
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
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

      <div
        className="panel px-9 pt-9 pb-7 w-[min(520px,100%)] text-center relative z-[1]"
        style={{ animation: 'fadeUp 400ms ease both' }}
      >
        <div className="w-[140px] h-[140px] mx-auto mb-5 relative">
          <div
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
              animation: 'float 3s ease-in-out infinite',
            }}
          />
          <svg
            viewBox="0 0 140 140"
            width="140"
            height="140"
            style={{ position: 'relative', animation: 'float 3s ease-in-out infinite' }}
          >
            <defs>
              <linearGradient id="cel-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="var(--accent)" />
                <stop offset="1" stopColor="var(--accent-magenta)" />
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
          <span style={{ color: 'var(--accent)' }}>Level up!</span>
        </h1>
        <p
          className="text-sm leading-[1.6] mx-auto mb-5 max-w-[360px]"
          style={{ color: 'var(--ink-dim)' }}
        >
          You earned{' '}
          <strong style={{ color: 'var(--ink)' }}>{(reward?.xp ?? 500).toLocaleString()} XP</strong>
          {reward?.title ? ` from "${reward.title}"` : ''}. Keep the streak going.
        </p>

        <div className="flex gap-2 justify-center mb-5 flex-wrap">
          <XPPill amount={`+${(reward?.xp ?? 500).toLocaleString()}`} />
          <Chip tone="lime">STREAK +1</Chip>
          <Chip tone="magenta">NEW BADGE</Chip>
        </div>

        <Button variant="primary" style={{ width: '100%' }} onClick={onContinue}>
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
    { label: '+250 XP', tone: 'cyan', xp: 250 },
    { label: '+50 XP', tone: 'amber', xp: 50 },
    { label: 'MERCH', tone: 'magenta', xp: 0 },
    { label: '+100 XP', tone: 'lime', xp: 100 },
    { label: 'RARE', tone: 'magenta', xp: 0 },
    { label: '+500 XP', tone: 'cyan', xp: 500 },
    { label: 'TRY AGAIN', tone: 'dim', xp: 0 },
    { label: '+1000 XP', tone: 'lime', xp: 1000 },
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
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        className="modal w-[min(420px,100%)] p-7 text-center"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Eyebrow>// lootbox · spin to win</Eyebrow>
        <h2 className="display mt-2 mb-5 text-[24px]">Take your spin</h2>

        <div className="relative w-[280px] h-[280px] mx-auto mb-5">
          <div
            style={{
              position: 'absolute',
              top: -4,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '18px solid var(--accent)',
              zIndex: 2,
              filter: 'drop-shadow(0 0 6px var(--accent))',
            }}
          />
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
              const color = p.tone === 'dim' ? 'var(--panel-2)' : `var(--accent-${p.tone})`
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
            <circle r="6" fill="var(--accent)" />
          </svg>
        </div>

        {result ? (
          <div className="mb-4">
            <div className="eyebrow mb-[6px]">// you won</div>
            <div className="text-[24px] font-bold" style={{ color: 'var(--accent)' }}>
              {result.label}
            </div>
          </div>
        ) : (
          <div className="mb-4 text-[13px]" style={{ color: 'var(--ink-dim)' }}>
            1 spin remaining · free
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="ghost" style={{ flex: 1 }} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            style={{ flex: 2 }}
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
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        className="modal w-[min(480px,100%)] p-7"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Eyebrow>// daily drop</Eyebrow>
        <h2 className="display mt-2 mb-[6px] text-[24px]">Day {streak + 1} · keep it alive</h2>
        <p className="text-[13px] mb-[18px]" style={{ color: 'var(--ink-dim)' }}>
          Check in every 24h. Milestones at day 7, 14 and 30 drop bonus rewards.
        </p>

        <div className="grid grid-cols-7 gap-[6px] mb-[18px]">
          {Array.from({ length: 7 }).map((_, i) => {
            const done = i < streak % 7
            const isToday = i === streak % 7
            return (
              <div
                key={i}
                className="p-[10px] text-center rounded-lg"
                style={{
                  border: `1px solid ${isToday ? 'var(--accent)' : 'var(--border)'}`,
                  background: done
                    ? 'var(--accent-soft)'
                    : isToday
                      ? 'var(--panel-2)'
                      : 'transparent',
                }}
              >
                <div
                  className="font-mono text-[9px] tracking-[0.1em]"
                  style={{ color: 'var(--ink-dim)' }}
                >
                  D{i + 1}
                </div>
                <div
                  className="font-bold text-[13px] mt-1"
                  style={{
                    color: done ? 'var(--accent)' : isToday ? 'var(--ink)' : 'var(--ink-faint)',
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
            style={{ flex: 1 }}
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
