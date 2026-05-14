'use client'

import { useRouter } from 'next/navigation'
import WelcomeScreen from '../../../src/screens/welcome'
import { useDemoShell } from '../../../src/shell/DemoShell'

export default function WelcomePage() {
  const shell = useDemoShell()
  const router = useRouter()
  return (
    <WelcomeScreen
      email={shell.email}
      onContinue={() => {
        router.push('/missions')
      }}
    />
  )
}
