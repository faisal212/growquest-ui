'use client'

import { useContent } from '../config'

export function AppFooter() {
  const terms = useContent<string>('footer.terms')
  const privacy = useContent<string>('footer.privacy')
  const changelog = useContent<string>('footer.changelog')
  const poweredByPrefix = useContent<string>('footer.poweredByPrefix')
  const brandName = useContent<string>('brand.name')
  const tagline = useContent<string>('brand.tagline')

  return (
    <div className="app-footer">
      <div className="flex gap-[18px]">
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          {terms}
        </button>
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          {privacy}
        </button>
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          {changelog}
        </button>
      </div>
      <div className="font-mono">
        {poweredByPrefix} <strong className="brand">{brandName}</strong> · {tagline}
      </div>
    </div>
  )
}
