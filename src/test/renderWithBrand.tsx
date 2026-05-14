import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import type { ReactElement } from 'react'
import { BrandProvider } from '../config/BrandProvider'
import { DEFAULT_CONFIG } from '../config/defaults'
import type { BrandConfig } from '../config/schema'

/**
 * Render a component inside <BrandProvider value={config}>. Use in tests that
 * exercise useContent / useAsset / useBrand. Passing `override` deep-merges
 * onto DEFAULT_CONFIG so tests only specify the slice they care about.
 */
export function renderWithBrand(
  ui: ReactElement,
  config: BrandConfig = DEFAULT_CONFIG,
  options?: RenderOptions
): RenderResult & { rerenderWithBrand: (next: BrandConfig) => void } {
  const result = render(<BrandProvider value={config}>{ui}</BrandProvider>, options)
  return {
    ...result,
    rerenderWithBrand: (next: BrandConfig) => {
      result.rerender(<BrandProvider value={next}>{ui}</BrandProvider>)
    },
  }
}
