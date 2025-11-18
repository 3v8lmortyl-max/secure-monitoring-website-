import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Secure Monitoring</h3>
            <p className="text-muted-foreground text-sm">
              Professional 24/7 human-based CCTV monitoring for complete peace of mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link></li>
              <li><Link href="/why-us" className="text-muted-foreground hover:text-foreground transition-colors">Why Choose Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Live CCTV Monitoring</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Night Surveillance</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Event-Based Monitoring</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Daily Reports</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919392525869" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone size={18} />
                <span className="text-sm">+91 9392525869</span>
              </a>
              <a href="tel:+918087557454" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone size={18} />
                <span className="text-sm">+91 8087557454</span>
              </a>
              <a href="mailto:securemonitoring24hr@gmail.com" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={18} />
                <span className="text-sm">securemonitoring24hr@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 Secure Monitoring. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
