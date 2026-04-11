import { ChevronDown, Palette } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

export function ThemePicker() {
  const { themeId, setThemeId, themes } = useTheme()

  return (
    <div className="relative inline-flex items-center">
      <label className="sr-only" htmlFor="kitchy-theme-select">
        App theme
      </label>
      <div className="pointer-events-none absolute left-2.5 flex items-center text-navy/70">
        <Palette className="size-3.5" strokeWidth={2} aria-hidden />
      </div>
      <div className="pointer-events-none absolute right-2 flex items-center text-navy/50">
        <ChevronDown className="size-3.5" strokeWidth={2} aria-hidden />
      </div>
      <select
        id="kitchy-theme-select"
        value={themeId}
        onChange={(e) => setThemeId(e.target.value)}
        className="h-9 cursor-pointer appearance-none rounded-full border border-navy/15 bg-white py-1 pl-9 pr-8 text-[12px] font-semibold text-navy shadow-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-orange/40"
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
