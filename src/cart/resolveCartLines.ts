import { getChefById } from '../data/chefs'
import type { MenuDish } from '../data/chefs'

export type CartLineResolved = {
  key: string
  chefId: string
  chefName: string
  dish: MenuDish
  quantity: number
}

export function resolveCartLines(
  quantities: Record<string, number>,
): CartLineResolved[] {
  const lines: CartLineResolved[] = []
  for (const [key, quantity] of Object.entries(quantities)) {
    if (quantity <= 0) continue
    const colon = key.indexOf(':')
    if (colon === -1) continue
    const chefId = key.slice(0, colon)
    const dishId = key.slice(colon + 1)
    const chef = getChefById(chefId)
    if (!chef) continue
    const dish = [...chef.signatureDishes, ...chef.cooksChoice].find(
      (d) => d.id === dishId,
    )
    if (!dish) continue
    lines.push({ key, chefId, chefName: chef.name, dish, quantity })
  }
  return lines
}
