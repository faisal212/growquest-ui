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
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Eyebrow>
        // quiz · 1 of 5 ·{' '}
        {variant === 'text'
          ? 'text answers'
          : variant === 'textImage'
            ? 'text + image'
            : 'images only'}
      </Eyebrow>
      <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>{quiz.q}</div>

      {variant === 'text' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                <span
                  className="mono"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 5,
                    border: '1px solid var(--border)',
                    background: 'var(--panel)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {c.id.toUpperCase()}
                </span>
                <span style={{ flex: 1, fontSize: 14 }}>{c.label}</span>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
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
                <div
                  style={{
                    aspectRatio: '16/10',
                    borderRadius: 6,
                    overflow: 'hidden',
                    background: 'var(--panel)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${c.tint}) 30%, transparent) 0 6px, transparent 6px 14px)`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: `var(--accent-${c.tint})`,
                        padding: '4px 8px',
                        background: 'var(--panel)',
                        border: `1px solid color-mix(in oklch, var(--accent-${c.tint}) 40%, transparent)`,
                        borderRadius: 4,
                      }}
                    >
                      OPT {c.id.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    textAlign: 'left',
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: '1px solid var(--border)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
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
                <div style={{ aspectRatio: '1/1' }}>
                  <ShapeArt shape={c.shape!} tint={c.tint!} />
                </div>
              </ChoiceShell>
            )
          })}
        </div>
      )}

      {submitted && (
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: correct
              ? 'color-mix(in oklch, var(--accent-lime) 14%, transparent)'
              : 'color-mix(in oklch, var(--danger) 14%, transparent)',
            border: `1px solid ${correct ? 'var(--accent-lime)' : 'var(--danger)'}`,
            fontSize: 13,
          }}
        >
          <strong>{correct ? 'Correct!' : 'Not quite.'}</strong>{' '}
          {correct ? 'Nicely done.' : 'The correct answer is A.'}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        {!submitted ? (
          <Button
            variant="primary"
            style={{ flex: 1 }}
            disabled={!pick}
            onClick={() => setSubmitted(true)}
          >
            Submit answer
          </Button>
        ) : (
          <Button variant="primary" style={{ flex: 1 }} onClick={onComplete}>
            Continue
          </Button>
        )}
      </div>
    </div>
  )
}
