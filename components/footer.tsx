import Link from 'next/link'
import { Mail, Phone, Instagram, MessageCircle, Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 border border-cyan/60 flex items-center justify-center relative">
                <span className="text-cyan font-bold text-xs tracking-widest">SM</span>
              </div>
              <div>
                <div className="font-bold text-xs tracking-widest uppercase">Secure Monitoring</div>
                <div className="text-[10px] tracking-widest text-cyan/60 uppercase">24/7 Operations</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Professional 24/7 human-based CCTV monitoring. Real operators. No AI. Your security is our purpose.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan font-mono">
              <div className="pulse-dot w-2 h-2" />
              <span>Systems Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs tracking-widest uppercase text-muted-foreground mb-5 font-mono">Quick Links</div>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/why-us', label: 'Why Choose Us' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-cyan transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs tracking-widest uppercase text-muted-foreground mb-5 font-mono">Services</div>
            <ul className="space-y-3 text-sm">
              {[
                'Live CCTV Monitoring',
                'Night Surveillance',
                'Retail Monitoring',
                'Warehouse & Factory',
                'Event-Based Monitoring',
                'Daily Reports',
              ].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-muted-foreground hover:text-cyan transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs tracking-widest uppercase text-muted-foreground mb-5 font-mono">Contact</div>
            <div className="space-y-4">
              <a href="tel:+919392525869" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan transition-colors">
                <Phone size={15} className="flex-shrink-0 text-cyan/60" />
                +91 93925 25869
              </a>
              <a href="tel:+918087557454" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan transition-colors">
                <Phone size={15} className="flex-shrink-0 text-cyan/60" />
                +91 80875 57454
              </a>
              <a href="https://wa.me/919392525869" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan transition-colors">
                <MessageCircle size={15} className="flex-shrink-0 text-cyan/60" />
                WhatsApp
              </a>
              <a href="https://instagram.com/secure.monitoring" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan transition-colors">
                <Instagram size={15} className="flex-shrink-0 text-cyan/60" />
                @secure.monitoring
              </a>
              <a href="mailto:securemonitoring24hr@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-cyan transition-colors">
                <Mail size={15} className="flex-shrink-0 text-cyan/60" />
                securemonitoring24hr@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Secure Monitoring. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield size={12} className="text-cyan/60" />
            <span>Professional Security Operations</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
