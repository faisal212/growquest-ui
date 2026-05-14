'use client'

import ProfileScreen from '../../../src/screens/profile'
import { useDemoShell } from '../../../src/shell/DemoShell'

export default function ProfilePage() {
  const shell = useDemoShell()
  return <ProfileScreen persona={shell.persona} tweaks={shell.tweaks} />
}
