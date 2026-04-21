import { ChevronDown, Search } from 'lucide-react'
import { ThemePicker } from './ThemePicker'
import { EXAMPLE_ADDRESS } from '../data/exampleAddress'

export type HomeHeaderProps = {
  /** When true, the address row is collapsed; search stays visible and sticky */
  addressCollapsed: boolean
}

export function HomeHeader({ addressCollapsed }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-[60] -mx-4 mb-3">
      {/* Flat header; revert: gradient + inset → `bg-gradient-to-br from-orange via-orange to-orange-soft shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]` */}
      <div
        className={`bg-orange transition-shadow duration-300 ease-out ${
          addressCollapsed
            ? 'shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
            : 'shadow-none'
        }`}
      >
        <div
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none ${
            addressCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
          }`}
          aria-hidden={addressCollapsed}
        >
          <div className="min-h-0">
            <div
              className={`px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                addressCollapsed
                  ? 'pointer-events-none -translate-y-2 opacity-0'
                  : 'translate-y-0 opacity-100'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-1 py-1 pr-1 text-left transition-opacity hover:opacity-95 active:opacity-90"
                  aria-label="Change delivery address"
                  aria-expanded={!addressCollapsed}
                >
                  <span className="min-w-0 text-[13px] font-medium leading-snug text-white/95">
                    Deliver to{' '}
                    <span className="font-bold text-white">
                      {EXAMPLE_ADDRESS}
                    </span>
                  </span>
                  <ChevronDown
                    className="size-[18px] shrink-0 text-white/90"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </button>
                <ThemePicker variant="compact" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`px-4 transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
            addressCollapsed
              ? 'pb-5 pt-[max(0.5rem,env(safe-area-inset-top,0px))]'
              : 'pb-8 pt-1'
          }`}
        >
          <label className="relative block">
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
      </div>
    </header>
  )
}
