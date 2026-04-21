import { useEffect, useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import {
  BadgeCheck,
  Bike,
  Clock,
  FlameKindling,
  MapPin,
  NotebookPen,
  Store,
  WalletCards,
} from 'lucide-react'
import { EXAMPLE_ADDRESS } from '../data/exampleAddress'

type PaymentMethod = 'card' | 'cod'

type OrderNavState = {
  orderId: string
  addressLabel: string
  address: string
  etaStart: string
  etaEnd: string
  paymentMethod: PaymentMethod
  orderNotes: string
  totalEgp: number
  itemCount: number
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function formatTime(d: Date) {
  const h = d.getHours()
  const m = d.getMinutes()
  const hr12 = ((h + 11) % 12) + 1
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${hr12}:${pad2(m)} ${ampm}`
}

type Phase = {
  title: string
  subtitle: string
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>
}

export function OrderDetailsScreen() {
  const { orderId: orderIdParam } = useParams<{ orderId: string }>()
  const location = useLocation()
  const state = (location.state ?? null) as OrderNavState | null

  const orderId = state?.orderId ?? orderIdParam ?? 'order'
  const addressLabel = state?.addressLabel ?? 'Home'
  const address = state?.address ?? EXAMPLE_ADDRESS

  const etaStart = state?.etaStart ? new Date(state.etaStart) : null
  const etaEnd = state?.etaEnd ? new Date(state.etaEnd) : null
  const etaLabel =
    etaStart && etaEnd
      ? `Arrives ${formatTime(etaStart)} – ${formatTime(etaEnd)}`
      : 'ETA pending'

  const paymentMethod = state?.paymentMethod ?? 'card'
  const paymentLabel =
    paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card •••• 5003'

  const orderNotes = state?.orderNotes?.trim()
  const totalEgp = state?.totalEgp ?? 0

  const phases = useMemo<Phase[]>(
    () => [
      {
        title: 'Order accepted',
        subtitle: 'We’re locking it in with the cook.',
        Icon: BadgeCheck,
      },
      {
        title: 'Preparing your order',
        subtitle: 'Kitchen magic is happening.',
        Icon: FlameKindling,
      },
      {
        title: 'Delivery on the way to the kitchen',
        subtitle: 'A rider is heading to pick it up.',
        Icon: Store,
      },
      {
        title: 'Delivery on its way to you',
        subtitle: 'Almost there — set the table.',
        Icon: Bike,
      },
    ],
    [],
  )

  const [phaseIndex, setPhaseIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhaseIndex((p) => (p >= phases.length - 1 ? p : p + 1))
    }, 4500)
    return () => window.clearInterval(id)
  }, [phases.length])

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-6 scrollbar-hide">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Order placed</h1>
          <p className="mt-0.5 text-[12px] text-text-muted">
            Order <span className="font-semibold text-text-primary">#{orderId}</span>
          </p>
        </div>
        <Link
          to="/"
          className="shrink-0 text-[13px] font-bold text-orange underline-offset-2 hover:underline"
        >
          Back home
        </Link>
      </div>

      <section className="mt-5 overflow-hidden rounded-3xl border border-sage-border/60 bg-surface-card shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-extrabold text-text-primary">
                Track your order
              </h2>
              <p className="mt-0.5 text-[12px] text-text-muted">
                Live status updates (demo)
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1.5 text-[11px] font-bold text-text-primary ring-1 ring-sage-border">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-pear-accent opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-pear-accent" />
              </span>
              Updating
            </span>
          </div>

          <div className="mt-4">
            <div className="relative h-2 overflow-hidden rounded-full bg-sage-soft ring-1 ring-sage-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange via-orange-soft to-pear-accent transition-[width] duration-700 ease-out"
                style={{
                  width: `${((phaseIndex + 1) / phases.length) * 100}%`,
                }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 animate-pulse" />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-text-muted">
              <span>Accepted</span>
              <span>Prep</span>
              <span>Pickup</span>
              <span>En route</span>
            </div>
          </div>

          <ul className="mt-4 flex flex-col gap-2">
            {phases.map((p, idx) => {
              const active = idx === phaseIndex
              const done = idx < phaseIndex
              const Icon = p.Icon
              return (
                <li
                  key={p.title}
                  className={`flex items-start gap-3 rounded-2xl border p-3 shadow-sm transition ${
                    active
                      ? 'border-orange/50 bg-surface-honey'
                      : done
                        ? 'border-sage-border/70 bg-white'
                        : 'border-sage-border/60 bg-white/70'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl ring-1 ${
                      active
                        ? 'bg-orange text-white ring-orange/30'
                        : done
                          ? 'bg-sage-soft text-pear-accent ring-sage-border'
                          : 'bg-sage-soft text-text-muted ring-sage-border'
                    }`}
                  >
                    <Icon
                      className={`size-5 ${active ? 'animate-pulse' : ''}`}
                      strokeWidth={2.25}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[13px] font-bold ${
                        active || done ? 'text-text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-text-muted">
                      {p.subtitle}
                    </p>
                  </div>
                  {active ? (
                    <div className="mt-1 flex shrink-0 items-center gap-1">
                      <span className="size-1.5 animate-bounce rounded-full bg-orange [animation-delay:-0.2s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-orange [animation-delay:-0.1s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-orange" />
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-bold text-text-primary">Delivery time</h2>
          <span className="text-[12px] font-semibold text-pear-accent">
            Instant
          </span>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-orange ring-1 ring-sage-border">
            <Clock className="size-5" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-text-primary">{etaLabel}</p>
            <p className="mt-0.5 text-[12px] text-text-secondary">
              We’ll notify you when it’s on the way.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <h2 className="text-[15px] font-bold text-text-primary">Delivery address</h2>
        <div className="mt-3 flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-orange ring-1 ring-sage-border">
            <MapPin className="size-5" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-text-primary">{addressLabel}</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-text-muted">
              {address}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <h2 className="text-[15px] font-bold text-text-primary">Payment</h2>
        <div className="mt-3 flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-orange ring-1 ring-sage-border">
            <WalletCards className="size-5" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-text-primary">
              {paymentLabel}
            </p>
            <p className="mt-0.5 text-[12px] text-text-muted">
              Total: <span className="font-semibold text-text-primary">{totalEgp} EGP</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <h2 className="text-[15px] font-bold text-text-primary">Order notes</h2>
        <div className="mt-3 flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-orange ring-1 ring-sage-border">
            <NotebookPen className="size-5" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            {orderNotes ? (
              <p className="text-[13px] leading-relaxed text-text-primary">
                {orderNotes}
              </p>
            ) : (
              <p className="text-[13px] text-text-muted">No notes</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

