import { useBrandState } from './BrandProvider'
import type { ContentMap } from './schema'

/**
 * Read a typed slice of the content tree by namespace.
 *
 * Returns the whole namespace as a typed object, not a single field.
 * The slice is reference-stable across renders until the BrandConfig
 * changes (BrandProvider memoizes the resolved content), so it is safe
 * to use as a dependency in `useMemo` / `React.memo`.
 *
 * @example
 *   const t = useContentSlice('missions')
 *   <h2>{t.sectionTitle}</h2>
 */
export function useContentSlice<K extends keyof ContentMap>(ns: K): ContentMap[K] {
  return useBrandState().content[ns]
}
