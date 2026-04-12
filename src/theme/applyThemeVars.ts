import type { ThemeCssVars } from './types'
import { resolveFullThemeCss } from './resolveFullThemeCss'

export function applyThemeToDocument(vars: ThemeCssVars): void {
  const el = document.documentElement
  const flat = resolveFullThemeCss(vars)
  for (const [key, value] of Object.entries(flat)) {
    el.style.setProperty(key, value)
  }
}
