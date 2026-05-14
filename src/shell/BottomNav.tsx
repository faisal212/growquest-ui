'use client'

import { useRouter, usePathname } from 'next/navigation'

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

export function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  const screen = pathname.slice(1).split('/')[0]
  return (
    <nav className="bottom-nav">
      {BOTTOM_NAV.map((t) => (
        <button
          key={t.id}
          className={screen === t.id ? 'active' : ''}
          onClick={() => router.push(`/${t.id}`)}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
