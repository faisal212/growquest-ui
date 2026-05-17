import { useState } from 'react'
import { Button } from '../../primitives/Button'
import { Input } from '../../primitives/Input'

export function InviteExperience({ onComplete }: { onComplete: () => void }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState<string[]>([])

  function sendInvite() {
    if (!email.includes('@')) return
    setSent((prev) => [...prev, email])
    setEmail('')
  }

  const valid = email.includes('@')

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="friend@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendInvite()
          }}
          className="flex-1"
        />
        <button
          onClick={sendInvite}
          disabled={!valid}
          className={`py-0 px-4 rounded-[var(--r-btn)] border border-border text-xs font-bold whitespace-nowrap transition-all duration-150 ${valid ? 'bg-primary cursor-pointer' : 'bg-panel-2 text-ink-dim cursor-not-allowed'}`}
          style={valid ? { color: '#05060A' } : undefined}
        >
          Send
        </button>
      </div>

      {sent.length === 0 ? (
        <div className="text-xs text-ink-dim text-center py-3 px-0">No invites sent yet</div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {sent.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-1.5 px-2.5 bg-panel-2 rounded-md text-xs"
            >
              <span className="w-4 h-4 rounded-full bg-accent-lime text-[#05060A] grid place-items-center text-[9px] font-bold">
                ✓
              </span>
              <span className="text-ink flex-1">{e}</span>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="primary"
        disabled={sent.length === 0}
        onClick={onComplete}
        className="w-full"
      >
        {sent.length === 0
          ? 'Send at least 1 invite'
          : `Done · ${sent.length} invite${sent.length !== 1 ? 's' : ''} sent`}
      </Button>
    </div>
  )
}
