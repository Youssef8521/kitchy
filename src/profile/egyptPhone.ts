export function normalizeEgyptPhone(input: string): string {
  const raw = input.replace(/[^\d+]/g, '')
  const digits = raw.startsWith('+') ? `+${raw.slice(1).replace(/\D/g, '')}` : raw.replace(/\D/g, '')
  const numeric = digits.startsWith('+') ? digits.slice(1) : digits

  // Accept: 01XXXXXXXXX (11) | 20 1XXXXXXXXX (12) | +20 1XXXXXXXXX
  if (numeric.startsWith('0') && numeric.length === 11) {
    return `+20${numeric.slice(1)}`
  }
  if (numeric.startsWith('20') && numeric.length === 12) {
    return `+${numeric}`
  }
  if (digits.startsWith('+20') && digits.length === 13) {
    return digits
  }
  return input.trim()
}

export function isValidEgyptMobile(phoneInput: string): boolean {
  const cleaned = phoneInput.replace(/[^\d+]/g, '')
  const numeric = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned
  const national = numeric.startsWith('20') ? numeric.slice(2) : numeric.startsWith('0') ? numeric.slice(1) : numeric

  // National mobile: 1[0|1|2|5]XXXXXXXX (10 digits)
  return /^1[0125]\d{8}$/.test(national)
}

