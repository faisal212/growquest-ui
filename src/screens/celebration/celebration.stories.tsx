import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { CelebrationScreen, SpinModal, DailyModal } from './celebration'

export default {
  title: 'Overlays/Celebration',
} satisfies Meta

export const CelebrationXP: StoryObj = {
  render: () => (
    <CelebrationScreen reward={{ title: 'Follow GrowQuest on X', xp: 150 }} onContinue={fn()} />
  ),
}
export const CelebrationRedeemed: StoryObj = {
  render: () => (
    <CelebrationScreen
      reward={{ title: "Founders' hoodie", xp: 0, redeemed: true }}
      onContinue={fn()}
    />
  ),
}

export const Spin: StoryObj = {
  render: () => <SpinModal onClose={fn()} onPrize={fn()} />,
}

export const Daily7Day: StoryObj = {
  render: () => <DailyModal onClose={fn()} onClaim={fn()} streak={6} />,
}
export const DailyStreak12: StoryObj = {
  render: () => <DailyModal onClose={fn()} onClaim={fn()} streak={12} />,
}
