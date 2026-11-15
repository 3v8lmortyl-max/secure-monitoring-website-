import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, type LegalSection } from '@/components/legal-page'
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE } from '@/lib/business'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions governing Secure Monitoring’s remote CCTV monitoring and retail security surveillance services, website use, fees and payments.',
}

const sections: LegalSection[] = [
  {
    id: 'about',
    title: 'About these terms',
    content: <>
      <p>These Terms &amp; Conditions (“Terms”) govern your use of this website and the remote CCTV monitoring and retail security surveillance services (“Services”) provided by <strong>{BUSINESS.name}</strong>, a sole proprietorship registered in India under Udyam (MSME) Registration No. <strong>{BUSINESS.udyamNumber}</strong>, with its registered address at {BUSINESS_ADDRESS_ONE_LINE} (“Secure Monitoring”, “we”, “us” or “our”).</p>
      <p>“Customer”, “you” or “your” means the business, and the individual acting for that business, that uses this website, subscribes to the Services or makes a payment to us. By subscribing to the Services, making a payment or using this website, you agree to these Terms, our <Link href="/privacy">Privacy Policy</Link>, our <Link href="/refund-policy">Refund Policy</Link> and our <Link href="/cancellation-policy">Cancellation Policy</Link>.</p>
      <p>If you have signed a separate written service agreement or order with us, that agreement applies together with these Terms. Where the two conflict, the signed agreement prevails for that specific point.</p>
    </>,
  },
  {
    id: 'eligibility',
    title: 'Business customers only',
    content: <>
      <p>The Services are offered on a business-to-business (B2B) basis to retail stores and commercial businesses, primarily in the United States. They are not offered to individual consumers for personal or household use.</p>
      <p>By subscribing, you confirm that you are at least 18 years old, that you are authorised to act for the business named in your order, and that the business owns or lawfully controls the CCTV systems and premises to be monitored.</p>
    </>,
  },
  {
    id: 'services',
    title: 'Our services',
    content: <>
      <p>Secure Monitoring provides remote monitoring of your <strong>existing</strong> CCTV camera systems through monitoring personnel located in India. Depending on your plan, the Services may include:</p>
      <ul>
        <li>Live CCTV monitoring during your agreed monitoring hours (up to 24/7);</li>
        <li>Retail store surveillance, including customer and employee activity visible on camera;</li>
        <li>Suspicious activity detection and employee theft prevention support;</li>
        <li>Store opening monitoring;</li>
        <li>Instant security alerts to your designated contacts by phone call, WhatsApp, email or another agreed channel;</li>
        <li>Monitoring logs, incident records and activity reports.</li>
      </ul>
      <p>The exact scope (number of locations and cameras, monitoring hours, alert procedure, designated contacts and reporting) is set out in your selected plan, order or written confirmation from us.</p>
      <h3>What we do not provide</h3>
      <ul>
        <li>We do not manufacture, sell, supply or install CCTV cameras or other hardware.</li>
        <li>We do not provide physical security guards and do not attend or enter your premises.</li>
        <li>We are not an emergency service, an alarm-response company or a law-enforcement agency.</li>
        <li>We never access any CCTV system without the owner’s authorisation.</li>
      </ul>
    </>,
  },
  {
    id: 'customer-responsibilities',
    title: 'Your responsibilities',
    content: <>
      <p>To allow us to deliver the Services, you agree to:</p>
      <ul>
        <li>Provide authorised remote access to your CCTV system and keep it working, including cameras, recorders, power and a stable internet connection;</li>
        <li>Give us accurate details of your locations, monitoring hours and designated contacts, and update us promptly when they change;</li>
        <li>Make sure your designated contacts are reachable during monitoring hours;</li>
        <li>Comply with all laws that apply to video surveillance at your premises, including posting any required CCTV signage and giving any notices to employees and customers. Cameras must not be placed where surveillance is unlawful (for example, restrooms or changing areas);</li>
        <li>Not ask us to monitor any place or person you are not legally entitled to monitor, or to use the Services for any unlawful purpose;</li>
        <li>Keep your own emergency arrangements in place, including contacting emergency services directly when needed.</li>
      </ul>
      <p>You remain the owner and controller of your CCTV equipment and recordings at all times. You may revoke our access at any time.</p>
    </>,
  },
  {
    id: 'limitations',
    title: 'Nature and limits of the service',
    content: <>
      <p>Monitoring is carried out by people observing live camera feeds. While we take reasonable care, you acknowledge that:</p>
      <ul>
        <li>We can only observe what your cameras show. Blind spots, poor lighting, camera faults, power cuts, internet outages or changes to your system may limit what we see.</li>
        <li>The Services are designed to <strong>support</strong> loss prevention and awareness. They do not guarantee that theft, loss, damage or any other incident will be detected, prevented or resolved.</li>
        <li>Any response time stated on our website (for example, a 30-second response target) is a target for our team to begin its agreed response after an actionable incident is identified. It is not a guarantee of incident resolution, police attendance or any particular outcome.</li>
        <li>Where your plan includes contacting law enforcement, we do so only when it is appropriate, authorised by you and covered by the agreed procedure. We cannot control whether or when the police respond.</li>
      </ul>
    </>,
  },
  {
    id: 'fees',
    title: 'Fees, billing and payment',
    content: <>
      <ul>
        <li><strong>Pricing.</strong> Fees are shown on our <Link href="/pricing">Pricing</Link> page or in a written quotation. Fees are charged <strong>per monitored location per month</strong> unless otherwise agreed in writing.</li>
        <li><strong>Currency.</strong> Fees are quoted and charged in {BUSINESS.billingCurrency}. Your card issuer or bank may apply currency conversion or international transaction fees; these are set by them, not by us.</li>
        <li><strong>Billing cycle.</strong> Subscriptions are billed monthly <strong>in advance</strong>. Your first billing period starts on the date monitoring is activated (the “Activation Date”), and your plan renews automatically each month until cancelled under our <Link href="/cancellation-policy">Cancellation Policy</Link>.</li>
        <li><strong>Payment methods.</strong> Payments are collected securely through our third-party payment gateway by international credit or debit card (such as Visa, Mastercard and, where supported, American Express), payment links or other methods we make available. Secure Monitoring does not see or store your full card number or CVV.</li>
        <li><strong>Additional services.</strong> Extra locations, extended hours or custom reporting are charged at the fee agreed in writing before the work begins.</li>
        <li><strong>Taxes.</strong> Fees exclude any taxes that may apply. Where tax is payable, it will be shown on your invoice.</li>
        <li><strong>Late or failed payment.</strong> If a payment fails or is not received within 7 days of its due date, we may notify you and then suspend the Services until the balance is paid. Suspension does not cancel your subscription.</li>
        <li><strong>Price changes.</strong> We will give you at least 30 days’ notice by email of any change to your recurring fee. The new fee applies from your next billing cycle after the notice period. You may cancel before then if you do not accept it.</li>
      </ul>
      <p>Refunds are handled under our <Link href="/refund-policy">Refund Policy</Link>.</p>
    </>,
  },
  {
    id: 'term',
    title: 'Term, cancellation and suspension',
    content: <>
      <p>Your subscription continues month to month until it is cancelled by you or by us. You may cancel at any time as described in our <Link href="/cancellation-policy">Cancellation Policy</Link>.</p>
      <p>We may suspend or end the Services with notice if you fail to pay, withdraw authorised camera access, breach these Terms, or ask us to do something unlawful or unsafe. We may end the Services immediately if continuing would break the law.</p>
    </>,
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality and data',
    content: <>
      <p>We treat your camera access credentials, video feeds, business information and incident reports as confidential. Access is limited to personnel who need it to deliver the Services. We do not record, download, sell or publish your footage except as needed to provide the agreed reports, as you instruct, or as required by law.</p>
      <p>How we handle personal information is explained in our <Link href="/privacy">Privacy Policy</Link>.</p>
    </>,
  },
  {
    id: 'ip',
    title: 'Intellectual property',
    content: <>
      <p>All content on this website, including text, graphics and logos, belongs to Secure Monitoring or is used with permission. You may not copy or reuse it for commercial purposes without our written consent. Reports we prepare for you may be used freely by your business for its own purposes.</p>
    </>,
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    content: <>
      <p>To the maximum extent permitted by law:</p>
      <ul>
        <li>Secure Monitoring is not liable for any loss of stock, cash, property or profits, or for any indirect, incidental or consequential loss, arising from theft, damage or any incident at your premises, whether or not it was visible on camera;</li>
        <li>We are not liable for failures caused by your equipment, internet or power, third-party platforms, or events beyond our reasonable control (such as natural disasters, network outages or government action);</li>
        <li>Our total liability for any claim relating to the Services is limited to the fees you paid us for the affected location in the <strong>one (1) month</strong> before the event giving rise to the claim.</li>
      </ul>
      <p>Nothing in these Terms limits liability that cannot be limited under applicable law.</p>
    </>,
  },
  {
    id: 'indemnity',
    title: 'Indemnity',
    content: <>
      <p>You agree to indemnify Secure Monitoring against claims, fines or costs arising from your breach of these Terms, from surveillance at your premises that does not comply with applicable law, or from instructions you give us that are unlawful.</p>
    </>,
  },
  {
    id: 'law',
    title: 'Governing law and disputes',
    content: <>
      <p>These Terms are governed by the laws of India. We encourage you to contact us first so we can try to resolve any concern informally. If a dispute cannot be resolved within 30 days, it will be subject to the exclusive jurisdiction of the courts at {BUSINESS.jurisdiction}.</p>
    </>,
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    content: <>
      <p>We may update these Terms from time to time. The “Last updated” date at the top of this page shows when they last changed. Material changes affecting active subscriptions will be notified by email at least 30 days before they take effect.</p>
    </>,
  },
  {
    id: 'contact',
    title: 'Contact us',
    content: <>
      <p>For questions about these Terms, billing or your service, contact us at <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or call / WhatsApp <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>. We aim to respond within 2 business days.</p>
    </>,
  },
]

export default function TermsPage() {
  return <LegalPage path="/terms" title="Terms & Conditions" summary="The terms that apply when your business uses Secure Monitoring’s remote CCTV monitoring services or this website, including what we provide, your responsibilities, fees and payment." sections={sections} />
}
