import { Link } from 'react-router-dom'
import { resolveCartLines } from '../cart/resolveCartLines'
import { useCart } from '../cart/CartContext'

export function CartScreen() {
  const { quantities, totalItemCount } = useCart()
  const lines = resolveCartLines(quantities)
  const subtotal = lines.reduce(
    (sum, l) => sum + l.dish.priceEgp * l.quantity,
    0,
  )

  return (
    <main className="flex flex-1 flex-col px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-6">
      <h1 className="text-xl font-bold text-text-primary">Cart</h1>
      <p className="mt-0.5 text-[13px] text-text-muted">
        {totalItemCount === 0
          ? 'No plates yet'
          : `${totalItemCount} item${totalItemCount === 1 ? '' : 's'}`}
      </p>

      {lines.length === 0 ? (
        <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <p className="text-[14px] font-medium text-text-primary">
            Browse a chef menu to add dishes.
          </p>
          <Link
            to="/"
            className="rounded-full bg-orange px-5 py-2.5 text-[13px] font-bold text-white transition hover:brightness-110"
          >
            Find food
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-5 flex flex-col gap-3">
            {lines.map((line) => (
              <li
                key={line.key}
                className="flex gap-3 rounded-2xl border border-sage-border/60 bg-surface-card p-3 shadow-[0_6px_24px_rgb(0,0,0,0.05)]"
              >
                <img
                  src={line.dish.image}
                  alt=""
                  className="size-16 shrink-0 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                    {line.chefName}
                  </p>
                  <p className="text-[14px] font-bold text-text-primary">
                    {line.dish.name}
                  </p>
                  <p className="mt-1 text-[13px] text-text-muted">
                    {line.dish.priceEgp} EGP ×{' '}
                    <span className="font-semibold text-text-primary">
                      {line.quantity}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end justify-center">
                  <p className="text-[13px] font-bold text-orange">
                    {line.dish.priceEgp * line.quantity} EGP
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-sage-border/60 bg-surface-card p-4 shadow-md">
            <div className="flex items-center justify-between text-[15px] font-bold text-text-primary">
              <span>Subtotal</span>
              <span className="text-orange">{subtotal} EGP</span>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
