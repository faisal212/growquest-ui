'use client'

import { useRouter, usePathname } from 'next/navigation'
import { BrandLockup, Chip } from '../atoms'
import { useContent } from '../config'
import { useDemoShell } from './DemoShell'

const NAV_IDS = ['missions', 'leaderboard', 'profile'] as const

const PERSONAS = ['new', 'active', 'power']

export function AppHeader() {
  const shell = useDemoShell()
  const router = useRouter()
  const pathname = usePathname()
  const screen = pathname.slice(1).split('/')[0]

  const brandName = useContent<string>('brand.name')
  const brandVersion = useContent<string>('brand.version')
  const navLabels = {
    missions: useContent<string>('nav.missions'),
    leaderboard: useContent<string>('nav.leaderboard'),
    profile: useContent<string>('nav.profile'),
  }

  return (
    <div className="topbar">
      <BrandLockup name={brandName} version={brandVersion} />
      <nav className="nav">
        {NAV_IDS.map((id) => (
          <button
            key={id}
            className={screen === id ? 'active' : ''}
            onClick={() => router.push(`/${id}`)}
          >
            {navLabels[id]}
          </button>
        ))}
      </nav>
      <div className="topbar-actions flex items-center gap-2 flex-wrap">
        <div className="persona-switch flex gap-1 p-1 bg-panel-2 border border-border rounded-lg">
          {PERSONAS.map((k) => (
            <button
              key={k}
              onClick={() => shell.setPersonaKey(k)}
              className={`px-2.5 py-[5px] text-[11px] font-mono tracking-[0.08em] uppercase rounded-[5px] border ${
                shell.personaKey === k
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
          {shell.persona.xp.toLocaleString()}
        </Chip>
        <button
          onClick={shell.toggleTweaks}
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
  )
}
