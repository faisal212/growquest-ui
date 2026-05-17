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
    if (time <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase('reveal')
      return
    }
    const t = setTimeout(() => setTime(time - 1), 1000)
    return () => clearTimeout(t)
  }, [time, phase])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <div className="p-7 text-center">
        <div className="w-[120px] h-[120px] mx-auto mb-4 relative">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--panel-2)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={passed ? 'var(--color-primary)' : 'var(--danger)'}
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
        <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-1.5">
          // trivia complete
        </div>
        <h3 className="display m-0 mb-2 text-[22px] tracking-[-0.02em]">
          {passed ? 'Nice run!' : 'Keep training.'}
        </h3>
        <p className="text-ink-dim text-[13px] mb-4">
          {passed
            ? 'You beat the bar — XP unlocked.'
            : `Needed ${passScore}/${questions.length} to pass. Try again tomorrow for another shot.`}
        </p>
        <Button variant="primary" className="w-full" onClick={onComplete}>
          Continue
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Eyebrow>
          // trivia · q{idx + 1} / {questions.length}
        </Eyebrow>
        <div className="flex items-center gap-1.5">
          <Chip tone="primary">SCORE {score}</Chip>
          <span
            className={`mono py-1 px-2 border rounded-[var(--r-tag)] text-xs ${time < 5 ? 'border-danger text-danger' : 'border-border text-ink'}`}
          >
            ⏱ {String(time).padStart(2, '0')}s
          </span>
        </div>
      </div>

      <div className="h-1 bg-panel-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-[width] duration-1000 ease-linear ${time < 5 ? 'bg-danger' : 'bg-primary'}`}
          style={{ width: `${(time / timeLimit) * 100}%` }}
        />
      </div>

      <div className="text-[18px] font-semibold leading-snug py-2.5 px-0">{q.q}</div>

      <div className="grid grid-cols-2 gap-2">
        {q.choices.map((c, i) => {
          const isPick = pick === i
          const good = phase === 'reveal' && i === q.correct
          const bad = phase === 'reveal' && isPick && !correct
          return (
            <button
              key={i}
              disabled={phase !== 'answering'}
              onClick={() => lockIn(i)}
              className={`py-4 px-3.5 rounded-[var(--r-inset)] text-left flex items-center gap-2.5 text-sm border ${good ? 'border-accent-lime' : bad ? 'border-danger' : isPick ? 'border-accent' : 'border-border'} ${good || bad ? '' : 'bg-panel-2'}`}
              style={
                good
                  ? { background: 'color-mix(in oklch, var(--color-primary) 14%, transparent)' }
                  : bad
                    ? { background: 'color-mix(in oklch, var(--danger) 14%, transparent)' }
                    : undefined
              }
            >
              <span className="mono w-[22px] h-[22px] rounded-[4px] border border-border bg-panel grid place-items-center text-[11px] font-bold">
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
