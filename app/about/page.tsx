import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronRight, Shield, Clock, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Secure Monitoring — a dedicated remote surveillance operations company providing professional, human-based CCTV monitoring services 24/7.',
}

const highlights = [
  'Dedicated 24/7 control room operations',
  'Professionally trained security operators',
  'Strict Standard Operating Procedures (SOPs)',
  'Privacy-compliant monitoring',
  'Industry-leading response times',
  'Zero automation or AI involvement',
]

const ops = [
  { value: '24/7', label: 'Round-The-Clock Operations', desc: 'Our control room never sleeps. Professional operators monitor feeds at all hours, including overnight surveillance.' },
  { value: '100%', label: 'Human-Powered', desc: 'No AI, no automation, no machine learning. Just trained professionals making intelligent decisions in real-time.' },
  { value: '∞', label: 'Reliability', desc: 'Consistent, dependable service backed by strict SOPs and dedicated staff committed to your security.' },
]

export default function About() {
  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 grid-overlay opacity-15" />
        <div className="scan-line" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Who We Are</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 reveal delay-1">About Secure Monitoring</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed reveal delay-2">
            A dedicated remote surveillance operations company providing professional, human-based CCTV monitoring services — where real people protect your real assets.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Mission</div>
              <h2 className="text-4xl font-bold mb-6 reveal delay-1">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed reveal delay-2">
                <p>Secure Monitoring exists to provide reliable, professional CCTV monitoring services that property owners can depend on. We believe in the irreplaceable value of human judgment and expertise in security operations.</p>
                <p>With our team of trained professionals working around the clock, we ensure your property is protected by real people who care about your security — not algorithms that miss context and nuance.</p>
              </div>
              <div className="mt-8 reveal delay-3">
                <Link href="/contact" className="btn-glow inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase">
                  Get In Touch <ChevronRight size={14} />
                </Link>
              </div>
            </div>
            <div className="reveal-right delay-2">
              <div className="relative">
                <div className="absolute -inset-4 border border-cyan/10" />
                <Image
                  src="/professional-security-operations-center-with-train.jpg"
                  alt="Professional security operations center"
                  width={600}
                  height={450}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 glass px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="pulse-dot w-2 h-2" />
                    <span className="text-xs font-mono tracking-wider text-cyan">Live Operations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Human Monitoring */}
      <section className="py-24 bg-card/40 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 reveal-left delay-2">
              <div className="relative">
                <div className="absolute -inset-4 border border-cyan/10" />
                <Image
                  src="/24-7-security-monitoring-control-room.jpg"
                  alt="24/7 control room"
                  width={600}
                  height={450}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Why It Matters</div>
              <h2 className="text-4xl font-bold mb-8 reveal delay-1">Why Human Monitoring Matters</h2>
              <ul className="space-y-4 reveal delay-2">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 border border-cyan/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-cyan rounded-full" />
                    </div>
                    <span className="text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Stats */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Operations</div>
          <h2 className="text-4xl font-bold mb-14 reveal delay-1">Our Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ops.map((o, i) => (
              <div key={i} className={`glass p-8 hover:border-cyan/30 transition-all duration-300 reveal delay-${i + 2}`}>
                <div className="text-5xl font-bold font-mono stat-number mb-4">{o.value}</div>
                <h3 className="font-bold text-lg mb-4">{o.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 reveal">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 reveal delay-1">Contact our team today and have monitoring in place within hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal delay-2">
            <Link href="/contact" className="btn-glow inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase">
              Contact Us <ChevronRight size={14} />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:border-cyan/50 hover:text-cyan transition-all">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
