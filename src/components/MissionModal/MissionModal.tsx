import React, { useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { MissionIcon } from '../../art'
import { Eyebrow, XPPill, Tag, Countdown, Button } from '../../atoms'
import {
  QuizExperience,
  SurveyExperience,
  HangmanExperience,
  TriviaExperience,
} from '../../screens/experiences'
import { toneColor } from '../../utils/toneColor'
import { useFocusTrap } from '../../utils/useFocusTrap'
import type { Mission } from '../../types'

export interface MissionModalProps {
  m: Mission | null
  onClose: () => void
  onClaim: (m: Mission) => void
}

/** Full-screen modal wrapping a mission's interactive experience (quiz, survey, hangman, trivia, or social). Handles the claim flow on completion. */
export function MissionModal({ m, onClose, onClaim }: MissionModalProps) {
  const [step, setStep] = useState(0)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dialogRef, m !== null)
  if (!m || !mounted) return null

  const interactive = ['quiz', 'survey', 'hangman', 'trivia'].includes(m.type)
  if (interactive) {
    const header = (
      <div
        style={{
          position: 'relative',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 className="display" style={{ margin: 0, fontSize: 20, letterSpacing: '-0.02em' }}>
            {m.title}
          </h2>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <XPPill amount={m.xp} />
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="icon-box"
          style={{ width: 28, height: 28, borderRadius: 6 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M2 2l8 8M10 2l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    )
    const handleComplete = () => {
      onClaim(m)
      onClose()
    }
    let body: React.ReactNode = null
    if (m.type === 'quiz') {
      const variant =
        m.subtype === 'quiz-textImage'
          ? 'textImage'
          : m.subtype === 'quiz-imageOnly'
            ? 'imageOnly'
            : 'text'
      body = <QuizExperience variant={variant} onComplete={handleComplete} />
    } else if (m.type === 'survey') {
      const variant =
        m.subtype === 'survey-textImage'
          ? 'textImage'
          : m.subtype === 'survey-imageOnly'
            ? 'imageOnly'
            : m.subtype === 'survey-textarea'
              ? 'textarea'
              : 'text'
      body = <SurveyExperience variant={variant} onComplete={handleComplete} />
    } else if (m.type === 'hangman') {
      body = <HangmanExperience onComplete={handleComplete} />
    } else if (m.type === 'trivia') {
      body = <TriviaExperience onComplete={handleComplete} />
    }
    return createPortal(
      <div
        className="modal-backdrop"
        role="presentation"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      >
        <div
          ref={dialogRef}
          className="modal"
          role="dialog"
          aria-modal="true"
          style={{ maxWidth: 560 }}
        >
          {header}
          {body}
        </div>
      </div>,
      document.body
    )
  }

  const steps = [
    { t: 'Launch', d: 'Open the external action in a new tab.' },
    { t: 'Verify', d: 'We confirm completion within ~30 seconds.' },
    { t: 'Claim', d: 'XP drops into your wallet.' },
  ]
  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div ref={dialogRef} className="modal" role="dialog" aria-modal="true">
        <div
          style={{
            position: 'relative',
            padding: '24px 24px 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <button
              onClick={onClose}
              aria-label="Close"
              className="icon-box"
              style={{ width: 28, height: 28, borderRadius: 6 }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path
                  d="M2 2l8 8M10 2l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <Eyebrow>
            // mission {m.id.toUpperCase()} · {m.type}
          </Eyebrow>
          <div
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 18,
            }}
          >
            <div
              className="icon-box"
              style={{ width: 52, height: 52, borderRadius: 10, color: toneColor(m.tone) }}
            >
              <MissionIcon type={m.type} size={26} />
            </div>
            <div>
              <h2 className="display" style={{ margin: 0, fontSize: 22, letterSpacing: '-0.02em' }}>
                {m.title}
              </h2>
              <div style={{ color: 'var(--ink-dim)', fontSize: 13, marginTop: 2 }}>{m.desc}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <XPPill amount={m.xp} />
            <Tag>
              {m.progress[0]}/{m.progress[1]} progress
            </Tag>
            {m.limited && m.endsAt && (
              <Tag tone="magenta">
                Ends in <Countdown endsAt={m.endsAt} />
              </Tag>
            )}
          </div>
          <div
            style={{
              padding: 14,
              background: 'var(--panel-2)',
              border: '1px solid var(--border)',
              borderRadius: 10,
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              // how it works
            </div>
            <ol
              style={{
                margin: 0,
                paddingLeft: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {steps.map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 4,
                      background: i <= step ? 'var(--accent)' : 'var(--panel)',
                      color: i <= step ? '#05060A' : 'var(--ink-dim)',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                      border: '1px solid var(--border)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{s.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" onClick={onClose}>
              Later
            </Button>
            <Button
              variant="primary"
              style={{ flex: 1 }}
              onClick={() => {
                if (step < 2) setStep(step + 1)
                else {
                  onClaim(m)
                  onClose()
                }
              }}
            >
              {step === 0 && 'Launch mission'}
              {step === 1 && 'Verify completion'}
              {step === 2 && `Claim +${m.xp} XP`}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
