import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CheckList, CtaBand, DataTable, FaqList } from '@/components/content-blocks'
import { pageMetadata } from '@/lib/seo'
import { faqSchema, webPageSchema } from '@/lib/schema'

const title = 'CCTV Monitoring With Your Existing Cameras'
const description = 'Remote CCTV monitoring without installing new cameras. See what your existing NVR, DVR or cloud camera system needs to be monitored remotely by Secure Monitoring.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/camera-compatibility' })

const faqs = [
  { q: 'Do I need to buy new cameras?', a: 'No. We monitor the system you already have, as long as it supports secure remote viewing. We do not sell or install cameras.' },
  { q: 'Which camera brands do you support?', a: 'We do not publish a brand list because compatibility depends on the specific system and how it is set up. Most current systems with a manufacturer app, web portal or NVR/DVR remote access can be monitored. We confirm compatibility for your system during the consultation and free trial.' },
  { q: 'Will monitoring slow down my internet?', a: 'Remote viewing uses upload bandwidth at the store. Most systems let you view a lower-resolution sub-stream for live monitoring, which reduces the load. We help you choose sensible settings during setup.' },
  { q: 'Can you change my camera settings?', a: 'We ask for view-only access. Settings stay under your control, and we will tell you if a change, such as camera angle or night-mode settings, would improve coverage.' },
  { q: 'What if my system is old?', a: 'Older analog systems connected to a DVR with remote access can often be monitored. If your system has no remote access at all, we will tell you during the consultation rather than sell you anything.' },
]

export default function CameraCompatibilityPage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, path: '/camera-compatibility' }), faqSchema(faqs)]} />
      <PageHero eyebrow="Camera compatibility" title="CCTV monitoring without installing new cameras" breadcrumbs={[{ name: 'Camera Compatibility', path: '/camera-compatibility' }]}>
        <p>Secure Monitoring works with the cameras you already have. If your CCTV system supports secure remote viewing through an app, web portal or NVR/DVR remote access, it can usually be monitored, with no new hardware and no setup fees. We confirm compatibility for free before you pay.</p>
      </PageHero>
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-14 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Common system types</h2>
          <DataTable rows={[
            ['System type', 'Typical remote access', 'Usually monitorable?'],
            ['IP cameras with an NVR', 'Manufacturer app, web portal or NVR remote access', 'Yes, in most cases'],
            ['Analog/HD-analog cameras with a DVR', 'DVR remote access or app', 'Often, if the DVR supports remote viewing'],
            ['Cloud-managed camera systems', 'Web dashboard with user accounts', 'Usually, via a view-only user'],
            ['Standalone Wi-Fi consumer cameras', 'Phone app per camera', 'Sometimes; depends on multi-camera viewing support'],
            ['Record-only systems with no network access', 'None', 'No. Remote access must be enabled first.'],
          ]} />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">This table is general guidance. We confirm what works for your specific system during the consultation and free trial.</p>
        </section>
        <div className="grid gap-6 md:grid-cols-2">
          <CheckList title="Minimum requirements" items={['Remote viewing enabled (app, portal or NVR/DVR access)', 'A separate view-only user account for our team', 'A stable internet connection with enough upload bandwidth', 'Correct date and time on the recorder', 'Audio disabled on shared feeds']} />
          <CheckList title="For the best coverage" tone="note" items={['Cameras on every entrance and exit', 'A clear view of each register and cash drawer', 'Coverage of high-value aisles and the stockroom door', 'Working night vision or adequate lighting', 'Signage and employee notices in line with your state’s rules']} />
        </div>
        <FaqList faqs={faqs} heading="Camera compatibility questions" />
      </div>
      <CtaBand title="Check your cameras for free" text="Tell us about your system and we will confirm compatibility during a free consultation and 7-day trial." />
    </>
  )
}
