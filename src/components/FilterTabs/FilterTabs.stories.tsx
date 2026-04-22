import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from 'storybook/test'
import { useState } from 'react'
import { FilterTabs } from './FilterTabs'

const meta = {
  title: 'Components/FilterTabs',
  component: FilterTabs,
  args: { options: ['all', 'new', 'ongoing', 'ready'], value: 'all', onChange: fn() },
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof FilterTabs>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: '· Playground',
  args: { options: 'all,new,ongoing,ready', value: 'all' } as any,
  argTypes: {
    options: { control: 'text', description: 'comma-separated tab labels' },
    value: { control: 'text' },
  } as any,
  render: (args) => (
    <FilterTabs
      options={String(args.options).split(',')}
      value={args.value}
      onChange={args.onChange}
    />
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'new' }))
    expect(args.onChange).toHaveBeenCalledWith('new')
  },
}

// Named components so React hooks rules are satisfied (component names must start with uppercase).
function MissionFiltersDemo() {
  const [v, setV] = useState('all')
  return <FilterTabs options={['all', 'new', 'ongoing', 'ready']} value={v} onChange={setV} />
}
function RewardFiltersDemo() {
  const [v, setV] = useState('all')
  return (
    <FilterTabs
      options={['all', 'merch', 'digital', 'access', 'experience']}
      value={v}
      onChange={setV}
    />
  )
}

export const MissionFilters: Story = { render: () => <MissionFiltersDemo /> }
export const RewardFilters: Story = { render: () => <RewardFiltersDemo /> }
