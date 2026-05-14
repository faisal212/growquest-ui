import type { ReactNode } from 'react'
import { FullbleedFrame } from '../../src/shell/FullbleedFrame'

export default function FullbleedGroupLayout({ children }: { children: ReactNode }) {
  return <FullbleedFrame>{children}</FullbleedFrame>
}
