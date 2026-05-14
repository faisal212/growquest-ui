import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { BrandLockup, Chip } from '../atoms'
import type { Persona, Tweaks } from '../types'

const NAV_SCREENS = [
  { id: 'missions', label: 'Missions' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'profile', label: 'Profile' },
]

const BOTTOM_NAV = [
  {
    id: 'missions',
    label: 'Missions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zM12 12l9-5M12 12l-9-5M12 12v10" />
      </svg>
    ),
  },
  {
    id: 'leaderboard',
    label: 'Ranks',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20h4V10H4zM10 20h4V4h-4zM16 20h4v-7h-4z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
]

const PERSONAS = ['new', 'active', 'power']

interface AppLayoutProps {
  persona: Persona
  tweaks: Tweaks
  personaKey: string
  onSetPersonaKey: (k: string) => void
  onToggleTweaks: () => void
}

export function AppLayout({
  persona,
  personaKey,
  onSetPersonaKey,
  onToggleTweaks,
}: Omit<AppLayoutProps, 'tweaks'> & { tweaks?: Tweaks }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const screen = pathname.slice(1)

  return (
    <>
      <div className="topbar">
        <BrandLockup />
        <nav className="nav">
          {NAV_SCREENS.map((s) => (
            <button
              key={s.id}
              className={screen === s.id ? 'active' : ''}
              onClick={() => navigate(`/${s.id}`)}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="topbar-actions flex items-center gap-2 flex-wrap">
          <div className="persona-switch flex gap-1 p-1 bg-panel-2 border border-border rounded-lg">
            {PERSONAS.map((k) => (
              <button
                key={k}
                onClick={() => onSetPersonaKey(k)}
                className={`px-2.5 py-[5px] text-[11px] font-mono tracking-[0.08em] uppercase rounded-[5px] border ${
                  personaKey === k
                    ? 'bg-panel text-ink border-border'
                    : 'bg-transparent text-ink-dim border-transparent'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <Chip tone="accent" className="xp-chip-mobile-hide font-bold">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <polygon
                points="5,0 6.3,3.7 10,3.7 7,6 8.2,10 5,7.6 1.8,10 3,6 0,3.7 3.7,3.7"
                fill="currentColor"
              />
            </svg>
            {persona.xp.toLocaleString()}
          </Chip>
          <button
            onClick={onToggleTweaks}
            title="Toggle tweaks"
            className="w-8 h-8 rounded-md bg-panel-2 border border-border grid place-items-center"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="7" cy="7" r="2.5" />
              <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4M2.8 11.2l1.4-1.4M9.8 4.2l1.4-1.4" />
            </svg>
          </button>
        </div>
      </div>

      <Outlet />

      <nav className="bottom-nav">
        {BOTTOM_NAV.map((t) => (
          <button
            key={t.id}
            className={screen === t.id ? 'active' : ''}
            onClick={() => navigate(`/${t.id}`)}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
