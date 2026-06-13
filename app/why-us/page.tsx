import { Shield, Zap, Users, BarChart3, Lock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Choose Us',
  description: 'Six compelling reasons why Secure Monitoring is the right choice: 24/7 human monitoring, zero AI, fast response times, and more.',
}

const reasons = [
  { icon: Users, title: '24/7 Human Monitoring', description: 'Dedicated professional operators watching your cameras around the clock with real human judgment and contextual understanding.' },
  { icon: Shield, title: 'Zero AI, Zero Automation', description: 'No automated systems. No machine learning. Just experienced professionals making intelligent decisions based on what they actually see.' },
  { icon: Zap, title: 'Fast Response Time', description: 'When threats are detected, our operators act immediately. Our proven escalation process ensures the right people are notified without delay.' },
  { icon: BarChart3, title: 'Works With Any System', description: 'Compatible with existing CCTV infrastructure — IP, analog, or hybrid. No expensive replacements or complex installations needed.' },
  { icon: TrendingUp, title: 'Cost-Effective Alternative', description: 'Significantly more affordable than hiring physical security guards while providing comprehensive, multi-camera coverage.' },
  { icon: Lock, title: 'Controlled Escalation', description: 'Structured incident response process ensures appropriate action for every situation — from minor alerts to emergency escalation.' },
]

const comparison = [
  { feature: '24/7 Coverage', sm: true, guard: 'Limited', ai: true },
  { feature: 'Human Judgment', sm: true, guard: true, ai: false },
  { feature: 'Multi-Camera Monitoring', sm: true, guard: 'Limited', ai: true },
  { feature: 'Cost-Effective', sm: true, guard: false, ai: true },
  { feature: 'Context Understanding', sm: true, guard: true, ai: 'Limited' },
  { feature: 'Reliability & Consistency', sm: true, guard: 'Limited', ai: 'Inconsistent' },
]

function Cell({ val }: { val: boolean | string }) {
  if (val === true) return <span className="text-cyan font-semibold">✓</span>
  if (val === false) return <span className="text-destructive/70">✗</span>
  return <span className="text-muted-foreground text-sm">{val}</span>
}

export default function WhyUs() {
  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 grid-overlay opacity-15" />
        <div className="scan-line" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">The Difference</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 reveal delay-1">Why Choose Secure Monitoring?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed reveal delay-2">
            Six compelling reasons why businesses choose us over automated systems and physical guards.
          </p>
        </div>
      </section>

      {/* Reasons */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => {
              const Icon = r.icon
              return (
                <div key={i} className={`glass p-8 bracket hover:border-cyan/40 transition-all duration-300 group reveal delay-${(i % 3) + 1}`}>
                  <div className="w-12 h-12 border border-cyan/30 flex items-center justify-center mb-6 group-hover:border-cyan/60 transition-colors">
                    <Icon size={22} className="text-cyan" />
                  </div>
                  <h3 className="font-bold text-lg mb-4 group-hover:text-cyan transition-colors">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-card/40 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Comparison</div>
            <h2 className="text-4xl font-bold reveal delay-1">The Secure Monitoring Difference</h2>
          </div>
          <div className="overflow-x-auto reveal delay-2">
            <div className="glass">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-5 px-6 font-semibold text-xs tracking-widest uppercase text-muted-foreground">Feature</th>
                    <th className="text-center py-5 px-6 font-semibold text-xs tracking-widest uppercase text-cyan">Secure Monitoring</th>
                    <th className="text-center py-5 px-6 font-semibold text-xs tracking-widest uppercase text-muted-foreground">Physical Guard</th>
                    <th className="text-center py-5 px-6 font-semibold text-xs tracking-widest uppercase text-muted-foreground">AI Systems</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="text-center py-4 px-6"><Cell val={row.sm} /></td>
                      <td className="text-center py-4 px-6"><Cell val={row.guard} /></td>
                      <td className="text-center py-4 px-6"><Cell val={row.ai} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 reveal">Ready to Make the Switch?</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto reveal delay-1">
            Join businesses that have already made the upgrade to professional human monitoring. Setup is fast, integration is simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal delay-2">
            <Link href="/contact" className="btn-glow inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase">
              Contact Us Today <ChevronRight size={14} />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:border-cyan/50 hover:text-cyan transition-all">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
