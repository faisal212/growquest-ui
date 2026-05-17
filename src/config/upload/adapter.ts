/**
 * Asset-upload boundary for the design configurator (phase-2 seam).
 *
 * Phase 1 ships URL-only assets — there is no upload backend, so the default
 * adapter is `null` and the Inspector's Upload button stays inert. A consumer
 * (or a later phase) drops in real storage by calling `setAssetUploadAdapter`
 * with an implementation that uploads a File and resolves the hosted URL; the
 * AssetControl UI enables the Upload affordance automatically. Mirrors the
 * pluggable shape of {@link ../admin/adapter} and {@link ../store/adapter}.
 */

export interface AssetUploadAdapter {
  /** Upload a picked file and resolve its hosted URL. */
  upload(file: File): Promise<string>
}

// Default: no backend in phase 1. `null` (not a throwing stub) so the UI can
// branch on availability and keep the Upload button disabled.
let activeAdapter: AssetUploadAdapter | null = null

/** Active upload adapter, or `null` when no storage is wired (phase 1 default). */
export function getAssetUploadAdapter(): AssetUploadAdapter | null {
  return activeAdapter
}

/** Install a real upload adapter (phase-2 / consumer-provided storage). */
export function setAssetUploadAdapter(adapter: AssetUploadAdapter): void {
  activeAdapter = adapter
}

/** Restore the null default. Primarily for tests. */
export function resetAssetUploadAdapter(): void {
  activeAdapter = null
}
