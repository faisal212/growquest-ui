export function AppFooter() {
  return (
    <div className="app-footer">
      <div className="flex gap-[18px]">
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          Terms of Service
        </button>
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          Privacy Policy
        </button>
        <button
          type="button"
          className="bg-none border-0 text-inherit cursor-pointer [font:inherit]"
        >
          Changelog
        </button>
      </div>
      <div className="font-mono">
        Powered by <strong className="text-ink">GrowQuest</strong> · multi-tenant growth OS
      </div>
    </div>
  )
}
