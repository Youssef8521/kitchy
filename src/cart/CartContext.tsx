import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export function cartLineKey(chefId: string, dishId: string) {
  return `${chefId}:${dishId}`
}

type CartContextValue = {
  quantities: Record<string, number>
  bumpDish: (chefId: string, dishId: string, delta: number) => void
  getDishQty: (chefId: string, dishId: string) => number
  totalItemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const bumpDish = useCallback(
    (chefId: string, dishId: string, delta: number) => {
      const key = cartLineKey(chefId, dishId)
      setQuantities((prev) => {
        const next = Math.min(Math.max((prev[key] ?? 0) + delta, 0), 99)
        if (next <= 0) {
          const { [key]: _, ...rest } = prev
          return rest
        }
        return { ...prev, [key]: next }
      })
    },
    [],
  )

  const getDishQty = useCallback(
    (chefId: string, dishId: string) =>
      quantities[cartLineKey(chefId, dishId)] ?? 0,
    [quantities],
  )

  const totalItemCount = useMemo(
    () => Object.values(quantities).reduce((a, b) => a + b, 0),
    [quantities],
  )

  const value = useMemo(
    () => ({ quantities, bumpDish, getDishQty, totalItemCount }),
    [quantities, bumpDish, getDishQty, totalItemCount],
  )

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
