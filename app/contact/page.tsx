'use client'

import { useState } from 'react'
import { Phone, Mail, Clock, MessageCircle, Instagram, ChevronRight, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const msg = encodeURIComponent(
      `Hi Secure Monitoring,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
    )
    window.open(`https://wa.me/919392525869?text=${msg}`, '_blank')
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setTimeout(() => {
        setFormData({ name: '', phone: '', email: '', message: '' })
        setSubmitted(false)
      }, 4000)
    }, 800)
  }

  const contactInfo = [
    { icon: Phone, label: 'Phone', values: ['+91 93925 25869', '+91 80875 57454'], href: 'tel:+919392525869' },
    { icon: MessageCircle, label: 'WhatsApp', values: ['+91 93925 25869'], href: 'https://wa.me/919392525869' },
    { icon: Mail, label: 'Email', values: ['securemonitoring24hr@gmail.com'], href: 'mailto:securemonitoring24hr@gmail.com' },
    { icon: Instagram, label: 'Instagram', values: ['@secure.monitoring'], href: 'https://instagram.com/secure.monitoring' },
    { icon: Clock, label: 'Availability', values: ['24/7 — We never close'], href: null },
  ]

  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 grid-overlay opacity-15" />
        <div className="scan-line" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Get In Touch</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 reveal delay-1">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed reveal delay-2">
            Reach out to our team. We respond quickly and can have monitoring in place within hours of your inquiry.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact info */}
            <div className="space-y-4 reveal">
              <h2 className="text-2xl font-bold mb-8">Reach Us Directly</h2>
              {contactInfo.map((c, i) => {
                const Icon = c.icon
                const Wrap = c.href ? 'a' : 'div'
                const props = c.href
                  ? { href: c.href, target: c.href.startsWith('http') ? '_blank' : undefined, rel: c.href.startsWith('http') ? 'noopener noreferrer' : undefined }
                  : {}
                return (
                  <Wrap
                    key={i}
                    {...props}
                    className={`glass p-5 flex gap-4 items-start transition-all duration-200 ${c.href ? 'hover:border-cyan/40 cursor-pointer group' : ''}`}
                  >
                    <div className="w-10 h-10 border border-cyan/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-cyan" />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest uppercase text-muted-foreground mb-1 font-mono">{c.label}</div>
                      {c.values.map((v, vi) => (
                        <div key={vi} className={`text-sm font-medium ${c.href ? 'group-hover:text-cyan transition-colors' : ''}`}>{v}</div>
                      ))}
                    </div>
                    {c.href && <ChevronRight size={14} className="ml-auto text-muted-foreground group-hover:text-cyan transition-colors flex-shrink-0 mt-1" />}
                  </Wrap>
                )
              })}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 reveal delay-2">
              <div className="glass p-8 md:p-10">
                <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                <p className="text-sm text-muted-foreground mb-8">Submitting this form opens WhatsApp with your message pre-filled — quick and direct.</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border border-cyan/50 flex items-center justify-center mx-auto mb-6">
                      <Send size={24} className="text-cyan" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We've received your enquiry and will respond shortly via WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-mono">Your Name</label>
                      <input
                        type="text" name="name" value={formData.name} onChange={handleChange} required
                        placeholder="John Smith"
                        className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/60 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-mono">Phone Number</label>
                        <input
                          type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                          placeholder="+91 XXXXXXXXXX"
                          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-mono">Email Address</label>
                        <input
                          type="email" name="email" value={formData.email} onChange={handleChange} required
                          placeholder="your@email.com"
                          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-mono">Message</label>
                      <textarea
                        name="message" value={formData.message} onChange={handleChange} required rows={5}
                        placeholder="Tell us about your security needs — camera count, facility type, monitoring hours required..."
                        className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/60 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-glow w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 text-sm font-semibold tracking-widest uppercase disabled:opacity-60"
                    >
                      {sending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>Send Message via WhatsApp <MessageCircle size={16} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
