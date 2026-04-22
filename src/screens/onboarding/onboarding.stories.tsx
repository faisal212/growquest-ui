import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import OnboardingScreen from './onboarding'

export default {
  title: 'Screens/Onboarding',
  component: OnboardingScreen,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof OnboardingScreen>

type Story = StoryObj<typeof OnboardingScreen>

export const GridPoster: Story = {
  args: { heroStyle: 'grid-poster', onEnter: fn() },
}
export const Isometric: Story = {
  args: { heroStyle: 'isometric', onEnter: fn() },
}
export const Orbital: Story = {
  args: { heroStyle: 'orbital', onEnter: fn() },
}
export const Pixel: Story = {
  args: { heroStyle: 'pixel', onEnter: fn() },
}
export const Mobile: Story = {
  name: '· Mobile',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: { heroStyle: 'grid-poster', onEnter: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 375, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
