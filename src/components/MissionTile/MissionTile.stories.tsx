import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from 'storybook/test'
import { MissionTile } from './MissionTile'
import { MISSIONS } from '../../data'

const meta = {
  title: 'Components/MissionTile',
  component: MissionTile,
  args: { m: MISSIONS[0], layout: 'split', density: 'comfortable', onOpen: fn() },
  argTypes: {
    layout: { control: 'radio', options: ['split', 'stack', 'list'] },
    density: { control: 'radio', options: ['comfortable', 'compact'] },
  },
} satisfies Meta<typeof MissionTile>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: '· Playground',
  args: { m: MISSIONS[0].id, layout: 'split', density: 'comfortable' } as any,
  argTypes: {
    m: {
      control: 'select',
      options: MISSIONS.map((m) => m.id),
      mapping: Object.fromEntries(MISSIONS.map((m) => [m.id, m])),
      labels: Object.fromEntries(
        MISSIONS.map((m) => [m.id, `${m.type} — ${m.title}`.slice(0, 48)])
      ),
    },
  } as any,
  render: (args) => (
    <MissionTile m={args.m} layout={args.layout} density={args.density} onOpen={args.onOpen} />
  ),
}

export const SplitLayout: Story = {
  args: { layout: 'split' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    expect(args.onOpen).toHaveBeenCalledOnce()
  },
}
export const StackLayout: Story = {
  args: { layout: 'stack' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    expect(args.onOpen).toHaveBeenCalledOnce()
  },
}
export const ListLayout: Story = {
  args: { layout: 'list' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    expect(args.onOpen).toHaveBeenCalledOnce()
  },
}
export const Compact: Story = { args: { layout: 'stack', density: 'compact' } }
export const WithLimitedBadge: Story = {
  args: { m: MISSIONS.find((m) => m.limited)!, layout: 'split' },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
}
export const AllMissionTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 12,
      }}
    >
      {MISSIONS.map((m) => (
        <MissionTile key={m.id} m={m} layout="stack" onOpen={fn()} />
      ))}
    </div>
  ),
}
