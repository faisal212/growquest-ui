import type { ReactNode } from 'react'
import { AppHeader } from '../../src/shell/AppHeader'
import { AppFooter } from '../../src/shell/AppFooter'

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </>
  )
}
