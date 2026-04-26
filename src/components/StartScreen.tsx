import { ChevronRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../profile/ProfileContext'

export function StartScreen() {
  const navigate = useNavigate()
  const { setProfile } = useProfile()

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10 scrollbar-hide">
      <div className="mx-auto flex w-full max-w-[340px] flex-col items-center">
        <div className="relative mt-2">
          <div className="absolute -inset-6 rounded-[28px] bg-[#163dff]/10 blur-2xl" />
          <div className="relative flex size-[92px] items-center justify-center rounded-[26px] bg-[#1239c8] shadow-[0_16px_40px_rgba(18,57,200,0.28)] ring-1 ring-black/[0.08]">
            <Sparkles className="size-10 text-[#f6a12b]" strokeWidth={2.75} />
          </div>
        </div>

        <h1 className="mt-6 text-[44px] font-black tracking-[0.02em] text-[#1239c8]">
          KITCHY
        </h1>

        <p className="mt-3 text-center text-[14px] font-medium text-text-secondary">
          Real home-cooked food from Egypt&apos;s mothers
        </p>
        <p className="mt-3 text-center text-[14px] font-extrabold text-orange">
          From Mama&apos;s Kitchen to Your Door
        </p>

        <div className="mt-12 w-full">
          <button
            type="button"
            onClick={() => navigate('/onboarding')}
            className="h-16 w-full rounded-[22px] bg-[#1239c8] text-[18px] font-extrabold tracking-wide text-white shadow-[0_18px_40px_rgba(18,57,200,0.35)] ring-1 ring-black/[0.08] active:scale-[0.99]"
          >
            <span className="inline-flex items-center justify-center gap-3">
              Let&apos;s Get Started
              <ChevronRight className="size-6" aria-hidden />
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setProfile({ name: 'Guest', phone: 'guest' })
              navigate('/', { replace: true })
            }}
            className="mx-auto mt-6 block text-[14px] font-semibold text-text-secondary underline decoration-border-subtle underline-offset-4"
          >
            Skip — Browse as Guest
          </button>
        </div>
      </div>
    </main>
  )
}

