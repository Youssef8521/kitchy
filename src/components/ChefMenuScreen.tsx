import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Minus,
  Plus,
  Scale,
  Sparkles,
  Star,
  Users,
  UsersRound,
} from 'lucide-react'
import { useCart } from '../cart/CartContext'
import { getChefById } from '../data/chefs'
import type { ChefProfile, MenuDish } from '../data/chefs'

export function ChefMenuScreen() {
  const { chefId } = useParams<{ chefId: string }>()
  const navigate = useNavigate()
  const { bumpDish, getDishQty } = useCart()
  const chef = chefId ? getChefById(chefId) : undefined

  const [menuTab, setMenuTab] = useState<'full' | 'choice'>('full')
  const [sectionTab, setSectionTab] = useState<'signature' | 'wall'>(
    'signature',
  )

  if (!chef) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-[calc(5.75rem+env(safe-area-inset-bottom))] text-center">
        <p className="text-[15px] font-semibold text-navy">Chef not found</p>
        <Link
          to="/"
          className="rounded-full bg-navy px-5 py-2.5 text-[13px] font-bold text-white"
        >
          Back to home
        </Link>
      </main>
    )
  }

  const dishes: MenuDish[] =
    menuTab === 'full' ? chef.signatureDishes : chef.cooksChoice

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="sticky top-0 z-30 flex items-center gap-2 bg-cream/95 px-3 py-2.5 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex size-10 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-black/5"
          aria-label="Back to home"
        >
          <ArrowLeft className="size-5" strokeWidth={2.25} />
        </button>
        <span className="text-[13px] font-semibold text-text-muted">
          Menu &amp; profile
        </span>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-[calc(8.5rem+env(safe-area-inset-bottom))] pt-1 scrollbar-hide">
        <HeroBlock chef={chef} />

        <p className="mb-3 text-[13px] leading-relaxed text-navy">
          {chef.bio}
        </p>

        <div className="mb-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold tracking-wide text-emerald-800 ring-1 ring-emerald-100">
            <Check className="size-3.5 text-emerald-600" strokeWidth={2.5} />
            {chef.verifiedLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-[10px] font-bold tracking-wide text-sky-900 ring-1 ring-sky-100">
            <Users className="size-3.5 text-sky-700" strokeWidth={2.25} />
            {chef.repeatCustomersLabel}
          </span>
        </div>

        {chef.cfaBanner ? (
          <div className="mb-5 flex items-center justify-center gap-2 rounded-2xl bg-orange-50 px-3 py-2.5 text-[11px] font-bold tracking-wide text-orange-900 ring-1 ring-orange-100">
            <Scale className="size-4 shrink-0 text-orange" strokeWidth={2.25} />
            {chef.cfaBanner}
          </div>
        ) : null}

        <div className="mb-3 flex gap-2">
          <button
            type="button"
            onClick={() => setMenuTab('full')}
            className={`flex-1 rounded-full py-3 text-[12px] font-bold tracking-wide transition-colors ${
              menuTab === 'full'
                ? 'bg-white text-navy shadow-md ring-1 ring-black/[0.06]'
                : 'bg-white/60 text-text-muted ring-1 ring-black/[0.04]'
            }`}
          >
            FULL MENU
          </button>
          <button
            type="button"
            onClick={() => setMenuTab('choice')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-3 text-[12px] font-bold tracking-wide transition-colors ${
              menuTab === 'choice'
                ? 'bg-white text-navy shadow-md ring-1 ring-black/[0.06]'
                : 'bg-white/60 text-text-muted ring-1 ring-black/[0.04]'
            }`}
          >
            <Sparkles className="size-3.5" strokeWidth={2.5} />
            COOK&apos;S CHOICE
          </button>
        </div>

        <div className="mb-4 flex gap-6 border-b border-gray-200/80">
          <button
            type="button"
            onClick={() => setSectionTab('signature')}
            className={`relative pb-2.5 text-[13px] font-bold ${
              sectionTab === 'signature'
                ? 'text-navy after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-orange'
                : 'text-text-muted'
            }`}
          >
            {menuTab === 'full' ? 'Signature Dishes' : "Chef's picks"}
          </button>
          <button
            type="button"
            onClick={() => setSectionTab('wall')}
            className={`relative pb-2.5 text-[13px] font-bold ${
              sectionTab === 'wall'
                ? 'text-navy after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-orange'
                : 'text-text-muted'
            }`}
          >
            Wall of Love
          </button>
        </div>

        {sectionTab === 'signature' ? (
          <ul className="mb-6 flex flex-col gap-3">
            {dishes.map((d) => (
              <li key={d.id}>
                <DishRow
                  dish={d}
                  quantity={getDishQty(chef.id, d.id)}
                  onIncrement={() => bumpDish(chef.id, d.id, 1)}
                  onDecrement={() => bumpDish(chef.id, d.id, -1)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mb-6 flex flex-col gap-3">
            {chef.wallOfLove.map((w, i) => (
              <li
                key={i}
                className="rounded-2xl bg-white p-4 shadow-[0_6px_24px_rgb(0,0,0,0.05)] ring-1 ring-black/[0.04]"
              >
                <p className="text-[13px] leading-relaxed text-navy">
                  &ldquo;{w.quote}&rdquo;
                </p>
                <p className="mt-2 text-[11px] font-semibold text-text-muted">
                  — {w.author}
                </p>
              </li>
            ))}
          </ul>
        )}

        <BuildAPlate chefName={chef.name} plate={chef.buildAPlate} />
      </main>

      <div className="pointer-events-none fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-1/2 z-30 flex w-full max-w-[390px] -translate-x-1/2 justify-center gap-3 px-4">
        <button
          type="button"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border-2 border-navy bg-white px-4 py-3 text-[11px] font-bold text-navy shadow-lg"
        >
          <UsersRound className="size-4 shrink-0" strokeWidth={2.25} />
          Squad Ghost Cart
        </button>
        <button
          type="button"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-[11px] font-bold text-white shadow-lg"
        >
          <Calendar className="size-4 shrink-0" strokeWidth={2} />
          Lock in Delivery
        </button>
      </div>
    </div>
  )
}

function HeroBlock({ chef }: { chef: ChefProfile }) {
  return (
    <div className="relative mb-4 overflow-hidden rounded-3xl ring-1 ring-black/[0.06]">
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <img
          src={chef.hero}
          alt=""
          className="absolute inset-0 size-full scale-105 object-cover blur-[2px]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        {chef.live ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            <span className="size-1.5 rounded-full bg-white" aria-hidden />
            LIVE
          </div>
        ) : null}
        <div className="absolute inset-x-4 bottom-4 flex items-end gap-3">
          <div className="relative shrink-0">
            <img
              src={chef.avatar}
              alt=""
              className="size-[72px] rounded-2xl border-2 border-white object-cover shadow-lg"
            />
            {chef.topPercentile ? (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange px-2 py-0.5 text-[8px] font-bold tracking-wide text-white shadow-md">
                {chef.topPercentile}
              </span>
            ) : null}
          </div>
          <div className="min-w-0 flex-1 pb-0.5 text-white">
            <h1 className="text-xl font-bold leading-tight drop-shadow-md">
              {chef.name}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm">
                <Star
                  className="size-3.5 fill-orange text-orange"
                  strokeWidth={0}
                />
                {chef.rating}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm">
                <Clock className="size-3.5 text-white/90" strokeWidth={2.25} />
                {chef.onTimePct} On-Time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DishRow({
  dish,
  quantity,
  onIncrement,
  onDecrement,
}: {
  dish: MenuDish
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}) {
  return (
    <article className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_6px_24px_rgb(0,0,0,0.05)] ring-1 ring-black/[0.04]">
      <img
        src={dish.image}
        alt=""
        className="size-[88px] shrink-0 rounded-xl object-cover"
        loading="lazy"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="text-[14px] font-bold leading-snug text-navy">
          {dish.name}
        </h3>
        {dish.description ? (
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-text-muted">
            {dish.description}
          </p>
        ) : null}
        <p className="mt-1.5 text-[13px] font-bold text-orange">
          {dish.priceEgp} EGP
        </p>
      </div>
      <DishQuantityControl
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        label={dish.name}
      />
    </article>
  )
}

function DishQuantityControl({
  quantity,
  onIncrement,
  onDecrement,
  label,
}: {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  label: string
}) {
  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Add ${label} to cart`}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#9d174d] text-white shadow-md ring-1 ring-[#9d174d]/30"
      >
        <Plus className="size-[1.15rem]" strokeWidth={2.75} aria-hidden />
      </button>
    )
  }

  return (
    <div
      className="flex h-10 shrink-0 items-center gap-0.5 rounded-full bg-white py-1 pl-1 pr-1 shadow-md ring-1 ring-black/[0.08]"
      role="group"
      aria-label={`Quantity for ${label}`}
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className="flex size-8 items-center justify-center rounded-full bg-rose-50 text-red-600 transition-colors hover:bg-rose-100"
      >
        <Minus className="size-4" strokeWidth={2.75} aria-hidden />
      </button>
      <span className="min-w-[1.5rem] px-0.5 text-center text-[15px] font-semibold tabular-nums text-navy">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="flex size-8 items-center justify-center rounded-full bg-[#9d174d] text-white shadow-sm ring-1 ring-[#9d174d]/25 transition-colors hover:bg-[#831843]"
      >
        <Plus className="size-4" strokeWidth={2.75} aria-hidden />
      </button>
    </div>
  )
}

function BuildAPlate({
  chefName,
  plate,
}: {
  chefName: string
  plate: ChefProfile['buildAPlate']
}) {
  const slots: {
    label: string
    slot: ChefProfile['buildAPlate']['protein']
  }[] = [
    { label: 'PROTEIN', slot: plate.protein },
    { label: 'CARB', slot: plate.carb },
    { label: 'SIDE', slot: plate.side },
  ]

  return (
    <section className="relative mb-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_10px_40px_rgb(0,0,0,0.06)]">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-1.5 text-[16px] font-bold text-navy">
            <Sparkles className="size-4 text-orange" strokeWidth={2.5} />
            Build-A-Plate
          </h2>
          <p className="mt-0.5 text-[11px] text-text-muted">
            Pick your basics. No reading required.
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full bg-navy px-4 py-2 text-[11px] font-bold text-white"
        >
          MATCH
        </button>
      </div>
      <p className="sr-only">Example plate curated by {chefName}</p>
      <div className="grid grid-cols-3 gap-2">
        {slots.map(({ label, slot }) => (
          <div key={label} className="text-center">
            <p className="mb-1.5 text-[10px] font-bold tracking-wide text-orange">
              {label}
            </p>
            <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.06]">
              <img
                src={slot.image}
                alt=""
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-1.5 text-[11px] font-semibold text-navy">
              {slot.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
