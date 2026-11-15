import Link from 'next/link'
import { Mail, MessageCircle, Phone, Shield } from 'lucide-react'
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE, POLICY_LINKS } from '@/lib/business'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 font-bold tracking-wide"><Shield className="h-5 w-5 text-primary" /> SECURE MONITORING</div>
            <p className="text-sm leading-6 text-muted-foreground">Human-led managed security operations for teams that need a clear response path when incidents occur.</p>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Explore</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/solutions" className="hover:text-foreground">Solutions</Link></li>
              <li><Link href="/operations" className="hover:text-foreground">Operations</Link></li>
              <li><Link href="/professional-services" className="hover:text-foreground">Professional Services</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Company</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Book a Consultation</Link></li>
              {POLICY_LINKS.map((p) => <li key={p.href}><Link href={p.href} className="hover:text-foreground">{p.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Talk to our team</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4 text-primary" /> {BUSINESS.phone}</a>
              <a href={BUSINESS.phone2Href} className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4 text-primary" /> {BUSINESS.phone2}</a>
              <a href="https://wa.me/919392525869" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground"><MessageCircle className="h-4 w-4 text-primary" /> WhatsApp</a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 break-all hover:text-foreground"><Mail className="h-4 w-4 shrink-0 text-primary" /> {BUSINESS.email}</a>
            </div>
          </div>
        </div>
        <div className="mt-10 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>{BUSINESS.name} · {BUSINESS.legalStructure} (Proprietor: {BUSINESS.proprietor}) · Udyam Reg. No. {BUSINESS.udyamNumber}</p>
          <p>{BUSINESS_ADDRESS_ONE_LINE}</p>
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}