import { Home, Menu, Search, ShoppingCart, Wallet } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../cart/CartContext'

const BOTTOM_NAV_PAD =
  'pb-[max(0.5rem,env(safe-area-inset-bottom))]' as const

export function BottomNav() {
  const { totalItemCount } = useCart()
  const cartBadge =
    totalItemCount > 99 ? '99+' : totalItemCount > 0 ? String(totalItemCount) : null
  const cartWide = totalItemCount > 9

  const itemClass = (active: boolean) =>
    `flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors ${
      active ? 'text-orange' : 'text-text-muted'
    }`

  return (
    <nav
      className={`fixed bottom-0 left-1/2 z-50 flex w-full max-w-[390px] -translate-x-1/2 border-t border-gray-100 bg-white px-1 pt-1 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] ${BOTTOM_NAV_PAD}`}
      aria-label="Main"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) => itemClass(isActive)}
      >
        {({ isActive }) => (
          <>
            <Home
              className="size-6"
              strokeWidth={isActive ? 2.5 : 2}
              fill={isActive ? 'currentColor' : 'none'}
              aria-hidden
            />
            Home
          </>
        )}
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) => itemClass(isActive)}
      >
        {({ isActive }) => (
          <>
            <Search
              className="size-6"
              strokeWidth={isActive ? 2.5 : 2}
              aria-hidden
            />
            Search
          </>
        )}
      </NavLink>

      <NavLink to="/cart" className={({ isActive }) => itemClass(isActive)}>
        {({ isActive }) => (
          <>
            <span className="relative inline-flex">
              <ShoppingCart
                className="size-6"
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden
              />
              {cartBadge ? (
                <span
                  className={`absolute -right-2 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold leading-none text-white shadow-sm ring-2 ring-white ${
                    cartWide ? 'px-1.5' : ''
                  }`}
                >
                  {cartBadge}
                </span>
              ) : null}
            </span>
            Cart
          </>
        )}
      </NavLink>

      <NavLink to="/pay" className={({ isActive }) => itemClass(isActive)}>
        {({ isActive }) => (
          <>
            <Wallet
              className="size-6"
              strokeWidth={isActive ? 2.5 : 2}
              aria-hidden
            />
            Pay
          </>
        )}
      </NavLink>

      <NavLink to="/more" className={({ isActive }) => itemClass(isActive)}>
        {({ isActive }) => (
          <>
            <Menu
              className="size-6"
              strokeWidth={isActive ? 2.5 : 2}
              aria-hidden
            />
            More
          </>
        )}
      </NavLink>
    </nav>
  )
}
