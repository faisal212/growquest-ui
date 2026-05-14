import { LEADERBOARD } from '../../data'
import { Eyebrow } from '../../atoms'
import { Podium } from '../../components/Podium'
import { LeaderboardTable } from '../../components/LeaderboardTable'
import type { Persona } from '../../types'

export default function LeaderboardScreen({ persona: _persona }: { persona: Persona }) {
  return (
    <div className="animate-fade-up w-full max-w-[1080px] mx-auto px-6 pt-6 pb-10 max-[720px]:px-3 max-[720px]:pt-4 max-[720px]:pb-8">
      <div className="mb-5">
        <Eyebrow>// season 04 leaderboard</Eyebrow>
        <h1 className="display mt-[6px] mb-1 text-[30px]">The ascent</h1>
        <div className="text-sm text-ink-dim">
          Season resets in 12 days · top 10 receive Oracle airdrop
        </div>
      </div>
      <Podium entries={LEADERBOARD} />
      <LeaderboardTable entries={LEADERBOARD} />
    </div>
  )
}
