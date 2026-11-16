import type { IndustryPage } from './content-types'

// Industry pages. Every capability described here must match what Secure Monitoring
// actually provides: human operators watching live feeds from the customer's existing
// cameras (video only), phone/WhatsApp alerts to designated store contacts, incident logs
// and reports, and law-enforcement contact only where authorised on the Professional plan.
// No AI analytics, talk-down audio, ID verification, POS integration, guards or hardware.

export const INDUSTRIES: IndustryPage[] = [
  {
    slug: 'convenience-stores',
    name: 'Convenience Stores',
    metaTitle: 'Convenience Store Video Monitoring',
    metaDescription:
      'Live remote CCTV monitoring for US convenience stores using your existing cameras. Human operators watch the counter, aisles and doors and alert your staff fast.',
    h1: 'Remote CCTV monitoring for convenience stores',
    summary:
      'Remote CCTV monitoring for convenience stores means a trained operator watches your existing store cameras live and alerts your staff by phone or WhatsApp when something needs attention. Secure Monitoring is an India-based team that provides this human-led monitoring to US convenience stores, during the hours you choose, up to 24/7, without new hardware.',
    cardText: 'Counter, aisle and entrance monitoring for long-hours stores with small teams.',
    risks: [
      {
        title: 'Lone-worker shifts',
        text: 'Many convenience stores run with one employee on shift, especially late at night. That employee cannot watch the camera monitor while serving customers, stocking shelves and handling deliveries.',
      },
      {
        title: 'High-theft items near the counter',
        text: 'Tobacco, vapes, energy drinks, candy and health and beauty items are small, easy to conceal and often displayed within reach of customers.',
      },
      {
        title: 'Register and cash handling',
        text: 'A busy counter with frequent cash transactions creates opportunities for errors, voids, unrecorded sales and cash drawer issues that owners rarely see in real time.',
      },
      {
        title: 'Long or 24-hour opening hours',
        text: 'Stores open early, close late or never close at all. Owners cannot personally supervise every shift, and overnight hours carry the most risk.',
      },
    ],
    focus: [
      'The counter and register area: drawer activity, items passed over the counter, customer interactions',
      'Entrances and exits: people entering with face coverings pulled up, groups entering together, people leaving quickly with unpaid items',
      'High-theft aisles and displays: concealment behavior, loitering at tobacco, beverage and snack displays',
      'Employee activity: unusual handling of merchandise, extended breaks away from the counter, back-door use',
      'Opening and closing routines: whether the store opens and closes on time and the closing procedure is followed',
    ],
    cameraNotes: [
      'An overhead or angled camera on the register gives the clearest view of cash drawer activity.',
      'A camera facing the main entrance at face height helps operators judge who is entering and leaving.',
      'Cover the cooler doors and any aisle with tobacco, vape or high-value items.',
      'Add a camera on the back door or stockroom entrance if deliveries and staff breaks use it.',
      'Make sure the overnight view is usable: check that night vision or store lighting keeps faces and hands visible.',
    ],
    exampleScenario: {
      title: 'Illustrative example: a late-night shoplifting attempt',
      steps: [
        'At 11:40 pm, the operator watching the store sees a customer place two energy drinks inside a jacket in the beverage aisle while the clerk is serving another customer.',
        'The operator keeps the person in view and confirms the behavior on a second camera angle.',
        'Within the 30-second response target, the operator calls the clerk on the agreed number and describes the person and the aisle.',
        'The clerk decides how to respond, following the store’s own policy (for example, offering assistance or asking the customer to pay).',
        'The operator logs the time, the camera views, what was observed and who was contacted, and the incident appears in the store’s report.',
      ],
    },
    sections: [
      {
        heading: 'Why convenience stores use remote monitoring',
        paragraphs: [
          'Convenience stores already have cameras. What they usually lack is someone watching them. Recorded footage helps after a loss, but it does not help the employee who is alone at the counter while someone fills a bag in aisle three.',
          'Remote monitoring adds a second set of eyes to every shift you choose. Our operators watch the live feeds from your existing system and contact your designated staff member or manager when they see something that needs attention. Your team stays in control of how to respond.',
        ],
      },
      {
        heading: 'What we watch for in a convenience store',
        paragraphs: [
          'Before monitoring starts, we agree with you which cameras matter most, what counts as an incident and who should be called. For most convenience stores, operators concentrate on the counter, the main entrance and the aisles where high-theft items are displayed.',
          'We also watch for patterns that suggest internal issues, such as merchandise being handed to someone without a sale or a register drawer being opened repeatedly with no customer present. These observations are recorded factually and shared with the owner, not with the employee involved.',
        ],
      },
      {
        heading: 'Coverage for late nights and weekends',
        paragraphs: [
          'You can choose 24/7 monitoring or focus on the hours that matter most to you, such as overnight shifts or weekends. Pricing is per site, per month, and is tailored to the number of cameras and the monitoring hours you need. Plans start at $199 per site per month, with a 7-day free trial and no setup fees.',
        ],
      },
      {
        heading: 'Working with multiple stores',
        paragraphs: [
          'Owners and operators with several convenience stores can have every location monitored by the same team, with alerts routed to each store’s own contact and a consolidated view for the owner. See our multi-location monitoring service for how this works.',
        ],
      },
    ],
    limitations: [
      'We monitor video only. We do not use speakers, two-way audio or talk-down, and we do not listen to audio.',
      'We cannot physically intervene. Your staff decide how to respond, and we never instruct employees to confront anyone.',
      'We can only see what your cameras show. Blind spots, poor lighting or a dropped internet connection limit what we can observe.',
      'Law-enforcement contact happens only where it is appropriate, authorized by you and included in your plan (Professional). It does not guarantee a police response.',
    ],
    faqs: [
      {
        q: 'Do I need to buy new cameras for my convenience store?',
        a: 'No. We monitor your existing CCTV system as long as it supports secure remote viewing, such as through the recorder’s remote viewing app or web access. We check compatibility during the consultation and free trial.',
      },
      {
        q: 'Who gets the alert when something happens?',
        a: 'The designated contacts you choose, usually the clerk on shift and the store manager or owner. Alerts are sent by phone call and WhatsApp, following the escalation order agreed with you.',
      },
      {
        q: 'Can you monitor only overnight hours?',
        a: 'Yes. Monitoring hours are agreed per site. Many convenience stores choose overnight or late-evening coverage; others choose 24/7. The monthly price reflects the hours and number of cameras.',
      },
      {
        q: 'Will you tell my employee to stop a shoplifter?',
        a: 'No. We describe what we see and leave the response to your staff and your store policy. We never ask employees to confront or chase anyone.',
      },
      {
        q: 'How much does convenience store monitoring cost?',
        a: 'Plans start at $199 per site per month (Basic) and $299 per site per month (Professional). The final price depends on your cameras and monitoring hours. There is a 7-day free trial with no card required.',
      },
    ],
    relatedServices: ['retail-loss-prevention', 'employee-theft-prevention', 'live-video-monitoring', 'store-opening-closing-monitoring'],
  },
  {
    slug: 'liquor-stores',
    name: 'Liquor Stores',
    metaTitle: 'Liquor Store Video Monitoring',
    metaDescription:
      'Remote CCTV monitoring for US liquor stores. Live operators watch high-value shelves, the register and entrances on your existing cameras and alert staff quickly.',
    h1: 'Remote CCTV monitoring for liquor stores',
    summary:
      'Remote CCTV monitoring for liquor stores means a trained operator watches your existing cameras live, with special attention to high-value shelves, the register and the entrance, and calls your staff when something needs attention. Secure Monitoring is an India-based team that provides this human-led service to US liquor stores during the hours you choose, up to 24/7.',
    cardText: 'Watching high-value shelves, the register and the door in stores with valuable, easy-to-resell stock.',
    risks: [
      {
        title: 'High-value, easy-to-resell stock',
        text: 'Premium spirits are compact and valuable, which makes them a frequent target. A few bottles can represent a significant loss.',
      },
      {
        title: 'Grab-and-run incidents',
        text: 'Liquor stores can experience fast thefts where a person takes bottles near the door and leaves within seconds.',
      },
      {
        title: 'Stockroom and delivery handling',
        text: 'Cases move between deliveries, the stockroom and the shelves. Gaps in that process can lead to internal losses that are hard to trace.',
      },
      {
        title: 'Evening and late-night peaks',
        text: 'Many liquor stores are busiest in the evening, when staff are focused on the counter and less able to watch the floor.',
      },
    ],
    focus: [
      'Premium spirits shelves and locked or high-value displays',
      'Entrances: people lingering near the door, individuals entering with large bags or covered faces',
      'The counter and register: cash drawer activity, items handed over without a sale',
      'Stockroom and back door: delivery check-in, cases leaving through the back',
      'Opening and closing: alarm, lights and lock-up routines visible on camera',
    ],
    cameraNotes: [
      'Point at least one camera directly along the premium spirits shelves so hand movements are visible.',
      'Cover the space between the high-value shelves and the exit; this is where grab-and-run incidents unfold.',
      'An overhead view of the register helps operators see drawer activity clearly.',
      'If deliveries arrive through a back door, a camera on that door and the stockroom adds useful visibility.',
    ],
    exampleScenario: {
      title: 'Illustrative example: suspicious behavior at the spirits shelf',
      steps: [
        'Shortly after 8 pm, the operator notices a customer repeatedly picking up and putting back bottles of a premium brand while watching the counter.',
        'The operator follows the customer across two camera views and sees a bottle placed into a bag.',
        'The operator calls the cashier on the agreed number, describes the customer, and stays on the line while the cashier decides how to respond under store policy.',
        'Because the owner has authorized it on the Professional plan, the operator is also ready to contact local police if the situation escalates and meets the agreed criteria.',
        'The incident is logged with times and camera views for the owner’s report.',
      ],
    },
    sections: [
      {
        heading: 'Why liquor stores benefit from live monitoring',
        paragraphs: [
          'Recorded footage is useful after a theft, but the stock is already gone. Live monitoring gives your team a chance to act while it matters. Our operators watch the areas of the store that carry the most value and call your staff as soon as they see behavior that matches the criteria you have agreed with us.',
          'Because operators are watching rather than an automated system, they can judge context, such as the difference between a customer reading a label and a customer concealing a bottle, and give your staff a clear description.',
        ],
      },
      {
        heading: 'Age-restricted sales: what we can and cannot do',
        paragraphs: [
          'Liquor stores have legal obligations around age-restricted sales. Our operators can observe whether staff appear to be following your ID-check routine at the counter, and note this in reports if you ask us to.',
          'We cannot verify a customer’s ID, judge a customer’s age or make compliance decisions. Responsibility for age verification remains with your staff and your store.',
        ],
      },
      {
        heading: 'Internal loss and stock handling',
        paragraphs: [
          'Not every loss comes from customers. Where your cameras show the stockroom, back door or counter, operators can note unusual handling, such as cases leaving through the back door or merchandise passed over the counter without a visible sale. Observations are reported factually to the owner only.',
        ],
      },
      {
        heading: 'Plans and pricing',
        paragraphs: [
          'Liquor stores often choose the Professional plan ($299 per site per month), which adds authorized law-enforcement contact and enhanced escalation. Basic is $199 per site per month. Final prices are tailored to cameras and monitoring hours, with a 7-day free trial and no setup fees.',
        ],
      },
    ],
    limitations: [
      'We cannot verify customer IDs or ages, and we do not make compliance decisions on your behalf.',
      'We monitor video only, with no talk-down speakers or audio monitoring.',
      'We cannot physically stop a theft. Your staff decide how to respond under your store policy.',
      'Police contact is made only where appropriate, authorized and included in your plan, and does not guarantee a police response.',
    ],
    faqs: [
      {
        q: 'Can you monitor my liquor store with the cameras I already have?',
        a: 'Yes, if your recorder or cameras support secure remote viewing. We confirm compatibility during the consultation and the 7-day free trial.',
      },
      {
        q: 'Do you check customer IDs for alcohol sales?',
        a: 'No. We cannot verify IDs or ages. If you ask us to, operators can observe whether staff appear to follow your ID-check routine and include those observations in reports.',
      },
      {
        q: 'Can you call the police for me?',
        a: 'On the Professional plan, operators can contact law enforcement when it is appropriate, authorized by you and covered by the agreed procedure. We cannot guarantee a police response.',
      },
      {
        q: 'Which hours should a liquor store monitor?',
        a: 'Many liquor stores choose evenings and nights, when they are busiest and staff are focused on the counter. Others choose 24/7 coverage. Hours are agreed per site.',
      },
    ],
    relatedServices: ['retail-loss-prevention', 'security-incident-alerts', 'employee-theft-prevention', 'live-video-monitoring'],
  },
  {
    slug: 'grocery-stores',
    name: 'Grocery Stores',
    metaTitle: 'Grocery Store Video Monitoring',
    metaDescription:
      'Remote CCTV monitoring for independent US grocery stores. Live operators watch checkouts, aisles, entrances and receiving areas on your existing cameras.',
    h1: 'Remote CCTV monitoring for grocery stores',
    summary:
      'Remote CCTV monitoring for grocery stores means trained operators watch your existing cameras live across checkouts, aisles, entrances and receiving areas, and alert your managers when something needs attention. Secure Monitoring is an India-based team that provides this human-led service to independent and small-chain grocery stores in the US, during the hours you choose.',
    cardText: 'Checkout, aisle, entrance and receiving-area monitoring for larger floor plans.',
    risks: [
      {
        title: 'Large floor area with many aisles',
        text: 'Staff are spread across the floor, the checkouts and the back of the store. Large sections of the store go unwatched for long periods.',
      },
      {
        title: 'Multiple checkouts and self-checkout',
        text: 'Several registers running at once make it hard for a manager to notice items skipped at checkout or unusual register activity.',
      },
      {
        title: 'Receiving and back-of-store areas',
        text: 'Deliveries, loading docks and stockrooms involve a lot of movement of goods, often with little supervision.',
      },
      {
        title: 'High-value categories',
        text: 'Meat, baby formula, health and beauty products, and alcohol are common targets because they are valuable and easy to resell.',
      },
    ],
    focus: [
      'Checkout lanes: items passing without being scanned where the camera angle makes this visible, unusual register activity',
      'High-value sections such as meat, health and beauty, and alcohol',
      'Entrances and exits: carts leaving past the registers, people leaving with unbagged goods',
      'Receiving door and stockroom: deliveries, goods leaving through the back',
      'Opening and closing: staff arrival, lock-up and lights-off routines',
    ],
    cameraNotes: [
      'One camera per checkout lane, angled to show the belt and bagging area, gives operators the most useful view.',
      'Cover the exit path past the registers so carts leaving the store are visible.',
      'Prioritize views of high-value sections over general aisle shots if camera count is limited.',
      'A camera on the receiving door or loading area helps with back-of-store visibility.',
      'Grocery stores usually have more cameras than other formats; tell us which views matter most so pricing reflects your real needs.',
    ],
    exampleScenario: {
      title: 'Illustrative example: a cart leaving without payment',
      steps: [
        'On a busy Saturday afternoon, the operator sees a full cart move along the side aisle toward the exit without passing a checkout.',
        'The operator confirms on the entrance camera that the cart is heading out and has not been paid for.',
        'The operator calls the duty manager on the agreed number with a description of the person and the cart.',
        'The manager decides how to respond under store policy.',
        'The operator records the incident with times and camera views, and it appears in the store’s daily report.',
      ],
    },
    sections: [
      {
        heading: 'Why independent grocers use remote monitoring',
        paragraphs: [
          'Independent grocery stores often have a good camera system but no dedicated loss-prevention team watching it. Managers are busy running the store, and recorded footage is only reviewed after a problem is discovered.',
          'Secure Monitoring provides trained operators who watch the views that matter most and call your manager when they see something. You decide which areas to prioritize, who receives alerts and which hours are covered.',
        ],
      },
      {
        heading: 'Checkout and register visibility',
        paragraphs: [
          'Where your cameras clearly show the checkout belt and register, operators can note visible issues such as items that do not appear to be scanned or bagged unusually. We do not connect to your point-of-sale system, so observations are based on what the camera shows, and you can compare them with your own transaction records.',
        ],
      },
      {
        heading: 'Back-of-store and receiving',
        paragraphs: [
          'Losses in grocery retail are not only at the front of the store. Operators can watch receiving doors, stockrooms and loading areas during agreed hours and report unusual movement of goods, such as stock leaving through the back door outside delivery times.',
        ],
      },
      {
        heading: 'Daily reports for owners and managers',
        paragraphs: [
          'Grocery owners often want a summary rather than a call for every minor observation. We can agree a reporting format that combines urgent alerts with a daily summary of incidents and observations. See our daily monitoring reports service.',
        ],
      },
    ],
    limitations: [
      'We do not integrate with point-of-sale or self-checkout systems, so register observations rely on camera views.',
      'We do not use AI analytics or automated detection; operators watch selected feeds, and very large camera counts may need prioritization.',
      'We monitor video only and cannot intervene physically.',
      'Law-enforcement contact happens only where appropriate and authorized on the Professional plan.',
    ],
    faqs: [
      {
        q: 'My grocery store has many cameras. Will you watch all of them?',
        a: 'We agree which views to prioritize during onboarding. Pricing is tailored to the number of cameras and hours, so you can choose broad coverage or focus on checkouts, high-value sections and exits.',
      },
      {
        q: 'Can you see whether items are scanned at checkout?',
        a: 'Only where the camera angle clearly shows the belt and scanner. We do not connect to your POS system, so we report what is visible on camera.',
      },
      {
        q: 'Do you monitor the loading dock?',
        a: 'Yes, if you have a camera covering it. Many grocers include the receiving area during delivery hours and after closing.',
      },
      {
        q: 'Can you send a daily summary instead of calling for everything?',
        a: 'Yes. We agree what is urgent enough for a call and what goes into the daily report.',
      },
    ],
    relatedServices: ['retail-cctv-monitoring', 'daily-monitoring-reports', 'customer-activity-monitoring', 'retail-loss-prevention'],
  },
  {
    slug: 'smoke-shops',
    name: 'Smoke Shops',
    metaTitle: 'Smoke Shop & Vape Store Video Monitoring',
    metaDescription:
      'Remote CCTV monitoring for US smoke shops and vape stores. Live operators watch display cases, the counter and the door on your existing cameras and alert staff.',
    h1: 'Remote CCTV monitoring for smoke shops and vape stores',
    summary:
      'Remote CCTV monitoring for smoke shops means a trained operator watches your existing cameras live, focusing on display cases, the counter and the entrance, and alerts your staff when something needs attention. Secure Monitoring is an India-based team that provides this human-led service to US smoke shops and vape stores during the hours you choose, up to 24/7.',
    cardText: 'Display case, counter and door monitoring for small stores with compact, high-value stock.',
    risks: [
      {
        title: 'Compact, high-value products',
        text: 'Vapes, cartridges, glassware and accessories are small and valuable. Many are kept in display cases that must be opened for customers.',
      },
      {
        title: 'Display case handling',
        text: 'When staff open a case to show products, there is a risk of items being swapped, palmed or taken while the employee is distracted.',
      },
      {
        title: 'Small teams and single-person shifts',
        text: 'Smoke shops often run with one or two staff members, so nobody is free to watch the floor or the camera monitor.',
      },
      {
        title: 'After-hours break-ins',
        text: 'Small stores with valuable stock can be targeted after closing.',
      },
    ],
    focus: [
      'Display cases: when cases are opened, how many items are handed out and returned',
      'The counter and register: cash drawer activity, items handed over without a sale',
      'The entrance: groups entering together, covered faces, people leaving quickly',
      'After-hours views: the front door, windows and any rear access during closed hours',
      'Employee activity: case keys, stock handling and unusual activity when no customers are present',
    ],
    cameraNotes: [
      'A camera angled down at the display cases shows hand movements and products being handed over.',
      'Cover the space between the counter and the door, where quick thefts usually unfold.',
      'For after-hours coverage, make sure exterior or entrance cameras have working night vision.',
      'Keep a clear view of the register and any cash storage area.',
    ],
    exampleScenario: {
      title: 'Illustrative example: after-hours activity at the front door',
      steps: [
        'At 2:15 am, after closing, the operator sees two people repeatedly approach the front door and look through the glass.',
        'The operator checks the other exterior and interior views to see whether anyone has entered.',
        'Following the agreed after-hours procedure, the operator calls the owner first, then the backup contact.',
        'On the Professional plan, if the agreed criteria are met and the owner has authorized it, the operator contacts local law enforcement.',
        'The incident is logged with times, camera views and every call made.',
      ],
    },
    sections: [
      {
        heading: 'Why smoke shops add live monitoring',
        paragraphs: [
          'Smoke shops tend to have cameras for good reason, but footage is usually reviewed only after stock goes missing. Live monitoring means someone is watching the cases and the door while your employee serves customers.',
          'Our operators watch for handling patterns at display cases, unusual behavior near the door and suspicious after-hours activity, and call your designated contacts according to the procedure you agree with us.',
        ],
      },
      {
        heading: 'Age-restricted products',
        paragraphs: [
          'Tobacco and vape products are age-restricted. Operators can observe whether staff appear to follow your ID-check routine and note this in reports if you ask. We cannot verify IDs or customers’ ages, and compliance remains your store’s responsibility.',
        ],
      },
      {
        heading: 'Business hours and after-hours coverage',
        paragraphs: [
          'You can choose monitoring during opening hours, after hours, or 24/7. Many smoke shops combine daytime counter monitoring with overnight coverage of the entrance. Pricing is per site per month, tailored to cameras and hours, starting at $199, with a 7-day free trial and no setup fees.',
        ],
      },
    ],
    limitations: [
      'We cannot verify customer IDs or ages.',
      'We do not use speakers or talk-down, and we monitor video only.',
      'We do not dispatch guards. After-hours response relies on your contacts and, where authorized on the Professional plan, law enforcement.',
      'We can only see what your cameras show, so exterior views need adequate lighting or night vision.',
    ],
    faqs: [
      {
        q: 'Can you monitor my smoke shop overnight when it is closed?',
        a: 'Yes. Operators can watch entrance and interior views during closed hours and call your contacts if they see suspicious activity. On the Professional plan, they can also contact law enforcement where authorized.',
      },
      {
        q: 'Do you verify customer ages for tobacco or vape sales?',
        a: 'No. We cannot verify IDs or ages. If requested, operators can observe whether staff appear to follow your ID-check routine.',
      },
      {
        q: 'Do I need special cameras?',
        a: 'No. We use your existing system if it supports secure remote viewing. A camera angled at the display cases is the most useful addition if you are reviewing coverage.',
      },
      {
        q: 'How quickly do you alert my staff?',
        a: 'Our target is to begin the response within 30 seconds of identifying an actionable incident. This is a target, not a guarantee of any outcome.',
      },
    ],
    relatedServices: ['retail-loss-prevention', 'live-video-monitoring', 'security-incident-alerts', 'employee-theft-prevention'],
  },
  {
    slug: 'gas-stations',
    name: 'Gas Stations',
    metaTitle: 'Gas Station Video Monitoring',
    metaDescription:
      'Remote CCTV monitoring for US gas station stores and forecourts. Live operators watch the counter, store and pump-area cameras you already have and alert staff.',
    h1: 'Remote CCTV monitoring for gas stations',
    summary:
      'Remote CCTV monitoring for gas stations means trained operators watch your existing in-store and forecourt cameras live and alert your attendant or manager when something needs attention. Secure Monitoring is an India-based team that provides this human-led service to US gas station convenience stores during the hours you choose, up to 24/7.',
    cardText: 'In-store and forecourt camera monitoring for stations with long hours and lone attendants.',
    risks: [
      {
        title: 'Split attention between store and forecourt',
        text: 'One attendant may be responsible for the counter, the store and the pumps at the same time, often overnight.',
      },
      {
        title: 'Counter and tobacco theft',
        text: 'Like convenience stores, gas station stores carry small, high-theft items close to the counter.',
      },
      {
        title: 'Forecourt incidents',
        text: 'Drive-offs, disputes at the pumps, loitering and damage can happen away from the attendant’s line of sight.',
      },
      {
        title: 'Overnight and 24-hour operation',
        text: 'Many stations operate around the clock, with the highest risk during late-night hours when staffing is lowest.',
      },
    ],
    focus: [
      'The counter and register: cash drawer activity, customer interactions, items passed over the counter',
      'Store aisles with tobacco, beverages and snacks',
      'Pump-area cameras, where present: vehicles, loitering and disputes at the pumps',
      'Entrances and the store exterior after dark',
      'Shift changes, opening and closing routines, and back-door activity',
    ],
    cameraNotes: [
      'Forecourt cameras should cover the pump islands and the exit lanes; positioning to capture vehicles is helpful for your own records.',
      'Check that forecourt views remain usable at night, since canopy lighting and headlights can cause glare.',
      'Keep a clear overhead view of the register and a view of the store entrance.',
      'A stable internet connection matters: gas stations sometimes share bandwidth with payment and fuel systems, so confirm upload capacity for remote viewing.',
    ],
    exampleScenario: {
      title: 'Illustrative example: a dispute at the pumps overnight',
      steps: [
        'At 1:30 am, the operator sees two drivers arguing loudly at a pump island on the forecourt camera.',
        'The operator watches to judge whether the situation is escalating and checks other views for anyone else involved.',
        'The operator calls the attendant inside to make them aware, so they can stay inside and follow the station’s safety policy.',
        'If the situation meets the agreed criteria and the owner has authorized it on the Professional plan, the operator contacts local law enforcement.',
        'Everything observed and every call made is recorded in the incident log.',
      ],
    },
    sections: [
      {
        heading: 'Why gas stations use remote monitoring',
        paragraphs: [
          'Gas station stores combine the risks of a convenience store with a forecourt that the attendant often cannot see clearly. Live monitoring gives the attendant a second set of eyes on both, especially during overnight shifts.',
          'Operators watch the views you prioritize and call your attendant or manager when something needs attention. Your staff remain in charge of the response and follow your own safety procedures.',
        ],
      },
      {
        heading: 'Drive-offs and the forecourt: realistic expectations',
        paragraphs: [
          'If you have pump-area cameras, operators can watch them during agreed hours. However, remote monitoring cannot stop a vehicle from leaving without paying, and we do not control pumps or payment systems. What we can do is notify your staff promptly and record what was visible for your own follow-up.',
        ],
      },
      {
        heading: 'Store opening, closing and shift changes',
        paragraphs: [
          'For stations that are not open 24 hours, operators can observe the opening and closing routines and confirm that the store opened and closed as expected. Shift changes can also be observed to check that the counter is not left unattended.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'Pricing is per site per month, tailored to the number of in-store and forecourt cameras and the hours monitored. Plans start at $199 (Basic) and $299 (Professional, which adds authorized law-enforcement contact). There is a 7-day free trial and no setup fee.',
        ],
      },
    ],
    limitations: [
      'We cannot prevent drive-offs and do not control pumps, payment terminals or fuel systems.',
      'Forecourt monitoring depends on having suitable forecourt cameras with usable night views.',
      'We monitor video only and do not use speakers or talk-down.',
      'Law-enforcement contact is made only where appropriate, authorized and included in your plan, and does not guarantee a police response.',
    ],
    faqs: [
      {
        q: 'Can you watch the pumps as well as the store?',
        a: 'Yes, if your system includes forecourt cameras that support remote viewing. We agree during onboarding which views to prioritize at which times.',
      },
      {
        q: 'Can you stop drive-offs?',
        a: 'No. Remote monitoring cannot stop a vehicle leaving. Operators can alert your attendant and record what was visible on camera for your follow-up.',
      },
      {
        q: 'Is overnight coverage available?',
        a: 'Yes. Monitoring hours are agreed per site, including overnight or 24/7 coverage.',
      },
      {
        q: 'Do you work with stations that have several locations?',
        a: 'Yes. Each site is monitored and priced separately, with alerts going to each site’s contacts and summaries available to the owner.',
      },
    ],
    relatedServices: ['live-video-monitoring', 'security-incident-alerts', 'store-opening-closing-monitoring', 'multi-location-cctv-monitoring'],
  },
  {
    slug: 'small-retail-businesses',
    name: 'Small Retail Businesses',
    metaTitle: 'Video Monitoring for Small Retail Stores',
    metaDescription:
      'Affordable remote CCTV monitoring for small and independent US retail stores. Live operators watch your existing cameras, from $199 per site per month.',
    h1: 'Remote CCTV monitoring for small retail businesses',
    summary:
      'Remote CCTV monitoring for small retail businesses means a trained operator watches your existing store cameras live and alerts you or your staff when something needs attention, without hiring in-house security. Secure Monitoring is an India-based team that provides this human-led service to independent and general merchandise retailers in the US.',
    cardText: 'Affordable, no-hardware monitoring for independent and general merchandise stores.',
    risks: [
      {
        title: 'Owner can’t be everywhere',
        text: 'Small business owners often split time between the shop floor, suppliers and paperwork, or run more than one business.',
      },
      {
        title: 'Limited budget for security staff',
        text: 'A dedicated in-store security employee or guard is usually out of reach for a small independent store.',
      },
      {
        title: 'Varied merchandise and layouts',
        text: 'General merchandise, gift, apparel and hardware stores have different high-risk areas, from fitting rooms to small electronics displays.',
      },
      {
        title: 'Unclear visibility of staff activity',
        text: 'When the owner is away, there is little visibility of whether the store opens on time and routines are followed.',
      },
    ],
    focus: [
      'Entrances and exits, including people leaving with unpaid items',
      'Areas with small, high-value merchandise',
      'The counter and register, including cash drawer activity',
      'Store opening and closing times and routines',
      'General customer activity and busy periods, summarized in reports where agreed',
    ],
    cameraNotes: [
      'Start with three core views: the entrance, the register and your highest-value display.',
      'Fitting rooms and restrooms must never be monitored. Keep cameras to lawful public and work areas.',
      'If you have only a few cameras, angle them to show hands and merchandise rather than wide, distant shots.',
      'A basic recorder with a remote viewing app is usually enough for remote monitoring.',
    ],
    exampleScenario: {
      title: 'Illustrative example: the store does not open on time',
      steps: [
        'The owner has asked us to confirm that the store opens at 9:00 am each day.',
        'At 9:10 am, the operator sees that the lights are still off and nobody has arrived.',
        'The operator sends a WhatsApp message and then calls the owner, as agreed.',
        'The owner contacts the employee scheduled to open.',
        'The late opening is recorded in the daily report, so the owner can see opening times across the week.',
      ],
    },
    sections: [
      {
        heading: 'Security support without hiring',
        paragraphs: [
          'Small retailers usually have cameras but nobody watching them. Hiring a security employee or a guard is expensive, and watching the feed yourself is not realistic while running a business.',
          'Secure Monitoring offers live, human-led monitoring of your existing cameras on a simple per-site monthly price, starting at $199 per site per month. There is no hardware to buy, no setup fee and no long-term contract, and you can try it free for 7 days.',
        ],
      },
      {
        heading: 'What a typical setup looks like',
        paragraphs: [
          'After a short consultation about your store, cameras and priorities, you give us secure remote access to your camera system through a separate user account. We agree which views to watch, who to contact and how, and which hours to cover. Monitoring then starts with a 7-day free trial.',
        ],
      },
      {
        heading: 'Visibility when you are away',
        paragraphs: [
          'Beyond theft prevention, many owners value knowing what happens when they are not there. Operators can confirm opening and closing times, note busy periods and summarize notable activity in regular reports.',
        ],
      },
    ],
    limitations: [
      'We do not sell or install cameras. If your current coverage has gaps, we will point them out, but upgrades are up to you.',
      'We monitor video only and never monitor restrooms, fitting rooms or other private areas.',
      'We cannot intervene physically; your staff decide how to respond.',
      'Results depend on camera coverage, image quality and a stable internet connection.',
    ],
    faqs: [
      {
        q: 'Is remote CCTV monitoring affordable for a small store?',
        a: 'Plans start at $199 per site per month, with no setup fees and no long-term contract. The final price depends on the number of cameras and the hours you need monitored.',
      },
      {
        q: 'How many cameras do I need?',
        a: 'There is no fixed minimum. Many small stores start with views of the entrance, the register and the highest-value display.',
      },
      {
        q: 'Do I have to sign a long contract?',
        a: 'No. Plans are month to month, and you can cancel with 3 business days’ notice before your next billing date.',
      },
      {
        q: 'Can I try the service first?',
        a: 'Yes. There is a 7-day free trial, and no card is required to start.',
      },
    ],
    relatedServices: ['remote-cctv-monitoring', 'retail-cctv-monitoring', 'store-opening-closing-monitoring', 'daily-monitoring-reports'],
  },
]

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug)
