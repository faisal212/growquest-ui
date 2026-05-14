export type ChipTone = 'default' | 'accent' | 'lime' | 'magenta' | 'amber'

export const CHIP_TONES: Record<string, React.CSSProperties> = {
  accent: {
    color: 'var(--accent)',
    borderColor: 'color-mix(in oklch, var(--accent) 40%, transparent)',
    background: 'var(--accent-soft)',
  },
  lime: {
    color: 'var(--accent-lime)',
    borderColor: 'color-mix(in oklch, var(--accent-lime) 40%, transparent)',
    background: 'color-mix(in oklch, var(--accent-lime) 14%, transparent)',
  },
  magenta: {
    color: 'var(--accent-magenta)',
    borderColor: 'color-mix(in oklch, var(--accent-magenta) 40%, transparent)',
    background: 'color-mix(in oklch, var(--accent-magenta) 14%, transparent)',
  },
  amber: {
    color: 'var(--accent-amber)',
    borderColor: 'color-mix(in oklch, var(--accent-amber) 40%, transparent)',
    background: 'color-mix(in oklch, var(--accent-amber) 14%, transparent)',
  },
}

export interface ChipProps {
  children: React.ReactNode
  tone?: ChipTone
  dot?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Chip({ children, tone = 'default', dot, className, style }: ChipProps) {
  const toneStyle = tone !== 'default' ? CHIP_TONES[tone] : {}
  return (
    <span
      className={['chip', className].filter(Boolean).join(' ')}
      style={{ ...toneStyle, ...style }}
    >
      {dot && <span className="inline-block w-[5px] h-[5px] rounded-full bg-current shrink-0" />}
      {children}
    </span>
  )
}
