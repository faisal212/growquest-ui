import { useState, useEffect } from 'react'
import { Eyebrow, Button, Chip } from '../../atoms'

export interface TriviaQuestion {
  q: string
  choices: string[]
  correct: number
}

const DEFAULT_QUESTIONS: TriviaQuestion[] = [
  { q: 'How many tiers are in GrowQuest?', choices: ['2', '3', '4', '5'], correct: 2 },
  {
    q: 'What currency powers redemptions?',
    choices: ['USD', 'XP', 'Tokens', 'Credits'],
    correct: 1,
  },
  { q: 'Streak bonus milestone lands at day…', choices: ['3', '5', '7', '10'], correct: 2 },
]

interface TriviaProps {
  onComplete: () => void
  questions?: TriviaQuestion[]
  timeLimit?: number
  passScore?: number
}

export function TriviaExperience({
  onComplete,
  questions = DEFAULT_QUESTIONS,
  timeLimit = 15,
  passScore = 2,
}: TriviaProps) {
  const [idx, setIdx] = useState(0)
  const [pick, setPick] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(timeLimit)
  const [phase, setPhase] = useState<'answering' | 'reveal' | 'done'>('answering')

  useEffect(() => {
    if (phase !== 'answering') return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (time <= 0) {
      setPhase('reveal')
      return
    }
    const t = setTimeout(() => setTime(time - 1), 1000)
    return () => clearTimeout(t)
  }, [time, phase])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setTime(timeLimit)
    setPick(null)
    setPhase('answering')
  }, [idx, timeLimit])

  const q = questions[idx]
  const correct = pick === q.correct

  function lockIn(i: number) {
    if (phase !== 'answering') return
    setPick(i)
    setPhase('reveal')
    if (i === q.correct) setScore((s) => s + 1)
  }

  function next() {
    if (idx === questions.length - 1) setPhase('done')
    else setIdx(idx + 1)
  }

  if (phase === 'done') {
    const pct = Math.round((score / questions.length) * 100)
    const passed = score >= passScore
    return (
      <div style={{ padding: 28, textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, margin: '0 auto 16px', position: 'relative' }}>
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--panel-2)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={passed ? 'var(--accent-lime)' : 'var(--danger)'}
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 50}
              strokeDashoffset={2 * Math.PI * 50 * (1 - pct / 100)}
              transform="rotate(-90 60 60)"
              strokeLinecap="round"
            />
            <text
              x="60"
              y="68"
              textAnchor="middle"
              fontFamily="Space Grotesk"
              fontSize="28"
              fontWeight="700"
              fill="currentColor"
            >
              {score}/{questions.length}
            </text>
          </svg>
        </div>
        <div className="eyebrow" style={{ marginBottom: 6 }}>
          // trivia complete
        </div>
        <h3
          className="display"
          style={{ margin: '0 0 8px', fontSize: 22, letterSpacing: '-0.02em' }}
        >
          {passed ? 'Nice run!' : 'Keep training.'}
        </h3>
        <p style={{ color: 'var(--ink-dim)', fontSize: 13, marginBottom: 16 }}>
          {passed
            ? 'You beat the bar — XP unlocked.'
            : `Needed ${passScore}/${questions.length} to pass. Try again tomorrow for another shot.`}
        </p>
        <Button variant="primary" style={{ width: '100%' }} onClick={onComplete}>
          Continue
        </Button>
      </div>
    )
  }

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Eyebrow>
          // trivia · q{idx + 1} / {questions.length}
        </Eyebrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Chip tone="accent">SCORE {score}</Chip>
          <span
            className="mono"
            style={{
              padding: '4px 8px',
              border: `1px solid ${time < 5 ? 'var(--danger)' : 'var(--border)'}`,
              borderRadius: 4,
              fontSize: 12,
              color: time < 5 ? 'var(--danger)' : 'var(--ink)',
            }}
          >
            ⏱ {String(time).padStart(2, '0')}s
          </span>
        </div>
      </div>

      <div
        style={{ height: 4, background: 'var(--panel-2)', borderRadius: 99, overflow: 'hidden' }}
      >
        <div
          style={{
            height: '100%',
            width: `${(time / timeLimit) * 100}%`,
            background: time < 5 ? 'var(--danger)' : 'var(--accent)',
            transition: 'width 1s linear',
          }}
        />
      </div>

      <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4, padding: '10px 0' }}>{q.q}</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        {q.choices.map((c, i) => {
          const isPick = pick === i
          const good = phase === 'reveal' && i === q.correct
          const bad = phase === 'reveal' && isPick && !correct
          return (
            <button
              key={i}
              disabled={phase !== 'answering'}
              onClick={() => lockIn(i)}
              style={{
                padding: '16px 14px',
                borderRadius: 8,
                border: `1px solid ${good ? 'var(--accent-lime)' : bad ? 'var(--danger)' : isPick ? 'var(--accent)' : 'var(--border)'}`,
                background: good
                  ? 'color-mix(in oklch, var(--accent-lime) 14%, transparent)'
                  : bad
                    ? 'color-mix(in oklch, var(--danger) 14%, transparent)'
                    : 'var(--panel-2)',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
              }}
            >
              <span
                className="mono"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  border: '1px solid var(--border)',
                  background: 'var(--panel)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span>{c}</span>
            </button>
          )
        })}
      </div>

      {phase === 'reveal' && (
        <Button variant="primary" onClick={next}>
          {idx === questions.length - 1 ? 'See results' : 'Next question'}
        </Button>
      )}
    </div>
  )
}
