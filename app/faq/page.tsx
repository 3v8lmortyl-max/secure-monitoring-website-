import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CtaBand, FaqList } from '@/components/content-blocks'
import { pageMetadata } from '@/lib/seo'
import { faqSchema, webPageSchema } from '@/lib/schema'
import type { FAQ } from '@/lib/content-types'

const title = 'Remote CCTV Monitoring FAQ'
const description = 'Answers about Secure Monitoring: what remote CCTV monitoring is, pricing, the free trial, camera compatibility, alerts, privacy and our India-based team.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/faq' })

const groups: { heading: string; faqs: FAQ[] }[] = [
  {
    heading: 'About Secure Monitoring',
    faqs: [
      { q: 'What is Secure Monitoring?', a: 'Secure Monitoring is an India-based sole proprietorship (Udyam/MSME registered) that provides live, human-led remote CCTV monitoring to retail businesses in the United States, using the customer’s existing cameras.' },
      { q: 'Where is your monitoring team located?', a: 'In India. We serve US clients remotely and do not have US offices or US-based staff.' },
      { q: 'What types of businesses do you serve?', a: 'Retail businesses such as convenience stores, liquor stores, grocery stores, smoke shops, gas station stores and other independent or multi-location retailers.' },
      { q: 'What do you not do?', a: 'We do not sell or install cameras, provide guards or patrols, monitor audio, use AI analytics, or act as an emergency service.' },
    ],
  },
  {
    heading: 'Pricing and trial',
    faqs: [
      { q: 'How much does it cost?', a: 'Basic is $199 per site per month and Professional is $299 per site per month, both for 24/7 monitoring. Enterprise starts from $699 per month. Prices are tailored to the number of cameras and the monitoring hours you need.' },
      { q: 'Is there a free trial?', a: 'Yes. New customers get a 7-day free trial with no card required, limited to one per business.' },
      { q: 'Are there setup fees or contracts?', a: 'No setup fees, because we use your existing cameras. Plans are month to month and can be cancelled with 3 business days’ notice before the next billing date.' },
      { q: 'How do I pay?', a: 'In US Dollars by international credit or debit card through a secure payment link, billed monthly in advance per site.' },
    ],
  },
  {
    heading: 'Cameras and setup',
    faqs: [
      { q: 'Do I need new cameras?', a: 'No. Most systems that support secure remote viewing can be monitored. We confirm compatibility during the consultation and trial.' },
      { q: 'How do you access my cameras?', a: 'You create a separate view-only user for us on your recorder or camera app. You can revoke it at any time.' },
      { q: 'How long does setup take?', a: 'Once remote access is ready and we have agreed on your monitoring plan, monitoring can usually begin as part of your free trial.' },
    ],
  },
  {
    heading: 'Monitoring and alerts',
    faqs: [
      { q: 'Is monitoring done by people or software?', a: 'By people. Trained operators watch live feeds and every alert is checked by a person before it is sent.' },
      { q: 'How will my staff be alerted?', a: 'By phone call or WhatsApp to your designated contacts, following the escalation order you choose.' },
      { q: 'What is the 30-second response target?', a: 'It is our target to begin our response, such as calling your designated contact, once an actionable incident is identified. It is not a guarantee of incident resolution or police attendance.' },
      { q: 'Do you contact the police?', a: 'On the Professional plan, where you have authorized it in the agreed procedure. Police response is not guaranteed, and staff should call 911 directly in an emergency.' },
    ],
  },
  {
    heading: 'Privacy and data',
    faqs: [
      { q: 'Do you record my footage?', a: 'No. Recordings stay on your own system. We keep incident logs and reports, not copies of your video.' },
      { q: 'Do you listen to audio?', a: 'No. We monitor video only, and customers must disable audio on shared feeds.' },
      { q: 'What happens when I cancel?', a: 'Monitoring stops, we delete your access credentials, and you should also remove the user account you created for us.' },
    ],
  },
]

export default function FaqPage() {
  const all = groups.flatMap((g) => g.faqs)
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, path: '/faq' }), faqSchema(all)]} />
      <PageHero eyebrow="FAQ" title="Remote CCTV monitoring: frequently asked questions" breadcrumbs={[{ name: 'FAQ', path: '/faq' }]}>
        <p>Straight answers about what Secure Monitoring does, what it costs, how it works with your existing cameras and how we handle your data.</p>
      </PageHero>
      <div className="mx-auto max-w-4xl space-y-14 px-4 py-14 sm:px-6 lg:px-8">
        {groups.map((g) => <FaqList key={g.heading} heading={g.heading} faqs={g.faqs} />)}
      </div>
      <CtaBand />
    </>
  )
}
