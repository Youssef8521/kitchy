import { ChevronDown, Phone, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidEgyptMobile, normalizeEgyptPhone } from '../profile/egyptPhone'
import { useProfile } from '../profile/ProfileContext'

export function InitialAccountScreen() {
  const navigate = useNavigate()
  const { setProfile } = useProfile()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState<{ name: boolean; phone: boolean }>({
    name: false,
    phone: false,
  })

  const trimmedName = name.trim()
  const phoneValid = useMemo(() => isValidEgyptMobile(phone), [phone])
  const canContinue = trimmedName.length > 1 && phoneValid

  const nameError =
    touched.name && trimmedName.length <= 1 ? 'Please enter your name.' : null
  const phoneError =
    touched.phone && !phoneValid ? 'Enter a valid Egyptian mobile number.' : null

  const onContinue = () => {
    if (!canContinue) return
    const normalizedPhone = normalizeEgyptPhone(phone)
    setProfile({ name: trimmedName, phone: normalizedPhone })
    navigate('/', { replace: true })
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10 scrollbar-hide">
      <div className="mx-auto w-full max-w-[340px]">
        <h1 className="text-[34px] font-extrabold leading-none tracking-[-0.02em] text-navy">
          Who&apos;s Hungry?
        </h1>
        <p className="mt-2 text-[14px] text-text-secondary">
          Tell us about yourself for a personalized experience
        </p>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="sr-only">Your Name</span>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted"
                strokeWidth={2.25}
                aria-hidden
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                type="text"
                inputMode="text"
                autoComplete="name"
                placeholder="Your Name"
                className="h-14 w-full rounded-2xl bg-white pl-12 pr-4 text-[15px] text-text-primary shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06] placeholder:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-orange/70"
              />
            </div>
            {nameError ? (
              <p className="mt-2 text-[12px] font-medium text-orange">
                {nameError}
              </p>
            ) : null}
          </label>

          <label className="block">
            <span className="sr-only">Phone</span>
            <div className="relative">
              <Phone
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted"
                strokeWidth={2.25}
                aria-hidden
              />

              <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 text-text-muted">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-sage-soft ring-1 ring-black/[0.06]">
                  <User className="size-4" aria-hidden />
                </span>
                <ChevronDown className="size-4" aria-hidden />
              </div>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Phone (01xxxxxxxxx)"
                className={`h-14 w-full rounded-2xl bg-white pl-12 pr-24 text-[15px] text-text-primary shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-2 ${
                  phone.length === 0
                    ? 'ring-black/[0.06]'
                    : phoneValid
                      ? 'ring-black/[0.06]'
                      : 'ring-orange/60'
                } placeholder:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-orange/70`}
              />
            </div>
            {phoneError ? (
              <p className="mt-2 text-[12px] font-medium text-orange">
                {phoneError}
              </p>
            ) : null}
          </label>
        </div>

        <button
          type="button"
          onClick={() => setTouched({ name: true, phone: true })}
          className="sr-only"
        >
          Mark touched
        </button>

        <div className="mt-14">
          <button
            type="button"
            onClick={() => {
              setTouched({ name: true, phone: true })
              onContinue()
            }}
            disabled={!canContinue}
            className="h-14 w-full rounded-2xl bg-sage-soft text-[16px] font-extrabold text-text-secondary shadow-[0_10px_28px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] transition disabled:opacity-55 disabled:shadow-none disabled:grayscale-[0.1] enabled:bg-[#dfe8ff] enabled:text-navy enabled:ring-2 enabled:ring-[#2b4a8f] enabled:active:scale-[0.99]"
            aria-disabled={!canContinue}
          >
            Next — Pick Your Area
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mx-auto mt-5 block text-[13px] font-semibold text-text-secondary underline decoration-border-subtle underline-offset-4"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  )
}

