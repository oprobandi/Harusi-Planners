# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.6.0] — 2026-03-19 · Vendor Profile Pages & Search Readiness

### ✨ Major Feature — Vendor Profile Pages (`/vendors/:slug`)

**`VendorProfile.jsx`** — full dedicated page for each vendor:
- Hero image with gradient overlay, back button, star rating, location + category badges
- Long-form bio (`longBio`) — expanded from the short card bio
- Photo gallery — grid of up to 6 images, click-to-open lightbox with prev/next navigation
- Services & pricing — full breakdown of packages with `CheckCircle2` icons and prices
- Sticky sidebar with:
  - Enquiry card — starting price, "WhatsApp Enquiry" CTA, "Book via Harusi Planners" secondary CTA
  - Details card — location, category, founding year, Instagram/Facebook social links
  - "More [Category]" — 2 related vendors with thumbnail + link
- Mobile sticky bottom bar — WhatsApp CTA fixed above the fold on mobile
- "Vendor not found" graceful fallback for unknown slugs
- Full `SEOHead` per vendor — unique title, description (includes bio + price), canonical URL, OG image

**`/vendors/:slug` route** added to `App.jsx`

**Vendor data enriched** in `vendors.js`:
- `slug` field added to all 12 vendors
- `longBio` — extended 2–3 paragraph bio per vendor
- `services` — 2–4 service packages per vendor with name, price, description
- `gallery` — 2–6 images per vendor
- `social` — Instagram/Facebook URLs (placeholder, update with real accounts)
- `founded` — establishment year

**"View Profile ⟶"** updated across the app:
- `Vendors.jsx` — was opening modal, now `<Link to="/vendors/:slug">`
- `Home.jsx` — same change; `VendorModal` removed from Home entirely

### 🔒 Mailchimp — Double Opt-In Enabled
- `api/subscribe.js` — `status` changed from `'subscribed'` to `'pending'`
- Subscribers now receive a Mailchimp confirmation email before being added to the list
- Best practice for GDPR compliance and list hygiene

### 🗂️ SEO
- `sitemap.xml` — updated with all 12 vendor profile URLs (`/vendors/:slug`)
- Total URLs in sitemap: 16 (4 pages + 12 vendor profiles)
- README — Custom Domain Setup guide added (3-step DNS configuration)
- README — Google Search Console setup guide added (4 steps, HTML tag verification)

---

## [1.5.0] — 2026-03-19 · Logo Integration
## [1.4.0] — 2026-03-19 · Mailchimp Integration & Form Fixes
## [1.3.0] — 2026-03-19 · Icons, Wordmark & Image Fixes
## [1.2.0] — 2026-03-19 · Bug Fixes, Performance & UX Polish
## [1.1.0] — 2026-03-19 · Pricing Overhaul & Architecture Refactor
## [1.0.0] — 2026-03-19 · Initial Release

---

## [Unreleased]
See `TODO.md` for the V1.7+ backlog.
