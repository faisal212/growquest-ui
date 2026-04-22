import { useState } from 'react'
import { HeroArt } from '../../art'
import { Eyebrow, Button, Input, Chip } from '../../atoms'

interface OnboardingScreenProps {
  onEnter: (email: string) => void
  heroStyle: string
}

export default function OnboardingScreen({ onEnter, heroStyle }: OnboardingScreenProps) {
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const valid = /^\S+@\S+\.\S+$/.test(email) && agree

  return (
    <div className="fade-up w-[min(1040px,100%)] mx-auto">
      <div
        className="onboarding-split grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-0 rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border)', background: 'var(--panel)' }}
      >
        <div
          className="onboarding-hero relative min-h-[440px]"
          style={{ background: 'var(--bg-2)' }}
        >
          <div className="absolute inset-0">
            <HeroArt variant={heroStyle} />
          </div>
          <div className="absolute left-4 bottom-4 flex gap-[6px] flex-wrap">
            <Chip tone="accent">QUEST · 01 OPEN</Chip>
            <Chip>FOUNDERS COHORT</Chip>
          </div>
        </div>

        <div className="px-9 pt-9 pb-7 flex flex-col gap-5">
          <Eyebrow>// onboarding · step 1 / 3</Eyebrow>
          <h1
            className="display text-[36px] leading-[1.05] m-0"
            style={{ letterSpacing: '-0.03em' }}
          >
            Become a<br />
            <span style={{ color: 'var(--accent)' }}>GrowQuest</span> insider.
          </h1>
          <p className="text-[15px] leading-[1.6] m-0" style={{ color: 'var(--ink-dim)' }}>
            Unlock exclusive perks, shape the roadmap, and earn XP toward rewards. Daily missions,
            limited drops, and a spin-to-win lootbox — yours when you join.
          </p>

          <div className="grid grid-cols-3 gap-[10px]">
            {[
              { k: 'XP', v: 'Daily' },
              { k: 'Tiers', v: '4 ranks' },
              { k: 'Drops', v: 'Weekly' },
            ].map((s) => (
              <div
                key={s.k}
                className="px-3 py-[10px] rounded-lg"
                style={{ background: 'var(--panel-2)', border: '1px solid var(--border)' }}
              >
                <div
                  className="font-mono text-[10px] tracking-[0.1em] uppercase"
                  style={{ color: 'var(--ink-dim)' }}
                >
                  {s.k}
                </div>
                <div className="font-semibold text-sm">{s.v}</div>
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor="onboarding-email"
              className="block font-mono text-[10px] tracking-[0.12em] uppercase mb-[6px]"
              style={{ color: 'var(--ink-dim)' }}
            >
              work email
            </label>
            <Input
              id="onboarding-email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label
            className="flex gap-[10px] items-start text-xs"
            style={{ color: 'var(--ink-dim)' }}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-[2px]"
            />
            <span>
              I agree to the{' '}
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: 'var(--accent)',
                  cursor: 'pointer',
                  font: 'inherit',
                }}
              >
                Terms
              </button>{' '}
              and acknowledge the{' '}
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: 'var(--accent)',
                  cursor: 'pointer',
                  font: 'inherit',
                }}
              >
                Privacy Policy
              </button>
              .
            </span>
          </label>

          <Button variant="primary" disabled={!valid} onClick={() => onEnter(email)}>
            Enter the quest
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <div
            className="flex justify-between text-[11px] font-mono"
            style={{ color: 'var(--ink-faint)' }}
          >
            <span>// 2,481 insiders joined this week</span>
            <span>SSO · SAML ok</span>
          </div>
        </div>
      </div>
    </div>
  )
}
