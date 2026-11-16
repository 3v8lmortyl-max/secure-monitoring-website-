import type { ServicePage } from './content-types'

// Service content. Every capability described here is delivered by human operators
// watching the customer's existing cameras. No automated/AI analytics, audio monitoring,
// hardware, guards or dispatch are offered, and the pages say so where relevant.

const MONITORING_TYPES_TABLE: string[][] = [
  ['Monitoring type', 'How it works', 'Offered by Secure Monitoring?'],
  ['Live human monitoring', 'A trained operator actively views your camera feeds during agreed hours and decides what needs action.', 'Yes. This is our core service.'],
  ['Event-based monitoring', 'Operators only look at cameras after a sensor, alarm or motion event triggers a clip.', 'No. We watch live feeds rather than waiting for triggers.'],
  ['AI-assisted video analytics', 'Software flags objects or behaviour automatically for review.', 'No. We do not use AI analytics to make or filter decisions.'],
  ['Automated alerts', 'A system sends notifications without a person checking first.', 'No. Every alert we send has been reviewed by a person.'],
]

export const SERVICES: ServicePage[] = [
  {
    slug: 'remote-cctv-monitoring',
    name: 'Remote CCTV Monitoring',
    serviceType: 'Remote CCTV monitoring',
    metaTitle: 'Remote Video & CCTV Monitoring for Retail',
    metaDescription: 'Live, human-led remote video monitoring for US retail stores using your existing CCTV cameras. No new hardware, no setup fees, from $199 per site per month.',
    h1: 'Remote video and CCTV monitoring for US retail stores',
    summary: 'Remote CCTV monitoring is a service in which trained operators watch your store’s security cameras live from another location and alert your team when something needs attention. Secure Monitoring provides it to retail businesses in the United States from our monitoring team in India, using the cameras you already have: no new hardware, no installation and no setup fees.',
    cardText: 'Live, human-led monitoring of your existing cameras from our remote monitoring team.',
    forWho: [
      'Store owners who already have CCTV but no one watching it in real time',
      'Convenience, liquor, grocery, smoke shop and gas station store operators',
      'Owners managing one or several retail locations',
      'Businesses that want monitoring without long contracts or new equipment',
    ],
    sections: [
      {
        heading: 'How remote CCTV monitoring works',
        paragraphs: [
          'Most retail CCTV systems only record. Footage is reviewed after something has already gone wrong. Remote monitoring adds a person who watches the live feeds while the store is operating, so issues can be acted on while they are still happening.',
          'With Secure Monitoring, you give our team authorized, view-only remote access to your existing system. Our operators then watch your agreed cameras during your agreed hours and follow the procedure we set up with you: who to call, what to report, and when to escalate.',
        ],
        bullets: [
          'You share secure remote viewing access to your existing NVR, DVR or camera app.',
          'We agree on monitoring hours (up to 24/7), priority cameras and designated contacts.',
          'Operators watch live feeds and identify suspicious or unusual activity.',
          'Your designated contacts are alerted by phone call or WhatsApp.',
          'Each incident is logged, and reports are shared on the schedule you choose.',
        ],
      },
      {
        heading: 'Monitoring the cameras you already have',
        paragraphs: [
          'We do not sell, install or replace cameras. Most modern systems that support remote viewing (through the manufacturer’s app, a web portal or NVR/DVR remote access) can be monitored. Compatibility is confirmed during your consultation and free trial, before you pay anything.',
          'Because there is nothing to install, there are no setup fees. You pay a monthly fee per site, tailored to the number of cameras and the monitoring hours you need.',
        ],
      },
      {
        heading: 'Live human monitoring, not automated analytics',
        paragraphs: [
          'Remote monitoring services work in different ways. Here is exactly what our service is and is not, so you can compare like with like.',
        ],
        table: MONITORING_TYPES_TABLE,
      },
      {
        heading: 'Why our monitoring team is based in India',
        paragraphs: [
          'Secure Monitoring is an India-based business. Our team works from India and serves US retail clients remotely. We do not have US offices or US-based staff, and we say so openly.',
          'The time difference works in your favor: overnight and early-morning hours in the United States fall during the working day in India, so late-night coverage is staffed the same way as daytime coverage. All communication with your team is in English.',
        ],
      },
    ],
    deliverables: [
      'Live monitoring of agreed cameras during agreed hours (up to 24/7)',
      'Phone call or WhatsApp alerts to your designated contacts',
      'A 30-second target to begin our response once an actionable incident is identified',
      'Incident logs and monitoring reports',
      'Operational support for your store team through WhatsApp',
    ],
    limitations: [
      'We can only see what your cameras show. Blind spots, poor lighting and outages limit coverage.',
      'We monitor video only. We do not listen to or record audio.',
      'We are not an emergency service and do not dispatch guards. Your team remains responsible for on-site response.',
      'Monitoring supports loss prevention but cannot guarantee that theft or incidents will be prevented.',
    ],
    faqs: [
      { q: 'Do I need to buy new cameras for remote CCTV monitoring?', a: 'No. We monitor the cameras you already have, provided your system supports secure remote viewing. Compatibility is checked during the consultation and the 7-day free trial.' },
      { q: 'How much does remote CCTV monitoring cost?', a: 'Plans start at $199 per site per month (Basic) and $299 per site per month (Professional), with Enterprise pricing from $699 per month. Your final price depends on the number of cameras and the monitoring hours you need. There are no setup fees.' },
      { q: 'Who watches my cameras?', a: 'Trained monitoring operators employed by Secure Monitoring, working from India. Access to your feeds is limited to the people assigned to your account.' },
      { q: 'Is there a contract?', a: 'No long-term contract. Plans are month to month and you can cancel with 3 business days’ notice before your next billing date.' },
      { q: 'Can I try it first?', a: 'Yes. New customers get a 7-day free trial with no card required.' },
    ],
    relatedServices: ['live-video-monitoring', 'retail-cctv-monitoring', 'security-incident-alerts', 'multi-location-cctv-monitoring'],
    relatedIndustries: ['convenience-stores', 'liquor-stores', 'small-retail-businesses'],
  },
  {
    slug: 'live-video-monitoring',
    name: '24/7 Live Video Monitoring',
    serviceType: 'Live video monitoring',
    metaTitle: '24/7 Live Video Monitoring Services',
    metaDescription: 'Live video monitoring by trained human operators, 24/7 or during the hours you choose. Real people watch your store cameras and alert your team in real time.',
    h1: '24/7 live video monitoring by real people',
    summary: 'Live video monitoring means a trained person is actively viewing your camera feeds as events happen, rather than reviewing recordings afterwards. Secure Monitoring provides live, human-led video monitoring for US retail stores around the clock or during the hours you choose, using your existing cameras.',
    cardText: 'Trained operators watching your cameras in real time, 24/7 or on your schedule.',
    forWho: [
      'Stores open late or 24 hours',
      'Owners who want someone watching overnight and on weekends',
      'Stores with lone workers on some shifts',
      'Businesses that have tried motion alerts and found them too noisy',
    ],
    sections: [
      {
        heading: 'What “live” means in practice',
        paragraphs: [
          'During your monitoring hours, an operator has your cameras open on a multi-camera view and works through them continuously, giving extra attention to the cameras you mark as priority (usually entrances, registers and high-value aisles).',
          'To be clear about what live monitoring can and cannot do: an operator watches several feeds at once, so not every camera is studied every second. That is why we agree on priority cameras and the behaviour that matters most to you before monitoring begins.',
        ],
      },
      {
        heading: 'Choose your coverage hours',
        paragraphs: [
          'Plans are priced for 24/7 monitoring of one site. If you only need specific hours, such as overnight, weekends or opening and closing windows, we tailor the price to the active monitoring hours you need.',
        ],
        bullets: [
          '24/7 coverage for stores that never close',
          'Overnight coverage while the store is open with minimal staff',
          'After-hours coverage when the store is closed',
          'Opening and closing windows only',
        ],
      },
      {
        heading: 'How live monitoring compares with other approaches',
        table: MONITORING_TYPES_TABLE,
      },
      {
        heading: 'Continuity across shifts',
        paragraphs: [
          'Your site’s instructions, contacts and recent incidents are recorded in your monitoring log, so the operator on shift has the same information as the operator before them. Anything still open at the end of a shift is handed over and noted in the log.',
        ],
      },
    ],
    deliverables: [
      'Human operators watching your feeds during agreed hours',
      'Priority-camera setup agreed with you',
      'Real-time phone or WhatsApp alerts',
      'Shift handover notes in your monitoring log',
      'Incident reports',
    ],
    limitations: [
      'Operators watch multiple feeds; not every camera is viewed every second.',
      'Coverage depends on your internet connection and camera uptime.',
      'Video only: no audio monitoring and no two-way talk-down.',
      'We alert your team; we do not send guards or attend the site.',
    ],
    faqs: [
      { q: 'Is the monitoring really done by people?', a: 'Yes. All monitoring is done by trained human operators. We do not use AI analytics or automated alerts to decide what to report.' },
      { q: 'Can I get monitoring only at night?', a: 'Yes. Plans are priced for 24/7 monitoring per site, and the price is tailored if you need only specific hours, such as overnight or weekends.' },
      { q: 'How quickly do you respond to an incident?', a: 'Our target is to begin our response, such as calling your designated contact, within 30 seconds of identifying an actionable incident. This is a target, not a guarantee of resolution.' },
      { q: 'What happens if my internet goes down?', a: 'If we lose access to your feeds, we note it in your log and notify your designated contact so the issue can be checked.' },
    ],
    relatedServices: ['remote-cctv-monitoring', 'security-incident-alerts', 'store-opening-closing-monitoring', 'daily-monitoring-reports'],
    relatedIndustries: ['convenience-stores', 'gas-stations', 'liquor-stores'],
  },
  {
    slug: 'retail-cctv-monitoring',
    name: 'Retail Store CCTV Monitoring',
    serviceType: 'Retail store CCTV monitoring',
    metaTitle: 'Retail Store Video & CCTV Monitoring',
    metaDescription: 'Remote CCTV monitoring designed for retail stores: sales floor, registers, entrances and stockrooms watched live by trained operators, with alerts to your staff.',
    h1: 'Video monitoring built for retail stores',
    summary: 'Retail store CCTV monitoring is live, remote observation of a shop’s cameras, focused on the places where retail losses and incidents happen: entrances, registers, high-value shelves and stockrooms. Secure Monitoring provides it for independent and multi-location retailers in the United States, using the store’s existing camera system.',
    cardText: 'Monitoring focused on entrances, registers, aisles and stockrooms in retail stores.',
    forWho: [
      'Independent retailers and franchise operators',
      'Convenience, grocery, liquor and smoke shop owners',
      'Owners who cannot be on site every shift',
      'Managers who want visibility across the store, not just the front door',
    ],
    sections: [
      {
        heading: 'Where retail monitoring focuses',
        paragraphs: [
          'Retail stores have a predictable layout of risk. During setup we map your cameras to the areas below and agree on what our operators should look for in each.',
        ],
        table: [
          ['Store area', 'What operators look for'],
          ['Entrances and exits', 'Groups entering together, concealed items on exit, people lingering at the door, the store opening on time'],
          ['Registers and counters', 'Unattended drawers, drawer activity with no customer present, items passed over the counter without a visible sale'],
          ['High-value aisles', 'Concealment, bag stuffing, removing packaging, repeated visits to the same shelf'],
          ['Stockroom and back door', 'Unexpected access, items leaving through the back, doors propped open'],
          ['Parking lot and exterior', 'Loitering, vehicles waiting with engines running, after-hours activity (where cameras cover it)'],
        ],
      },
      {
        heading: 'Working with your store team',
        paragraphs: [
          'Your staff are the people on site, so our job is to give them timely, specific information. When something needs attention, we call the designated person on shift and describe what we are seeing and where, so they can decide how to respond safely.',
          'We encourage every client to set a clear staff-safety policy. Our operators will never ask your employees to confront or detain anyone.',
        ],
      },
      {
        heading: 'Plans for retail stores',
        paragraphs: [
          'Most single stores choose Basic ($199 per site per month) or Professional ($299 per site per month), tailored to camera count and hours. Retailers with several stores usually move to Enterprise for consistent procedures and consolidated reporting.',
        ],
      },
    ],
    deliverables: [
      'Camera-by-camera monitoring plan for your store',
      'Live monitoring during agreed hours',
      'Alerts to the staff member on shift or to the owner',
      'Incident logs and store activity reports',
    ],
    limitations: [
      'We cannot see areas that your cameras do not cover.',
      'We do not have access to your point-of-sale data, so register observations are visual only.',
      'Video only: no audio.',
      'Staff remain responsible for any on-site action.',
    ],
    faqs: [
      { q: 'How many cameras can you monitor in one store?', a: 'There is no fixed limit; pricing is tailored to the number of cameras and monitoring hours. During setup we also agree on priority cameras so the most important areas get the most attention.' },
      { q: 'Will my staff know they are being monitored?', a: 'They should. We recommend that you inform employees and post CCTV signage in line with the laws in your state. Our Terms require customers to comply with local surveillance and notice requirements.' },
      { q: 'Can you see what is rung up at the register?', a: 'Only what is visible on camera. We do not connect to point-of-sale systems, so we cannot match video to transactions.' },
      { q: 'Do you stop shoplifters?', a: 'No. We alert your designated staff so they can respond according to your store policy. We never ask employees to confront anyone.' },
    ],
    relatedServices: ['retail-loss-prevention', 'employee-theft-prevention', 'customer-activity-monitoring', 'daily-monitoring-reports'],
    relatedIndustries: ['convenience-stores', 'grocery-stores', 'small-retail-businesses', 'smoke-shops'],
  },
  {
    slug: 'retail-loss-prevention',
    name: 'Retail Loss Prevention',
    serviceType: 'Retail loss prevention monitoring',
    metaTitle: 'Shoplifting & Loss Prevention Video Monitoring',
    metaDescription: 'Remote loss prevention monitoring for US retail stores. Operators watch for shoplifting and suspicious customer activity live and alert your staff in real time.',
    h1: 'Shoplifting and loss prevention monitoring',
    summary: 'Retail loss prevention monitoring uses live CCTV observation to spot shoplifting and suspicious customer behaviour early, so store staff can respond before items leave the store. Secure Monitoring provides remote, human-led loss prevention monitoring for US retailers using their existing cameras, with real-time alerts to designated staff.',
    cardText: 'Spot shoplifting and suspicious customer behaviour early, with real-time staff alerts.',
    forWho: [
      'Stores with recurring shoplifting losses',
      'Stores carrying high-value, easy-to-conceal products',
      'Owners without a dedicated loss prevention team',
      'Stores that want evidence-quality incident logs',
    ],
    sections: [
      {
        heading: 'Suspicious activity our operators watch for',
        paragraphs: [
          'Operators are briefed on your store layout and your highest-loss products. They look for behaviour, not appearance. Monitoring focuses on what people do, never on who they are.',
        ],
        bullets: [
          'Concealing merchandise in bags, clothing or containers',
          'Removing security tags or product packaging',
          'Repeated visits to high-value shelves without purchase',
          'Groups splitting up to distract staff',
          'Leaving through the entrance with unpaid items',
          'Loitering near exits, stockroom doors or registers',
        ],
      },
      {
        heading: 'What happens when we spot something',
        paragraphs: [
          'The operator calls the designated staff member or manager and describes what is happening, which aisle and which person, so your team can respond according to your store policy (for example, offering customer service, which often deters theft). The observation is logged with the time and camera.',
          'On the Professional plan, and only where you have authorized it in the agreed procedure, we can also contact local law enforcement. We cannot guarantee a police response.',
        ],
      },
      {
        heading: 'Prevention over confrontation',
        paragraphs: [
          'Industry guidance consistently warns against staff confronting shoplifters. Our service is designed to give your team early warning so that visible attention and good customer service do the work. Our operators never instruct staff to chase, detain or physically intervene.',
        ],
      },
      {
        heading: 'Building a record over time',
        paragraphs: [
          'Incident logs help you spot patterns: times of day, products, repeat behaviour. Many owners use monthly summaries to adjust staffing, move high-risk products or reposition cameras.',
        ],
      },
    ],
    deliverables: [
      'Briefing on your high-loss products and areas',
      'Live observation for shoplifting behaviour',
      'Real-time calls or WhatsApp alerts to staff',
      'Timestamped incident log entries',
      'Pattern summaries in periodic reports',
    ],
    limitations: [
      'We cannot prevent all theft, and some concealment happens out of camera view.',
      'We do not identify people or use facial recognition.',
      'We do not detain, confront or dispatch anyone.',
      'Law-enforcement contact is only available on the Professional plan where authorized, and police response is not guaranteed.',
    ],
    faqs: [
      { q: 'Can remote monitoring reduce shoplifting?', a: 'It can help by alerting staff while an incident is still happening and by building a record of patterns. It cannot guarantee that every theft is prevented.' },
      { q: 'Do you call the police?', a: 'On the Professional plan, we contact law enforcement when it is appropriate and you have authorized it in your agreed procedure. Otherwise we alert your designated staff.' },
      { q: 'Do you use facial recognition?', a: 'No. Our operators watch behaviour on your live feeds. We do not use facial recognition or AI analytics.' },
      { q: 'Can I get footage of an incident?', a: 'Recordings stay on your own system. Our incident log gives the time and camera, so you can find and export the footage yourself.' },
    ],
    relatedServices: ['security-incident-alerts', 'employee-theft-prevention', 'customer-activity-monitoring', 'retail-cctv-monitoring'],
    relatedIndustries: ['liquor-stores', 'convenience-stores', 'smoke-shops', 'grocery-stores'],
  },
  {
    slug: 'employee-theft-prevention',
    name: 'Employee Theft Prevention',
    serviceType: 'Employee theft prevention and activity monitoring',
    metaTitle: 'Employee Theft Prevention Monitoring',
    metaDescription: 'Remote employee activity monitoring for retail stores: register and cash drawer activity, stockroom access and procedures, observed live and reported to the owner.',
    h1: 'Employee theft prevention and activity monitoring',
    summary: 'Employee theft prevention monitoring is the live observation of register, cash drawer, stockroom and back-door activity to identify behaviour that may indicate internal theft or procedure breaches. Secure Monitoring provides this for US retail owners remotely, reporting factual observations to the owner or a designated manager, never to other staff.',
    cardText: 'Register, cash drawer and stockroom activity observed live and reported to the owner.',
    forWho: [
      'Owners with unexplained cash or inventory shortages',
      'Stores where one employee often works alone',
      'Owners who cannot be on site to supervise every shift',
      'Multi-store operators who need consistent procedures',
    ],
    sections: [
      {
        heading: 'Activity we observe',
        bullets: [
          'Cash drawer opened with no customer at the counter',
          'Cash handled away from the register or placed in pockets or bags',
          'Items passed to friends or family without a visible sale',
          'Unrecorded removal of stock from shelves or the stockroom',
          'Back doors opened outside delivery times',
          'Store procedures skipped (for example, opening late or leaving the register unattended)',
        ],
      },
      {
        heading: 'Cash drawer activity monitoring',
        paragraphs: [
          'Where a camera clearly shows the register and drawer, operators watch for drawer activity that does not match a customer transaction and note the time and camera. Because we do not connect to your point-of-sale system, these are visual observations for you to check against your sales records.',
        ],
      },
      {
        heading: 'Discreet, factual reporting',
        paragraphs: [
          'Observations about employees are reported only to the owner or the manager you designate, by private message or call, and recorded in your log with times and camera names. We describe what we saw. We do not make accusations or judgements. Any decision about an employee is yours.',
        ],
      },
      {
        heading: 'Employee notice and the law',
        paragraphs: [
          'Several US states have rules about notifying employees of workplace monitoring, and video must never cover private areas such as restrooms. We require customers to comply with the laws that apply in their state, and we recommend written notice to employees and visible CCTV signage. Please consult a local legal adviser if you are unsure.',
        ],
      },
    ],
    deliverables: [
      'Live observation of registers, drawers, stockroom and back doors',
      'Private alerts or reports to the owner or a designated manager',
      'Timestamped log entries for each observation',
      'Optional periodic summaries of procedure compliance',
    ],
    limitations: [
      'Observations are visual only; we have no access to POS or inventory data.',
      'We do not monitor audio, phones or computers.',
      'Observations are not proof of wrongdoing; verify them against your records.',
      'Cameras must not cover private areas; we will not monitor them.',
    ],
    faqs: [
      { q: 'Will you tell my staff when you spot something?', a: 'Not about employee concerns. Those are reported privately to the owner or the designated manager only.' },
      { q: 'Can you monitor the cash drawer?', a: 'Yes, where a camera clearly shows the register and drawer. We note drawer activity that does not appear to match a customer transaction, as a visual observation for you to check.' },
      { q: 'Is it legal to monitor employees on camera?', a: 'Video monitoring of work areas is common in US retail, but notice rules vary by state and private areas must never be monitored. You are responsible for compliance at your premises; check with a local legal adviser.' },
      { q: 'Do you record audio of employees?', a: 'No. We monitor video only, and customers must disable audio on the feeds they share with us.' },
    ],
    relatedServices: ['store-opening-closing-monitoring', 'daily-monitoring-reports', 'retail-loss-prevention', 'multi-location-cctv-monitoring'],
    relatedIndustries: ['convenience-stores', 'gas-stations', 'liquor-stores', 'small-retail-businesses'],
  },
  {
    slug: 'customer-activity-monitoring',
    name: 'Customer Activity Monitoring',
    serviceType: 'Customer activity monitoring',
    metaTitle: 'Customer Activity & Store Traffic Monitoring',
    metaDescription: 'Human-led monitoring of customer entry, exit and in-store activity, with activity summaries that help retail owners understand busy periods and store traffic.',
    h1: 'Customer entry, exit and activity monitoring',
    summary: 'Customer activity monitoring is the observation of how customers enter, move through and leave a store, to keep the store safe and give owners a clear picture of store traffic. Secure Monitoring provides this remotely for US retailers, with human-recorded activity summaries rather than automated people counting.',
    cardText: 'Human-recorded entry, exit and in-store activity summaries for your store.',
    forWho: [
      'Owners who want to understand busy and quiet periods',
      'Stores planning staffing around customer traffic',
      'Stores with crowding or queue concerns at peak times',
      'Owners comparing activity between locations',
    ],
    sections: [
      {
        heading: 'What we observe',
        bullets: [
          'Customer entries and exits at monitored doors',
          'Queue build-up at registers',
          'Unusual crowding or groups gathering',
          'Customers in restricted or staff-only areas',
          'After-hours approaches to the store',
        ],
      },
      {
        heading: 'Customer counting and activity reporting',
        paragraphs: [
          'Where you request it, operators record customer entries during agreed time windows and summarize activity in your reports, such as the busiest hours or when queues formed. These counts are recorded by people watching live, not by an automated people counter, so treat them as close estimates.',
        ],
      },
      {
        heading: 'Safety first',
        paragraphs: [
          'Customer activity monitoring is also about safety: noticing a crowd forming, a customer in distress or an argument at the counter, and alerting your staff quickly so they can respond appropriately.',
        ],
      },
    ],
    deliverables: [
      'Live observation of customer activity',
      'Alerts for crowding, restricted-area access or concerning behaviour',
      'Human-recorded entry counts for agreed windows',
      'Activity summaries in your reports',
    ],
    limitations: [
      'Counts are human estimates, not automated people-counter data.',
      'We do not identify customers or use facial recognition.',
      'Coverage depends on entrance camera angles and image quality.',
    ],
    faqs: [
      { q: 'Do you use automatic people counters?', a: 'No. Customer counts are recorded by our operators watching live, so they are close estimates rather than sensor data.' },
      { q: 'Can you tell me my busiest hours?', a: 'Yes. Activity summaries show when traffic and queues peaked during monitored windows.' },
      { q: 'Do you identify customers?', a: 'No. We observe behaviour and activity only, and we do not use facial recognition.' },
    ],
    relatedServices: ['daily-monitoring-reports', 'retail-loss-prevention', 'retail-cctv-monitoring'],
    relatedIndustries: ['grocery-stores', 'convenience-stores', 'small-retail-businesses'],
  },
  {
    slug: 'store-opening-closing-monitoring',
    name: 'Store Opening & Closing Monitoring',
    serviceType: 'Store opening and closing monitoring',
    metaTitle: 'Store Opening & Closing Monitoring',
    metaDescription: 'Remote monitoring of store opening and closing: confirm your store opens on time, procedures are followed and staff are safe during the most vulnerable minutes.',
    h1: 'Store opening and closing monitoring',
    summary: 'Store opening and closing monitoring is live CCTV observation during the minutes when a store opens and closes, to confirm it opens on time, procedures are followed and staff are safe. Secure Monitoring provides it remotely for US retailers and alerts the owner or manager if anything is late or unusual.',
    cardText: 'Confirm your store opens on time and closes safely, with alerts if anything is off.',
    forWho: [
      'Owners who are not on site at opening or closing',
      'Stores with one employee opening or closing alone',
      'Multi-location owners who need every store open on time',
      'Stores with cash handling at close',
    ],
    sections: [
      {
        heading: 'What we check at opening',
        bullets: [
          'Staff arrive and the store opens at the scheduled time',
          'Shutters, lights and doors are opened as expected',
          'No one waits near the entrance as staff unlock',
          'Registers are set up before customers arrive',
        ],
      },
      {
        heading: 'What we check at closing',
        bullets: [
          'The last customers leave before doors are locked',
          'Cash-up happens at the register and not in view of the door',
          'Back doors and stockrooms are closed',
          'Lights and shutters are closed and the store is secured on time',
        ],
      },
      {
        heading: 'Alerts when things are off',
        paragraphs: [
          'If the store has not opened within an agreed time, or closing does not follow the expected routine, we contact the owner or designated manager. Each opening and closing is recorded in the monitoring log, which gives you a simple daily record of punctuality.',
        ],
      },
    ],
    deliverables: [
      'Live observation at agreed opening and closing times',
      'Late-opening and irregular-closing alerts',
      'Daily opening and closing entries in your log',
    ],
    limitations: [
      'We can confirm only what cameras show; we cannot see alarm panels or locks unless they are on camera.',
      'We do not hold keys or attend the site.',
    ],
    faqs: [
      { q: 'Can I get only opening and closing monitoring?', a: 'Yes. Plans are priced for 24/7 monitoring per site, and the price is tailored if you need only specific monitoring windows.' },
      { q: 'Who do you contact if the store doesn’t open?', a: 'The owner or manager you designate, by phone call or WhatsApp.' },
      { q: 'Do you confirm the alarm is set?', a: 'Only if the alarm panel or its indicator is clearly visible on a camera. Otherwise we confirm the visible closing steps.' },
    ],
    relatedServices: ['employee-theft-prevention', 'daily-monitoring-reports', 'multi-location-cctv-monitoring'],
    relatedIndustries: ['convenience-stores', 'gas-stations', 'small-retail-businesses'],
  },
  {
    slug: 'security-incident-alerts',
    name: 'Real-Time Incident Alerts',
    serviceType: 'Real-time security incident alerts',
    metaTitle: 'Real-Time CCTV Security Incident Alerts',
    metaDescription: 'Real-time security alerts from human CCTV operators, by phone call or WhatsApp, with an agreed escalation path and a 30-second response target.',
    h1: 'Real-time security incident alerts',
    summary: 'Real-time security incident alerts are notifications sent to your designated contacts as soon as a monitoring operator sees something that needs attention. At Secure Monitoring every alert is checked by a person before it is sent, delivered by phone call or WhatsApp, and logged, with a 30-second target to begin the response once an incident is identified.',
    cardText: 'Human-verified alerts by phone call or WhatsApp, with an agreed escalation path.',
    forWho: [
      'Owners tired of false motion alerts on their phone',
      'Stores that need someone to call staff during an incident',
      'Owners who want to be told only about what matters',
    ],
    sections: [
      {
        heading: 'How an alert works',
        bullets: [
          'An operator sees activity that matches your agreed alert criteria.',
          'The operator checks it against your procedure.',
          'Your designated contact is called or messaged with a short description of what is happening, where and when.',
          'If the first contact is unreachable, we move to the next person on your escalation list.',
          'The incident, contacts made and outcome are logged.',
        ],
      },
      {
        heading: 'Your escalation path',
        paragraphs: [
          'Before monitoring begins we agree on an escalation list, for example the employee on shift, then the store manager, then the owner, along with which events justify a phone call versus a WhatsApp message. On the Professional plan, and only where you authorize it, the procedure can include contacting local law enforcement.',
        ],
        table: [
          ['Alert level', 'Example', 'Typical action'],
          ['Information', 'Store opened 10 minutes late', 'WhatsApp message to the manager; logged'],
          ['Attention', 'Customer concealing items in aisle 4', 'Call to staff on shift'],
          ['Urgent', 'Suspected robbery or violence', 'Immediate call to owner or manager; law enforcement if authorized (Professional)'],
        ],
      },
      {
        heading: 'Human-verified, not automated',
        paragraphs: [
          'Automated motion alerts tend to fire on shadows, headlights and insects, and people soon start ignoring them. Our alerts come from a person who has looked at the situation, so each one carries real information.',
        ],
      },
    ],
    deliverables: [
      'Agreed alert criteria and escalation list',
      'Phone call and WhatsApp alerts',
      'A 30-second target to begin the response',
      'Logged record of every alert and contact attempt',
    ],
    limitations: [
      'The 30-second figure is a target to begin our response, not a guarantee of resolution.',
      'We cannot guarantee that contacts answer or that police respond.',
      'We are not an emergency service. In an emergency, staff on site should call 911 directly.',
    ],
    faqs: [
      { q: 'How will I receive alerts?', a: 'By phone call or WhatsApp to the contacts on your escalation list, depending on how urgent the event is.' },
      { q: 'Are alerts automated?', a: 'No. Every alert is reviewed by a trained operator before it is sent.' },
      { q: 'Do you call 911?', a: 'We are not an emergency service, and staff on site should call 911 in an emergency. On the Professional plan we can contact law enforcement where you have authorized it, but police response is not guaranteed.' },
      { q: 'Can I change who gets alerts?', a: 'Yes. Tell us by email or WhatsApp and we update your escalation list.' },
    ],
    relatedServices: ['live-video-monitoring', 'retail-loss-prevention', 'daily-monitoring-reports'],
    relatedIndustries: ['convenience-stores', 'liquor-stores', 'gas-stations'],
  },
  {
    slug: 'daily-monitoring-reports',
    name: 'Daily Monitoring Reports',
    serviceType: 'CCTV monitoring reports',
    metaTitle: 'Daily CCTV Monitoring Reports & Logs',
    metaDescription: 'Daily CCTV monitoring reports and incident logs for retail owners: what happened, when, on which camera and who was contacted, delivered by email or WhatsApp.',
    h1: 'Daily CCTV monitoring reports and incident logs',
    summary: 'CCTV monitoring reports are written records of what monitoring operators observed at your store, including incidents, times, cameras and the actions taken. Secure Monitoring maintains a log for every monitored site and sends report summaries by email or WhatsApp on the schedule you choose, typically daily.',
    cardText: 'Timestamped logs and daily summaries of what happened at each store.',
    forWho: [
      'Owners who want a daily picture of their store without watching footage',
      'Managers who need records for follow-up with staff',
      'Multi-location operators comparing sites',
    ],
    sections: [
      {
        heading: 'What a report includes',
        table: [
          ['Field', 'Example'],
          ['Date and time', '2026-11-14, 21:42 EST'],
          ['Site and camera', 'Main St store, Camera 3 (aisle 4)'],
          ['Observation', 'Customer placed two items into a backpack and walked toward the exit'],
          ['Action taken', 'Called cashier on shift at 21:42; customer approached at exit'],
          ['Status', 'Closed. Owner informed by WhatsApp.'],
        ],
        paragraphs: ['The example above is illustrative and shows the format, not a real incident.'],
      },
      {
        heading: 'Report schedules',
        bullets: [
          'Daily summary of incidents and opening and closing times',
          'Immediate incident notes for urgent events',
          'Weekly or monthly pattern summaries on request',
          'Custom reporting for Enterprise clients',
        ],
      },
      {
        heading: 'Using reports with your own footage',
        paragraphs: [
          'Your recordings stay on your own system. Because each log entry includes the time and camera, you can find and export the matching footage quickly if you need it for staff conversations, insurance or a police report.',
        ],
      },
    ],
    deliverables: [
      'A continuous monitoring log per site',
      'Daily summaries by email or WhatsApp',
      'Incident-level detail with times and cameras',
      'Pattern summaries on request',
    ],
    limitations: [
      'Reports cover what operators observed during monitored hours.',
      'We do not store copies of your recordings.',
    ],
    faqs: [
      { q: 'How do I receive reports?', a: 'By email or WhatsApp, on the schedule you choose. Daily summaries are the most common.' },
      { q: 'Do reports include video clips?', a: 'Recordings stay on your system. Reports give the exact time and camera so you can locate the footage yourself.' },
      { q: 'How long do you keep logs?', a: 'Up to 12 months after the service ends, unless you ask us to delete them sooner. See our Privacy Policy.' },
    ],
    relatedServices: ['security-incident-alerts', 'employee-theft-prevention', 'customer-activity-monitoring', 'multi-location-cctv-monitoring'],
    relatedIndustries: ['grocery-stores', 'small-retail-businesses', 'convenience-stores'],
  },
  {
    slug: 'multi-location-cctv-monitoring',
    name: 'Multi-Location CCTV Monitoring',
    serviceType: 'Multi-location CCTV monitoring',
    metaTitle: 'Multi-Location Video Monitoring for Retail',
    metaDescription: 'Remote CCTV monitoring for retailers with several stores: consistent procedures, per-site contacts and consolidated reports. Enterprise plans from $699 per month.',
    h1: 'Multi-location CCTV monitoring for retail chains',
    summary: 'Multi-location CCTV monitoring is remote monitoring of several stores under one service, with consistent procedures and consolidated reporting. Secure Monitoring monitors multiple US retail locations from one team, with per-site contacts and escalation lists, using each store’s existing cameras.',
    cardText: 'One monitoring team and consistent procedures across all your stores.',
    forWho: [
      'Owners of 2 or more stores',
      'Franchise operators and small regional chains',
      'Operators with different camera systems at different stores',
    ],
    sections: [
      {
        heading: 'Consistency across every store',
        paragraphs: [
          'Each store gets its own camera plan, monitoring hours and contact list, while procedures and reporting stay consistent across the group. That makes it easy to compare stores and spot where problems repeat.',
        ],
      },
      {
        heading: 'Mixed camera systems are fine',
        paragraphs: [
          'Stores acquired or opened at different times often have different camera brands. As long as each system supports secure remote viewing, we can monitor it. There is no need to standardize hardware first.',
        ],
      },
      {
        heading: 'Pricing for multiple locations',
        paragraphs: [
          'Single sites are priced per site per month. Groups usually move to an Enterprise plan (from $699 per month), priced around the number of locations, cameras, hours and reporting needs, with dedicated operational support and tailored reporting.',
        ],
      },
      {
        heading: 'Rolling out to new stores',
        paragraphs: [
          'Most groups start with one or two stores on the free trial, then add locations once the procedure is proven. Adding a store is done per site, and cancelling a single store does not affect the others.',
        ],
      },
    ],
    deliverables: [
      'Per-store camera plans, hours and contacts',
      'Consistent procedures across locations',
      'Consolidated reporting across stores',
      'Dedicated operational support (Enterprise)',
    ],
    limitations: [
      'Each store needs a working remote-viewing setup and a reliable internet connection.',
      'Store-level response remains the responsibility of on-site staff.',
    ],
    faqs: [
      { q: 'Can you monitor stores with different camera brands?', a: 'Yes, as long as each system supports secure remote viewing. Compatibility is confirmed per store.' },
      { q: 'How is multi-location monitoring priced?', a: 'Individual sites start at $199 per site per month. Enterprise plans for groups start from $699 per month and are priced around locations, cameras, hours and reporting.' },
      { q: 'Can I add or remove a store later?', a: 'Yes. Locations are added and cancelled per site, and cancelling one store does not affect the others.' },
    ],
    relatedServices: ['remote-cctv-monitoring', 'daily-monitoring-reports', 'store-opening-closing-monitoring', 'employee-theft-prevention'],
    relatedIndustries: ['convenience-stores', 'gas-stations', 'grocery-stores'],
  },
]

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug)
