// Single source of truth for the business identity shown on legal and contact pages.
// Details match the Udyam (MSME) Registration Certificate.
export const BUSINESS = {
  name: 'Secure Monitoring',
  legalStructure: 'Sole Proprietorship',
  udyamNumber: 'UDYAM-TS-08-0063780',
  enterpriseType: 'Micro Enterprise (MSME), Services',
  activity: 'Remote CCTV monitoring and retail security surveillance services',
  address: {
    line1: '1_23/1, Pandufarm, Indrama Colony',
    city: 'Bodhan',
    district: 'Nizamabad District',
    state: 'Telangana',
    pin: '503185',
    country: 'India',
  },
  proprietor: 'Shaik Mudassir',
  email: 'securemonitoring24hr@gmail.com',
  // Primary number (also WhatsApp) and the number registered on the Udyam certificate.
  phone: '+91 9392525869',
  phoneHref: 'tel:+919392525869',
  whatsappHref: 'https://wa.me/919392525869',
  phone2: '+91 8121510065',
  phone2Href: 'tel:+918121510065',
  jurisdiction: 'Nizamabad, Telangana, India',
  billingCurrency: 'US Dollars (USD)',
} as const

export const BUSINESS_ADDRESS_ONE_LINE = `${BUSINESS.address.line1}, ${BUSINESS.address.city}, ${BUSINESS.address.district}, ${BUSINESS.address.state} ${BUSINESS.address.pin}, ${BUSINESS.address.country}`

export const POLICIES_LAST_UPDATED = '15 November 2026'

export const POLICY_LINKS = [
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refund-policy', label: 'Refund Policy' },
  { href: '/cancellation-policy', label: 'Cancellation Policy' },
] as const
