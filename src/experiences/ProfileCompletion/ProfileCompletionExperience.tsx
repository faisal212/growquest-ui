import { useState } from 'react'
import { Button } from '../../primitives/Button'
import { Field, Textarea } from '../../primitives/Input'

export function ProfileCompletionExperience({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const filled = [name.length > 0, bio.length > 0].filter(Boolean).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <Field
        label="Display name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-dim)',
          }}
        >
          Bio
        </span>
        <Textarea
          placeholder="Tell us about yourself…"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 12,
          color: 'var(--ink-dim)',
        }}
      >
        <div
          style={{
            flex: 1,
            height: 4,
            background: 'var(--panel-2)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(filled / 2) * 100}%`,
              background: filled === 2 ? 'var(--accent-lime)' : 'var(--accent)',
              transition: 'width 0.3s ease',
              borderRadius: 2,
            }}
          />
        </div>
        <span style={{ whiteSpace: 'nowrap' }}>{filled}/2 fields</span>
      </div>
      <Button
        variant="primary"
        disabled={name.length === 0}
        onClick={onComplete}
        style={{ width: '100%' }}
      >
        Save profile
      </Button>
    </div>
  )
}
