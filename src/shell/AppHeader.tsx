'use client'

import { useRouter, usePathname } from 'next/navigation'
import { BrandLockup, Chip } from '../atoms'
import { useContentSlice } from '../config'
import { useDemoShell } from './DemoShell'

const NAV_IDS = ['missions', 'leaderboard', 'profile'] as const

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
