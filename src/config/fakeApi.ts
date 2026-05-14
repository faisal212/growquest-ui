import type { BrandConfig } from './schema'

/**
 * Hardcoded tenant configs for the Next.js demo. Served via
 * app/api/brand/[tenantId]/route.ts. Real backend swaps this for a KV/Postgres
 * lookup behind the same HTTP shape.
 */
export const TENANTS: Record<string, BrandConfig> = {
  default: {
    schemaVersion: 1,
    tenantId: 'default',
    mode: 'dark',
    brand: {
      primary: 'oklch(0.86 0.18 200)',
      secondary: 'oklch(0.72 0.25 340)',
    },
  },

  acme: {
    schemaVersion: 1,
    tenantId: 'acme',
    mode: 'light',
    brand: {
      primary: '#FF8C00',
      secondary: '#2DACA9',
    },
    logos: {
      nav: '/logos/acme.svg',
    },
    content: {
      missions: {
        sectionTitle: 'Acme Quests',
        sectionEyebrow: '// acme campaign',
        dailyDrop: {
          title: 'Acme daily',
          subtitle: 'Claim +50 XP every 24h',
        },
        rewardsTitle: 'Acme rewards',
      },
    },
    overrides: {
      missionCard: {
        surface: '#FFFFFF',
        border: '#FF8C00',
        ctaFg: '#FFFFFF',
      },
      missionModal: {
        closeBg: '#FF8C00',
        closeIcon: '#FFFFFF',
      },
      tones: {
        accent: '#FF8C00',
      },
    },
  },

  globex: {
    schemaVersion: 1,
    tenantId: 'globex',
    mode: 'dark',
    brand: {
      primary: 'oklch(0.72 0.25 340)',
      secondary: 'oklch(0.83 0.18 75)',
    },
    content: {
      missions: {
        sectionTitle: 'Globex objectives',
      },
    },
  },
}

/** Resolve a tenantId to its config. Unknown tenants fall back to `default`. */
export function getTenantConfig(tenantId: string): BrandConfig {
  return TENANTS[tenantId] ?? TENANTS.default
}
