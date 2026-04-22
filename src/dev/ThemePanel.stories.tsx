import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TweaksPanel } from '../tweaks'
import type { Tweaks } from '../types'

const defaultTweaks: Tweaks = {
  theme: 'dark',
  accent: 'amber',
  tileLayout: 'stack',
  xpStyle: 'notched',
  tileDensity: 'comfortable',
  heroStyle: 'grid-poster',
  rewardsLayout: 'stacked',
  rewardsRatio: 'balanced',
  mobileNav: 'top',
  mobileDensity: 'comfortable',
  mobileHero: 'show',
}

export default { title: 'Dev/ThemePanel', component: TweaksPanel } satisfies Meta<
  typeof TweaksPanel
>

// Named components so React hooks rules are satisfied (component names must start with uppercase).
function VisibleDemo() {
  const [tweaks, setTweaks] = useState<Tweaks>(defaultTweaks)
  return <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={true} />
}
function HiddenDemo() {
  const [tweaks, setTweaks] = useState<Tweaks>(defaultTweaks)
  return (
    <div>
      <p style={{ color: 'var(--ink-dim)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        Panel is hidden (visible=false)
      </p>
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={false} />
    </div>
  )
}

export const Visible: StoryObj = { render: () => <VisibleDemo /> }
export const Hidden: StoryObj = { render: () => <HiddenDemo /> }
