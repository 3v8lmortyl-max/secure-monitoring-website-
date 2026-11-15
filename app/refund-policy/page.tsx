import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, type LegalSection } from '@/components/legal-page'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'When Secure Monitoring issues refunds for remote CCTV monitoring subscriptions, how to request one, and how long refunds take.',
}

const sections: LegalSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: <>
      <p>This Refund Policy applies to all payments made to <strong>{BUSINESS.name}</strong> for remote CCTV monitoring and retail security surveillance services. Our Services are monthly subscriptions billed in advance, per monitored location, in {BUSINESS.billingCurrency}. We sell services only; we do not sell physical products, so there are no shipping or product returns.</p>
      <p>This policy should be read with our <Link href="/cancellation-policy">Cancellation Policy</Link> and <Link href="/terms">Terms &amp; Conditions</Link>.</p>
    </>,
  },
  {
    id: 'eligible',
    title: 'When you are entitled to a refund',
    content: <>
      <p>You will receive a refund in the following cases:</p>
      <ul>
        <li><strong>Cancellation before activation: 100% refund.</strong> If you paid but cancel before monitoring has started at your location, we refund the full amount paid.</li>
        <li><strong>We are unable to start the service: 100% refund.</strong> If we cannot connect to or monitor your cameras within 7 days of payment for reasons on our side, or we decide not to proceed, we refund the full amount.</li>
        <li><strong>Duplicate or incorrect charge: 100% refund</strong> of the duplicate or excess amount.</li>
        <li><strong>Charged after a valid cancellation:</strong> if you cancelled in line with our Cancellation Policy and were still charged for the next month, we refund that charge in full.</li>
        <li><strong>Service not delivered because of us: proportionate refund.</strong> If we fail to provide monitoring for a continuous period of more than 24 hours within your agreed monitoring hours because of a problem on our side, you may request a pro-rata refund (or, if you prefer, a credit on your next invoice) for the affected days.</li>
        <li><strong>We end the service without cause:</strong> if we terminate your subscription for reasons other than your breach or non-payment, we refund the unused portion of the current prepaid month on a pro-rata basis.</li>
      </ul>
    </>,
  },
  {
    id: 'not-eligible',
    title: 'When refunds are not given',
    content: <>
      <p>Once monitoring has started, fees for the current billing month are generally non-refundable, except in the cases listed above. Refunds are not given for:</p>
      <ul>
        <li>The remaining days of a month in which you cancel after monitoring has started (your service continues until the end of that paid month);</li>
        <li>Periods when monitoring was not possible because of your cameras, recorders, internet, power or access settings, or because you withdrew our access;</li>
        <li>Periods of suspension due to non-payment, or termination because of a breach of our Terms;</li>
        <li>Incidents of theft, loss or damage at your premises. Our service supports loss prevention but does not guarantee that incidents will be prevented (see our <Link href="/terms">Terms</Link>).</li>
      </ul>
    </>,
  },
  {
    id: 'how-to-request',
    title: 'How to request a refund',
    content: <>
      <p>Email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> with the subject line <strong>“Refund Request”</strong> within <strong>30 days</strong> of the charge, and include:</p>
      <ol>
        <li>Your business name and the monitored location;</li>
        <li>The payment date, amount and invoice or transaction reference;</li>
        <li>The reason for your request and any supporting details (for example, dates the service was unavailable).</li>
      </ol>
      <p>You can also reach us by phone or WhatsApp at <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>, but please confirm your request by email so there is a written record.</p>
    </>,
  },
  {
    id: 'timelines',
    title: 'Processing time',
    content: <>
      <ul>
        <li><strong>Review:</strong> we confirm receipt within 2 business days and tell you whether the refund is approved within <strong>5 business days</strong> of your request.</li>
        <li><strong>Processing:</strong> approved refunds are initiated within <strong>5–7 business days</strong> of approval.</li>
        <li><strong>Credit to your account:</strong> after we initiate the refund, international card issuers and banks usually take a further 5–10 business days to show it on your statement. This timing is controlled by your bank.</li>
      </ul>
    </>,
  },
  {
    id: 'method',
    title: 'Refund method and currency',
    content: <>
      <p>Refunds are made to the <strong>original payment method</strong> used for the transaction (for example, the same credit or debit card), in the currency in which you were charged. We do not refund in cash or to a different card or account.</p>
      <p>Because of exchange-rate movements and fees charged by your card issuer or bank, the amount shown on your statement may differ slightly from the original charge. Secure Monitoring does not control or receive these fees.</p>
    </>,
  },
  {
    id: 'disputes',
    title: 'Payment disputes',
    content: <>
      <p>If you believe a charge is wrong, please contact us first. We can usually resolve billing issues faster than a chargeback. Raising a dispute with your bank does not stop you from contacting us, and we will cooperate fully with any bank investigation.</p>
    </>,
  },
  {
    id: 'contact',
    title: 'Contact us',
    content: <>
      <p>For refund questions, email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or call / WhatsApp <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>.</p>
    </>,
  },
]

export default function RefundPolicyPage() {
  return <LegalPage path="/refund-policy" title="Refund Policy" summary="When we issue refunds for our monthly remote CCTV monitoring subscriptions, how to request one, and how long it takes for the money to reach you." sections={sections} />
}
