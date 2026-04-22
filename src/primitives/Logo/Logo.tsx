export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-magenta)" />
        </linearGradient>
      </defs>
      <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="url(#lg)" />
      <polygon points="16,8 22,11.5 22,20.5 16,24 10,20.5 10,11.5" fill="var(--bg)" />
      <circle cx="16" cy="16" r="3.5" fill="var(--accent)" />
    </svg>
  )
}

export function BrandLockup({
  name = 'GrowQuest',
  version = 'v1.4',
}: {
  name?: string
  version?: string
}) {
  return (
    <div className="brand-lockup">
      <span className="logo">
        <Logo />
      </span>
      <span>{name}</span>
      <span className="chip brand-version">{version}</span>
    </div>
  )
}
