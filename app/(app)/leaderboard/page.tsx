'use client'

import LeaderboardScreen from '../../../src/screens/leaderboard'
import { useDemoShell } from '../../../src/shell/DemoShell'

export default function LeaderboardPage() {
  const shell = useDemoShell()
  return <LeaderboardScreen persona={shell.persona} />
}
