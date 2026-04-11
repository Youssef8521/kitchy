import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { applyThemeToDocument } from './applyThemeVars'
import { defaultThemeId, getThemeById, themes } from './themes'
import type { ThemeDefinition } from './types'

const STORAGE_KEY = 'kitchy-theme'

type ThemeContextValue = {
  themeId: string
  theme: ThemeDefinition
  setThemeId: (id: string) => void
  themes: ThemeDefinition[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredThemeId(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return getThemeById(raw).id
  } catch {
    /* ignore */
  }
  return defaultThemeId
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(() =>
    typeof window !== 'undefined' ? readStoredThemeId() : defaultThemeId,
  )

  const theme = useMemo(() => getThemeById(themeId), [themeId])

  useEffect(() => {
    applyThemeToDocument(theme.vars)
  }, [theme])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const canonical = getThemeById(raw).id
        if (canonical !== raw) localStorage.setItem(STORAGE_KEY, canonical)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const setThemeId = useCallback((id: string) => {
    const next = getThemeById(id)
    setThemeIdState(next.id)
    try {
      localStorage.setItem(STORAGE_KEY, next.id)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({ themeId: theme.id, theme, setThemeId, themes }),
    [theme, setThemeId],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
