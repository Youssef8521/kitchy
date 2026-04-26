import { useNavigate } from 'react-router-dom'
import { useProfile } from '../profile/ProfileContext'

export function MoreScreen() {
  const navigate = useNavigate()
  const { profile, clearProfile } = useProfile()

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-8 scrollbar-hide">
      <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-text-primary">
        More
      </h1>

      <section className="mt-5 rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06]">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-text-secondary">
          Account
        </p>
        <p className="mt-2 text-[18px] font-extrabold text-text-primary">
          {profile?.name ?? '—'}
        </p>
        {profile?.phone ? (
          <p className="mt-1 text-[13px] text-text-secondary">{profile.phone}</p>
        ) : null}
      </section>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => {
            clearProfile()
            navigate('/onboarding', { replace: true })
          }}
          className="w-full rounded-2xl bg-sage-soft px-4 py-4 text-[14px] font-bold text-text-primary ring-1 ring-black/[0.06] active:scale-[0.99]"
        >
          Reset profile
        </button>
      </div>
    </main>
  )
}

