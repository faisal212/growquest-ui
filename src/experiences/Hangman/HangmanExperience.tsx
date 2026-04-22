import { useState } from 'react'
import { Eyebrow, Button } from '../../atoms'

interface HangmanProps {
  onComplete: () => void
  word?: string
  maxWrong?: number
  category?: string
}

export function HangmanExperience({
  onComplete,
  word = 'GROWQUEST',
  maxWrong = 6,
  category = 'growth engine brand',
}: HangmanProps) {
  const [guesses, setGuesses] = useState<string[]>([])
  const wrong = guesses.filter((g) => !word.includes(g))
  const solved = word.split('').every((l) => guesses.includes(l))
  const lost = wrong.length >= maxWrong

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Eyebrow>// hangman · guess the word · {maxWrong - wrong.length} lives</Eyebrow>
      <div style={{ fontSize: 14, color: 'var(--ink-dim)' }}>Category: {category}</div>

      <div
        className="hangman-stage"
        style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, alignItems: 'center' }}
      >
        <svg viewBox="0 0 100 130" width="100" height="130">
          <line x1="10" y1="125" x2="90" y2="125" stroke="var(--ink-dim)" strokeWidth="3" />
          <line x1="30" y1="125" x2="30" y2="10" stroke="var(--ink-dim)" strokeWidth="3" />
          <line x1="30" y1="10" x2="75" y2="10" stroke="var(--ink-dim)" strokeWidth="3" />
          <line x1="75" y1="10" x2="75" y2="25" stroke="var(--ink-dim)" strokeWidth="3" />
          {wrong.length > 0 && (
            <circle cx="75" cy="34" r="9" fill="none" stroke="var(--danger)" strokeWidth="2.5" />
          )}
          {wrong.length > 1 && (
            <line x1="75" y1="43" x2="75" y2="75" stroke="var(--danger)" strokeWidth="2.5" />
          )}
          {wrong.length > 2 && (
            <line x1="75" y1="55" x2="62" y2="65" stroke="var(--danger)" strokeWidth="2.5" />
          )}
          {wrong.length > 3 && (
            <line x1="75" y1="55" x2="88" y2="65" stroke="var(--danger)" strokeWidth="2.5" />
          )}
          {wrong.length > 4 && (
            <line x1="75" y1="75" x2="65" y2="95" stroke="var(--danger)" strokeWidth="2.5" />
          )}
          {wrong.length > 5 && (
            <line x1="75" y1="75" x2="85" y2="95" stroke="var(--danger)" strokeWidth="2.5" />
          )}
        </svg>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {word.split('').map((l, i) => (
            <span
              key={i}
              style={{
                width: 28,
                height: 36,
                borderBottom: '2px solid var(--ink-dim)',
                display: 'grid',
                placeItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 20,
                fontWeight: 700,
                color: guesses.includes(l) ? 'var(--accent)' : 'transparent',
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div
        className="hangman-keys"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 4 }}
      >
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => {
          const used = guesses.includes(l)
          const isWrong = used && !word.includes(l)
          const isRight = used && word.includes(l)
          return (
            <button
              key={l}
              disabled={used || solved || lost}
              onClick={() => setGuesses([...guesses, l])}
              style={{
                padding: '8px 0',
                borderRadius: 5,
                border: '1px solid var(--border)',
                background: isRight
                  ? 'var(--accent-soft)'
                  : isWrong
                    ? 'color-mix(in oklch, var(--danger) 18%, transparent)'
                    : 'var(--panel-2)',
                color: isRight ? 'var(--accent)' : isWrong ? 'var(--danger)' : 'var(--ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 700,
                opacity: used ? 0.7 : 1,
              }}
            >
              {l}
            </button>
          )
        })}
      </div>

      {(solved || lost) && (
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: solved
              ? 'color-mix(in oklch, var(--accent-lime) 14%, transparent)'
              : 'color-mix(in oklch, var(--danger) 14%, transparent)',
            border: `1px solid ${solved ? 'var(--accent-lime)' : 'var(--danger)'}`,
            fontSize: 13,
          }}
        >
          {solved ? (
            <>
              <strong>Solved!</strong> You cracked {word}.
            </>
          ) : (
            <>
              <strong>Game over.</strong> The word was <strong>{word}</strong>.
            </>
          )}
        </div>
      )}

      <Button variant="primary" disabled={!solved && !lost} onClick={onComplete}>
        Continue
      </Button>
    </div>
  )
}
