'use client'

import { useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { BUSINESS } from '@/lib/business'
import { trackEvent } from '@/lib/track'

// No backend: the form validates input, then opens the visitor's email app or WhatsApp
// with a pre-filled enquiry. Nothing is stored on this website.

const HOURS = ['24/7', 'Overnight only', 'Business hours only', 'After hours (store closed)', 'Opening & closing only', 'Custom schedule']
const ZONES = ['Eastern (ET)', 'Central (CT)', 'Mountain (MT)', 'Pacific (PT)', 'Alaska (AKT)', 'Hawaii (HT)', 'Other']
const INTERESTS = ['7-day free trial', 'Custom monitoring quote', 'Schedule a consultation', 'Enterprise / multi-location']

const field = 'mt-1.5 w-full rounded-md border border-border bg-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40'
const label = 'text-sm font-medium'

export function QuoteForm() {
  const [error, setError] = useState('')

  function buildMessage(form: HTMLFormElement) {
    const d = new FormData(form)
    const get = (k: string) => String(d.get(k) ?? '').trim()
    const lines = [
      `Request: ${get('interest')}`,
      `Business name: ${get('business')}`,
      `Contact name: ${get('name')}`,
      `Email: ${get('email')}`,
      `Phone: ${get('phone') || '-'}`,
      `Country: ${get('country')}`,
      `Time zone: ${get('timezone')}`,
      `Number of locations: ${get('locations')}`,
      `Number of cameras (total): ${get('cameras')}`,
      `Camera / recorder make and model: ${get('model') || 'Not sure'}`,
      `Monitoring hours needed: ${get('hours')}`,
      `Additional requirements: ${get('notes') || '-'}`,
    ]
    return { subject: `${get('interest')}: ${get('business')}`, body: lines.join('\n') }
  }

  function send(form: HTMLFormElement, channel: 'email' | 'whatsapp') {
    if (!form.checkValidity()) {
      form.reportValidity()
      setError('Please complete the required fields.')
      return
    }
    setError('')
    const { subject, body } = buildMessage(form)
    trackEvent('generate_lead', { method: channel })
    const url = channel === 'email'
      ? `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      : `${BUSINESS.whatsappHref}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`
    if (channel === 'email') window.location.href = url
    else window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form id="quote-form" onSubmit={(e) => { e.preventDefault(); send(e.currentTarget, 'email') }} className="scroll-mt-32 rounded-xl border border-border bg-card p-6 sm:p-8" aria-describedby="form-privacy">
      <h2 className="text-2xl font-bold">Request a free trial or custom quote</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Tell us about your store and cameras. We usually reply within one business day. Fields marked * are required.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="sm:col-span-2"><span className={label}>I’m interested in *</span>
          <select name="interest" required className={field} defaultValue={INTERESTS[0]}>{INTERESTS.map((o) => <option key={o}>{o}</option>)}</select>
        </label>
        <label><span className={label}>Business name *</span><input name="business" required autoComplete="organization" className={field} /></label>
        <label><span className={label}>Your name *</span><input name="name" required autoComplete="name" className={field} /></label>
        <label><span className={label}>Email *</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
        <label><span className={label}>Phone (optional)</span><input name="phone" type="tel" autoComplete="tel" className={field} /></label>
        <label><span className={label}>Country *</span><input name="country" required defaultValue="United States" autoComplete="country-name" className={field} /></label>
        <label><span className={label}>Time zone *</span>
          <select name="timezone" required className={field} defaultValue="">{[<option key="" value="" disabled>Select time zone</option>, ...ZONES.map((z) => <option key={z}>{z}</option>)]}</select>
        </label>
        <label><span className={label}>Number of locations *</span><input name="locations" type="number" min={1} required defaultValue={1} className={field} /></label>
        <label><span className={label}>Total number of cameras *</span><input name="cameras" type="number" min={1} required placeholder="e.g. 12" className={field} /></label>
        <label><span className={label}>Camera / recorder make and model</span><input name="model" placeholder="e.g. NVR brand and model, or ‘not sure’" className={field} /></label>
        <label><span className={label}>Monitoring hours needed *</span>
          <select name="hours" required className={field} defaultValue={HOURS[0]}>{HOURS.map((h) => <option key={h}>{h}</option>)}</select>
        </label>
        <label className="sm:col-span-2"><span className={label}>Additional requirements</span><textarea name="notes" rows={4} placeholder="Main concerns (shoplifting, employee theft, after-hours), store type, preferred alert method…" className={field} /></label>
      </div>

      {error && <p role="alert" className="mt-4 text-sm font-medium text-red-400">{error}</p>}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-accent"><Mail className="h-4 w-4" aria-hidden /> Send by email</button>
        <button type="button" onClick={(e) => { const f = e.currentTarget.form; if (f) send(f, 'whatsapp') }} className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3 font-semibold hover:bg-secondary"><MessageCircle className="h-4 w-4" aria-hidden /> Send by WhatsApp</button>
      </div>
      <p id="form-privacy" className="mt-4 text-xs leading-5 text-muted-foreground">This form does not store your information on our website. It opens your email app or WhatsApp with your details filled in, so you can review them and send them to us. See our <a href="/privacy" className="underline underline-offset-4">Privacy Policy</a>.</p>
    </form>
  )
}
