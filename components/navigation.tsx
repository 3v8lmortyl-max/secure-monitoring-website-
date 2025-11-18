'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Why Us', href: '/why-us' },
    { label: 'Contact', href: '/contact' },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Scroll to top when navigating to other pages
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SM</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg">Secure Monitoring</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden sm:inline bg-primary hover:bg-accent text-primary-foreground px-6 py-2 rounded-md font-medium transition-colors"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => handleNavClick('/contact')}
              className="block bg-primary hover:bg-accent text-primary-foreground px-3 py-2 rounded-md font-medium transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
