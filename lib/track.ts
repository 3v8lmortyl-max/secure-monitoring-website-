// Fires a conversion event to whichever analytics tools are loaded (GA4 via gtag, Microsoft Clarity).
// Safe no-op when analytics are not configured.
type Params = Record<string, string | number>

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; clarity?: (...a: unknown[]) => void }
  try {
    w.gtag?.('event', name, params)
    w.clarity?.('event', name)
  } catch {
    /* analytics must never break the page */
  }
}
