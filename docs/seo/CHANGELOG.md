# SEO Changelog

## 2026-11-16: SEO and AI search overhaul

### Added
- `lib/seo.ts`: `pageMetadata()` (title, description, canonical, Open Graph, Twitter, optional noindex) and `absoluteUrl()`.
- `lib/schema.ts`: JSON-LD builders: Organization, WebSite, WebPage, Service, pricing OfferCatalog, BreadcrumbList, Article, FAQPage.
- `lib/content-types.ts`: shared types for data-driven pages.
- `lib/services.ts`: 10 service pages (content data).
- `lib/industries.ts`: 6 industry pages (content data).
- `lib/guides.ts`: 3 guides (content data).
- `lib/track.ts`: `trackEvent()` for GA4 and Clarity (no-op when not configured).
- `components/json-ld.tsx`, `components/breadcrumbs.tsx`, `components/content-blocks.tsx` (sections, tables, FAQ, checklists, link cards, CTA band), `components/quote-form.tsx` (lead form), `components/analytics.tsx` (GA4 and Clarity via env vars).
- Routes: `/services` (hub, replaces the redirect), `/services/[slug]`, `/industries`, `/industries/[slug]`, `/resources`, `/resources/[slug]`, `/how-it-works`, `/camera-compatibility`, `/faq`.
- `app/robots.ts` → `/robots.txt`; `app/sitemap.ts` → `/sitemap.xml`; `public/llms.txt`.
- `public/monitoring-room.webp`, `public/logo.webp`, `public/logo-mark.webp`.
- `docs/seo/SEO-REPORT.md`, `docs/seo/competitor-and-keyword-research.md`, this changelog.

### Changed
- `app/layout.tsx`: default title and description, Organization and WebSite JSON-LD, robots directives, Search Console and Bing verification env vars, viewport theme colour, skip link, `<main id="main">`, third-party analytics loader.
- `app/page.tsx`: rewritten for US retail positioning, with an answer-first "what we do", services, process, differentiators, comparison table, industries, quick answers, and a labelled illustrative hero image (WebP).
- `app/about/page.tsx`: rewritten, covering the India-based delivery model, working principles and a business facts table.
- `app/contact/page.tsx`: lead form plus contact options and business details.
- `app/pricing/page.tsx`, `app/professional-services/page.tsx`, `app/terms`, `app/privacy`, `app/refund-policy`, `app/cancellation-policy`: canonical metadata; breadcrumbs and pricing schema where relevant.
- `app/privacy/page.tsx`: analytics wording (Vercel Analytics; Google Analytics and Clarity where enabled) and how the lead form works.
- `app/cancellation-refund/page.tsx`: `noindex, follow`.
- `components/page-hero.tsx`: optional breadcrumbs.
- `components/navigation.tsx`: menu is now Services, Industries, How It Works, Pricing, Resources, About, Contact; CTA is "Start Free Trial"; logo link accessible name; WebP logo.
- `components/footer.tsx`: Services, Industries, Company, Legal and Contact columns; WebP logo; email wraps cleanly.
- `app/globals.css`: dark-mode `text-primary` lightened to meet WCAG AA contrast.
- `next.config.mjs`: permanent redirects.

### Removed
- `app/solutions`, `app/operations`, `app/why-us` (redirected 308 to `/services`, `/how-it-works` and `/about`).
- Unused assets: `public/hero-video.mp4`, `operations-video.mp4`, `services-video.mp4`, `24-7-security-monitoring-control-room.jpg`, `professional-security-operations-center-with-train.jpg`, `professional-control-room-with-operators-monitorin.jpg` (replaced by WebP), `placeholder*.{jpg,svg}`.

### How to verify locally
```bash
pnpm install && npx next build && npx next start -p 3000
curl -s localhost:3000/robots.txt; curl -s localhost:3000/sitemap.xml | head
curl -sI localhost:3000/solutions   # expect 308 → /services
```
