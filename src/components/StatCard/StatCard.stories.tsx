import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

// 'trend' is a comma-separated string in the story controls, converted to number[] by the render function.
// satisfies Meta<any> is intentional — the story arg type differs from the component prop type for 'trend'.
type StatCardStoryArgs = {
  label: string
  value: string | number
  trend: string
  trendColor?: string
}

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  args: {
    label: 'Total XP',
    value: '9,840',
    trend: '5,6,7,8,10,12',
    trendColor: 'var(--color-primary)',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    trend: { control: 'text', description: 'comma-separated numbers' },
    trendColor: { control: 'color' },
  },
  render: (args: StatCardStoryArgs) => (
    <StatCard
      label={args.label}
      value={args.value}
      trend={String(args.trend).split(',').map(Number)}
      trendColor={args.trendColor}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 180 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<any>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const AllStats: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 160px)', gap: 10 }}>
      <StatCard label="Total XP" value="9,840" trend={[5, 6, 7, 8, 10, 12]} />
      <StatCard label="Missions" value={7} trend={[1, 2, 2, 3, 4, 4, 5]} />
      <StatCard
        label="Streak"
        value="12d"
        trend={[3, 5, 7, 6, 9, 12]}
        trendColor="var(--accent-amber)"
      />
      <StatCard
        label="Rewards"
        value={2}
        trend={[0, 0, 1, 1, 2, 2]}
        trendColor="var(--accent-lime)"
      />
    </div>
  ),
}
