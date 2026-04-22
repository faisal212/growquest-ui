import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from '../atoms'

interface FullbleedLayoutProps {
  onToggleTweaks: () => void
}

export function FullbleedLayout({ onToggleTweaks }: FullbleedLayoutProps) {
  const navigate = useNavigate()
  return (
    <div className="center-stage">
      <Outlet />
      <div style={{ position: 'fixed', top: 16, right: 16, display: 'flex', gap: 6 }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/missions')}>
          Skip →
        </Button>
        <button
          onClick={onToggleTweaks}
          title="Toggle tweaks"
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="7" cy="7" r="2.5" />
            <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4M2.8 11.2l1.4-1.4M9.8 4.2l1.4-1.4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
