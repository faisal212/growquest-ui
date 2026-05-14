'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../atoms'
import { useDemoShell } from './DemoShell'

export function FullbleedFrame({ children }: { children: ReactNode }) {
  const router = useRouter()
  const shell = useDemoShell()
  return (
    <div className="flex-1 grid place-items-center px-6 py-8 max-[720px]:px-3 max-[720px]:py-4">
      {children}
      <div className="fixed top-4 right-4 flex gap-1.5">
        <Button variant="ghost" size="sm" onClick={() => router.push('/missions')}>
          Skip →
        </Button>
        <button
          onClick={shell.toggleTweaks}
          title="Toggle tweaks"
          className="w-8 h-8 rounded-md bg-panel border border-border grid place-items-center"
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
