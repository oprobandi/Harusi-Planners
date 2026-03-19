# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [3.2.0] — 2026-03-20 · Legal Pages & Footer Cleanup

### ✨ New Pages

| Page | Route | Description |
|------|-------|-------------|
| `PrivacyPolicy.jsx` | `/privacy` | Full Privacy Policy rendered as a styled React page — Kenya Data Protection Act, 2019 compliant |
| `TermsOfService.jsx` | `/terms` | Full Terms of Service rendered as a styled React page — governed by Kenyan law |

Both pages share a consistent design language (hero, sectioned prose, tables, bullet lists, contact CTA) matching the rest of the platform.

### 🐛 Bug Fix
- **Footer `Privacy Policy` link** was pointing to `to: '/'` (homepage). Now correctly routes to `/privacy`.

### 🎨 Footer Redesign
- `Privacy Policy` removed from the Support column — it was semantically misplaced alongside Contact, Vendor Portal, and FAQs.
- Support column now contains exactly three links: Contact, Vendor Portal, FAQs.
- `Privacy Policy` and `Terms of Service` moved to the bottom copyright bar — the universal convention for legal links.
- Bottom bar layout changed from centred text to a `justify-between` flex row: copyright left, legal links right.

### 🗂️ Routing
- `App.jsx` updated with two new lazy-loaded routes: `/privacy` and `/terms`.

---

## [3.1.0] — 2026-03-20 · Navigation & Image Fixes
- Build error (double comma in vendors.js), broken Ole Sereni image, non-clickable venue/vendor cards, navigate(-1) back buttons replaced with explicit Links
- package.json version corrected from 1.6.0 to 3.1.0

## [3.0.0] — 2026-03-19 · Venue Directory
- 18 venues, Venues listing page, VenueProfile page, sitemap updated to 47 URLs

## [2.0.0] — 2026-03-19 · About, Contact & Founder Image
*(Released as "V2.9" — version label was a typo)*

## [1.9.0] — 2026-03-19 · Core Page Rebuild & FAQs
## [1.8.0] — 2026-03-19 · Blog System
## [1.7.0] — 2026-03-19 · Dark Mode & Inspiration Page
## [1.6.0] — 2026-03-19 · Vendor Profile Pages & Search Readiness
## [1.5.0] — 2026-03-19 · Logo Integration
## [1.4.0] — 2026-03-19 · Mailchimp Integration & Form Fixes
## [1.3.0] — 2026-03-19 · Icons, Wordmark & Image Fixes
## [1.2.0] — 2026-03-19 · Bug Fixes, Performance & UX Polish
## [1.1.0] — 2026-03-19 · Pricing Overhaul & Architecture Refactor
## [1.0.0] — 2026-03-19 · Initial Release
