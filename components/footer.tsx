import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE, POLICY_LINKS } from '@/lib/business'

const columns = [
  { title: 'Services', links: [
    { href: '/solutions', label: 'Solutions' },
    { href: '/operations', label: 'How Monitoring Works' },
    { href: '/professional-services', label: 'Professional Services' },
    { href: '/pricing', label: 'Pricing & Plans' },
  ] },
  { title: 'Company', links: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/cancellation-refund', label: 'Cancellation & Refunds' },
  ] },
  { title: 'Legal', links: [...POLICY_LINKS] },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link href="/" aria-label={`${BUSINESS.name} home`} className="inline-block"><Image src="/logo.png" alt={`${BUSINESS.name} logo`} width={600} height={321} className="h-20 w-auto" /></Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Remote CCTV monitoring and retail security surveillance for businesses in the United States, delivered by a trained monitoring team in India.</p>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">{BUSINESS.name} is a {BUSINESS.legalStructure.toLowerCase()} registered as a Micro Enterprise under Udyam Reg. No. {BUSINESS.udyamNumber}.</p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {col.links.map((l) => <li key={l.label}><Link href={l.href} className="hover:text-foreground">{l.label}</Link></li>)}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4 shrink-0 text-primary" />{BUSINESS.phone}</a></li>
              <li><a href={BUSINESS.phone2Href} className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4 shrink-0 text-primary" />{BUSINESS.phone2}</a></li>
              <li><a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground"><MessageCircle className="h-4 w-4 shrink-0 text-primary" />WhatsApp</a></li>
              <li><a href={`mailto:${BUSINESS.email}`} className="flex items-start gap-2 break-all lg:break-normal hover:text-foreground"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{BUSINESS.email}</a></li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.pin}, {BUSINESS.address.country}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs leading-5 text-muted-foreground sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. Proprietor: {BUSINESS.proprietor}.</p>
            <p>Registered address: {BUSINESS_ADDRESS_ONE_LINE}</p>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {POLICY_LINKS.map((p) => <Link key={p.href} href={p.href} className="hover:text-foreground">{p.label}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  )
}
