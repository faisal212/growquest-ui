import type { Meta, StoryObj } from '@storybook/react'
import { LeaderboardTable } from './LeaderboardTable'
import { LEADERBOARD } from '../../data'
import type { LeaderboardEntry } from '../../types'

// Column labels are flat args in the story, merged into a single columnLabels object by the render function.
// satisfies Meta<any> is intentional — Storybook's type system can't represent this flat-to-nested mapping.
type LeaderboardTableStoryArgs = {
  entries: LeaderboardEntry[]
  streakEmoji: string
  colRank: string
  colHandle: string
  colStreak: string
  colTier: string
  colXP: string
}

const meta = {
  title: 'Components/LeaderboardTable',
  component: LeaderboardTable,
  args: {
    entries: LEADERBOARD,
    streakEmoji: '🔥',
    colRank: 'rank',
    colHandle: 'insider',
    colStreak: 'streak',
    colTier: 'tier',
    colXP: 'xp',
  },
  argTypes: {
    entries: { control: 'object' },
    streakEmoji: { control: 'text' },
    colRank: { control: 'text', table: { category: 'Column Labels' } },
    colHandle: { control: 'text', table: { category: 'Column Labels' } },
    colStreak: { control: 'text', table: { category: 'Column Labels' } },
    colTier: { control: 'text', table: { category: 'Column Labels' } },
    colXP: { control: 'text', table: { category: 'Column Labels' } },
  },
  render: (args: LeaderboardTableStoryArgs) => (
    <LeaderboardTable
      entries={args.entries}
      streakEmoji={args.streakEmoji}
      columnLabels={{
        rank: args.colRank,
        handle: args.colHandle,
        streak: args.colStreak,
        tier: args.colTier,
        xp: args.colXP,
      }}
    />
  ),
} satisfies Meta<any>
export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {}
export const TopOnly: Story = { args: { entries: LEADERBOARD.slice(0, 3) } }
export const Mobile: Story = {
  name: '· Mobile',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  decorators: [
    (Story) => (
      <div style={{ width: 375, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
