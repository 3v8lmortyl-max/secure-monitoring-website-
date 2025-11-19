import { Shield, Zap, Users, BarChart3, Lock, TrendingUp } from 'lucide-react'

const reasons = [
  {
    icon: Users,
    title: '24/7 Human Monitoring',
    description: 'Dedicated professional operators watching your cameras around the clock with real human judgment.'
  },
  {
    icon: Shield,
    title: 'Zero AI, Zero Automation',
    description: 'No automated systems. No machine learning. Just experienced professionals making intelligent decisions.'
  },
  {
    icon: Zap,
    title: 'Fast Response Time',
    description: 'When threats are detected, our operators act immediately with our proven escalation process.'
  },
  {
    icon: BarChart3,
    title: 'Works With Any System',
    description: 'Compatible with existing CCTV infrastructure. No expensive replacements or complex installations needed.'
  },
  {
    icon: TrendingUp,
    title: 'Cost-Effective Alternative',
    description: 'Significantly more affordable than hiring physical security guards while providing comprehensive coverage.'
  },
  {
    icon: Lock,
    title: 'Controlled Escalation',
    description: 'Structured incident response process ensures appropriate action for every situation.'
  },
]

export default function WhyUs() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-card to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Secure Monitoring?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Six compelling reasons why we're the right choice for your security needs.
          </p>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div key={index} className="bg-card border border-border rounded-lg p-8 hover:border-accent hover:shadow-lg transition-all">
                  <Icon className="w-12 h-12 text-primary mb-6" />
                  <h3 className="font-bold text-xl mb-4">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Secure Monitoring Difference</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold">Secure Monitoring</th>
                  <th className="text-center py-4 px-4 font-semibold">Physical Guard</th>
                  <th className="text-center py-4 px-4 font-semibold">AI Systems</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-4">24/7 Coverage</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">Limited</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4">Human Judgment</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">✗</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4">Multi-Camera Monitoring</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">Limited</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4">Cost-Effective</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">✗</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4">Context Understanding</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">Limited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Reliability & Consistency</td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">✓</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">Limited</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">Inconsistent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
