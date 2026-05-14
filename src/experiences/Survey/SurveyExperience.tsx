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
      <div className="p-6 flex flex-col gap-4">
        <Eyebrow>// survey · open question</Eyebrow>
        <div className="text-[17px] font-semibold leading-snug">
          What's the single biggest pain point in your growth stack right now?
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Type your answer… (minimum ${textMinLength} characters)`}
          className="min-h-[180px]"
        />
        <div className="flex justify-between font-mono text-[11px] text-ink-dim">
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
    <div className="p-6 flex flex-col gap-4">
      <Eyebrow>// survey · your take helps shape the roadmap</Eyebrow>
      <div className="text-[17px] font-semibold leading-snug">{data.q}</div>

      {variant === 'text' && (
        <div className="flex flex-col gap-2">
          {data.choices.map((c) => {
            const isPick = pick === c.id
            return (
              <ChoiceShell key={c.id} selected={isPick} onClick={() => setPick(c.id)} layout="row">
                <span
                  className={`w-[18px] h-[18px] rounded-full border-2 grid place-items-center shrink-0 ${isPick ? 'border-accent' : 'border-border'}`}
                >
                  {isPick && <span className="w-2 h-2 rounded-full bg-accent" />}
                </span>
                <span className="flex-1 text-sm">{c.label}</span>
              </ChoiceShell>
            )
          })}
        </div>
      )}

      {variant === 'textImage' && (
        <div className="grid grid-cols-2 gap-2.5">
          {data.choices.map((c) => {
            const isPick = pick === c.id
            return (
              <ChoiceShell
                key={c.id}
                selected={isPick}
                onClick={() => setPick(c.id)}
                layout="column"
              >
                <div className="aspect-[16/10] rounded-md overflow-hidden">
                  <ShapeArt
                    shape={['hex', 'circle', 'diamond', 'square'][c.id.charCodeAt(0) - 97]}
                    tint={c.tint!}
                  />
                </div>
                <div className="text-left text-[13px]">{c.label}</div>
              </ChoiceShell>
            )
          })}
        </div>
      )}

      {variant === 'imageOnly' && (
        <div className="grid grid-cols-2 gap-2.5">
          {data.choices.map((c) => {
            const isPick = pick === c.id
            return (
              <ChoiceShell
                key={c.id}
                selected={isPick}
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

      <Button variant="primary" disabled={!pick} onClick={onComplete}>
        Submit
      </Button>
    </div>
  )
}
