import type { ThemeCssVars } from './types'

const PREFIX = '--app-'

const keys: (keyof ThemeCssVars)[] = [
  'cream',
  'navy',
  'navyMuted',
  'orange',
  'orangeSoft',
  'textMuted',
  'reorderFrom',
  'reorderTo',
  'liveFrom',
  'liveVia',
  'liveTo',
  'blindGlow',
  'chrome',
]

export function applyThemeToDocument(vars: ThemeCssVars): void {
  const el = document.documentElement
  for (const key of keys) {
    const cssName =
      PREFIX +
      key.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
    el.style.setProperty(cssName, vars[key])
  }
}
