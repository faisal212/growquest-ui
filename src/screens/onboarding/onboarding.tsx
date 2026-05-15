import { useState } from 'react'
import { HeroArt } from '../../art'
import { Eyebrow, Button, Input, Chip } from '../../atoms'
import { interpolate, useAsset, useContent } from '../../config'
import { HeroMedia } from '../../components/HeroMedia/HeroMedia'

interface OnboardingScreenProps {
  onEnter: (email: string) => void
  heroStyle: string
}

export default function OnboardingScreen({ onEnter, heroStyle }: OnboardingScreenProps) {
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const valid = /^\S+@\S+\.\S+$/.test(email) && agree

  const brandName = useContent<string>('brand.name')
  const eyebrow = useContent<string>('onboarding.eyebrow')
  const titleLead = useContent<string>('onboarding.titleLead')
  const titleBrand = useContent<string>('onboarding.titleBrand')
  const titleTrail = useContent<string>('onboarding.titleTrail')
  const body = useContent<string>('onboarding.body')
  const stats = useContent<{ key: string; value: string }[]>('onboarding.stats')
  const emailLabel = useContent<string>('onboarding.emailLabel')
  const emailPlaceholder = useContent<string>('onboarding.emailPlaceholder')
  const consent = useContent<string>('onboarding.consent')
  const consentTermsLabel = useContent<string>('onboarding.consentTermsLabel')
  const consentPrivacyLabel = useContent<string>('onboarding.consentPrivacyLabel')
  const cta = useContent<string>('onboarding.cta')
  const microcopyLeft = useContent<string>('onboarding.microcopyLeft')
  const microcopyRight = useContent<string>('onboarding.microcopyRight')
  const chipPrimary = useContent<string>('onboarding.chipPrimary')
  const chipSecondary = useContent<string>('onboarding.chipSecondary')
  const onboardingHero = useAsset('onboardingHero')

  const brandHighlight = titleBrand || brandName
  const consentParts = interpolate(consent, {
    terms: (
      <button
        type="button"
        className="bg-transparent border-0 p-0 cursor-pointer [font:inherit]"
        style={{ color: 'var(--onboarding-card-link)' }}
      >
        {consentTermsLabel}
      </button>
    ),
    privacy: (
      <button
        type="button"
        className="bg-transparent border-0 p-0 cursor-pointer [font:inherit]"
        style={{ color: 'var(--onboarding-card-link)' }}
      >
        {consentPrivacyLabel}
      </button>
    ),
  })

  return (
    <div className="animate-fade-up w-[min(1040px,100%)] mx-auto">
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-0 rounded-2xl overflow-hidden max-[720px]:grid-cols-1"
        style={{
          background: 'var(--onboarding-card-bg)',
          border: '1px solid var(--onboarding-card-border)',
        }}
      >
        <div
          className="onboarding-hero relative min-h-[440px] max-[720px]:min-h-[220px]"
          style={{ background: 'var(--onboarding-card-hero-bg)' }}
        >
          <div className="absolute inset-0">
            <HeroMedia
              asset={onboardingHero}
              fallback={<HeroArt variant={heroStyle} />}
              alt={`${titleLead} ${brandHighlight} ${titleTrail}`.trim()}
            />
          </div>
          {!onboardingHero && (
            <div className="absolute left-4 bottom-4 flex gap-[6px] flex-wrap">
              <Chip tone="accent">{chipPrimary}</Chip>
              <Chip>{chipSecondary}</Chip>
            </div>
          )}
        </div>

        <div
          className="px-9 pt-9 pb-7 flex flex-col gap-5"
          style={{
            background: 'var(--onboarding-card-form-bg)',
            color: 'var(--onboarding-card-title)',
          }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display text-[36px] leading-[1.05] m-0 tracking-[-0.03em]">
            {titleLead}
            <br />
            <span style={{ color: 'var(--onboarding-card-brand-emphasis)' }}>
              {brandHighlight}
            </span>{' '}
            {titleTrail}
          </h1>
          <p
            className="text-[15px] leading-[1.6] m-0"
            style={{ color: 'var(--onboarding-card-body)' }}
          >
            {body}
          </p>

          <div className="grid grid-cols-3 gap-[10px]">
            {stats.map((s) => (
              <div
                key={s.key}
                className="px-3 py-[10px] rounded-lg"
                style={{
                  background: 'var(--onboarding-card-stat-bg)',
                  border: '1px solid var(--onboarding-card-stat-border)',
                }}
              >
                <div
                  className="font-mono text-[10px] tracking-[0.1em] uppercase"
                  style={{ color: 'var(--onboarding-card-body)' }}
                >
                  {s.key}
                </div>
                <div className="font-semibold text-sm">{s.value}</div>
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor="onboarding-email"
              className="block font-mono text-[10px] tracking-[0.12em] uppercase mb-[6px]"
              style={{ color: 'var(--onboarding-card-body)' }}
            >
              {emailLabel}
            </label>
            <Input
              id="onboarding-email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label
            className="flex gap-[10px] items-start text-xs"
            style={{ color: 'var(--onboarding-card-body)' }}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-[2px]"
            />
            <span>{consentParts}</span>
          </label>

          <Button variant="primary" disabled={!valid} onClick={() => onEnter(email)}>
            {cta}
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
            <span>{microcopyLeft}</span>
            <span>{microcopyRight}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
