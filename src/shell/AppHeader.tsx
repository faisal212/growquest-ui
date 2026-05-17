'use client'

import { useRouter, usePathname } from 'next/navigation'
import { BrandLockup, Chip } from '../atoms'
import { useContentSlice } from '../config'
import { useDemoShell } from './DemoShell'

const NAV_IDS = ['missions', 'leaderboard', 'profile'] as const

const PERSONAS = ['new', 'active', 'power']

export function AppHeader() {
  const shell = useDemoShell()
  const router = useRouter()
  const pathname = usePathname()
  const screen = pathname.slice(1).split('/')[0]

  const brand = useContentSlice('brand')
  const navLabels = useContentSlice('nav')

  return (
    <div className="topbar">
      <BrandLockup name={brand.name} version={brand.version} />
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
        <div className="persona-switch flex gap-1 p-1 bg-panel-2 border border-border rounded-[var(--r-btn)]">
          {PERSONAS.map((k) => (
            <button
              key={k}
              onClick={() => shell.setPersonaKey(k)}
              className={`px-2.5 py-[5px] text-[11px] font-mono tracking-[0.08em] uppercase rounded-[var(--r-btn-sm)] border ${
                shell.personaKey === k
                  ? 'bg-panel text-ink border-border'
                  : 'bg-transparent text-ink-dim border-transparent'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <Chip tone="primary" className="xp-chip-mobile-hide font-bold">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon
              points="5,0 6.3,3.7 10,3.7 7,6 8.2,10 5,7.6 1.8,10 3,6 0,3.7 3.7,3.7"
              fill="currentColor"
            />
          </svg>
          {shell.persona.xp.toLocaleString()}
        </Chip>
      </div>
    </div>
  )
}
