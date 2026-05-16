'use client'

/**
 * The single CSR entry point consumers mount once (in the root layout). It
 * resolves the preview mode and renders nothing for normal end-users.
 *
 * Code-splitting: the heavy editor (`DesignConfigurator` + the Phase-2
 * inspector/fields it will pull in) is `lazy()`-loaded, so it is fetched only
 * when an admin actually opens the editor — zero bytes on the end-user path.
 * `EmbedBridge` is tiny pure wiring and must mount promptly inside the iframe,
 * so it is imported eagerly.
 */
import { Suspense, lazy } from 'react'
import { PacerProvider } from '@tanstack/react-pacer'
import { usePreviewMode } from './usePreviewMode'
import { EmbedBridge } from './EmbedBridge'

const DesignConfigurator = lazy(() =>
  import('./DesignConfigurator').then((m) => ({ default: m.DesignConfigurator }))
)

export interface PreviewMountProps {
  tenantId: string
}

export function PreviewMount({ tenantId }: PreviewMountProps) {
  const mode = usePreviewMode(tenantId)

  if (mode === 'embed') return <EmbedBridge />
  if (mode === 'editor') {
    // One place to tune editor pacing; per-callback waits still override.
    return (
      <PacerProvider defaultOptions={{ debouncer: { wait: 120 } }}>
        <Suspense fallback={null}>
          <DesignConfigurator tenantId={tenantId} />
        </Suspense>
      </PacerProvider>
    )
  }
  return null
}
