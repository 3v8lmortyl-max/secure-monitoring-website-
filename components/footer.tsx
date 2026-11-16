import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE, POLICY_LINKS } from '@/lib/business'

const columns = [
  { title: 'Services', links: [
    { href: '/services/remote-cctv-monitoring', label: 'Remote CCTV Monitoring' },
    { href: '/services/live-video-monitoring', label: '24/7 Live Video Monitoring' },
    { href: '/services/retail-loss-prevention', label: 'Loss Prevention' },
    { href: '/services/employee-theft-prevention', label: 'Employee Theft Prevention' },
    { href: '/services/multi-location-cctv-monitoring', label: 'Multi-Location Monitoring' },
    { href: '/services', label: 'All services' },
  ] },
  { title: 'Industries', links: [
    { href: '/industries/convenience-stores', label: 'Convenience Stores' },
    { href: '/industries/liquor-stores', label: 'Liquor Stores' },
    { href: '/industries/grocery-stores', label: 'Grocery Stores' },
    { href: '/industries/smoke-shops', label: 'Smoke Shops' },
    { href: '/industries/gas-stations', label: 'Gas Stations' },
    { href: '/industries/small-retail-businesses', label: 'Small Retail' },
  ] },
  { title: 'Company', links: [
    { href: '/about', label: 'About Us' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing & Plans' },
    { href: '/camera-compatibility', label: 'Camera Compatibility' },
    { href: '/resources', label: 'Guides' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact Us' },
  ] },
  { title: 'Legal', links: [...POLICY_LINKS, { href: '/cancellation-refund', label: 'Cancellation & Refunds' }] },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-5 lg:flex lg:items-start lg:justify-between lg:gap-10 lg:border-b lg:border-border lg:pb-10">
            <Link href="/" className="inline-block"><Image src="/logo.webp" alt={`${BUSINESS.name} home`} width={600} height={321} className="h-20 w-auto" /></Link>
            <div className="lg:max-w-xl"><p className="mt-5 text-sm leading-6 text-muted-foreground lg:mt-0">Live, human-led remote CCTV monitoring for retail businesses in the United States, delivered by a trained monitoring team in India using your existing cameras.</p>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">{BUSINESS.name} is a {BUSINESS.legalStructure.toLowerCase()} registered as a Micro Enterprise under Udyam Reg. No. {BUSINESS.udyamNumber}.</p></div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {col.links.map((l) => <li key={l.label}><Link href={l.href} className="hover:text-foreground">{l.label}</Link></li>)}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4 shrink-0 text-primary" />{BUSINESS.phone}</a></li>
              <li><a href={BUSINESS.phone2Href} className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4 shrink-0 text-primary" />{BUSINESS.phone2}</a></li>
              <li><a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground"><MessageCircle className="h-4 w-4 shrink-0 text-primary" />WhatsApp</a></li>
              <li><a href={`mailto:${BUSINESS.email}`} className="flex items-start gap-2 hover:text-foreground"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{BUSINESS.email.split('@')[0]}@<wbr />{BUSINESS.email.split('@')[1]}</span></a></li>
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
