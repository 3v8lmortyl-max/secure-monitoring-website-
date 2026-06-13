import Link from 'next/link'
import Image from 'next/image'
import { Shield, Clock, Users, AlertCircle, Eye, Zap, BarChart3, ChevronRight, Phone } from 'lucide-react'
import { Testimonials } from '@/components/testimonials'
import { StatsCounter } from '@/components/stats-counter'

export const metadata = {
  title: 'Secure Monitoring — 24/7 Professional CCTV Monitoring',
  description: 'Human-based surveillance monitoring with no AI, no automation. Real operators watching your cameras around the clock.',
}

const benefits = [
  { icon: Eye, title: 'Real-Time Threat Detection', desc: 'Trained operators identify threats the moment they appear — no delay, no missed alerts.' },
  { icon: AlertCircle, title: 'Incident Escalation', desc: 'Structured escalation process ensures the right people respond to every situation, fast.' },
  { icon: Users, title: 'Dedicated Operators', desc: 'Professional human operators following strict SOPs — no algorithms, no guesswork.' },
  { icon: Shield, title: 'Night Surveillance', desc: 'Complete 24/7 coverage including overnight monitoring when threats are highest.' },
]

const workflowSteps = [
  { num: '01', title: 'Connect Your Cameras', desc: 'We integrate with any existing CCTV system — IP cameras, analog, or hybrid setups.' },
  { num: '02', title: 'Operators Go Live', desc: 'Our trained professionals begin monitoring your feeds around the clock, immediately.' },
  { num: '03', title: 'Threat Detected', desc: 'Operators identify suspicious activity using trained human judgment — not automated rules.' },
  { num: '04', title: 'Instant Escalation', desc: 'Your designated contacts are notified immediately with documented incident reports.' },
]

const services = [
  { title: 'Live CCTV Monitoring', desc: 'Real-time 24/7 operator surveillance of all your camera feeds.' },
  { title: 'Night Surveillance', desc: 'Specialized monitoring during overnight hours with heightened alertness.' },
  { title: 'Retail Monitoring', desc: 'Loss prevention and customer safety for retail environments.' },
  { title: 'Warehouse & Factory', desc: 'Comprehensive coverage for large industrial facilities.' },
  { title: 'Office & Commercial', desc: 'Asset protection and employee safety for corporate spaces.' },
  { title: 'Daily Reports', desc: 'Detailed incident logs and monitoring summaries delivered daily.' },
]

export default function Home() {
  return (
    <div className="w-full overflow-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          poster="/professional-control-room-with-operators-monitorin.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="scan-line" />

        {/* Corner decorations */}
        <div className="absolute top-6 right-6 text-[10px] tracking-widest text-cyan/40 font-mono hidden lg:flex flex-col items-end gap-1">
          <span>SYS.STATUS: ACTIVE</span>
          <span>FEEDS: LIVE</span>
          <span>OPS: 24/7</span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="flex items-center gap-3 mb-8 reveal">
              <div className="pulse-dot" />
              <span className="text-xs tracking-widest uppercase text-cyan font-mono">
                Live Operations — 24/7 Active
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 reveal delay-1">
              Professional
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">
                CCTV Monitoring
              </span>
              You Can Depend On
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 reveal delay-2">
              Human-based surveillance with no AI, no automation. Dedicated professionals watching your cameras, protecting your assets, around the clock.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 reveal delay-3">
              <Link
                href="/contact"
                className="btn-glow inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
              >
                Start Monitoring Now
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:border-cyan/50 hover:text-cyan transition-all duration-300"
              >
                Our Services
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-12 reveal delay-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield size={14} className="text-cyan" />
                <span>No AI — 100% Human</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={14} className="text-cyan" />
                <span>24/7/365 Coverage</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap size={14} className="text-cyan" />
                <span>Instant Escalation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan/50" />
        </div>
      </section>

      {/* ═══ LIVE TICKER ═══ */}
      <div className="bg-primary/10 border-y border-primary/20 py-3 overflow-hidden">
        <div className="ticker-inner flex gap-16 text-xs tracking-widest uppercase text-cyan font-mono">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-16 flex-shrink-0">
              <span>● Live CCTV Monitoring</span>
              <span>● 24/7 Human Operators</span>
              <span>● Zero AI Involvement</span>
              <span>● Instant Incident Escalation</span>
              <span>● Works With Any CCTV System</span>
              <span>● Retail · Warehouse · Office</span>
              <span>● Night Surveillance</span>
              <span>● Daily Reports</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* ═══ WHY HUMAN MONITORING ═══ */}
      <section className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Core Advantages</div>
            <h2 className="text-4xl md:text-5xl font-bold reveal delay-1">
              Why Choose Human Monitoring?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 reveal delay-2">
              Our experienced operators provide intelligent, real-time monitoring that automated systems simply cannot replicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div
                  key={i}
                  className={`glass p-6 relative bracket hover:border-cyan/40 transition-all duration-300 group reveal delay-${i + 1}`}
                >
                  <div className="w-12 h-12 border border-cyan/30 flex items-center justify-center mb-5 group-hover:border-cyan/60 transition-colors">
                    <Icon size={22} className="text-cyan" />
                  </div>
                  <h3 className="font-bold text-base mb-3 group-hover:text-cyan transition-colors">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO — OPERATIONS ═══ */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[60vh] md:h-[70vh]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/24-7-security-monitoring-control-room.jpg"
          >
            <source src="/operations-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 grid-overlay opacity-10" />
          <div className="scan-line" style={{ animationDelay: '2s' }} />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg reveal">
                <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4">Control Room Operations</div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Your Security.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">
                    Our Priority.
                  </span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Our operations center runs 24 hours a day, 7 days a week. Professional operators monitor your feeds with precision and respond to incidents without hesitation.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm text-cyan border border-cyan/40 px-6 py-3 hover:bg-cyan/10 transition-colors tracking-wider">
                  Learn More About Us <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Process</div>
            <h2 className="text-4xl md:text-5xl font-bold reveal delay-1">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto reveal delay-2">
              Getting started is simple. We integrate with your existing infrastructure and begin monitoring immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, i) => (
              <div key={i} className={`relative reveal delay-${i + 1}`}>
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px border-t border-dashed border-border z-0" />
                )}
                <div className="glass p-6 relative z-10 h-full">
                  <div className="text-4xl font-bold font-mono stat-number mb-4">{step.num}</div>
                  <h3 className="font-bold text-base mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW ═══ */}
      <section className="py-24 bg-card/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            poster="/professional-security-operations-center-with-train.jpg"
          >
            <source src="/services-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Services</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal delay-1">
                Monitoring For Every Environment
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed reveal delay-2">
                From retail shops to industrial warehouses, our operators are trained to monitor every type of environment with equal precision and professionalism.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {services.map((s, i) => (
                  <div key={i} className={`flex gap-3 items-start reveal delay-${(i % 3) + 2}`}>
                    <div className="w-5 h-5 border border-cyan/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-cyan rounded-full" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-1">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/services"
                className="btn-glow inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-widest uppercase reveal delay-4"
              >
                View All Services <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MISSION ═══ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-widest uppercase text-cyan font-mono mb-4 reveal">Our Mission</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 reveal delay-1">
                Security Is Not Just Technology
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed reveal delay-2">
                <p>
                  At Secure Monitoring, our mission is to provide unwavering protection to businesses and communities by delivering exceptional, human-centered surveillance monitoring that sets the industry standard for reliability and responsiveness.
                </p>
                <p>
                  We believe that security is not just about technology — it's about trust, dedication, and the human expertise that turns cameras into comprehensive protection. Our trained operators are committed to being your vigilant partners.
                </p>
                <p>
                  We empower businesses to operate with confidence, knowing that round-the-clock professional monitoring stands between them and uncertainty. Your peace of mind is our priority, and your security is our purpose.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 reveal-right delay-2">
              {[
                { icon: Shield, label: 'Vigilance', desc: 'Constant, unwavering attention to detail across all feeds.' },
                { icon: Clock, label: 'Reliability', desc: '24/7 dependable service — we never sleep, never miss a feed.' },
                { icon: BarChart3, label: 'Excellence', desc: 'Professional operators trained to the highest industry standards.' },
              ].map((v, i) => {
                const Icon = v.icon
                return (
                  <div key={i} className="glass p-5 flex gap-4 items-start hover:border-cyan/30 transition-colors">
                    <div className="w-10 h-10 border border-cyan/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-cyan" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{v.label}</div>
                      <div className="text-sm text-muted-foreground">{v.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <Testimonials />

      {/* ═══ CTA ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10" />
        <div className="absolute inset-0 grid-overlay opacity-15" />
        <div className="scan-line" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="pulse-dot mx-auto mb-6 reveal" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal delay-1">
            Ready to Protect Your Assets?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto reveal delay-2">
            Join businesses trusting Secure Monitoring for their 24/7 surveillance needs. Get started today — setup is simple and monitoring begins immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal delay-3">
            <Link
              href="/contact"
              className="btn-glow inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-sm font-semibold tracking-widest uppercase"
            >
              Get Started Now <ChevronRight size={16} />
            </Link>
            <a
              href="tel:+919392525869"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:border-cyan/50 hover:text-cyan transition-all duration-300"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
