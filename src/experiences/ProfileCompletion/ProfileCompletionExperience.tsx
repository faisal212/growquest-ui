import { useState } from 'react'
import { Button } from '../../primitives/Button'
import { Field, Textarea } from '../../primitives/Input'

export function ProfileCompletionExperience({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const filled = [name.length > 0, bio.length > 0].filter(Boolean).length

  return (
    <div className="flex flex-col gap-4 p-6">
      <Field
        label="Display name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim">Bio</span>
        <Textarea
          placeholder="Tell us about yourself…"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 text-xs text-ink-dim">
        <div className="flex-1 h-1 bg-panel-2 rounded-sm overflow-hidden">
          <div
            className={`h-full rounded-sm transition-[width] duration-300 ease-out ${filled === 2 ? 'bg-accent-lime' : 'bg-primary'}`}
            style={{ width: `${(filled / 2) * 100}%` }}
          />
        </div>
        <span className="whitespace-nowrap">{filled}/2 fields</span>
      </div>
      <Button
        variant="primary"
        disabled={name.length === 0}
        onClick={onComplete}
        className="w-full"
      >
        Save profile
      </Button>
    </div>
  )
}
