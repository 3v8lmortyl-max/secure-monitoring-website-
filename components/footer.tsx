import Link from 'next/link'
import { Mail, MessageCircle, Phone, Shield } from 'lucide-react'

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
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
              <li><Link href="/cancellation-refund" className="hover:text-foreground">Cancellation & Refunds</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Talk to our team</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:+919392525869" className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4 text-primary" /> +91 9392525869</a>
              <a href="https://wa.me/919392525869" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground"><MessageCircle className="h-4 w-4 text-primary" /> WhatsApp</a>
              <a href="mailto:securemonitoring24hr@gmail.com" className="flex items-center gap-2 hover:text-foreground"><Mail className="h-4 w-4 text-primary" /> Email us</a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">© {new Date().getFullYear()} Secure Monitoring. All rights reserved.</div>
      </div>
    </footer>
  )
}