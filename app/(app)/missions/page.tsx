'use client'

import MissionsScreen from '../../../src/screens/missions'
import { useDemoShell } from '../../../src/shell/DemoShell'

export default function MissionsPage() {
  const shell = useDemoShell()
  return (
    <MissionsScreen
      persona={shell.persona}
      tweaks={shell.tweaks}
      onClaim={shell.onClaim}
      onRedeem={shell.onRedeem}
      openSpin={shell.openSpin}
      openDaily={shell.openDaily}
    />
  )
}
