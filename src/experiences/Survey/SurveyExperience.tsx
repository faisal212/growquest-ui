import { useState } from 'react'
import { Eyebrow, Button, Textarea } from '../../atoms'
import { ShapeArt } from '../ShapeArt'
import { ChoiceShell } from '../ChoiceButton'

interface SurveyChoice {
  id: string
  label?: string
  tint?: string
  shape?: string
}

interface SurveyData {
  q: string
  choices: SurveyChoice[]
}

const SURVEY_TEXT: SurveyData = {
  q: 'Which GrowQuest feature would you use most?',
  choices: [
    { id: 'a', label: 'Daily missions' },
    { id: 'b', label: 'Spin-to-win lootbox' },
    { id: 'c', label: 'Referral boosts' },
    { id: 'd', label: 'Leaderboard competition' },
  ],
}
const SURVEY_TEXTIMG: SurveyData = {
  q: 'Which hero style fits your brand?',
  choices: [
    { id: 'a', label: 'Isometric world', tint: 'cyan' },
    { id: 'b', label: 'Orbital / cosmic', tint: 'magenta' },
    { id: 'c', label: 'Editorial poster', tint: 'lime' },
    { id: 'd', label: 'Pixel / arcade', tint: 'amber' },
  ],
}
const SURVEY_IMGONLY: SurveyData = {
  q: 'Pick your favorite vibe:',
  choices: [
    { id: 'a', shape: 'hex', tint: 'cyan' },
    { id: 'b', shape: 'circle', tint: 'magenta' },
    { id: 'c', shape: 'diamond', tint: 'lime' },
    { id: 'd', shape: 'square', tint: 'amber' },
  ],
}

export function SurveyExperience({
  variant,
  onComplete,
  textMinLength = 20,
}: {
  variant: string
  onComplete: () => void
  textMinLength?: number
}) {
  const [pick, setPick] = useState<string | null>(null)
  const [text, setText] = useState('')

  if (variant === 'textarea') {
    return (
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Eyebrow>// survey · open question</Eyebrow>
        <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>
          What's the single biggest pain point in your growth stack right now?
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Type your answer… (minimum ${textMinLength} characters)`}
          style={{ minHeight: 180 }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--ink-dim)',
          }}
        >
          <span>{text.length} chars</span>
          <span>
            {text.length >= textMinLength
              ? 'ready to submit'
              : `${textMinLength - text.length} more to go`}
          </span>
        </div>
        <Button variant="primary" disabled={text.length < textMinLength} onClick={onComplete}>
          Submit feedback
        </Button>
      </div>
    )
  }

  const data =
    variant === 'text' ? SURVEY_TEXT : variant === 'textImage' ? SURVEY_TEXTIMG : SURVEY_IMGONLY

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Eyebrow>// survey · your take helps shape the roadmap</Eyebrow>
      <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>{data.q}</div>

      {variant === 'text' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.choices.map((c) => {
            const isPick = pick === c.id
            return (
              <ChoiceShell key={c.id} selected={isPick} onClick={() => setPick(c.id)} layout="row">
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 99,
                    border: '2px solid var(--border)',
                    borderColor: isPick ? 'var(--accent)' : 'var(--border)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isPick && (
                    <span
                      style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--accent)' }}
                    />
                  )}
                </span>
                <span style={{ flex: 1, fontSize: 14 }}>{c.label}</span>
              </ChoiceShell>
            )
          })}
        </div>
      )}

      {variant === 'textImage' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {data.choices.map((c) => {
            const isPick = pick === c.id
            return (
              <ChoiceShell
                key={c.id}
                selected={isPick}
                onClick={() => setPick(c.id)}
                layout="column"
              >
                <div style={{ aspectRatio: '16/10', borderRadius: 6, overflow: 'hidden' }}>
                  <ShapeArt
                    shape={['hex', 'circle', 'diamond', 'square'][c.id.charCodeAt(0) - 97]}
                    tint={c.tint!}
                  />
                </div>
                <div style={{ textAlign: 'left', fontSize: 13 }}>{c.label}</div>
              </ChoiceShell>
            )
          })}
        </div>
      )}

      {variant === 'imageOnly' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {data.choices.map((c) => {
            const isPick = pick === c.id
            return (
              <ChoiceShell
                key={c.id}
                selected={isPick}
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

      <Button variant="primary" disabled={!pick} onClick={onComplete}>
        Submit
      </Button>
    </div>
  )
}
