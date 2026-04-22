import type { Meta, StoryObj } from '@storybook/react'
import { BadgeGrid } from './BadgeGrid'
import { BADGES } from '../../data'

const meta = {
  title: 'Components/BadgeGrid',
  component: BadgeGrid,
  args: { badges: BADGES, columns: 3 },
  argTypes: {
    badges: { control: 'object' },
    columns: { control: { type: 'range', min: 1, max: 6, step: 1 } },
  },
} satisfies Meta<typeof BadgeGrid>
export default meta
type Story = StoryObj<typeof meta>

export const Mixed: Story = {}
export const AllUnlocked: Story = { args: { badges: BADGES.map((b) => ({ ...b, got: true })) } }
export const AllLocked: Story = { args: { badges: BADGES.map((b) => ({ ...b, got: false })) } }
