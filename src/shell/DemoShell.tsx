'use client'

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from 'react'
import { lazy, Suspense } from 'react'
import { TweaksPanel, useTweaks, useEditMode } from '../tweaks'
import type { Persona, Tweaks, ClaimPayload, Reward, Mission } from '../types'
import { ErrorBoundary } from '../components/ErrorBoundary'

const CelebrationScreen = lazy(() =>
  import('../screens/celebration').then((m) => ({ default: m.CelebrationScreen }))
)

function subscribePersonaStorage(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', cb)
  return () => window.removeEventListener('storage', cb)
}

function getPersonaFromStorage(): string {
  if (typeof window === 'undefined') return 'active'
  return window.localStorage.getItem('gq.persona') || 'active'
}

const PERSONAS: Record<string, Persona> = {
  new: {
    handle: 'you',
    xp: 0,
    missionsDone: 0,
    rewardsClaimed: 0,
    streak: 0,
    tier: 'Scout',
    ready: 0,
  },
  active: {
    handle: 'alpha',
    xp: 9840,
    missionsDone: 7,
    rewardsClaimed: 2,
    streak: 12,
    tier: 'Voyager',
    ready: 2,
  },
  power: {
    handle: 'northstar',
    xp: 18420,
    missionsDone: 11,
    rewardsClaimed: 6,
    streak: 47,
    tier: 'Ascendant',
    ready: 3,
  },
}

interface DemoShellState {
  persona: Persona
  personaKey: string
  setPersonaKey: (k: string) => void
  tweaks: Tweaks
  email: string
  setEmail: (e: string) => void
  onClaim: (m: Mission | ClaimPayload) => void
  onRedeem: (r: Reward) => void
  tweaksVisible: boolean
  toggleTweaks: () => void
}

const DemoShellContext = createContext<DemoShellState | null>(null)

export function useDemoShell(): DemoShellState {
  const ctx = useContext(DemoShellContext)
  if (!ctx) throw new Error('useDemoShell must be used inside <DemoShell>')
  return ctx
}

/**
 * Client-side state shell for the demo Next.js app. Owns persona / tweaks /
 * modal state and exposes it via DemoShellContext so screen pages (which are
 * server components) can render children that call useDemoShell().
 */
export function DemoShell({ children }: { children: ReactNode }) {
  const [tweaks, setTweaks] = useTweaks()
  const [tweaksVisible, setTweaksVisible] = useEditMode()
  // SSR + first client render both read 'active'; useSyncExternalStore upgrades
  // to the localStorage value after hydration without an in-effect setState.
  const storedKey = useSyncExternalStore(
    subscribePersonaStorage,
    getPersonaFromStorage,
    () => 'active'
  )
  const [overrideKey, setOverrideKey] = useState<string | null>(null)
  const personaKey = overrideKey ?? storedKey
  const [overridePersona, setOverridePersona] = useState<Persona | null>(null)
  const persona = overridePersona ?? { ...(PERSONAS[personaKey] ?? PERSONAS.active) }
  const [celebration, setCelebration] = useState<ClaimPayload | null>(null)
  const [email, setEmail] = useState('')

  function handleSetPersonaKey(key: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('gq.persona', key)
      window.dispatchEvent(new StorageEvent('storage', { key: 'gq.persona', newValue: key }))
    }
    setOverrideKey(key)
    setOverridePersona({ ...(PERSONAS[key] ?? PERSONAS.active) })
  }

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
    personaKey,
    setPersonaKey: handleSetPersonaKey,
    tweaks,
    email,
    setEmail,
    onClaim: handleClaim,
    onRedeem: handleRedeem,
    tweaksVisible,
    toggleTweaks: () => setTweaksVisible((v) => !v),
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
        <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweaksVisible} />
      </div>
    </DemoShellContext.Provider>
  )
}
