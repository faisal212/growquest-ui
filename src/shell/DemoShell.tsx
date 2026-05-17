'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { lazy, Suspense } from 'react'
import type { Persona, ClaimPayload, Reward, Mission } from '../types'
import { ErrorBoundary } from '../components/ErrorBoundary'

const CelebrationScreen = lazy(() =>
  import('../screens/celebration').then((m) => ({ default: m.CelebrationScreen }))
)

const ACTIVE_PERSONA: Persona = {
  handle: 'alpha',
  xp: 9840,
  missionsDone: 7,
  rewardsClaimed: 2,
  streak: 12,
  tier: 'Voyager',
  ready: 2,
}

interface DemoShellState {
  persona: Persona
  email: string
  setEmail: (e: string) => void
  onClaim: (m: Mission | ClaimPayload) => void
  onRedeem: (r: Reward) => void
}

const DemoShellContext = createContext<DemoShellState | null>(null)

export function useDemoShell(): DemoShellState {
  const ctx = useContext(DemoShellContext)
  if (!ctx) throw new Error('useDemoShell must be used inside <DemoShell>')
  return ctx
}

/**
 * Client-side state shell for the demo Next.js app. Owns persona + modal state
 * and exposes it via DemoShellContext so screen pages (which are server
 * components) can render children that call useDemoShell(). The persona is
 * always the "active" demo user; claim/redeem mutate a local copy.
 */
export function DemoShell({ children }: { children: ReactNode }) {
  const [overridePersona, setOverridePersona] = useState<Persona | null>(null)
  const persona = overridePersona ?? { ...ACTIVE_PERSONA }
  const [celebration, setCelebration] = useState<ClaimPayload | null>(null)
  const [email, setEmail] = useState('')

  function handleClaim(reward: Mission | ClaimPayload) {
    setCelebration(reward as ClaimPayload)
    setOverridePersona((p) => {
      const base = p ?? persona
      return {
        ...base,
        xp: base.xp + (reward.xp || 0),
        missionsDone: base.missionsDone + 1,
      }
    })
  }

  function handleRedeem(r: Reward) {
    if (persona.xp < r.cost) return
    setOverridePersona((p) => {
      const base = p ?? persona
      return { ...base, xp: base.xp - r.cost, rewardsClaimed: base.rewardsClaimed + 1 }
    })
    setCelebration({ title: r.title, xp: 0, redeemed: true })
  }

  const value: DemoShellState = {
    persona,
    email,
    setEmail,
    onClaim: handleClaim,
    onRedeem: handleRedeem,
  }

  return (
    <DemoShellContext.Provider value={value}>
      <div className="min-h-screen flex flex-col" data-app-root>
        <ErrorBoundary>{children}</ErrorBoundary>
        <Suspense fallback={null}>
          {celebration && (
            <CelebrationScreen reward={celebration} onContinue={() => setCelebration(null)} />
          )}
        </Suspense>
      </div>
    </DemoShellContext.Provider>
  )
}
