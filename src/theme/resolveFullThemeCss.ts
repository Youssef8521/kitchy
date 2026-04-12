import type { ThemeCssVars } from './types'

/**
 * Merges base theme vars with semantic UI tokens (defaults keep legacy themes working).
 */
export function resolveFullThemeCss(v: ThemeCssVars): Record<string, string> {
  const pageBg = v.pageBg ?? v.cream
  const surfaceCard = v.surfaceCard ?? '#ffffff'
  const surfaceHoney = v.surfaceHoney ?? '#ffffff'
  const textPrimary = v.textPrimary ?? v.navy
  const textSecondary = v.textSecondary ?? v.textMuted
  const borderSubtle = v.borderSubtle ?? 'rgba(15, 23, 42, 0.08)'
  const sageSoft = v.sageSoft ?? '#f3f4f6'
  const sageBorder = v.sageBorder ?? '#e5e7eb'
  const navInactive = v.navInactive ?? v.textMuted
  const pearAccent = v.pearAccent ?? v.orangeSoft
  const promoBg = v.promoBg ?? v.navy
  const chipSelectedBg = v.chipSelectedBg ?? v.navy
  const liveBadge = v.liveBadge ?? v.orange
  const cartBadge = v.cartBadge ?? v.orangeSoft
  const thumbRing = v.thumbRing ?? 'rgba(0, 0, 0, 0.06)'
  const liveIconWell = v.liveIconWell ?? 'rgba(255, 255, 255, 0.22)'

  const base: Record<string, string> = {
    '--app-cream': v.cream,
    '--app-navy': v.navy,
    '--app-navy-muted': v.navyMuted,
    '--app-orange': v.orange,
    '--app-orange-soft': v.orangeSoft,
    '--app-text-muted': v.textMuted,
    '--app-reorder-from': v.reorderFrom,
    '--app-reorder-to': v.reorderTo,
    '--app-live-from': v.liveFrom,
    '--app-live-via': v.liveVia,
    '--app-live-to': v.liveTo,
    '--app-blind-glow': v.blindGlow,
    '--app-chrome': v.chrome,
    '--app-page-bg': pageBg,
    '--app-surface-card': surfaceCard,
    '--app-surface-honey': surfaceHoney,
    '--app-text-primary': textPrimary,
    '--app-text-secondary': textSecondary,
    '--app-border-subtle': borderSubtle,
    '--app-sage-soft': sageSoft,
    '--app-sage-border': sageBorder,
    '--app-nav-inactive': navInactive,
    '--app-pear-accent': pearAccent,
    '--app-promo-bg': promoBg,
    '--app-chip-selected-bg': chipSelectedBg,
    '--app-live-badge': liveBadge,
    '--app-cart-badge': cartBadge,
    '--app-thumb-ring': thumbRing,
    '--app-live-icon-well': liveIconWell,
  }

  return base
}
