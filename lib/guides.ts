import type { GuidePage } from './content-types'

// Educational guides (rendered with Article schema). Only cite statistics with a source URL
// listed in `sources`; re-check figures against the publisher's page before changing them.

export const GUIDES: GuidePage[] = [
  {
    slug: 'what-is-remote-cctv-monitoring',
    title: 'What Is Remote CCTV Monitoring? A Guide for US Retail Store Owners',
    metaTitle: 'What Is Remote CCTV & Video Monitoring?',
    metaDescription:
      'A plain-English guide to remote CCTV monitoring for US retail stores: how it works, what operators do, what you need, typical costs and its limits.',
    summary:
      'Remote CCTV monitoring is a service where trained operators watch your store’s security cameras live from another location and alert your staff when something needs attention. For retail stores, it turns existing cameras from a recording tool into an active loss-prevention tool. Secure Monitoring is an India-based team that provides this human-led monitoring to US retail businesses using the cameras they already have.',
    cardText: 'How remote monitoring works, what operators actually do, and what you need to get started.',
    datePublished: '2026-11-16',
    dateModified: '2026-11-16',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Remote CCTV monitoring in one paragraph',
        paragraphs: [
          'Most retail stores record their cameras but rarely watch them live. Footage gets reviewed after a loss is discovered, when it is too late to act. Remote CCTV monitoring adds people who watch selected camera feeds in real time, recognize behavior that matches agreed criteria, such as concealment, suspicious activity near the register or after-hours movement, and contact the right person at the store while there is still time to respond.',
        ],
      },
      {
        heading: 'Why retailers are looking at live monitoring',
        paragraphs: [
          'Retail losses are significant. The National Retail Federation’s 2023 National Retail Security Survey reported that US retail shrink (inventory lost to theft, error and other causes) reached $112.1 billion in fiscal 2022, an average shrink rate of 1.6% of sales. Recorded footage helps after the fact; live monitoring aims to give staff a chance to act while an incident is still happening.',
        ],
      },
      {
        heading: 'How remote monitoring works, step by step',
        bullets: [
          'Consultation: the provider learns about your store, cameras, priorities and the hours you want covered.',
          'Remote access: you give the provider secure, view-only access to your camera system, usually through your recorder’s remote viewing app or web portal, using a separate user account.',
          'Procedures: you agree what counts as an incident, who should be contacted, in what order and by which channel (for example, phone call then WhatsApp).',
          'Live monitoring: operators watch the agreed views during the agreed hours.',
          'Alerts: when an operator sees an actionable incident, they contact your designated staff member or manager.',
          'Records: incidents and communications are logged and summarized in reports.',
        ],
      },
      {
        heading: 'Live human monitoring vs. automated alerts',
        paragraphs: [
          'The phrase "remote monitoring" covers several different services. It helps to know which one you are buying.',
        ],
        table: [
          ['Approach', 'How it works', 'Strengths', 'Watch-outs'],
          ['Live human monitoring', 'Operators continuously watch selected feeds during agreed hours.', 'Judges context; can spot behavior before an alarm would trigger.', 'Coverage depends on the number of feeds per operator and agreed hours.'],
          ['Event-based monitoring', 'Operators view cameras only when an alarm or motion event fires.', 'Efficient for closed premises.', 'Nothing is watched until a sensor or rule triggers.'],
          ['AI-assisted analytics', 'Software flags objects or behaviors for review.', 'Can scan many cameras at once.', 'Accuracy varies; usually needs compatible hardware or software.'],
          ['Self-monitoring with app alerts', 'The owner receives motion notifications on a phone.', 'Low cost.', 'Frequent false alerts; the owner has to watch and react.'],
        ],
      },
      {
        heading: 'What Secure Monitoring provides',
        paragraphs: [
          'Secure Monitoring offers live human monitoring. Our operators watch your existing cameras during the hours you choose, up to 24/7, and alert your designated contacts by phone and WhatsApp. We target starting a response within 30 seconds of identifying an actionable incident, and we keep incident logs and reports.',
          'We do not currently offer AI analytics, audio monitoring or talk-down speakers, and we do not sell or install cameras. On the Professional plan, operators can contact law enforcement where it is appropriate and authorized by you.',
        ],
      },
      {
        heading: 'What you need to get started',
        bullets: [
          'A working CCTV system (IP cameras with an NVR, a DVR, or a cloud camera system) that supports secure remote viewing.',
          'A stable internet connection with enough upload capacity to stream the agreed views.',
          'Cameras covering the areas that matter: entrance, register, high-value displays and back door.',
          'Designated contacts who are reachable during monitoring hours.',
          'Audio disabled on shared feeds, and any CCTV signage or notices required where you operate.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'Pricing models vary across the industry, from per-camera fees to bundles that require new hardware and long contracts. Secure Monitoring charges per site per month: Basic from $199 and Professional from $299, tailored to your number of cameras and monitoring hours, with an Enterprise option for multi-site operations. There are no setup fees and no long-term contract, and a 7-day free trial is available.',
        ],
      },
      {
        heading: 'The limits of remote monitoring',
        paragraphs: [
          'Remote monitoring supports loss prevention; it does not guarantee that theft will be prevented. Operators can only see what cameras show, internet or power outages interrupt monitoring, and the response at the store depends on your staff and your policies. Any provider that promises to eliminate theft is overselling.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is remote CCTV monitoring the same as an alarm monitoring service?',
        a: 'Not exactly. Alarm monitoring reacts to sensor alarms, usually when the premises are closed. Live remote CCTV monitoring has operators watching video during agreed hours, including while the store is open.',
      },
      {
        q: 'Do I need new cameras for remote monitoring?',
        a: 'Usually not. Most modern systems that support remote viewing through an app or web portal can be monitored. Compatibility is confirmed during setup.',
      },
      {
        q: 'Can remote operators stop a theft?',
        a: 'No. Operators cannot intervene physically. They alert your staff quickly with a clear description so your team can respond under your own policy.',
      },
      {
        q: 'Is it legal to have my store cameras monitored remotely?',
        a: 'Video monitoring of public areas of your own store is common, but laws vary by state. You are responsible for signage and notices, and audio should be disabled, since recording conversations without consent is illegal in many states. Seek local legal advice if unsure.',
      },
    ],
    sources: [
      { label: 'National Retail Federation: Shrink accounted for over $112 billion in industry losses in 2022 (2023 National Retail Security Survey)', url: 'https://nrf.com/media-center/press-releases/shrink-accounted-over-112-billion-industry-losses-2022-according-nrf' },
    ],
    relatedServices: ['remote-cctv-monitoring', 'live-video-monitoring', 'retail-cctv-monitoring'],
  },
  {
    slug: 'remote-monitoring-vs-security-guards',
    title: 'Remote Video Monitoring vs. Security Guards vs. In-House Camera Watching for Retail Stores',
    metaTitle: 'Remote Monitoring vs. Security Guards',
    metaDescription:
      'Compare remote video monitoring, on-site security guards and in-house camera watching for retail stores: coverage, response, cost structure and limitations.',
    summary:
      'For most small and mid-sized retail stores, the choice is between an on-site security guard, asking staff to watch cameras in-house, or outsourcing live monitoring to a remote team. Guards provide a physical presence, in-house watching is cheap but unreliable, and remote monitoring gives dedicated eyes on existing cameras at a lower monthly cost. Secure Monitoring is an India-based team that provides human-led remote monitoring for US retailers.',
    cardText: 'An honest comparison of the three common ways retailers watch their stores.',
    datePublished: '2026-11-16',
    dateModified: '2026-11-16',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The three options at a glance',
        table: [
          ['Factor', 'On-site security guard', 'In-house camera watching', 'Remote video monitoring'],
          ['Physical presence', 'Yes, a visible deterrent at the store', 'Only staff already on shift', 'No; operators are off-site'],
          ['Who watches the cameras', 'Usually nobody; the guard is on the floor', 'Staff, when they have time', 'Dedicated operators during agreed hours'],
          ['Coverage of several areas at once', 'Limited to where the guard stands', 'Limited by staff attention', 'Multiple camera views at once'],
          ['Can physically intervene', 'Depends on guard role and local rules', 'Staff, at personal risk', 'No; alerts staff and, where authorized, police'],
          ['Cost structure', 'Hourly wages for every covered hour', 'Hidden cost of staff time', 'Fixed monthly fee per site'],
          ['Multiple locations', 'One guard per site', 'Depends on each store', 'One team can monitor many sites'],
          ['Records and reporting', 'Varies', 'Rarely consistent', 'Incident logs and reports'],
        ],
      },
      {
        heading: 'When an on-site guard makes sense',
        paragraphs: [
          'A uniformed guard provides a visible deterrent and a person on site. For stores with frequent violent incidents, very high-value stock or requirements from insurers or landlords, a guard may be the right choice, sometimes alongside remote monitoring.',
          'The trade-offs are cost, since you pay for every hour covered, and the fact that a guard watching the floor is not usually watching the cameras.',
        ],
      },
      {
        heading: 'Why in-house camera watching rarely works',
        paragraphs: [
          'Many owners put a monitor behind the counter and expect staff to keep an eye on it. In practice, employees are serving customers, stocking and cleaning. The monitor is checked occasionally, and footage is usually reviewed only after a loss is found.',
          'In-house watching also gives little independent visibility of staff activity, which matters when internal loss is a concern.',
        ],
      },
      {
        heading: 'Where remote monitoring fits',
        paragraphs: [
          'Remote monitoring puts dedicated operators on your existing cameras during the hours you choose. When something needs attention, they call your designated staff with a clear description, and they keep a record of what happened.',
          'It does not replace a physical presence: operators cannot step in, and the response at the store depends on your team. Many small retailers find it a practical middle ground, with more attention than in-house watching at a predictable monthly cost below full-time guard coverage.',
        ],
      },
      {
        heading: 'How Secure Monitoring approaches it',
        paragraphs: [
          'Secure Monitoring provides live, human-led monitoring from India for US retail stores, using your existing cameras. Plans are priced per site per month (Basic from $199, Professional from $299, Enterprise from $699), tailored to cameras and monitoring hours, with no setup fees, no long-term contract and a 7-day free trial. We monitor video only and do not provide guards, talk-down audio or hardware.',
        ],
      },
      {
        heading: 'Questions to ask any provider',
        bullets: [
          'Is monitoring live and continuous, or only triggered by events?',
          'How many camera feeds does each operator watch?',
          'Who exactly will be contacted, how, and in what order?',
          'What is the response target, and how is it defined?',
          'Do I need new hardware or a long-term contract?',
          'Where is the monitoring team located, and how is my camera access protected?',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is remote monitoring cheaper than a security guard?',
        a: 'Typically, yes, because you pay a fixed monthly fee per site rather than hourly wages for every covered hour. Exact costs depend on your hours, cameras and local guard rates.',
      },
      {
        q: 'Can I use remote monitoring and a guard together?',
        a: 'Yes. Some stores use a guard during peak hours and remote monitoring for the remaining hours or for areas the guard cannot see.',
      },
      {
        q: 'Does remote monitoring deter thieves like a guard does?',
        a: 'Not in the same visible way. Remote monitoring’s value is detection and fast communication to your staff, not physical deterrence.',
      },
      {
        q: 'Where is Secure Monitoring’s team based?',
        a: 'Our monitoring team works from India and serves US retail businesses remotely. We are open about this, and our Privacy Policy explains how camera access and data are handled.',
      },
    ],
    sources: [],
    relatedServices: ['live-video-monitoring', 'retail-loss-prevention', 'remote-cctv-monitoring'],
  },
  {
    slug: 'prepare-existing-cctv-for-remote-monitoring',
    title: 'How to Prepare Your Existing CCTV System for Remote Monitoring',
    metaTitle: 'Prepare Your CCTV for Remote Monitoring',
    metaDescription:
      'A practical checklist for getting an existing CCTV, NVR or DVR system ready for remote monitoring: access, user accounts, bandwidth, coverage, lighting and audio.',
    summary:
      'Most existing CCTV systems can be monitored remotely without new hardware if they support secure remote viewing, have a stable internet connection and cover the right areas. This checklist explains what to prepare before monitoring starts. Secure Monitoring is an India-based team that provides human-led remote monitoring of US retailers’ existing cameras.',
    cardText: 'A step-by-step checklist to get your current cameras ready for live remote monitoring.',
    datePublished: '2026-11-16',
    dateModified: '2026-11-16',
    readingMinutes: 6,
    sections: [
      {
        heading: '1. Confirm your system supports remote viewing',
        paragraphs: [
          'Most modern camera systems, whether IP cameras with a network video recorder (NVR), a digital video recorder (DVR) or a cloud-based camera platform, offer a remote viewing app or web portal. If you can already view your cameras live on your phone away from the store, your system can usually be monitored remotely.',
        ],
      },
      {
        heading: '2. Create a separate, limited user account',
        paragraphs: [
          'Never share your administrator password. Create a dedicated user account for the monitoring provider with live-view permission only, and without rights to delete footage, change settings or manage users, if your system allows it.',
        ],
        bullets: [
          'Use a strong, unique password for the monitoring account.',
          'Keep your own administrator account private.',
          'Change the password or disable the account if you end the service.',
        ],
      },
      {
        heading: '3. Check your internet upload capacity',
        paragraphs: [
          'Live viewing streams video from your store to the monitoring team, which uses your upload bandwidth. Many recorders offer a lower-resolution "substream" for remote viewing, which reduces bandwidth while keeping the image usable. If the store also runs payment terminals or other systems on the same connection, check that remote viewing does not affect them.',
        ],
      },
      {
        heading: '4. Review camera coverage',
        bullets: [
          'Entrance and exit: a face-height view of people entering and leaving.',
          'Register and counter: ideally an overhead or angled view of the cash drawer and counter.',
          'High-value displays and aisles: tobacco, alcohol, electronics, health and beauty or other high-theft items.',
          'Stockroom and back door: deliveries, staff breaks and goods leaving the building.',
          'Exterior or parking area, if after-hours monitoring is planned.',
        ],
      },
      {
        heading: '5. Check lighting and night views',
        paragraphs: [
          'Review each camera at night. Infrared night vision, store lighting left on after hours and the absence of glare from windows or headlights all affect what an operator can see. A camera that records only shapes at night is of limited use for live monitoring.',
        ],
      },
      {
        heading: '6. Synchronize the time',
        paragraphs: [
          'Make sure the recorder’s date, time and time zone are correct, ideally synchronized automatically. Accurate timestamps make incident logs and later footage reviews much easier.',
        ],
      },
      {
        heading: '7. Disable audio on shared feeds',
        paragraphs: [
          'Recording or listening to conversations without consent is illegal in many US states. Secure Monitoring monitors video only, so we ask customers to disable audio on any feeds shared with us.',
        ],
      },
      {
        heading: '8. Signage, notices and private areas',
        paragraphs: [
          'Check the CCTV signage and employee notice requirements where you operate. Cameras must never cover restrooms, fitting rooms or other areas where people expect privacy.',
        ],
      },
      {
        heading: '9. Choose designated contacts and an escalation order',
        bullets: [
          'Who should receive alerts during each shift: clerk, manager or owner?',
          'In what order should they be contacted, and by phone call, WhatsApp or both?',
          'What should happen if nobody answers?',
          'On plans that include it, under which circumstances may the provider contact law enforcement?',
        ],
      },
      {
        heading: 'Next step',
        paragraphs: [
          'Once these points are covered, onboarding is usually straightforward. Secure Monitoring reviews compatibility during the consultation, and monitoring begins with a 7-day free trial and no setup fees.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need to buy new cameras to use remote monitoring?',
        a: 'Usually not. If your current system supports secure remote viewing and covers the important areas, it can usually be monitored as it is.',
      },
      {
        q: 'Should I give the monitoring company my admin password?',
        a: 'No. Create a separate user account with live-view permission only, so you stay in control and can revoke access at any time.',
      },
      {
        q: 'How much internet speed do I need?',
        a: 'It depends on the number of cameras and resolution. Using the recorder’s lower-resolution substream for remote viewing usually keeps bandwidth needs modest. We check this during the trial.',
      },
      {
        q: 'What if my cameras have blind spots?',
        a: 'We will point out gaps we notice. Adding or moving cameras is your decision; we do not sell or install hardware.',
      },
      {
        q: 'Why must audio be turned off?',
        a: 'Recording or listening to conversations without consent is illegal in many US states. We monitor video only and ask customers to disable audio on shared feeds.',
      },
    ],
    sources: [],
    relatedServices: ['remote-cctv-monitoring', 'live-video-monitoring', 'multi-location-cctv-monitoring'],
  },
]

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug)
