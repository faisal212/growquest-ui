import type { Meta, StoryObj } from '@storybook/react'
import { XPBar } from './XPBar'

const meta = {
  title: 'Primitives/XPBar',
  component: XPBar,
  args: { value: 6500, max: 12000, label: 'Progress', segments: 10 },
  argTypes: {
    style: {
      control: 'radio',
      options: ['plain', 'segmented', 'ring', 'notched'],
      description: 'Visual rendering style of the progress bar.',
      table: { defaultValue: { summary: 'segmented' } },
    },
    value: {
      control: { type: 'range', min: 0, max: 12000, step: 100 },
      description: 'Current XP value.',
    },
    max: {
      control: { type: 'range', min: 500, max: 30000, step: 500 },
      description: 'Maximum XP value — sets the 100% threshold.',
      table: { defaultValue: { summary: '12000' } },
    },
    segments: {
      control: { type: 'range', min: 4, max: 20, step: 1 },
      description: 'Number of segments (segmented style only).',
      table: { defaultValue: { summary: '10' } },
    },
    label: {
      control: 'text',
      description: 'Optional label shown above the bar.',
    },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: 32, background: 'var(--bg)', maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof XPBar>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { name: '· Playground' }

export const Plain: Story = { args: { style: 'plain' } }
export const Segmented: Story = { args: { style: 'segmented' } }
export const Ring: Story = { args: { style: 'ring' } }
export const Notched: Story = { args: { style: 'notched' } }

export const AllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}>
      <XPBar value={6500} max={12000} style="plain" label="plain" />
      <XPBar value={6500} max={12000} style="segmented" label="segmented" />
      <XPBar value={6500} max={12000} style="ring" label="ring" />
      <XPBar value={6500} max={12000} style="notched" label="notched" />
    </div>
  ),
}
