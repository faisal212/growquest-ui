'use client'

import RewardsScreen from '../../../src/screens/rewards'
import { useDemoShell } from '../../../src/shell/DemoShell'

export default function RewardsPage() {
  const shell = useDemoShell()
  return <RewardsScreen persona={shell.persona} onRedeem={shell.onRedeem} />
}
