# Secure Monitoring: SEO & AI Search Report

**Date:** 2026-11-16 · **Site:** https://securemonitoring24hr.cc · **Stack:** Next.js 16 (App Router, static pages) on Vercel

Companion documents:
- [`competitor-and-keyword-research.md`](./competitor-and-keyword-research.md): competitors, SERP intent, verified statistics and listing opportunities. Its keyword→page table was written before the new architecture; section 3 below supersedes it.
- [`CHANGELOG.md`](./CHANGELOG.md): file-by-file change log.

---

## 1. What was wrong (audit findings)

| Area | Finding | Impact |
|---|---|---|
| Indexing | No `robots.txt`, no XML sitemap, no canonical URLs | Search engines had to discover pages on their own; duplicate hosts (`*.vercel.app`, `.com`) could compete with `.cc` |
| Structured data | No JSON-LD at all | Search engines and AI systems had to guess who the business is |
| Positioning | Titles and H1s said "Managed Security Operations"; "remote", "video monitoring", "retail" and "US" barely appeared | Pages did not match how US retailers search |
| Architecture | 8 thin marketing pages; no service, industry, FAQ or guide pages | No pages to rank for specific services, store types or questions |
| Redirects | `/services` and `/why-us` used in-page `redirect()` (temporary) | Weak signals; `/services` was the obvious URL for a services hub |
| Conversion | Every CTA was "Book a consultation", with no form | Nowhere to capture camera count, locations or hours |
| Trust | The stock hero image of uniformed US-style officers was not labelled | Could imply a US-based team |
| Accessibility | Dark-blue text on near-black failed WCAG contrast; logo link name mismatch | Lighthouse accessibility 96 |
| Assets | 2.7 MB of unused videos plus unused images; hero served as JPEG | Repository clutter; larger LCP image |
| Social | Inner pages had no Open Graph image once per-page metadata was added | Poor link previews |

## 2. What was fixed

### Technical SEO
- **Canonical URL, unique title, unique meta description, Open Graph and Twitter card on every page** via `lib/seo.ts → pageMetadata()`. `metadataBase` is `https://securemonitoring24hr.cc`, so preview and alternate hosts point search engines to `.cc`.
- **`/robots.txt`** (`app/robots.ts`): allows all crawlers, including search and AI answer crawlers, and lists the sitemap.
- **`/sitemap.xml`** (`app/sitemap.ts`): 34 indexable URLs, generated from the content data so new pages are added automatically.
- **Permanent 308 redirects** (`next.config.mjs`): `/solutions` → `/services`, `/operations` → `/how-it-works`, `/why-us` → `/about`.
- **`/cancellation-refund`** is `noindex, follow` because it is a summary of two indexable policy pages.
- **Breadcrumb navigation** with BreadcrumbList schema on all inner pages.
- **Semantic HTML:** one H1 per page, ordered H2/H3, `<main id="main">`, a skip link, `<figure>`/`<figcaption>`, `<time>`, table headers with `scope`.
- **Performance:** hero image and logos converted to WebP (hero 131 KB → 57 KB); unused videos and images removed.
- **Accessibility:** a dark-mode text colour that meets contrast requirements; logo link names fixed.
- **Search Console and Bing verification** through environment variables (no code change needed later).

### Structured data (JSON-LD, `lib/schema.ts`)
| Schema | Where | Notes |
|---|---|---|
| `Organization` | Every page | Name, sole-proprietor founder, Indian postal address, Udyam number as `identifier`, `areaServed: United States`, contact point, logo |
| `WebSite` | Every page | Publisher → Organization |
| `WebPage` / `CollectionPage` / `AboutPage` / `ContactPage` | Most pages | Linked to WebSite and Organization |
| `Service` | Service and industry pages | Provider → Organization, area served US, business audience |
| `Service` + `OfferCatalog` | `/pricing` | Basic $199 and Professional $299, `unitText: per site per month` |
| `BreadcrumbList` | All inner pages | Matches the visible breadcrumb |
| `Article` | Guides | Dated, publisher → Organization |
| `FAQPage` | `/faq`, `/camera-compatibility` | Visible Q&A only. Google currently shows FAQ rich results only for government and health sites, so expect no rich result; the markup still helps machines read the answers. |

**Not used, on purpose:** `LocalBusiness` and `ProfessionalService`. Google treats these as physical places customers visit, and the business serves US customers remotely from India. There are no `AggregateRating`, `Review`, award or certification properties.

**Validation done:** all 146 JSON-LD blocks across 35 pages parse as valid JSON, and the required properties were reviewed by hand. Google's Rich Results Test and validator.schema.org can't be reached from the build environment. **Run them after deployment** (section 7).

### Content architecture (new pages)
| Section | URLs | Purpose |
|---|---|---|
| Services hub | `/services` | Overview plus an "included / not included" scope table |
| 10 service pages | `/services/remote-cctv-monitoring`, `live-video-monitoring`, `retail-cctv-monitoring`, `retail-loss-prevention`, `employee-theft-prevention`, `customer-activity-monitoring`, `store-opening-closing-monitoring`, `security-incident-alerts`, `daily-monitoring-reports`, `multi-location-cctv-monitoring` | One search intent per page: answer-first summary, who it's for, how it works, deliverables, limitations, FAQs, related links |
| Industries hub + 6 pages | `/industries/convenience-stores`, `liquor-stores`, `grocery-stores`, `smoke-shops`, `gas-stations`, `small-retail-businesses` | Store-specific risks, operator focus, camera tips, a labelled illustrative scenario, limitations, FAQs |
| How it works | `/how-it-works` | 7-step process, monitoring-type comparison, India delivery model, escalation and limits |
| Camera compatibility | `/camera-compatibility` | Targets "CCTV monitoring without installing new cameras" / "existing cameras" |
| FAQ | `/faq` | 18 answers grouped by topic |
| Resources + 3 guides | `/resources/what-is-remote-cctv-monitoring`, `remote-monitoring-vs-security-guards`, `prepare-existing-cctv-for-remote-monitoring` | Informational and comparison intent; one NRF statistic cited with its source |
| Rewritten | `/`, `/about`, `/contact`, `/pricing` (metadata, schema, breadcrumbs), `/professional-services` | Retail- and US-focused positioning, E-E-A-T facts |

Content is stored as data (`lib/services.ts`, `lib/industries.ts`, `lib/guides.ts`) and rendered by shared templates, so pages stay consistent and are easy to edit.

### Capabilities: what the site claims and what it does not
Every page describes **live human monitoring only**. The service and how-it-works pages include a table that states plainly:
- **Live human monitoring:** offered
- **Event-based monitoring:** not offered
- **AI-assisted analytics:** not offered
- **Automated alerts:** not offered

The pages also say the business does not sell or install hardware, provide guards, monitor audio, verify customer ID, integrate with point-of-sale systems or dispatch. The India-based team and the absence of any US office are stated on Home, About, How It Works, FAQ and in `llms.txt`.

### AI search optimization (GEO)
- **`/llms.txt`:** a factual company overview (who, what, where, pricing, exclusions, contact) with links to every important page. It is a convention, not a ranking factor, and nothing guarantees AI systems use it.
- **Answer-first summaries** at the top of every service, industry and guide page, each naming who provides the service, from where and for whom.
- **Consistent entity facts** (name, legal structure, proprietor, Udyam number, address, market, pricing) from one source, `lib/business.ts`, used in the page text, schema, footer and `llms.txt`.
- **Comparison tables:** monitoring types; recorded CCTV vs guard vs Secure Monitoring; system compatibility; report format; alert levels.
- **Crawler access:** `robots.txt` blocks nothing, and all pages are server-rendered static HTML, so they're readable without JavaScript.

### Conversion
- A **lead form** on `/contact#quote-form` captures: request type (free trial, custom quote, consultation, enterprise), business name, contact name, email, phone, country, US time zone, number of locations, number of cameras, camera/recorder make and model, monitoring hours and requirements.
- There is **no backend**: the form validates the input, then opens the visitor's email app or WhatsApp with the enquiry pre-filled. Nothing is stored on the site, and the Privacy Policy was updated to say so. It fires a `generate_lead` event (with `method: email|whatsapp`) to GA4 and Clarity when they are enabled.
- **CTAs** were changed to "Start free trial" and "Get a custom quote" in the header, hero, every content page (CTA band) and pricing.

## 3. Keyword → page mapping (implemented)

Research finding: in the US, "**video monitoring**" is the dominant term, while "CCTV" reads as UK or Indian English. Titles therefore lead with "video monitoring" and keep "CCTV" as a secondary term.

| Keyword cluster | Target page |
|---|---|
| remote video monitoring for retail, remote CCTV monitoring services, remote security monitoring services | `/` and `/services/remote-cctv-monitoring` |
| live video monitoring services, 24/7 live CCTV monitoring, live human CCTV monitoring | `/services/live-video-monitoring` |
| retail CCTV monitoring, retail store CCTV monitoring, remote store surveillance | `/services/retail-cctv-monitoring` |
| shoplifting monitoring, retail loss prevention monitoring | `/services/retail-loss-prevention` (titled "Shoplifting & Loss Prevention" because "loss prevention services" searches expect LP staffing) |
| employee theft prevention, employee monitoring for retail stores, cash drawer monitoring | `/services/employee-theft-prevention` |
| multi-location CCTV monitoring, monitoring for multiple retail locations | `/services/multi-location-cctv-monitoring` |
| CCTV monitoring without installing new cameras, use existing cameras | `/camera-compatibility` |
| outsourced CCTV monitoring for retail stores, remote CCTV monitoring for US businesses | `/how-it-works`, `/about`, `/services/remote-cctv-monitoring` |
| affordable retail video surveillance monitoring, price per store, free trial | `/pricing` |
| convenience store / liquor store / grocery / smoke shop / gas station video monitoring | `/industries/*` (the research rated liquor stores and smoke shops as the least competitive results pages) |
| what is remote CCTV monitoring; remote monitoring vs security guard | `/resources/*` |

Avoided as primary targets: "virtual guard" and "remote guarding" (searchers expect talk-down and intervention, which isn't offered).

## 4. Validation results

| Check | Result |
|---|---|
| `next build` | Pass, 42 routes |
| `tsc --noEmit` | Pass (the only error is a pre-existing one in `components/theme-provider.tsx`, which the build ignores) |
| Crawl of all 35 sitemap pages + `/cancellation-refund` | HTTP 200; unique titles and descriptions; titles ≤ 70 chars; descriptions 90–170 chars; self-canonical; exactly one H1; all JSON-LD parses; all images have alt text; Open Graph image and Twitter card present |
| Internal links (43 unique) | All 200, no broken links and no links pointing at redirects |
| Redirects | `/solutions`, `/operations` and `/why-us` → 308 to their new pages; unknown URL → 404 |
| Lighthouse (mobile, local production build) | Home: Performance 95, Accessibility 100, Best Practices 96, SEO 100. Service page: 97 / 100 / 96 / 100. Contact: 97 / 97 / 96 / 100. CLS 0 everywhere. |
| Responsive | No horizontal overflow at 390px or 1440px on the pages checked |

Best Practices 96 reflects only the Vercel Analytics script returning 404 on a local server; it loads in production.

## 5. Remaining issues / limitations

1. **Domain migration needs action in the Vercel dashboard** (it can't be done safely in code; see section 6).
2. **Real photos.** The hero is a labelled stock image. Replace it with real photos of your monitoring workspace (no client footage) when available; this is a strong trust signal.
3. **Case studies and testimonials:** none exist yet, and none were invented. Add genuine ones, with the client's written permission, as you get them (section 9, 30-day plan).
4. **Lead form has no server-side storage.** If you later want enquiries stored or emailed automatically, add a form backend (for example Formspree, or a Supabase table plus an email notification) and update the Privacy Policy.
5. **Statistics.** Only one NRF figure is cited. Other figures in the research doc were confirmed only through search results; re-open the source pages before citing them.
6. **LCP 2.6–2.8 s** under Lighthouse's simulated slow-4G mobile profile (desktop is far faster). Further gains would come from enabling Next.js image optimization (`images.unoptimized: false`) on Vercel; check your Vercel plan's image-optimization limits first.
7. **Legal (outside SEO scope, not checked):** US state rules on alarm and monitoring licensing, and employee-monitoring notice rules. The site asks customers to comply with local law and avoids describing police contact as "dispatch".
8. **`components/theme-provider.tsx`** has a pre-existing TypeScript type error (it doesn't affect the build).

## 6. Domain migration (.com → .cc)

The code has no references to `securemonitoring24hr.com`. Every canonical URL, sitemap entry, schema URL and `llms.txt` link uses `https://securemonitoring24hr.cc`.

Domain-level redirects belong in Vercel. A host-based redirect in Next.js could loop if Vercel is also redirecting between the domains.

1. Vercel → Project → **Settings → Domains**.
2. Make sure `securemonitoring24hr.cc` is the **primary production domain** (not set to redirect anywhere).
3. Add `www.securemonitoring24hr.cc` → **Redirect to** `securemonitoring24hr.cc` (308).
4. If you control `securemonitoring24hr.com`: add it and `www.securemonitoring24hr.com` to the same project, each set to **Redirect to** `securemonitoring24hr.cc` (308, permanent).
5. Test: `curl -I https://securemonitoring24hr.com/pricing` should return `308` with `location: https://securemonitoring24hr.cc/pricing`, and `curl -I https://securemonitoring24hr.cc/pricing` should return `200`.
6. In Google Search Console, if the `.com` property was ever verified, use **Settings → Change of address** to point it to `.cc`.
7. Keep the `.com` domain registered, with its redirect, for at least 12 months.

## 7. Google Search Console: actions

1. Go to https://search.google.com/search-console → **Add property → Domain** → `securemonitoring24hr.cc` and verify with the DNS TXT record at your domain registrar. This is the recommended method.
   - *Alternative (URL-prefix property):* choose the HTML-tag method, copy only the `content` value, add it in Vercel → Settings → Environment Variables as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then redeploy.
2. **Sitemaps** → submit `https://securemonitoring24hr.cc/sitemap.xml`.
3. **URL Inspection** → request indexing for `/`, `/services`, `/pricing`, `/services/remote-cctv-monitoring`, `/industries/convenience-stores` and `/how-it-works`.
4. After deployment, run https://search.google.com/test/rich-results on `/`, `/pricing`, `/faq` and one service page, and https://validator.schema.org on the same URLs.
5. Each week, check **Pages** (indexing errors), **Performance** (queries, CTR, position) and **Core Web Vitals**.

## 8. Bing Webmaster Tools: actions

1. Go to https://www.bing.com/webmasters → **Import from Google Search Console** (fastest), or add the site manually.
   - *Manual:* choose the meta-tag method, put the `content` value in `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel, then redeploy.
2. Submit the sitemap and use **URL Submission** for the key pages. Bing's index also feeds Microsoft Copilot and several AI answer engines.
3. Optional: enable **IndexNow** later for faster recrawls.

## 9. Analytics and measurement setup

| Tool | How to enable | Env var (Vercel → Settings → Environment Variables, then redeploy) |
|---|---|---|
| Vercel Analytics | Already installed | none |
| Google Analytics 4 | Create a GA4 property and Web data stream for `securemonitoring24hr.cc`, then copy the Measurement ID | `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` |
| Microsoft Clarity | Create a project at clarity.microsoft.com and copy the project ID | `NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx` |
| Search Console | See section 7 | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional) |
| Bing Webmaster | See section 8 | `NEXT_PUBLIC_BING_SITE_VERIFICATION` (optional) |

Nothing loads until its variable is set. If you enable GA4 or Clarity for visitors in states or countries with consent laws, consider adding a cookie-consent banner.

**Conversion tracking:** the lead form sends a `generate_lead` event with parameter `method` (`email` or `whatsapp`). In GA4, go to **Admin → Events** and mark `generate_lead` as a **key event**. A form submission opens the visitor's email app; it doesn't guarantee they press send. Count actual enquiries received in your inbox and WhatsApp as the true conversion metric.

**AI referral traffic:** in GA4, go to **Admin → Channel groups** → copy the default group → add a channel "AI Assistants" above "Referral", with source matching this regex:
```
^(chatgpt\.com|chat\.openai\.com|perplexity\.ai|www\.perplexity\.ai|copilot\.microsoft\.com|gemini\.google\.com|claude\.ai|you\.com|phind\.com)$
```
This counts only visits where the AI tool passes a referrer. Many AI answers send no click or no referrer, so treat the number as a minimum. Google AI Overviews and AI Mode clicks appear as normal Google organic traffic and can't be separated reliably.

**KPI framework (monthly):**

| Metric | Source |
|---|---|
| Organic clicks, impressions, CTR, average position | Search Console → Performance |
| Branded vs non-branded | Search Console → filter queries containing "secure monitoring" vs not |
| Indexed pages | Search Console → Pages |
| Organic sessions, landing pages | GA4 → Traffic acquisition (Organic Search) |
| AI referral sessions | GA4 custom "AI Assistants" channel |
| Lead form submissions (`generate_lead`), split by method | GA4 key events |
| Qualified leads, trials started, trials converted | Your own spreadsheet or CRM (real enquiries) |
| Conversion rate | Qualified leads ÷ organic sessions |

## 10. Backlinks and authority (legitimate only)

Priority order. Use the same name, URL, email and description everywhere ("India-based remote CCTV monitoring for US retail"). Never list a US address.

1. **Free, high-trust profiles:** LinkedIn company page (and a personal profile for Shaik Mudassir that links to it), Crunchbase, Clutch, GoodFirms, Bing Places *only if eligible* (it is location-based, so likely not), and Google Business Profile **not appropriate** (it requires in-person customer contact).
2. **Industry and association listings:** check eligibility and cost before paying. Candidates include NACS supplier or member listings (convenience retail) and state petroleum or convenience store associations' supplier directories. See the research doc, section 7.
3. **Contributed articles** to convenience and retail trade publications (for example NACS Magazine, CSP Daily News, Convenience Store News). Pitch practical, non-promotional topics: "How to prepare existing CCTV for remote monitoring", "Opening and closing procedures that reduce risk for lone workers". Reuse the expertise in `/resources`.
4. **Partnerships:** independent US CCTV installers who don't offer monitoring, and POS or retail IT consultants. Offer a referral arrangement, and ask partners to link to `/camera-compatibility`.
5. **Client references:** once clients are happy, ask for a short written testimonial and, with permission, a case study (problem, setup, results, quote). Publish only with written consent.
6. **Avoid:** paid link packages, PBNs, automated directory blasts, fake listings, virtual US addresses, and reciprocal link schemes.

## 11. 30 / 60 / 90-day plan

**Days 1–30: foundation**
- Merge and deploy. Fix the Vercel domain settings (section 6). Verify Search Console and Bing, submit the sitemap and request indexing.
- Run the Rich Results Test and the schema validator on the deployed site.
- Enable GA4 and Clarity; mark `generate_lead` as a key event; create the AI-referral channel.
- Create the LinkedIn company page, Crunchbase, Clutch and GoodFirms profiles.
- Replace the stock hero with real workspace photos.
- Start a simple lead log: date, source, store type, cameras, trial started, converted.

**Days 31–60: authority**
- Publish 2 more guides from real questions prospects ask (for example "Employee theft warning signs in convenience stores" and "What a monitoring alert looks like: an example walk-through").
- Pitch 3 contributed articles to retail and convenience publications; approach 5 local CCTV installers about referrals.
- Collect the first genuine testimonial or case study (with written permission) and add it to the relevant industry page.
- In Search Console, find queries with impressions but CTR below 2%, and rewrite those pages' titles and descriptions.

**Days 61–90: optimize and expand**
- Expand the industry pages that get impressions; consider new pages only where there is real demand and distinct content (for example "pharmacies" or "cannabis dispensaries", if you serve them).
- Add a page comparing Secure Monitoring with typical alternatives (factual, no competitor disparagement, using only published competitor information).
- Re-run Lighthouse and the crawl check (`docs/seo/CHANGELOG.md` → how to verify); review Core Web Vitals in Search Console.
- Review the KPIs and double down on the pages that produce qualified leads.

**What to expect:** a new domain with few links typically takes months to rank for competitive head terms ("live video monitoring services"). Earlier wins are more likely for long-tail and vertical queries (liquor store or smoke shop video monitoring, existing-camera, price and free-trial queries).
