import type { BrandConfig, Mode } from './schema'
import { DEFAULT_CONFIG } from './defaults'

const MODES: ReadonlySet<Mode> = new Set(['dark', 'light'])

/**
 * Normalize an unknown JSON payload into a valid BrandConfig.
 *
 * Strategy: trust nothing. Walk the input; fill missing/invalid fields from
 * defaults; pass through unknown nested keys (lets new fields land without
 * a schema bump as long as the consumer ignores them).
 *
 * Returns the normalized BrandConfig. Never throws — bad input falls back
 * to DEFAULT_CONFIG so the app continues to render.
 */
export function validateBrandConfig(input: unknown): BrandConfig {
  if (!isObject(input)) return DEFAULT_CONFIG

  const mode =
    isString(input.mode) && MODES.has(input.mode as Mode)
      ? (input.mode as Mode)
      : DEFAULT_CONFIG.mode

  const brand = pickBrand(input.brand)

  const out: BrandConfig = {
    schemaVersion: isNumber(input.schemaVersion) ? input.schemaVersion : 1,
    tenantId: isString(input.tenantId) ? input.tenantId : undefined,
    mode,
    brand,
  }

  if (isObject(input.logos)) out.logos = input.logos as BrandConfig['logos']
  if (isObject(input.content)) out.content = input.content as BrandConfig['content']
  if (isObject(input.assets)) out.assets = input.assets as BrandConfig['assets']
  if (isObject(input.overrides)) out.overrides = input.overrides as BrandConfig['overrides']

  return out
}

function pickBrand(raw: unknown): BrandConfig['brand'] {
  if (!isObject(raw) || !isString(raw.primary)) return DEFAULT_CONFIG.brand
  const brand: BrandConfig['brand'] = { primary: raw.primary }
  if (isString(raw.secondary)) brand.secondary = raw.secondary
  return brand
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function isString(v: unknown): v is string {
  return typeof v === 'string'
}

function isNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v)
}
