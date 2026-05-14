import { useState } from 'react'
import { Button } from '../../primitives/Button'

const SEGMENTS = ['50 XP', '100 XP', 'Miss', '200 XP', '75 XP', 'Bonus!', '150 XP', 'Miss']

function getResultFromRotation(deg: number): string {
  const normalized = ((deg % 360) + 360) % 360
  const index = Math.floor((360 - normalized) / (360 / SEGMENTS.length)) % SEGMENTS.length
  return SEGMENTS[index]
}

export function SpinWheelExperience({ onComplete }: { onComplete: () => void }) {
  const [spinning, setSpinning] = useState(false)
  const [totalRotation, setTotalRotation] = useState(0)
  const [result, setResult] = useState<string | null>(null)

  function spin() {
    if (spinning) return
    const extra = 1440 + Math.floor(Math.random() * 360)
    const next = totalRotation + extra
    setSpinning(true)
    setTotalRotation(next)
    setTimeout(() => {
      setResult(getResultFromRotation(next))
      setSpinning(false)
    }, 3100)
  }

  const size = 240
  const cx = size / 2
  const segCount = SEGMENTS.length
  const angle = (2 * Math.PI) / segCount

  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="relative w-[240px] h-[240px]">
        {/* Pointer */}
        <div
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 z-10"
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '18px solid var(--accent)',
          }}
        />
        <svg
          width={size}
          height={size}
          style={{
            transform: `rotate(${totalRotation}deg)`,
            transition: spinning ? 'transform 3s cubic-bezier(.17,.67,.12,.99)' : 'none',
          }}
        >
          {SEGMENTS.map((label, i) => {
            const startAngle = i * angle - Math.PI / 2
            const endAngle = (i + 1) * angle - Math.PI / 2
            const x1 = cx + cx * Math.cos(startAngle)
            const y1 = cx + cx * Math.sin(startAngle)
            const x2 = cx + cx * Math.cos(endAngle)
            const y2 = cx + cx * Math.sin(endAngle)
            const midAngle = startAngle + angle / 2
            const lx = cx + cx * 0.65 * Math.cos(midAngle)
            const ly = cx + cx * 0.65 * Math.sin(midAngle)
            return (
              <g key={i}>
                <path
                  d={`M${cx},${cx} L${x1},${y1} A${cx},${cx} 0 0,1 ${x2},${y2} Z`}
                  fill={i % 2 === 0 ? 'var(--panel)' : 'var(--panel-2)'}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${(midAngle * 180) / Math.PI + 90}, ${lx}, ${ly})`}
                  style={{
                    fontSize: 9,
                    fill: 'var(--ink)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  {label}
                </text>
              </g>
            )
          })}
          <circle
            cx={cx}
            cy={cx}
            r={18}
            fill="var(--panel)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle cx={cx} cy={cx} r={6} fill="var(--accent)" />
        </svg>
      </div>

      {result && (
        <div className="text-center">
          <div className="text-[13px] text-ink-dim">You got</div>
          <div className="text-[22px] font-bold text-accent">{result}</div>
        </div>
      )}

      {!result ? (
        <Button variant="primary" disabled={spinning} onClick={spin} className="w-full">
          {spinning ? 'Spinning…' : 'Spin the wheel'}
        </Button>
      ) : (
        <Button variant="primary" onClick={onComplete} className="w-full">
          Claim reward
        </Button>
      )}
    </div>
  )
}
