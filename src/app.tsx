import { useState, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { TweaksPanel, useTweaks, useEditMode } from './tweaks'
import { AppLayout } from './routes/AppLayout'
import { FullbleedLayout } from './routes/FullbleedLayout'

const OnboardingScreen = lazy(() => import('./screens/onboarding'))
const WelcomeScreen = lazy(() => import('./screens/welcome'))
const MissionsScreen = lazy(() => import('./screens/missions'))
const RewardsScreen = lazy(() => import('./screens/rewards'))
const LeaderboardScreen = lazy(() => import('./screens/leaderboard'))
const ProfileScreen = lazy(() => import('./screens/profile'))
const CelebrationScreen = lazy(() =>
  import('./screens/celebration').then((m) => ({ default: m.CelebrationScreen }))
)
const SpinModal = lazy(() =>
  import('./screens/celebration').then((m) => ({ default: m.SpinModal }))
)
const DailyModal = lazy(() =>
  import('./screens/celebration').then((m) => ({ default: m.DailyModal }))
)
import type { Persona, ClaimPayload, Reward } from './types'
import { ErrorBoundary } from './components/ErrorBoundary'

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

const INITIAL_KEY = localStorage.getItem('gq.persona') || 'active'

export default function App() {
  const navigate = useNavigate()
  const [tweaks, setTweaks] = useTweaks()
  const [tweaksVisible, setTweaksVisible] = useEditMode()
  const [personaKey, setPersonaKey] = useState(INITIAL_KEY)
  const [persona, setPersona] = useState<Persona>(() => ({ ...PERSONAS[INITIAL_KEY] }))
  const [celebration, setCelebration] = useState<ClaimPayload | null>(null)
  const [spinOpen, setSpinOpen] = useState(false)
  const [dailyOpen, setDailyOpen] = useState(false)
  const [email, setEmail] = useState('')

  // Batched update: both state setters run in the same React 18 transition, no cascading re-renders.
  function handleSetPersonaKey(key: string) {
    localStorage.setItem('gq.persona', key)
    setPersonaKey(key)
    setPersona({ ...PERSONAS[key] })
  }

  function handleEnter(e: string) {
    setEmail(e)
    navigate('/welcome')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleClaim(reward: ClaimPayload) {
    setCelebration(reward)
    setPersona((p) => ({ ...p, xp: p.xp + (reward.xp || 0), missionsDone: p.missionsDone + 1 }))
  }

  function handleRedeem(r: Reward) {
    if (persona.xp < r.cost) return
    setPersona((p) => ({ ...p, xp: p.xp - r.cost, rewardsClaimed: p.rewardsClaimed + 1 }))
    setCelebration({ title: r.title, xp: 0, redeemed: true })
  }

  const toggleTweaks = () => setTweaksVisible((v) => !v)

  return (
    <div className="app">
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<FullbleedLayout onToggleTweaks={toggleTweaks} />}>
              <Route
                path="/onboarding"
                element={<OnboardingScreen heroStyle={tweaks.heroStyle} onEnter={handleEnter} />}
              />
              <Route
                path="/welcome"
                element={
                  <WelcomeScreen
                    email={email}
                    onContinue={() => {
                      navigate('/missions')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  />
                }
              />
            </Route>

            <Route
              element={
                <AppLayout
                  persona={persona}
                  tweaks={tweaks}
                  personaKey={personaKey}
                  onSetPersonaKey={handleSetPersonaKey}
                  onToggleTweaks={toggleTweaks}
                />
              }
            >
              <Route index element={<Navigate to="/onboarding" replace />} />
              <Route
                path="/missions"
                element={
                  <MissionsScreen
                    persona={persona}
                    tweaks={tweaks}
                    onClaim={handleClaim}
                    onRedeem={handleRedeem}
                    openSpin={() => setSpinOpen(true)}
                    openDaily={() => setDailyOpen(true)}
                  />
                }
              />
              <Route path="/leaderboard" element={<LeaderboardScreen persona={persona} />} />
              <Route
                path="/profile"
                element={<ProfileScreen persona={persona} tweaks={tweaks} />}
              />
              <Route
                path="/rewards"
                element={<RewardsScreen persona={persona} onRedeem={handleRedeem} />}
              />
              <Route path="*" element={<Navigate to="/missions" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <div className="app-footer">
        <div style={{ display: 'flex', gap: 18 }}>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              font: 'inherit',
            }}
          >
            Terms of Service
          </button>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              font: 'inherit',
            }}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              font: 'inherit',
            }}
          >
            Changelog
          </button>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)' }}>
          Powered by <strong style={{ color: 'var(--ink)' }}>GrowQuest</strong> · multi-tenant
          growth OS
        </div>
      </div>

      <Suspense fallback={null}>
        {celebration && (
          <CelebrationScreen reward={celebration} onContinue={() => setCelebration(null)} />
        )}
        {spinOpen && (
          <SpinModal
            onClose={() => setSpinOpen(false)}
            onPrize={(p) => handleClaim({ title: 'Spin prize: ' + p.label, xp: p.xp || 0 })}
          />
        )}
        {dailyOpen && (
          <DailyModal
            onClose={() => setDailyOpen(false)}
            streak={persona.streak}
            onClaim={handleClaim}
          />
        )}
      </Suspense>

      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweaksVisible} />
    </div>
  )
}
