import {
  Activity,
  Check,
  Flame,
  Gift,
  Home,
  RotateCcw,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  User,
  FileText,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CHEFS } from '../data/chefs'
import { ThemePicker } from './ThemePicker'

const DISH_IMG =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=160&h=160&fit=crop'

const cultureItems = [
  {
    label: "Ghadwet el-Gom'aa",
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
  },
  {
    label: 'The Ultimate Azouma',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop',
  },
  {
    label: 'Fetaar el-Balad',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop',
  },
  {
    label: 'Mounet el-Beit',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
  },
  {
    label: 'Gifting',
    img: 'https://images.unsplash.com/photo-1512058564366-18510be2db9b?w=200&h=200&fit=crop',
  },
]

const vendors = CHEFS.map((c) => ({
  id: c.id,
  hero: c.hero,
  avatar: c.avatar,
  name: c.name,
  tagline: c.tagline,
  rating: c.rating,
  live: c.live,
  badges: c.badges,
  ordersLine: c.ordersLine,
}))

export function HomeScreen() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col bg-cream shadow-xl ring-1 ring-black/5">
      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-3 scrollbar-hide">
        <div className="sticky top-0 z-40 -mx-4 mb-3 flex justify-end bg-gradient-to-b from-cream from-80% to-transparent px-4 pb-2 pt-1">
          <ThemePicker />
        </div>
        <LivePrepBanner />
        <ReorderCard chefId="mama-karima" />
        <CategoryChips />
        <TasteCulture />
        <BlindTastingBanner />
        <RecoveryCard />
        <VanguardSection />
      </main>
      <BottomNav />
    </div>
  )
}

function ReorderCard({ chefId }: { chefId: string }) {
  const navigate = useNavigate()

  return (
    <article className="mb-5 flex items-center gap-3 rounded-3xl bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <button
        type="button"
        onClick={() => navigate(`/chef/${chefId}`)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <img
          src={DISH_IMG}
          alt=""
          className="size-14 shrink-0 rounded-full object-cover ring-2 ring-white"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-[15px] font-bold leading-tight text-navy">
              The Usual?
            </h2>
            <RotateCcw
              className="size-3.5 shrink-0 text-orange"
              strokeWidth={2.5}
              aria-hidden
            />
          </div>
          <p className="mt-0.5 truncate text-[12px] text-text-muted">
            Mama Karima&apos;s Mahshi • 80 EGP
          </p>
        </div>
      </button>
      <button
        type="button"
        onClick={() => navigate(`/chef/${chefId}`)}
        className="shrink-0 rounded-full bg-gradient-to-r from-reorder-from to-reorder-to px-4 py-2.5 text-[11px] font-bold tracking-wide text-white shadow-sm"
      >
        REORDER
      </button>
    </article>
  )
}

function CategoryChips() {
  return (
    <div className="scrollbar-hide -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1">
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy px-4 py-2.5 text-[13px] font-semibold text-white"
      >
        <Flame className="size-4 text-orange" strokeWidth={2.5} aria-hidden />
        Zamalek&apos;s Obsession
      </button>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-navy"
      >
        <Check className="size-4 text-emerald-500" strokeWidth={2.5} aria-hidden />
        Vanguard Cooks
      </button>
      <button
        type="button"
        className="shrink-0 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-navy"
      >
        Ready to Fly
      </button>
    </div>
  )
}

function TasteCulture() {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-lg font-bold text-navy">Taste the Culture</h2>
      <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
        {cultureItems.map((item) => (
          <div key={item.label} className="w-[72px] shrink-0 text-center">
            <div className="mx-auto size-[68px] overflow-hidden rounded-full border-[3px] border-white shadow-md ring-1 ring-black/5">
              <img
                src={item.img}
                alt=""
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-center text-[11px] font-semibold leading-tight text-navy">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function BlindTastingBanner() {
  return (
    <section className="relative mb-5 overflow-hidden rounded-3xl bg-navy px-5 py-5 pr-36 text-white shadow-lg">
      <div className="relative z-10 max-w-[220px]">
        <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-orange">
          <Sparkles className="size-3.5" strokeWidth={2.5} aria-hidden />
          TASTE GENOME™
        </p>
        <h3 className="text-xl font-bold leading-snug">
          The Blind Tasting Box
        </h3>
        <p className="mt-2 text-[12px] leading-relaxed text-white/85">
          Select allergens. Our algorithm picks a mystery meal from a Vanguard
          Cook. Flat 80 EGP.
        </p>
      </div>
      <div
        className="absolute -right-2 top-1/2 z-0 flex size-[100px] -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-orange to-orange-soft shadow-[0_0_40px_var(--app-blind-glow)]"
        style={{ transform: 'translateY(-50%) rotate(8deg)' }}
        aria-hidden
      >
        <Gift className="size-11 text-white" strokeWidth={1.5} />
      </div>
    </section>
  )
}

function RecoveryCard() {
  return (
    <article className="mb-8 rounded-3xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <div className="flex items-center gap-2">
        <Activity className="size-5 text-orange" strokeWidth={2.5} aria-hidden />
        <h3 className="text-[15px] font-bold text-navy">Recovery Meals</h3>
      </div>
      <p className="mt-1 text-[10px] font-semibold tracking-wider text-text-muted">
        SYNC&apos;D: STRENGTH TRAINING
      </p>
    </article>
  )
}

function LivePrepBanner() {
  return (
    <div className="mb-5 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-live-from via-live-via to-live-to px-4 py-3.5 shadow-md">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        <Flame className="size-5 text-orange" strokeWidth={2.5} aria-hidden />
      </div>
      <div className="min-w-0 text-white">
        <p className="text-[14px] font-bold leading-tight">● Live Prep</p>
        <p className="mt-0.5 text-[12px] font-medium text-white/95">
          Amira is live-prepping your order
        </p>
      </div>
    </div>
  )
}

function VanguardSection() {
  return (
    <section className="pb-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold leading-tight text-navy">
          Kitchy Vanguard
        </h2>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
          <Check className="size-3 text-emerald-600" strokeWidth={3} aria-hidden />
          KITCHY Quality Seal
        </span>
      </div>
      <ul className="flex flex-col gap-5">
        {vendors.map((v) => (
          <li key={v.id}>
            <VendorCard vendor={v} />
          </li>
        ))}
      </ul>
    </section>
  )
}

type Vendor = (typeof vendors)[number]

function VendorCard({ vendor }: { vendor: Vendor }) {
  const navigate = useNavigate()
  const badgeStyles = {
    green:
      'bg-emerald-50 text-emerald-800 ring-emerald-100/80',
    orange:
      'bg-orange-50 text-orange-900 ring-orange-100/80',
    blue: 'bg-sky-50 text-sky-900 ring-sky-100/80',
  } as const

  const openMenu = () => navigate(`/chef/${vendor.id}`)

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={openMenu}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openMenu()
        }
      }}
      className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgb(0,0,0,0.08)] ring-1 ring-black/[0.04] transition-transform active:scale-[0.99]"
    >
      <div className="relative aspect-[16/10] w-full">
        <img
          src={vendor.hero}
          alt=""
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        {vendor.live ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            <span className="size-1.5 rounded-full bg-white" aria-hidden />
            LIVE
          </div>
        ) : null}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src={vendor.avatar}
              alt=""
              className="size-10 shrink-0 rounded-full border-2 border-white object-cover shadow-md"
            />
            <div className="min-w-0 text-white drop-shadow-sm">
              <p className="truncate text-[15px] font-bold leading-tight">
                {vendor.name}
              </p>
              <p className="truncate text-[12px] font-medium text-white/90">
                {vendor.tagline}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-white/95 px-2 py-1 pl-1.5 shadow-md ring-1 ring-black/5">
            <Star
              className="size-3.5 fill-amber-400 text-amber-400"
              strokeWidth={0}
              aria-hidden
            />
            <span className="pr-0.5 text-[12px] font-bold text-navy">
              {vendor.rating}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 pt-3">
        <div className="mb-3 flex flex-wrap gap-2">
          {vendor.badges.map((b) => (
            <span
              key={b.label}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ${badgeStyles[b.tone]}`}
            >
              {b.tone === 'green' ? (
                <Check className="size-3 text-emerald-600" strokeWidth={2.5} aria-hidden />
              ) : null}
              {b.label}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
          {vendor.ordersLine ? (
            <p className="text-[12px] text-text-muted">{vendor.ordersLine}</p>
          ) : null}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              openMenu()
            }}
            className={`text-[13px] font-bold text-navy underline-offset-2 hover:underline ${vendor.ordersLine ? '' : 'ml-auto'}`}
          >
            Lock in Delivery
          </button>
        </div>
      </div>
    </article>
  )
}

function BottomNav() {
  const item =
    'flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium'

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[390px] -translate-x-1/2 border-t border-gray-100 bg-white px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
      aria-label="Main"
    >
      <a href="#" className={`${item} text-navy`}>
        <Home className="size-6 text-orange" strokeWidth={2.25} aria-hidden />
        Home
      </a>
      <a href="#" className={`${item} text-text-muted`}>
        <Search className="size-6" strokeWidth={2} aria-hidden />
        Discover
      </a>
      <a href="#" className={`${item} relative text-text-muted`}>
        <span className="relative">
          <ShoppingCart className="size-6" strokeWidth={2} aria-hidden />
          <span className="absolute -right-2 -top-1 flex size-[18px] items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            2
          </span>
        </span>
        Cart
      </a>
      <a href="#" className={`${item} text-text-muted`}>
        <FileText className="size-6" strokeWidth={2} aria-hidden />
        My Orders
      </a>
      <a href="#" className={`${item} text-text-muted`}>
        <User className="size-6" strokeWidth={2} aria-hidden />
        Profile
      </a>
    </nav>
  )
}
