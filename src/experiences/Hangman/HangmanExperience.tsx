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
    <div className="p-6 flex flex-col gap-4">
      <Eyebrow>// hangman · guess the word · {maxWrong - wrong.length} lives</Eyebrow>
      <div className="text-sm text-ink-dim">Category: {category}</div>

      <div className="grid items-center gap-4 grid-cols-[120px_1fr] max-[720px]:grid-cols-[80px_1fr] max-[720px]:gap-2.5">
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
        <div className="flex gap-1.5 flex-wrap">
          {word.split('').map((l, i) => (
            <span
              key={i}
              className={`w-7 h-9 border-b-2 border-ink-dim grid place-items-center font-mono text-xl font-bold ${guesses.includes(l) ? 'text-accent' : 'text-transparent'}`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-1 grid-cols-9 max-[720px]:grid-cols-7 max-[420px]:grid-cols-6">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => {
          const used = guesses.includes(l)
          const isWrong = used && !word.includes(l)
          const isRight = used && word.includes(l)
          return (
            <button
              key={l}
              disabled={used || solved || lost}
              onClick={() => setGuesses([...guesses, l])}
              className={`py-2 px-0 rounded-[5px] border border-border font-mono text-xs font-bold ${used ? 'opacity-70' : 'opacity-100'} ${isRight ? 'bg-accent-soft text-accent' : isWrong ? 'text-danger' : 'bg-panel-2 text-ink'}`}
              style={{
                background: isWrong
                  ? 'color-mix(in oklch, var(--danger) 18%, transparent)'
                  : undefined,
              }}
            >
              {l}
            </button>
          )
        })}
      </div>

      {(solved || lost) && (
        <div
          className={`p-3 rounded-lg text-[13px] border ${solved ? 'border-accent-lime' : 'border-danger'}`}
          style={{
            background: solved
              ? 'color-mix(in oklch, var(--accent-lime) 14%, transparent)'
              : 'color-mix(in oklch, var(--danger) 14%, transparent)',
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
