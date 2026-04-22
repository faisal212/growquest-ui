export function HeroArt({ variant = 'isometric', accent }: { variant?: string; accent?: string }) {
  const a = accent || 'var(--accent)'

  if (variant === 'grid-poster') {
    return (
      <svg viewBox="0 0 480 480" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <pattern id="gp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke={a} strokeOpacity="0.18" strokeWidth="1" />
          </pattern>
          <linearGradient id="gp-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={a} stopOpacity="0" />
            <stop offset="1" stopColor={a} stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect width="480" height="480" fill="url(#gp-grid)" />
        <rect width="480" height="480" fill="url(#gp-fade)" />
        <text
          x="28"
          y="60"
          fontFamily="JetBrains Mono"
          fontSize="11"
          letterSpacing="3"
          fill={a}
          opacity="0.8"
        >
          QUEST // 01
        </text>
        <text
          x="28"
          y="420"
          fontFamily="Space Grotesk"
          fontWeight="700"
          fontSize="72"
          fill="currentColor"
          letterSpacing="-2"
        >
          LEVEL
        </text>
        <text
          x="28"
          y="470"
          fontFamily="Space Grotesk"
          fontWeight="700"
          fontSize="72"
          fill={a}
          letterSpacing="-2"
        >
          UP.
        </text>
        <circle cx="380" cy="130" r="70" fill="none" stroke={a} strokeWidth="1.5" />
        <circle
          cx="380"
          cy="130"
          r="40"
          fill="none"
          stroke={a}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle cx="380" cy="130" r="8" fill={a} />
      </svg>
    )
  }

  if (variant === 'orbital') {
    return (
      <svg viewBox="0 0 480 480" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <radialGradient id="orb-glow">
            <stop offset="0" stopColor={a} stopOpacity="0.55" />
            <stop offset="1" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="480" height="480" fill="transparent" />
        <circle cx="240" cy="240" r="200" fill="url(#orb-glow)" />
        {[160, 110, 60].map((r, i) => (
          <ellipse
            key={i}
            cx="240"
            cy="240"
            rx={r * 1.6}
            ry={r * 0.5}
            fill="none"
            stroke={a}
            strokeOpacity={0.4 - i * 0.1}
            strokeWidth="1"
            transform={`rotate(${-20 + i * 12} 240 240)`}
          />
        ))}
        <circle cx="240" cy="240" r="34" fill={a} opacity="0.9" />
        <circle
          cx="240"
          cy="240"
          r="34"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x = 240 + Math.cos(rad) * 170
          const y = 240 + Math.sin(rad) * 60
          return <circle key={i} cx={x} cy={y} r={6 + (i % 3) * 2} fill={a} opacity={0.7} />
        })}
        <text x="30" y="40" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2" fill={a}>
          // ORBIT.SYS
        </text>
      </svg>
    )
  }

  if (variant === 'pixel') {
    const rows = 12,
      cols = 12
    const cells: { x: number; y: number; hue: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c + r * 0.5 - 3
        const cy = r - c * 0.3 + 4
        const d = Math.hypot(cx - 5, cy - 5)
        const on = d < 3 + Math.sin(r * c * 0.3) * 1.5
        if (on) cells.push({ x: c * 34 + 30, y: r * 30 + 40, hue: (r * c) % 3 })
      }
    }
    return (
      <svg viewBox="0 0 480 480" style={{ width: '100%', height: '100%', display: 'block' }}>
        {cells.map((cell, i) => (
          <rect
            key={i}
            x={cell.x}
            y={cell.y}
            width="28"
            height="24"
            fill={
              cell.hue === 0 ? a : cell.hue === 1 ? 'var(--accent-magenta)' : 'var(--accent-lime)'
            }
            opacity={0.6 + cell.hue * 0.15}
          />
        ))}
        <text x="30" y="440" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2" fill={a}>
          // BLOCK.MAP
        </text>
      </svg>
    )
  }

  // default: isometric
  return (
    <svg viewBox="0 0 480 480" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <pattern
          id="iso-grid"
          width="48"
          height="28"
          patternUnits="userSpaceOnUse"
          patternTransform="skewX(-30)"
        >
          <path d="M48 0H0V28" fill="none" stroke={a} strokeOpacity="0.22" strokeWidth="1" />
        </pattern>
        <radialGradient id="iso-glow" cx="50%" cy="55%">
          <stop offset="0" stopColor={a} stopOpacity="0.35" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="iso-top" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor="var(--accent-magenta)" />
        </linearGradient>
      </defs>
      <rect width="480" height="480" fill="url(#iso-grid)" transform="translate(0 60)" />
      <rect width="480" height="480" fill="url(#iso-glow)" />
      <g transform="translate(240 270)">
        <polygon
          points="0,-40 140,30 0,100 -140,30"
          fill={a}
          fillOpacity="0.08"
          stroke={a}
          strokeOpacity="0.5"
        />
        <polygon
          points="0,-20 100,22 0,62 -100,22"
          fill="none"
          stroke={a}
          strokeOpacity="0.3"
          strokeDasharray="3 3"
        />
      </g>
      <g transform="translate(240 180)">
        <polygon points="0,0 70,30 70,100 0,70" fill="var(--accent-magenta)" opacity="0.85" />
        <polygon points="0,0 -70,30 -70,100 0,70" fill={a} opacity="0.9" />
        <polygon points="0,-40 70,-10 70,30 0,0 -70,30 -70,-10" fill="url(#iso-top)" />
        <text
          x="-30"
          y="45"
          fontFamily="JetBrains Mono"
          fontSize="14"
          fontWeight="700"
          fill="#0A0B10"
        >
          LV.07
        </text>
      </g>
      <g
        transform="translate(90 140)"
        style={{ animation: 'float 4s ease-in-out infinite', willChange: 'transform' }}
      >
        <polygon points="0,0 40,16 40,56 0,40" fill={a} opacity="0.9" />
        <polygon points="0,0 -40,16 -40,56 0,40" fill={a} opacity="0.65" />
        <polygon points="0,-20 40,-4 40,16 0,0 -40,16 -40,-4" fill={a} opacity="0.5" />
      </g>
      <g
        transform="translate(380 120)"
        style={{ animation: 'float 5s ease-in-out infinite', willChange: 'transform' }}
      >
        <circle r="26" fill="var(--accent-magenta)" opacity="0.85" />
        <circle r="26" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1" />
        <ellipse cx="0" cy="0" rx="26" ry="7" fill="none" stroke="#fff" strokeOpacity="0.3" />
      </g>
      <g transform="translate(110 360)">
        <polygon points="0,0 22,9 22,30 0,21" fill="var(--accent-lime)" />
        <polygon points="0,0 -22,9 -22,30 0,21" fill="var(--accent-lime)" opacity="0.7" />
        <polygon points="0,-12 22,-3 22,9 0,0 -22,9 -22,-3" fill="#fff" opacity="0.85" />
      </g>
      <g
        transform="translate(380 380)"
        style={{ animation: 'float 3.5s ease-in-out infinite', willChange: 'transform' }}
      >
        <polygon points="0,0 18,8 18,26 0,18" fill={a} />
        <polygon points="0,0 -18,8 -18,26 0,18" fill={a} opacity="0.7" />
        <polygon points="0,-10 18,-2 18,8 0,0 -18,8 -18,-2" fill="#fff" opacity="0.85" />
      </g>
      <text x="24" y="36" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2" fill={a}>
        // QUEST.WORLD
      </text>
      <text
        x="24"
        y="456"
        fontFamily="JetBrains Mono"
        fontSize="9"
        letterSpacing="2"
        fill="currentColor"
        opacity="0.5"
      >
        NODE · 0x88F4E1
      </text>
      <text
        x="380"
        y="456"
        fontFamily="JetBrains Mono"
        fontSize="9"
        letterSpacing="2"
        fill="currentColor"
        opacity="0.5"
      >
        v1.4
      </text>
    </svg>
  )
}

export function Avatar({ seed = 1, size = 40 }: { seed?: number; size?: number }) {
  const colors = [
    'var(--accent-cyan)',
    'var(--accent-magenta)',
    'var(--accent-lime)',
    'var(--accent-amber)',
    'var(--accent-violet)',
  ]
  const c1 = colors[seed % colors.length]
  const c2 = colors[(seed + 2) % colors.length]
  const shape = seed % 3
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{
        display: 'block',
        borderRadius: 6,
        border: '1px solid var(--border)',
        background: 'var(--panel-2)',
      }}
    >
      <rect width="40" height="40" fill="var(--panel-2)" />
      {shape === 0 && (
        <>
          <circle cx="20" cy="20" r="12" fill={c1} />
          <circle cx="20" cy="20" r="5" fill={c2} />
        </>
      )}
      {shape === 1 && (
        <>
          <polygon points="20,6 34,20 20,34 6,20" fill={c1} />
          <rect x="16" y="16" width="8" height="8" fill={c2} />
        </>
      )}
      {shape === 2 && (
        <>
          <rect x="8" y="8" width="24" height="24" fill={c1} />
          <circle cx="20" cy="20" r="6" fill={c2} />
        </>
      )}
    </svg>
  )
}

export function MissionIcon({ type, size = 22 }: { type: string; size?: number }) {
  const s = size
  const common = {
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (type === 'social')
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    )
  if (type === 'photo')
    return (
      <svg {...common}>
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <circle cx="12" cy="13" r="3.5" />
        <path d="M8 6l2-3h4l2 3" />
      </svg>
    )
  if (type === 'refer')
    return (
      <svg {...common}>
        <circle cx="9" cy="10" r="3" />
        <circle cx="17" cy="8" r="2" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5" />
      </svg>
    )
  if (type === 'video')
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polygon points="10,9 16,12 10,15" fill="currentColor" />
      </svg>
    )
  if (type === 'quiz')
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2-2.5 2-2.5 4M12 17.5v.1" />
      </svg>
    )
  if (type === 'review')
    return (
      <svg {...common}>
        <polygon points="12,3 14.5,9 21,9.5 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9.5 9.5,9" />
      </svg>
    )
  if (type === 'event')
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    )
  if (type === 'purchase')
    return (
      <svg {...common}>
        <path d="M5 7h14l-1.5 11H6.5L5 7z" />
        <path d="M9 7V5a3 3 0 016 0v2" />
      </svg>
    )
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" />
    </svg>
  )
}
