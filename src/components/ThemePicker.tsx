import { ChevronDown, Palette } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

type ThemePickerProps = {
  /** Tight control for headers: icon-only, minimal width, hugging the right edge */
  variant?: 'default' | 'compact'
}

export function ThemePicker({ variant = 'default' }: ThemePickerProps) {
  const { themeId, setThemeId, themes } = useTheme()
  const selectId =
    variant === 'compact' ? 'kitchy-theme-select-compact' : 'kitchy-theme-select'

  if (variant === 'compact') {
    return (
      <div className="relative inline-flex size-8 shrink-0 items-center justify-center">
        <label className="sr-only" htmlFor={selectId}>
          App theme
        </label>
        <div
          className="pointer-events-none flex size-8 items-center justify-center rounded-full border border-white/35 bg-white/95 text-text-primary shadow-sm ring-1 ring-black/5"
          aria-hidden
        >
          <Palette className="size-3.5" strokeWidth={2} />
        </div>
        <select
          id={selectId}
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="App theme"
        >
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="relative inline-flex items-center">
      <label className="sr-only" htmlFor={selectId}>
        App theme
      </label>
      <div className="pointer-events-none absolute left-2.5 flex items-center text-text-primary/70">
        <Palette className="size-3.5" strokeWidth={2} aria-hidden />
      </div>
      <div className="pointer-events-none absolute right-2 flex items-center text-text-secondary">
        <ChevronDown className="size-3.5" strokeWidth={2} aria-hidden />
      </div>
      <select
        id={selectId}
        value={themeId}
        onChange={(e) => setThemeId(e.target.value)}
        className="h-9 cursor-pointer appearance-none rounded-full border border-sage-border bg-surface-card py-1 pl-9 pr-8 text-[12px] font-semibold text-text-primary shadow-sm outline-none ring-offset-2 transition hover:border-sage-border focus-visible:ring-2 focus-visible:ring-orange/35"
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  )
}
