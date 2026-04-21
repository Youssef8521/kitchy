import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Clock, MapPin, PencilLine, ReceiptText } from 'lucide-react'
import { resolveCartLines } from '../cart/resolveCartLines'
import { useCart } from '../cart/CartContext'
import { EXAMPLE_ADDRESS } from '../data/exampleAddress'

type PaymentMethod = 'card' | 'cod'

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

function buildEtaWindow(now: Date) {
  const start = new Date(now.getTime() + 10 * 60_000)
  const end = new Date(now.getTime() + 20 * 60_000)
  return {
    start,
    end,
    label: `Arrives ${formatTime(start)} – ${formatTime(end)}`,
  }
}

export function CheckoutScreen() {
  const navigate = useNavigate()
  const { quantities, totalItemCount } = useCart()
  const lines = resolveCartLines(quantities)
  const subtotal = lines.reduce((sum, l) => sum + l.dish.priceEgp * l.quantity, 0)

  const eta = useMemo(() => buildEtaWindow(new Date()), [])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [orderNotes, setOrderNotes] = useState('')

  const placeOrder = () => {
    const orderId = `k${Date.now().toString(36)}`
    navigate(`/order/${orderId}`, {
      state: {
        orderId,
        addressLabel: 'Home',
        address: EXAMPLE_ADDRESS,
        etaStart: eta.start.toISOString(),
        etaEnd: eta.end.toISOString(),
        paymentMethod,
        orderNotes,
        totalEgp: subtotal,
        itemCount: totalItemCount,
      },
    })
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-6 scrollbar-hide">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary">Checkout</h1>
        <Link
          to="/cart"
          className="text-[13px] font-bold text-orange underline-offset-2 hover:underline"
        >
          Back to cart
        </Link>
      </div>

      <section className="mt-5 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-bold text-text-primary">Delivery time</h2>
          <button
            type="button"
            className="text-[13px] font-bold text-orange"
            aria-label="Schedule delivery"
          >
            Schedule
          </button>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-orange ring-1 ring-sage-border">
            <Clock className="size-5" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-text-primary">
              Instant
              <span className="ml-2 font-medium text-text-muted">{eta.label}</span>
            </p>
            <p className="mt-0.5 text-[12px] text-text-secondary">
              ETA refreshes when you open checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-bold text-text-primary">Delivery address</h2>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-orange"
            aria-label="Change delivery address"
          >
            <PencilLine className="size-4" strokeWidth={2.25} aria-hidden />
            Change
          </button>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-orange ring-1 ring-sage-border">
            <MapPin className="size-5" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-text-primary">Home</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-text-muted">
              {EXAMPLE_ADDRESS}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-bold text-text-primary">Order notes</h2>
          <ReceiptText className="size-5 text-text-muted" strokeWidth={2.25} aria-hidden />
        </div>
        <textarea
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          rows={3}
          placeholder="Add a note for the kitchen (optional)"
          className="w-full resize-none rounded-2xl border border-sage-border/70 bg-white px-3 py-3 text-[13px] text-text-primary shadow-sm placeholder:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-orange/30"
        />
        <p className="mt-2 text-[11px] text-text-muted">
          This is sent with your order (not a delivery instruction).
        </p>
      </section>

      <section className="mt-4 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <h2 className="text-[15px] font-bold text-text-primary">Payment</h2>
        <div className="mt-3 flex flex-col gap-2">
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-sage-border/70 bg-white p-3 shadow-sm">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-text-primary">Cash on Delivery</p>
              <p className="mt-0.5 text-[12px] text-text-muted">Pay when it arrives</p>
            </div>
            <input
              type="radio"
              name="payment-method"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              aria-label="Pay cash on delivery"
              className="size-5 accent-orange"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-orange/60 bg-white p-3 shadow-sm ring-1 ring-orange/20">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-text-primary">Card</p>
              <p className="mt-0.5 text-[12px] text-text-muted">
                Visa •••• 5003
              </p>
            </div>
            <input
              type="radio"
              name="payment-method"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              aria-label="Pay with card"
              className="size-5 accent-orange"
            />
          </label>
        </div>
      </section>

      <div className="mt-4 rounded-3xl border border-sage-border/60 bg-surface-card p-4 shadow-[0_10px_36px_rgb(0,0,0,0.06)]">
        <div className="flex items-center justify-between text-[15px] font-bold text-text-primary">
          <span>Grand total</span>
          <span className="text-orange">{subtotal} EGP</span>
        </div>
      </div>

      <button
        type="button"
        onClick={placeOrder}
        disabled={lines.length === 0}
        className="mt-4 rounded-2xl bg-orange px-5 py-4 text-[14px] font-extrabold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Place order
      </button>
    </main>
  )
}

