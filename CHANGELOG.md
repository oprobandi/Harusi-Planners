# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.4.0] — 2026-03-19 · Mailchimp Integration & Form Fixes

### 🐛 Bug Fixes
| # | Bug | Fix |
|---|-----|-----|
| 1 | Newsletter accepted any string (e.g. "aaa") | Added email regex validation in Footer `NewsletterForm` component |
| 2 | "View Profile" on Home vendor cards navigated to `/vendors` page | Now opens `VendorModal` with the correct vendor — same behaviour as Vendors page |
| 3 | `sitemap.xml` had placeholder domain `harusihub.com` | Updated to live `harusi-planners.vercel.app` |
| 4 | `robots.txt` had placeholder domain | Updated to match sitemap |

### 📧 Mailchimp Integration

**`api/subscribe.js` — Vercel Serverless Function**
- Handles POST requests from both newsletter footer and quiz email capture
- Proxies to Mailchimp API server-side — API key never exposed in browser bundle
- Server-side email validation (second line of defence after client)
- Differentiates subscribers by source via Mailchimp tags:
  - Footer newsletter → `['newsletter', 'website']`
  - Quiz lead → `['quiz-lead', 'website']`
- Splits `name` into `FNAME` / `LNAME` merge fields for Mailchimp
- Handles `Member Exists` gracefully — returns success, not error
- Full error logging via `console.error` (visible in Vercel function logs)

**`Footer.jsx` — `NewsletterForm` component**
- Email regex validation before any API call
- Loading state: `Loader2` spinner replaces "Join" button text
- Success state: replaces form with `CheckCircle2` + confirmation message
- Error state: inline `AlertCircle` + message below input
- Input disabled during submission to prevent double-submit

**`Quiz.jsx` — `ResultCard` email capture**
- `handleSubmit` now async — POSTs to `/api/subscribe` with `source: 'quiz'`
- Loading state: spinner on submit button, button disabled
- Error state: inline error message
- Success: transitions to result card as before

**`.env.example`** — updated with three Mailchimp variables:
  `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_SERVER_PREFIX`

**README** — Mailchimp Setup Guide added (4-step walkthrough)

### 🗂️ SEO
- `sitemap.xml` updated to `harusi-planners.vercel.app`
- `robots.txt` updated to match

---

## [1.3.0] — 2026-03-19 · Icons, Wordmark & Image Fixes
- lucide-react across 7 areas, Harusi Planners wordmark, Karen CC image fix

## [1.2.0] — 2026-03-19 · Bug Fixes, Performance & UX Polish
- Code splitting, 404 page, testimonials carousel, vendor pagination, quiz localStorage

## [1.1.0] — 2026-03-19 · Pricing Overhaul & Architecture Refactor
- 5 pricing tiers, BudgetEstimator, VendorModal, SEOHead, src/data/ layer

## [1.0.0] — 2026-03-19 · Initial Release
- Vite + React + Tailwind, 4-page SPA, 11 prototype bugs fixed

---

## [Unreleased]
See `TODO.md` for the V1.5+ backlog.
