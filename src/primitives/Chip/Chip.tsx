export type ChipTone = 'default' | 'primary' | 'secondary'

export const CHIP_TONES: Record<string, React.CSSProperties> = {
  primary: {
    color: 'var(--color-primary)',
    borderColor: 'color-mix(in oklch, var(--color-primary) 40%, transparent)',
    background: 'var(--color-primary-soft)',
  },
  secondary: {
    color: 'var(--color-secondary)',
    borderColor: 'color-mix(in oklch, var(--color-secondary) 40%, transparent)',
    background: 'color-mix(in oklch, var(--color-secondary) 14%, transparent)',
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
