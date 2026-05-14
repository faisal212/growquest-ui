import { useState, useEffect } from 'react'
import type { Tweaks } from './types'
import { applyBrand } from './config'

const ACCENTS: Record<string, string> = {
  cyan: 'oklch(0.86 0.18 200)',
  lime: 'oklch(0.89 0.22 130)',
  magenta: 'oklch(0.72 0.25 340)',
  amber: 'oklch(0.83 0.18 75)',
  violet: 'oklch(0.72 0.22 290)',
}

interface TweaksPanelProps {
  tweaks: Tweaks
  setTweaks: (t: Tweaks) => void
  visible: boolean
}

export function TweaksPanel({ tweaks, setTweaks, visible }: TweaksPanelProps) {
  if (!visible) return null
  const set = (k: string, v: string) => setTweaks({ ...tweaks, [k]: v })

  const sections = [
    { key: 'theme', label: 'Theme', options: ['dark', 'light'] },
    { key: 'accent', label: 'Accent', options: ['cyan', 'lime', 'magenta', 'amber', 'violet'] },
    { key: 'tileLayout', label: 'Mission tile', options: ['split', 'stack', 'list'] },
    { key: 'tileDensity', label: 'Density', options: ['comfortable', 'compact'] },
    { key: 'xpStyle', label: 'XP visual', options: ['segmented', 'plain', 'ring', 'notched'] },
    {
      key: 'heroStyle',
      label: 'Hero art',
      options: ['isometric', 'orbital', 'grid-poster', 'pixel'],
    },
    {
      key: 'rewardsLayout',
      label: 'Rewards layout',
      options: ['stacked', 'side-by-side', 'rewards-left'],
    },
    {
      key: 'rewardsRatio',
      label: 'M : R ratio',
      options: ['balanced', 'missions-heavy', 'rewards-heavy'],
    },
    { key: 'mobileNav', label: 'Mobile nav', options: ['top', 'bottom'] },
    { key: 'mobileDensity', label: 'Mobile density', options: ['comfortable', 'compact'] },
    { key: 'mobileHero', label: 'Mobile hero', options: ['show', 'hide'] },
  ]

  return (
    <div className="tweaks">
      <header>
        <span className="title">⚙ Tweaks</span>
        <span className="font-mono text-[10px] text-ink-faint">live</span>
      </header>
      {sections.map((s) => (
        <div key={s.key} className="row">
          <label>{s.label}</label>
          <div className="pill-row">
            {s.options.map((opt) => (
              <button
                key={opt}
                className={`pill ${(tweaks as unknown as Record<string, string>)[s.key] === opt ? 'on' : ''}`}
                onClick={() => set(s.key, opt)}
              >
                {s.key === 'accent' && (
                  <span
                    className="inline-block w-2 h-2 rounded-[2px] mr-1 align-middle"
                    style={{ background: ACCENTS[opt] }}
                  />
                )}
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const DEFAULT_TWEAKS: Tweaks = {
  theme: 'dark',
  accent: 'cyan',
  tileLayout: 'split',
  xpStyle: 'segmented',
  tileDensity: 'comfortable',
  heroStyle: 'isometric',
  rewardsLayout: 'stacked',
  rewardsRatio: 'balanced',
  mobileNav: 'top',
  mobileDensity: 'comfortable',
  mobileHero: 'show',
}

export function useTweaks(): [Tweaks, (t: Tweaks) => void] {
  const [tweaks, setTweaks] = useState<Tweaks>(() => ({
    ...DEFAULT_TWEAKS,
    ...(typeof window !== 'undefined'
      ? (window.__TWEAKS as Partial<Tweaks> | undefined)
      : undefined),
  }))

  useEffect(() => {
    const root = document.documentElement
    root.dataset.mobileNav = tweaks.mobileNav || 'top'
    root.dataset.mobileDensity = tweaks.mobileDensity || 'comfortable'
    root.dataset.mobileHero = tweaks.mobileHero || 'show'
    // Route theme + accent through applyBrand so --color-primary and its derived
    // tokens stay in sync with the legacy --accent var (kept as alias).
    applyBrand({
      mode: tweaks.theme,
      brand: { primary: ACCENTS[tweaks.accent] },
    })
  }, [tweaks])

  const set = (t: Tweaks) => {
    setTweaks(t)
    if (typeof window !== 'undefined') {
      window.__TWEAKS = t as unknown as Record<string, string>
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: t }, '*')
    }
  }

  return [tweaks, set]
}

export function useEditMode(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === '__activate_edit_mode') setVisible(true)
      if (e.data?.type === '__deactivate_edit_mode') setVisible(false)
    }
    window.addEventListener('message', onMsg)
    window.parent.postMessage({ type: '__edit_mode_available' }, '*')
    return () => window.removeEventListener('message', onMsg)
  }, [])
  return [visible, setVisible]
}
