'use client'

import { useRouter } from 'next/navigation'
import OnboardingScreen from '../../../src/screens/onboarding'
import { useDemoShell } from '../../../src/shell/DemoShell'

export default function OnboardingPage() {
  const shell = useDemoShell()
  const router = useRouter()
  return (
    <OnboardingScreen
      heroStyle="isometric"
      onEnter={(email) => {
        shell.setEmail(email)
        router.push('/welcome')
      }}
    />
  )
}
