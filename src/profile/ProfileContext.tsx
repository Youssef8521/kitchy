import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'kitchy-profile'

export type Profile = {
  name: string
  phone: string
}

type ProfileContextValue = {
  profile: Profile | null
  hasProfile: boolean
  setProfile: (profile: Profile) => void
  clearProfile: () => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

function readStoredProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'name' in parsed &&
      'phone' in parsed
    ) {
      const p = parsed as { name: unknown; phone: unknown }
      if (typeof p.name === 'string' && typeof p.phone === 'string') {
        const name = p.name.trim()
        const phone = p.phone.trim()
        if (name && phone) return { name, phone }
      }
    }
  } catch {
    /* ignore */
  }
  return null
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile | null>(() =>
    typeof window !== 'undefined' ? readStoredProfile() : null,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      setProfileState(readStoredProfile())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setProfile = useCallback((next: Profile) => {
    const normalized = { name: next.name.trim(), phone: next.phone.trim() }
    setProfileState(normalized)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
    } catch {
      /* ignore */
    }
  }, [])

  const clearProfile = useCallback(() => {
    setProfileState(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      hasProfile: Boolean(profile?.name && profile?.phone),
      setProfile,
      clearProfile,
    }),
    [profile, setProfile, clearProfile],
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    throw new Error('useProfile must be used within ProfileProvider')
  }
  return ctx
}

