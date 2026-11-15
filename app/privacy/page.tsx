import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, type LegalSection } from '@/components/legal-page'
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE } from '@/lib/business'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Secure Monitoring collects, uses, protects and retains information when providing remote CCTV monitoring services and operating this website.',
}

const sections: LegalSection[] = [
  {
    id: 'overview',
    title: 'Who we are',
    content: <>
      <p>This Privacy Policy explains how <strong>{BUSINESS.name}</strong>, a sole proprietorship owned by {BUSINESS.proprietor} and registered in India (Udyam Reg. No. {BUSINESS.udyamNumber}), located at {BUSINESS_ADDRESS_ONE_LINE} (“Secure Monitoring”, “we”, “us”), handles information when you visit this website (<a href={BUSINESS.website}>{BUSINESS.websiteLabel}</a>), contact us, subscribe to our remote CCTV monitoring services or make a payment.</p>
      <p>We process information in line with applicable law, including India’s Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, and we respect the privacy expectations of our customers in the United States.</p>
    </>,
  },
  {
    id: 'information',
    title: 'Information we collect',
    content: <>
      <h3>Business and contact information</h3>
      <p>Names, job titles, business names, store addresses, phone numbers, WhatsApp numbers and email addresses of the customer and its designated contacts, provided when you enquire or subscribe.</p>
      <h3>Billing and payment information</h3>
      <p>Invoice details, plan, amounts paid and payment status. Card payments are processed by our third-party payment gateway. <strong>We do not collect or store your full card number, CVV or card PIN.</strong> We only receive limited confirmation details (such as the transaction reference, amount, date and, in some cases, card brand and last four digits).</p>
      <h3>CCTV access and monitoring information</h3>
      <ul>
        <li>Remote access details for your CCTV system (for example, viewer app login or IP/port details) that you authorise us to use;</li>
        <li>Live video feeds viewed by our monitoring team. These may show your employees, customers and visitors. We monitor <strong>video only</strong> and do not listen to or collect audio;</li>
        <li>Monitoring logs, incident notes, alert history and reports, which may include still images or short clips of incidents where your plan includes them.</li>
      </ul>
      <h3>Website information</h3>
      <p>Basic, privacy-friendly usage statistics (such as pages visited, browser type and approximate country) collected through our hosting provider’s analytics. This website does not use advertising cookies and has no contact form that stores submissions.</p>
    </>,
  },
  {
    id: 'use',
    title: 'How we use information',
    content: <>
      <ul>
        <li>To provide the monitoring services you subscribed to, including observing feeds, sending alerts and preparing logs and reports;</li>
        <li>To communicate with you and your designated contacts about incidents, service changes and support;</li>
        <li>To issue invoices, collect payments, process refunds and keep accounting records;</li>
        <li>To respond to enquiries and prepare quotations;</li>
        <li>To maintain the security and quality of our service and this website;</li>
        <li>To comply with legal obligations and respond to lawful requests from authorities.</li>
      </ul>
      <p>We do <strong>not</strong> sell, rent or trade personal information, and we do not use CCTV footage for marketing, profiling or any purpose other than providing the Services to you.</p>
    </>,
  },
  {
    id: 'cctv',
    title: 'CCTV footage and the people on camera',
    content: <>
      <p>For monitoring, our customer decides which cameras and locations we monitor and why. The customer is responsible for having a lawful basis for its CCTV system and for giving any notices required by local law (such as CCTV signage and employee notices). We act on the customer’s instructions and use the footage only to provide the Services.</p>
      <p><strong>No audio.</strong> We do not listen to, monitor or record sound or conversations. Customers are asked to disable audio on shared feeds, and if audio is ever transmitted, our team keeps it muted.</p>
      <p>We view live feeds; we do not routinely download or keep copies of your recordings. Recordings remain on your own CCTV system under your control.</p>
    </>,
  },
  {
    id: 'sharing',
    title: 'When we share information',
    content: <>
      <p>We share information only where needed, with:</p>
      <ul>
        <li><strong>Your designated contacts</strong>, when sending alerts and reports;</li>
        <li><strong>Payment gateway and banking partners</strong>, to process payments and refunds securely;</li>
        <li><strong>Communication providers</strong> (phone, WhatsApp, email), which carry our messages to you;</li>
        <li><strong>Hosting and IT service providers</strong> that run this website;</li>
        <li><strong>Law enforcement</strong>, only where you authorise it under your plan, or where we are legally required to.</li>
      </ul>
      <p>These third parties have their own privacy practices, and we share only what is necessary for the purpose.</p>
    </>,
  },
  {
    id: 'transfers',
    title: 'International processing',
    content: <>
      <p>Our monitoring team works from India. If your premises are outside India (for example, in the United States), your camera feeds and related information are accessed from, and our records are kept in, India. By using the Services, you understand that your information will be processed in India under the safeguards described in this policy.</p>
    </>,
  },
  {
    id: 'security',
    title: 'How we protect information',
    content: <>
      <ul>
        <li>CCTV access credentials are shared only with personnel assigned to your account and are not written down or shared outside the monitoring team;</li>
        <li>Monitoring personnel are bound by confidentiality obligations and are prohibited from recording, photographing or sharing your feeds except as the Services require;</li>
        <li>Access to feeds, logs and reports is limited to people who need it to serve you;</li>
        <li>Payments are handled by a PCI-DSS-compliant payment gateway over encrypted (HTTPS) connections.</li>
      </ul>
      <p>No system is completely secure, but we work to protect your information and will inform you without undue delay if we become aware of a breach affecting your data.</p>
    </>,
  },
  {
    id: 'retention',
    title: 'How long we keep information',
    content: <>
      <ul>
        <li><strong>CCTV access credentials</strong>: removed from our records when the service ends. We recommend you also change your passwords or revoke our access at that time.</li>
        <li><strong>Monitoring logs and incident reports</strong>: kept for up to 12 months after the service ends, unless you ask us to delete them sooner or a longer period is required for a legal claim.</li>
        <li><strong>Billing and payment records</strong>: kept for as long as Indian tax and accounting law requires (generally up to 8 years).</li>
        <li><strong>Enquiry messages</strong>: kept for up to 24 months if no service is started.</li>
      </ul>
    </>,
  },
  {
    id: 'rights',
    title: 'Your choices and rights',
    content: <>
      <p>You may ask us to access, correct, update or delete the personal information we hold about you, or to stop non-essential communications. Some records (such as invoices) must be kept by law. You may also withdraw our CCTV access at any time, which will end the monitoring service.</p>
      <p>Individuals who appear on a customer’s cameras should direct requests about that footage to the business operating the cameras, which controls the recordings. We will assist our customers in responding.</p>
      <p>To make a request, email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. We will respond within 30 days.</p>
    </>,
  },
  {
    id: 'children',
    title: 'Children',
    content: <>
      <p>Our Services are for businesses only. We do not knowingly collect personal information from children through this website.</p>
    </>,
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    content: <>
      <p>We may update this policy from time to time. The “Last updated” date shows the latest version. Significant changes will be notified to active customers by email.</p>
    </>,
  },
  {
    id: 'grievance',
    title: 'Contact and grievance officer',
    content: <>
      <p>For privacy questions, requests or complaints, contact our Grievance Officer:</p>
      <ul>
        <li>Name: <strong>{BUSINESS.proprietor}</strong>, Proprietor, Secure Monitoring</li>
        <li>Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
        <li>Phone: <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a> (also WhatsApp) or <a href={BUSINESS.phone2Href}>{BUSINESS.phone2}</a></li>
        <li>Address: {BUSINESS_ADDRESS_ONE_LINE}</li>
      </ul>
      <p>We acknowledge grievances within 48 hours and aim to resolve them within 30 days. See also our <Link href="/terms">Terms &amp; Conditions</Link>.</p>
    </>,
  },
]

export default function PrivacyPage() {
  return <LegalPage path="/privacy" title="Privacy Policy" summary="How Secure Monitoring collects, uses, shares and protects information, including CCTV access details, camera feeds, contact details and payment information." sections={sections} />
}
