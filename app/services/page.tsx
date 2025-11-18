import { ArrowRight } from 'lucide-react'

const services = [
  {
    name: 'Live CCTV Monitoring',
    description: 'Real-time monitoring of your CCTV feeds with immediate threat detection and response.',
    features: ['24/7 operator presence', 'Real-time alerts', 'Incident logging']
  },
  {
    name: 'Night Surveillance Monitoring',
    description: 'Specialized monitoring during night hours when security risks are often highest.',
    features: ['Night-trained operators', 'Low-light monitoring', 'Enhanced alertness']
  },
  {
    name: 'Event-Based Monitoring',
    description: 'Focused monitoring during high-risk events or specific time periods.',
    features: ['Flexible scheduling', 'Event-specific protocols', 'Enhanced focus']
  },
  {
    name: 'Retail Monitoring',
    description: 'Specialized surveillance for retail environments protecting merchandise and customers.',
    features: ['Loss prevention', 'Customer safety', 'Theft detection']
  },
  {
    name: 'Warehouse/Factory Monitoring',
    description: 'Comprehensive monitoring for large industrial and warehouse facilities.',
    features: ['Multiple camera support', 'Equipment protection', 'Access monitoring']
  },
  {
    name: 'Residential/Apartment Monitoring',
    description: 'Dedicated monitoring for apartment complexes and residential properties.',
    features: ['Common area protection', 'Tenant safety', 'Entry monitoring']
  },
  {
    name: 'Office & Commercial Monitoring',
    description: 'Professional surveillance for corporate offices and commercial spaces.',
    features: ['Asset protection', 'Employee safety', 'Access control']
  },
  {
    name: 'Daily Reports',
    description: 'Detailed daily reports of all monitoring activities and incidents.',
    features: ['Activity summaries', 'Incident documentation', 'Performance metrics']
  },
]

const addons = [
  { name: 'Real-Time Alerts', description: 'Instant notifications of suspicious activity' },
  { name: 'Monthly Security Summaries', description: 'Comprehensive monthly security analysis and recommendations' },
]

export default function Services() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-card to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive monitoring solutions tailored to your specific security needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group">
                <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-xs text-muted-foreground flex items-start space-x-2">
                      <ArrowRight size={14} className="flex-shrink-0 mt-0.5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {addons.map((addon, index) => (
              <div key={index} className="bg-background border border-border rounded-lg p-6 hover:border-accent transition-colors">
                <h3 className="font-bold text-lg mb-2">{addon.name}</h3>
                <p className="text-muted-foreground">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Services */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Works With Any CCTV System</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our monitoring service is compatible with virtually any existing CCTV system. Whether you have IP cameras, analog systems, or a hybrid setup, we can integrate and monitor your feeds professionally.
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            No expensive replacements needed. No installation required. Just reliable, professional monitoring of your existing infrastructure.
          </p>
        </div>
      </section>
    </div>
  )
}
