import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactLine, LegalPage, type LegalSection } from '@/components/legal-page'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description: 'How to cancel a Secure Monitoring remote CCTV monitoring subscription, notice periods, when cancellation takes effect and what happens afterwards.',
}

const sections: LegalSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: <>
      <p>Subscriptions to <strong>{BUSINESS.name}</strong>’s remote CCTV monitoring services run <strong>month to month</strong> for each monitored location and renew automatically until cancelled. There is no long-term lock-in and no cancellation fee for our standard Basic and Professional plans.</p>
      <p>If you have a signed Enterprise agreement that sets a different minimum term or notice period, that agreement applies to those points. Refunds related to cancellation are covered in our <Link href="/refund-policy">Refund Policy</Link>.</p>
    </>,
  },
  {
    id: 'how-to-cancel',
    title: 'How to cancel',
    content: <>
      <p>An authorised person from your business can cancel at any time by:</p>
      <ul>
        <li>Emailing <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> with the subject line <strong>“Cancellation Request”</strong>;</li>
        <li>Sending a WhatsApp message to <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer">{BUSINESS.phone}</a>; or</li>
        <li>Calling <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a> or <a href={BUSINESS.phone2Href}>{BUSINESS.phone2}</a> and confirming by email.</li>
      </ul>
      <p>Please include your business name, the location(s) you want to cancel, and the date you would like monitoring to stop. We will send a written confirmation of your cancellation, including the final service date, within <strong>2 business days</strong>. If you do not receive it, please contact us again.</p>
    </>,
  },
  {
    id: 'notice',
    title: 'Notice period and when it takes effect',
    content: <>
      <ul>
        <li>To avoid being charged for the next month, please cancel at least <strong>3 business days before your next billing date</strong>.</li>
        <li>Cancellation takes effect at the <strong>end of your current paid billing month</strong>. Monitoring continues until then, so you receive the service you have already paid for.</li>
        <li>If you ask us to stop monitoring earlier, we will do so, but the remaining days of that month are not refunded (see our <Link href="/refund-policy">Refund Policy</Link>).</li>
        <li>If you cancel with less than 3 business days’ notice and the next month is charged, we will refund that charge in full as long as monitoring for the new month has not started.</li>
      </ul>
    </>,
  },
  {
    id: 'trial',
    title: 'Cancelling during the free trial',
    content: <>
      <p>The 7-day free trial is free of charge and no card is required, so there is nothing to cancel financially. You can end the trial at any time by telling us by email or WhatsApp. If you do not subscribe by the end of the 7 days, monitoring simply stops, no charge is made, and we remove our access to your cameras.</p>
    </>,
  },
  {
    id: 'before-activation',
    title: 'Cancelling after payment, before paid service starts',
    content: <>
      <p>If you have paid but your paid service period has not yet started, you can cancel at any time before it starts and receive a <strong>full (100%) refund</strong>.</p>
    </>,
  },
  {
    id: 'partial',
    title: 'Cancelling some locations or changing plans',
    content: <>
      <ul>
        <li><strong>Multi-location accounts:</strong> you may cancel individual locations. Each cancelled location stops at the end of its current billing month, and the others continue unchanged.</li>
        <li><strong>Downgrades:</strong> a move to a lower plan takes effect from your next billing cycle.</li>
        <li><strong>Upgrades:</strong> a move to a higher plan can start right away. Any difference for the current month is confirmed with you before it is charged.</li>
      </ul>
    </>,
  },
  {
    id: 'by-us',
    title: 'Cancellation or suspension by Secure Monitoring',
    content: <>
      <p>We may suspend or cancel the service, after notifying you where possible, if:</p>
      <ul>
        <li>A payment is more than 7 days overdue;</li>
        <li>Our authorised access to your cameras is removed or stays unavailable for an extended period;</li>
        <li>You ask us to carry out monitoring that is unlawful, or otherwise seriously breach our <Link href="/terms">Terms &amp; Conditions</Link>.</li>
      </ul>
      <p>If we cancel without any such cause, we will give at least 15 days’ notice and refund any unused prepaid amount on a pro-rata basis.</p>
    </>,
  },
  {
    id: 'after',
    title: 'What happens after cancellation',
    content: <>
      <ul>
        <li>Monitoring and alerts stop on the final service date in your confirmation;</li>
        <li>We delete your CCTV access credentials from our records. For your security, we recommend that you also change the passwords or remove the user account you created for us;</li>
        <li>No further charges are made for cancelled locations;</li>
        <li>You may request copies of your monitoring logs and incident reports within 30 days of the final service date. Records are then kept and deleted as described in our <Link href="/privacy">Privacy Policy</Link>.</li>
      </ul>
      <p>You are welcome to resubscribe at any time. Reactivation follows the normal onboarding process.</p>
    </>,
  },
  {
    id: 'contact',
    title: 'Contact us',
    content: <>
      <p>For help with a cancellation, <ContactLine />.</p>
    </>,
  },
]

export default function CancellationPolicyPage() {
  return <LegalPage path="/cancellation-policy" title="Cancellation Policy" summary="How to cancel your monthly monitoring subscription, how much notice to give, when cancellation takes effect and what happens to your camera access afterwards." sections={sections} />
}
