import { useState } from 'react'
import { Eyebrow, Button } from '../../atoms'
import { ShapeArt } from '../ShapeArt'
import { ChoiceShell } from '../ChoiceButton'

interface QuizChoice {
  id: string
  label: string
  tint?: string
  shape?: string
}

interface QuizData {
  q: string
  choices: QuizChoice[]
  correct: string
}

const QUIZ_BANK: Record<string, QuizData> = {
  text: {
    q: 'Which metric best captures product-led growth?',
    choices: [
      { id: 'a', label: 'Time to value (TTV)' },
      { id: 'b', label: 'Cost per click (CPC)' },
      { id: 'c', label: 'Monthly recurring revenue (MRR)' },
      { id: 'd', label: 'Net promoter score (NPS)' },
    ],
    correct: 'a',
  },
  textImage: {
    q: 'Pick the layout that maximizes click-through on a landing page.',
    choices: [
      { id: 'a', label: 'Hero + single CTA above the fold', tint: 'cyan' },
      { id: 'b', label: 'Carousel of 5 headlines', tint: 'magenta' },
      { id: 'c', label: 'Testimonials first, CTA last', tint: 'lime' },
      { id: 'd', label: 'Video autoplay + form', tint: 'amber' },
    ],
    correct: 'a',
  },
  imageOnly: {
    q: 'Which is the correct brand mark?',
    choices: [
      { id: 'a', label: 'Hexagon', shape: 'hex', tint: 'cyan' },
      { id: 'b', label: 'Circle', shape: 'circle', tint: 'magenta' },
      { id: 'c', label: 'Diamond', shape: 'diamond', tint: 'lime' },
      { id: 'd', label: 'Square', shape: 'square', tint: 'amber' },
    ],
    correct: 'a',
  },
}

export function QuizExperience({
  variant,
  onComplete,
}: {
  variant: string
  onComplete: () => void
}) {
  const quiz =
    variant === 'text'
      ? QUIZ_BANK.text
      : variant === 'textImage'
        ? QUIZ_BANK.textImage
        : QUIZ_BANK.imageOnly
  const [pick, setPick] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const correct = quiz.correct === pick

  return (
    <div className="p-6 flex flex-col gap-4">
      <Eyebrow>
        // quiz · 1 of 5 ·{' '}
        {variant === 'text'
          ? 'text answers'
          : variant === 'textImage'
            ? 'text + image'
            : 'images only'}
      </Eyebrow>
      <div className="text-[17px] font-semibold leading-snug">{quiz.q}</div>

      {variant === 'text' && (
        <div className="flex flex-col gap-2">
          {quiz.choices.map((c) => {
            const isPick = pick === c.id
            const good = submitted && c.id === quiz.correct
            const bad = submitted && isPick && !correct
            return (
              <ChoiceShell
                key={c.id}
                selected={isPick}
                correct={good}
                wrong={bad}
                disabled={submitted}
                onClick={() => setPick(c.id)}
                layout="row"
              >
                <span className="mono w-6 h-6 rounded-[5px] border border-border bg-panel grid place-items-center text-[11px] font-bold shrink-0">
                  {c.id.toUpperCase()}
                </span>
                <span className="flex-1 text-sm">{c.label}</span>
                {good && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="var(--accent-lime)"
                    strokeWidth="2.2"
                  >
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                )}
                {bad && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="var(--danger)"
                    strokeWidth="2.2"
                  >
                    <path d="M3 3l8 8M11 3l-8 8" />
                  </svg>
                )}
              </ChoiceShell>
            )
          })}
        </div>
      )}

      {variant === 'textImage' && (
        <div className="grid grid-cols-2 gap-2.5">
          {quiz.choices.map((c) => {
            const isPick = pick === c.id
            const good = submitted && c.id === quiz.correct
            const bad = submitted && isPick && !correct
            return (
              <ChoiceShell
                key={c.id}
                selected={isPick}
                correct={good}
                wrong={bad}
                disabled={submitted}
                onClick={() => setPick(c.id)}
                layout="column"
              >
                <div className="aspect-[16/10] rounded-md overflow-hidden bg-panel relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${c.tint}) 30%, transparent) 0 6px, transparent 6px 14px)`,
                    }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div
                      className="font-mono text-[10px] tracking-[0.12em] uppercase py-1 px-2 bg-panel border rounded-[4px]"
                      style={{
                        color: `var(--accent-${c.tint})`,
                        borderColor: `color-mix(in oklch, var(--accent-${c.tint}) 40%, transparent)`,
                      }}
                    >
                      OPT {c.id.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-left">
                  <span className="mono w-5 h-5 rounded-[4px] border border-border grid place-items-center text-[10px] font-bold shrink-0">
                    {c.id.toUpperCase()}
                  </span>
                  <span>{c.label}</span>
                </div>
              </ChoiceShell>
            )
          })}
        </div>
      )}

      {variant === 'imageOnly' && (
        <div className="grid grid-cols-2 gap-2.5">
          {quiz.choices.map((c) => {
            const isPick = pick === c.id
            const good = submitted && c.id === quiz.correct
            const bad = submitted && isPick && !correct
            return (
              <ChoiceShell
                key={c.id}
                selected={isPick}
                correct={good}
                wrong={bad}
                disabled={submitted}
                onClick={() => setPick(c.id)}
                layout="column"
              >
                <div className="aspect-square">
                  <ShapeArt shape={c.shape!} tint={c.tint!} />
                </div>
              </ChoiceShell>
            )
          })}
        </div>
      )}

      {submitted && (
        <div
          className={`p-3 rounded-lg text-[13px] border ${correct ? 'border-accent-lime' : 'border-danger'}`}
          style={{
            background: correct
              ? 'color-mix(in oklch, var(--accent-lime) 14%, transparent)'
              : 'color-mix(in oklch, var(--danger) 14%, transparent)',
          }}
        >
          <strong>{correct ? 'Correct!' : 'Not quite.'}</strong>{' '}
          {correct ? 'Nicely done.' : 'The correct answer is A.'}
        </div>
      )}

      <div className="flex gap-2">
        {!submitted ? (
          <Button
            variant="primary"
            className="flex-1"
            disabled={!pick}
            onClick={() => setSubmitted(true)}
          >
            Submit answer
          </Button>
        ) : (
          <Button variant="primary" className="flex-1" onClick={onComplete}>
            Continue
          </Button>
        )}
      </div>
    </div>
  )
}
