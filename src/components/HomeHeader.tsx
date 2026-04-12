import { ChevronDown, Search } from 'lucide-react'
import { ThemePicker } from './ThemePicker'

const EXAMPLE_ADDRESS = 'Ain Shams, Matareya'

export function HomeHeader() {
  return (
    <header className="relative -mx-4 mb-3">
      <div className="bg-gradient-to-br from-orange via-orange to-orange-soft px-4 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-1 py-1 pr-1 text-left transition-opacity hover:opacity-95 active:opacity-90"
            aria-label="Change delivery address"
          >
            <span className="min-w-0 text-[13px] font-medium leading-snug text-white/95">
              Deliver to{' '}
              <span className="font-bold text-white">{EXAMPLE_ADDRESS}</span>
            </span>
            <ChevronDown
              className="size-[18px] shrink-0 text-white/90"
              strokeWidth={2.25}
              aria-hidden
            />
          </button>
          <ThemePicker variant="compact" />
        </div>

        <label className="relative mt-4 block">
          <span className="sr-only">Search</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-[1.15rem] -translate-y-1/2 text-text-muted"
            strokeWidth={2.25}
            aria-hidden
          />
          <input
            type="search"
            name="home-search"
            placeholder="Search chefs, dishes, cravings…"
            className="h-12 w-full rounded-full border-0 bg-white pl-11 pr-4 text-[14px] text-text-primary shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] placeholder:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            autoComplete="off"
          />
        </label>
      </div>

      <svg
        className="block h-7 w-full text-page-bg"
        viewBox="0 0 390 28"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,10 C48,22 96,2 144,14 C192,26 240,6 288,16 C330,24 365,8 390,12 L390,28 L0,28 Z"
        />
      </svg>
    </header>
  )
}
