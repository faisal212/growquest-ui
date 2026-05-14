import { useState, useEffect } from 'react'

interface WelcomeScreenProps {
  onContinue: () => void
  email: string
}

export default function WelcomeScreen({ onContinue, email }: WelcomeScreenProps) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let p = 0
    const i = setInterval(() => {
      p += Math.random() * 12 + 4
      if (p >= 100) {
        p = 100
        clearInterval(i)
        setTimeout(onContinue, 450)
      }
      setPct(p)
    }, 180)
    return () => clearInterval(i)
  }, [onContinue])

  return (
    <div className="animate-fade-up w-[min(540px,100%)]">
      <div className="panel px-8 py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 grid-bg" />
        <div className="relative">
          <div className="w-[180px] h-[180px] mx-auto mb-5 animate-[float_3s_ease-in-out_infinite]">
            <svg viewBox="0 0 180 180" width="180" height="180">
              <defs>
                <linearGradient id="wg-grad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--color-primary)" />
                  <stop offset="1" stopColor="var(--accent-magenta)" />
                </linearGradient>
                <radialGradient id="wg-glow">
                  <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.5" />
                  <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="90" cy="110" r="85" fill="url(#wg-glow)" />
              <g transform="translate(90 90)">
                <polygon points="0,-60 18,-30 18,30 0,45 -18,30 -18,-30" fill="url(#wg-grad)" />
                <polygon points="0,-60 18,-30 0,-20 -18,-30" fill="#fff" opacity="0.85" />
                <circle cx="0" cy="-5" r="7" fill="var(--bg)" />
                <polygon points="-18,30 -30,50 -6,40" fill="var(--accent-lime)" />
                <polygon points="18,30 30,50 6,40" fill="var(--accent-lime)" />
                <polygon points="-6,45 0,70 6,45" fill="var(--accent-amber)" />
              </g>
              <text
                x="20"
                y="30"
                fontFamily="JetBrains Mono"
                fontSize="9"
                letterSpacing="2"
                fill="var(--color-primary)"
              >
                // REENTRY.OK
              </text>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-[10px]">
            // session restored
          </div>
          <h1 className="display text-[28px] mt-0 mb-[10px]">
            Welcome back, <span className="text-primary">Alpha</span>.
          </h1>
          <p className="text-sm leading-[1.6] mx-auto mb-6 max-w-[360px] text-ink-dim">
            Dive into exclusive content, join the discussion, and unlock rewards. Synchronizing
            quest state…
          </p>

          <div className="px-4 py-[14px] text-left rounded-lg bg-panel-2 border border-border">
            <div className="flex justify-between font-mono text-[10px] tracking-[0.12em] uppercase mb-2 text-ink-dim">
              <span>loading quest data</span>
              <span>{Math.round(pct)}%</span>
            </div>
            <div className="xpbar">
              <div className="fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="font-mono text-[10px] mt-2 text-ink-faint">
              {pct < 40 && '> verifying credentials…'}
              {pct >= 40 && pct < 80 && '> fetching mission manifest…'}
              {pct >= 80 && '> priming XP engine…'}
            </div>
          </div>

          <div className="mt-4 text-[11px] font-mono text-ink-faint">
            {email || 'alpha@growquest.io'}
          </div>
        </div>
      </div>
    </div>
  )
}
