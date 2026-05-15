'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../atoms'

export function FullbleedFrame({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <div className="flex-1 grid place-items-center px-6 py-8 max-[720px]:px-3 max-[720px]:py-4">
      {children}
      <div className="fixed top-4 right-4 flex gap-1.5">
        <Button variant="ghost" size="sm" onClick={() => router.push('/missions')}>
          Skip →
        </Button>
      </div>
    </div>
  )
}
