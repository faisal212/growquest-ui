import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import WelcomeScreen from './welcome'

export default {
  title: 'Screens/Welcome',
  component: WelcomeScreen,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof WelcomeScreen>

type Story = StoryObj<typeof WelcomeScreen>

export const Default: Story = {
  args: {
    email: 'alpha@growquest.io',
    // no-op so the story doesn't auto-navigate away
    onContinue: fn(),
  },
}

export const NoEmail: Story = {
  args: {
    email: '',
    onContinue: fn(),
  },
}
export const Mobile: Story = {
  name: '· Mobile',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: { email: 'alpha@growquest.io', onContinue: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 375, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
