import { useBrandState } from './BrandProvider'

/**
 * Read a content value by dotted path. Resolves from BrandProvider context.
 * Outside a provider, falls back to DEFAULT_CONTENT (BrandProvider's default).
 *
 * @example
 *   const title = useContent<string>('missions.sectionTitle')
 *   const buttonReady = useContent<(n: number) => string>('missions.readyToCollect.buttonReady')
 */
export function useContent<T = string>(path: string): T {
  const { content } = useBrandState()
  return resolve<T>(content, path)
}

function resolve<T>(root: unknown, path: string): T {
  const parts = path.split('.')
  let cur: unknown = root
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return '' as unknown as T
    cur = (cur as Record<string, unknown>)[part]
  }
  return cur as T
}
