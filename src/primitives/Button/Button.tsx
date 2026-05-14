export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. `primary` uses the accent color. @default 'default' */
  variant?: 'default' | 'primary' | 'ghost'
  /** Padding and font-size preset. @default 'md' */
  size?: 'md' | 'sm'
  /** @deprecated Use `iconRight` instead. Renders an icon after the label. */
  icon?: React.ReactNode
  /** Icon slot rendered before the label. For icon-only usage, also pass `aria-label`. */
  iconLeft?: React.ReactNode
  /** Icon slot rendered after the label. Takes precedence over `icon`. */
  iconRight?: React.ReactNode
}

export function Button({
  variant = 'default',
  size = 'md',
  icon,
  iconLeft,
  iconRight,
  children,
  className,
  style,
  ...rest
}: ButtonProps) {
  const cls = [
    'btn',
    variant !== 'default' ? variant : '',
    size === 'sm' ? 'px-3 py-2 text-xs' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <button className={cls} style={style} {...rest}>
      {iconLeft}
      {children}
      {iconRight ?? icon}
    </button>
  )
}
