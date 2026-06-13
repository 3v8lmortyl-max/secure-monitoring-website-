import Link from 'next/link'
import { ChevronRight, Eye, Moon, Calendar, ShoppingBag, Factory, Building, FileText, Bell, BarChart } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive CCTV monitoring services: live surveillance, night monitoring, retail, warehouse, office, event-based monitoring and daily reports.',
}

const services = [
  { icon: Eye, name: 'Live CCTV Monitoring', description: 'Real-time monitoring of your CCTV feeds with immediate threat detection and response.', features: ['24/7 operator presence', 'Real-time alerts', 'Incident logging'] },
  { icon: Moon, name: 'Night Surveillance Monitoring', description: 'Specialized monitoring during night hours when security risks are often highest.', features: ['Night-trained operators', 'Low-light monitoring', 'Enhanced alertness'] },
  { icon: Calendar, name: 'Event-Based Monitoring', description: 'Focused monitoring during high-risk events or specific time periods.', features: ['Flexible scheduling', 'Event-specific protocols', 'Enhanced focus'] },
  { icon: ShoppingBag, name: 'Retail Monitoring', description: 'Specialized surveillance for retail environments protecting merchandise and customers.', features: ['Loss prevention', 'Customer safety', 'Theft detection'] },
  { icon: Factory, name: 'Warehouse/Factory Monitoring', description: 'Comprehensive monitoring for large industrial and warehouse facilities.', features: ['Multiple camera support', 'Equipment protection', 'Access monitoring'] },
  { icon: Building, name: 'Residential/Apartment Monitoring', description: 'Dedicated monitoring for apartment complexes and residential properties.', features: ['Common area protection', 'Tenant safety', 'Entry monitoring'] },
  { icon: Building, name: 'Office & Commercial Monitoring', description: 'Professional surveillance for corporate offices and commercial spaces.', features: ['Asset protection', 'Employee safety', 'Access control'] },
  { icon: FileText, name: 'Daily Reports', description: 'Detailed daily reports of all monitoring activities and incidents.', features: ['Activity summaries', 'Incident documentation', 'Performance metrics'] },
]

const addons = [
  { icon: Bell, name: 'Real-Time Alerts', description: 'Instant notifications of suspicious activity sent directly to your phone.' },
  { icon: BarChart, name: 'Monthly Security Summaries', description: 'Comprehensive monthly security analysis and actionable recommendations.' },
]

export default function Services() {
  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 grid-overlay opacity-15" />
        <div className="scan-line" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">What We Do</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 reveal delay-1">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed reveal delay-2">
            Comprehensive monitoring solutions tailored to your specific security needs — from single-site retail to multi-facility industrial operations.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Core Services</div>
          <h2 className="text-4xl font-bold mb-12 reveal delay-1">What We Monitor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  className={`glass p-6 bracket hover:border-cyan/40 transition-all duration-300 group reveal delay-${(i % 4) + 1}`}
                >
                  <div className="w-10 h-10 border border-cyan/30 flex items-center justify-center mb-5 group-hover:border-cyan/60 transition-colors">
                    <Icon size={18} className="text-cyan" />
                  </div>
                  <h3 className="font-bold text-sm mb-3 group-hover:text-cyan transition-colors">{s.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{s.description}</p>
                  <ul className="space-y-2">
                    {s.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <ChevronRight size={12} className="flex-shrink-0 mt-0.5 text-cyan" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-card/40 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Additional</div>
          <h2 className="text-4xl font-bold mb-12 reveal delay-1">Add-On Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            {addons.map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className={`glass p-6 hover:border-cyan/40 transition-all group reveal delay-${i + 2}`}>
                  <div className="w-10 h-10 border border-cyan/30 flex items-center justify-center mb-4 group-hover:border-cyan/60 transition-colors">
                    <Icon size={18} className="text-cyan" />
                  </div>
                  <h3 className="font-bold mb-2">{a.name}</h3>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Compatibility */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Compatibility</div>
          <h2 className="text-4xl font-bold mb-8 reveal delay-1">Works With Any CCTV System</h2>
          <div className="glass p-10 reveal delay-2">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our monitoring service is compatible with virtually any existing CCTV system. Whether you have IP cameras, analog systems, or a hybrid setup, we can integrate and monitor your feeds professionally.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              No expensive replacements needed. No installation required. Just reliable, professional monitoring of your existing infrastructure.
            </p>
            <Link href="/contact" className="btn-glow inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase">
              Get Started <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
