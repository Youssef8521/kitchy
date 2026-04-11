/** CSS custom properties (--app-*) applied to :root when a theme is active */
export type ThemeCssVars = {
  cream: string
  navy: string
  navyMuted: string
  orange: string
  orangeSoft: string
  textMuted: string
  reorderFrom: string
  reorderTo: string
  liveFrom: string
  liveVia: string
  liveTo: string
  /** e.g. rgba(232, 107, 43, 0.55) for glow shadows */
  blindGlow: string
  /** Page background outside the phone shell */
  chrome: string
}

export type ThemeDefinition = {
  id: string
  label: string
  /** Optional: source image you used to derive the palette (for your notes only) */
  previewImage?: string
  vars: ThemeCssVars
}
