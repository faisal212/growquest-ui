import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from 'storybook/test'
import { MissionModal } from './MissionModal'
import { MISSIONS } from '../../data'

const meta = {
  title: 'Components/MissionModal',
  component: MissionModal,
  args: { m: null, onClose: fn(), onClaim: fn() },
  argTypes: {
    m: { control: 'object' },
    onClose: { action: 'closed' },
    onClaim: { action: 'claimed' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: 640 } },
  },
} satisfies Meta<typeof MissionModal>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: '· Playground',
  args: { m: MISSIONS[0].id } as any,
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
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <MissionModal m={args.m} onClose={args.onClose} onClaim={args.onClaim} />
    </div>
  ),
}

export const Social: Story = {
  args: { m: MISSIONS[0] },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }))
    expect(args.onClose).toHaveBeenCalledOnce()
  },
}
export const Quiz: Story = { args: { m: MISSIONS.find((m) => m.type === 'quiz')! } }
export const Survey: Story = { args: { m: MISSIONS.find((m) => m.type === 'survey')! } }
export const Hangman: Story = { args: { m: MISSIONS.find((m) => m.type === 'hangman')! } }
export const Trivia: Story = {
  args: { m: MISSIONS.find((m) => m.type === 'trivia')! },
  play: async ({ args }) => {
    await userEvent.keyboard('{Escape}')
    expect(args.onClose).toHaveBeenCalledOnce()
  },
}
export const Limited: Story = { args: { m: MISSIONS.find((m) => m.limited)! } }

// ── Missions 5–18 ─────────────────────────────────────────────────────────────

export const WatchVideo: Story = {
  name: '5 · Watch Video',
  args: {
    m: {
      id: 'watch-video',
      type: 'video',
      title: 'Watch the product demo',
      desc: 'Watch 90 seconds to completion.',
      xp: 100,
      progress: [0, 1],
      tone: 'primary',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  },
}
export const ReadArticle: Story = {
  name: '6 · Read Article',
  args: {
    m: {
      id: 'read-article',
      type: 'read_article',
      title: 'Read: How XP works',
      desc: 'Spend 60 seconds on the article.',
      xp: 80,
      progress: [0, 1],
      tone: 'primary',
      url: 'https://growquest.io/docs/xp',
    },
  },
}
export const ProfileCompletion: Story = {
  name: '7 · Profile Completion',
  args: {
    m: {
      id: 'profile',
      type: 'profile',
      title: 'Complete your profile',
      desc: 'Fill in your name and bio.',
      xp: 120,
      progress: [0, 1],
      tone: 'primary',
    },
  },
}
export const AvatarUpload: Story = {
  name: '8 · Avatar Upload',
  args: {
    m: {
      id: 'avatar',
      type: 'avatar',
      title: 'Upload a profile picture',
      desc: 'Add a photo to personalise your account.',
      xp: 100,
      progress: [0, 1],
      tone: 'secondary',
    },
  },
}
export const EmailVerification: Story = {
  name: '9 · Email Verification',
  args: {
    m: {
      id: 'verify-email',
      type: 'verify_email',
      title: 'Verify your email',
      desc: 'Click the link sent to your inbox.',
      xp: 100,
      progress: [0, 1],
      tone: 'primary',
    },
  },
}
export const PhoneVerification: Story = {
  name: '10 · Phone Verification',
  args: {
    m: {
      id: 'verify-phone',
      type: 'verify_phone',
      title: 'Verify your phone number',
      desc: 'Enter the OTP sent via SMS.',
      xp: 100,
      progress: [0, 1],
      tone: 'primary',
    },
  },
}
export const SpinWheel: Story = {
  name: '11 · Spin the Wheel',
  args: {
    m: {
      id: 'spin-wheel',
      type: 'spin_wheel',
      title: 'Spin the wheel',
      desc: 'Spin for a chance to win bonus XP.',
      xp: 250,
      progress: [0, 1],
      tone: 'secondary',
    },
  },
}
export const ScratchCard: Story = {
  name: '12 · Scratch Card',
  args: {
    m: {
      id: 'scratch-card',
      type: 'scratch_card',
      title: 'Reveal your scratch card',
      desc: 'Scratch to uncover your hidden reward.',
      xp: 200,
      progress: [0, 1],
      tone: 'secondary',
    },
  },
}
export const BadgeCollection: Story = {
  name: '13 · Badge Collection',
  args: {
    m: {
      id: 'badge-collect',
      type: 'badge_collect',
      title: 'Earn 3 badges',
      desc: 'Complete quests to collect achievement badges.',
      xp: 300,
      progress: [1, 3],
      tone: 'primary',
    },
  },
}
export const ReferralMission: Story = {
  name: '14 · Referral',
  args: {
    m: {
      id: 'referral',
      type: 'refer',
      title: 'Refer a friend',
      desc: 'Your referred friend must sign up and verify their email.',
      xp: 450,
      progress: [0, 1],
      tone: 'primary',
    },
  },
}
export const ShareMission: Story = {
  name: '15 · Share',
  args: {
    m: {
      id: 'share',
      type: 'share',
      title: 'Share this campaign',
      desc: 'Share with your network to earn XP.',
      xp: 200,
      progress: [0, 1],
      tone: 'primary',
      url: 'https://growquest.io/campaign/demo',
    },
  },
}
export const InviteMission: Story = {
  name: '16 · Invite',
  args: {
    m: {
      id: 'invite',
      type: 'invite',
      title: 'Send 5 invites',
      desc: 'Invite teammates directly from the app.',
      xp: 300,
      progress: [2, 5],
      tone: 'primary',
    },
  },
}
export const PhotoProof: Story = {
  name: '17 · Photo Proof',
  args: {
    m: {
      id: 'photo-proof',
      type: 'photo_proof',
      title: 'Upload photo evidence',
      desc: 'Snap a photo — admin approves within 24h.',
      xp: 400,
      progress: [0, 1],
      tone: 'secondary',
    },
  },
}
export const FollowSocial: Story = {
  name: '18 · Follow Social Media',
  args: {
    m: {
      id: 'follow-social',
      type: 'follow_social',
      title: 'Follow us on Instagram',
      desc: 'Tap Follow — we detect it automatically.',
      xp: 150,
      progress: [0, 1],
      tone: 'primary',
      url: 'https://instagram.com/growquest',
    },
  },
}
