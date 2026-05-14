export function ShapeArt({ shape, tint }: { shape: string; tint: string }) {
  const color = `var(--accent-${tint})`
  return (
    <svg viewBox="0 0 100 100" className="block w-full h-full">
      <rect width="100" height="100" fill="var(--panel)" />
      <g opacity="0.18" stroke={color} strokeWidth="1">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 10} x2="100" y2={i * 10} />
        ))}
      </g>
      {shape === 'hex' && <polygon points="50,14 84,32 84,68 50,86 16,68 16,32" fill={color} />}
      {shape === 'circle' && <circle cx="50" cy="50" r="30" fill={color} />}
      {shape === 'diamond' && <polygon points="50,14 86,50 50,86 14,50" fill={color} />}
      {shape === 'square' && <rect x="22" y="22" width="56" height="56" fill={color} />}
    </svg>
  )
}
