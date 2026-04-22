import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from 'storybook/test'
import { Button } from './Button'

const ARROW_RIGHT = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 7h12M8 2l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const ARROW_LEFT = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M13 7H1M6 12l-5-5 5-5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const ARROW = ARROW_RIGHT // backwards compat alias

const meta = {
  title: 'Primitives/Button',
  component: Button,
  args: { children: 'Confirm', variant: 'default', size: 'md', disabled: false },
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label or content.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'ghost'],
      description: 'Visual style of the button.',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'],
      description: 'Controls padding and font size.',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and prevents interaction.',
      table: { defaultValue: { summary: 'false' } },
    },
    iconLeft: {
      control: false,
      description: 'Icon slot rendered before the label.',
    },
    iconRight: {
      control: false,
      description: 'Icon slot rendered after the label.',
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div
        data-theme="dark"
        style={{
          padding: 32,
          background: 'var(--bg)',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { name: '· Playground' }

export const Default: Story = {
  args: { variant: 'default', children: 'Default', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Default' }))
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}
export const Primary: Story = { args: { variant: 'primary', children: 'Primary action' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost action' } }
export const Small: Story = { args: { variant: 'primary', size: 'sm', children: 'Small' } }
export const Disabled: Story = {
  args: { variant: 'primary', children: 'Disabled', disabled: true },
}
export const WithIcon: Story = {
  args: { variant: 'primary', children: 'Enter the quest', icon: ARROW },
}

export const WithLeftIcon: Story = {
  args: { variant: 'ghost', children: 'Back', iconLeft: ARROW_LEFT },
}
export const WithRightIcon: Story = {
  args: { variant: 'primary', children: 'Continue', iconRight: ARROW_RIGHT },
}
export const WithBothIcons: Story = {
  args: { variant: 'default', children: 'Transfer', iconLeft: ARROW_LEFT, iconRight: ARROW_RIGHT },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" icon={ARROW}>
        Right icon
      </Button>
      <Button variant="ghost" iconLeft={ARROW_LEFT}>
        Left icon
      </Button>
      <Button variant="default" iconLeft={ARROW_LEFT} iconRight={ARROW_RIGHT}>
        Both icons
      </Button>
    </div>
  ),
}

export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, width: 360 }}>
      <Button variant="ghost" iconLeft={ARROW_LEFT} style={{ flex: 1 }}>
        Back
      </Button>
      <Button variant="primary" iconRight={ARROW_RIGHT} style={{ flex: 2 }}>
        Continue
      </Button>
    </div>
  ),
}
