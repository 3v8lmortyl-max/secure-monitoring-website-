'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'glass-strong border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 border border-cyan/60 flex items-center justify-center relative">
                  <div className="absolute inset-0.5 border border-cyan/20" />
                  <span className="text-cyan font-bold text-xs tracking-widest">SM</span>
                </div>
                <div className="pulse-dot absolute -top-1 -right-1 w-2 h-2" />
              </div>
              <div>
                <div className="font-bold text-sm tracking-widest text-foreground uppercase">Secure Monitoring</div>
                <div className="text-[10px] tracking-widest text-cyan/70 uppercase">24/7 Operations</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200 relative group ${
                      active
                        ? 'text-cyan'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-cyan" />
                    )}
                    {!active && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+919392525869"
                className="hidden sm:flex items-center gap-2 text-xs tracking-wider text-cyan border border-cyan/40 px-4 py-2 hover:bg-cyan/10 transition-colors duration-200"
              >
                <Phone size={12} />
                <span>+91 93925 25869</span>
              </a>
              <button
                className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col transition-all duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-2xl font-light tracking-widest uppercase py-4 text-muted-foreground hover:text-cyan transition-colors duration-200"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col items-center gap-3">
            <a href="tel:+919392525869" className="text-sm tracking-wider text-cyan border border-cyan/40 px-6 py-3 hover:bg-cyan/10 transition-colors">
              Call: +91 93925 25869
            </a>
            <a href="https://wa.me/919392525869" target="_blank" rel="noopener noreferrer" className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors">
              WhatsApp ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
