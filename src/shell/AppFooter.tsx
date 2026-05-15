'use client'

import { useContentSlice } from '../config'

export function AppFooter() {
  const footer = useContentSlice('footer')
  const brand = useContentSlice('brand')

  return (
    <div className="app-footer">
      <div className="flex gap-[18px]">
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          {footer.terms}
        </button>
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          {footer.privacy}
        </button>
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          {footer.changelog}
        </button>
      </div>
      <div className="font-mono">
        {footer.poweredByPrefix} <strong className="brand">{brand.name}</strong> · {brand.tagline}
      </div>
    </div>
  )
}
