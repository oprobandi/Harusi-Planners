# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [3.1.0] — 2026-03-20 · Navigation & Image Fixes

### 🐛 Bug Fixes

| # | File | Bug | Fix |
|---|------|-----|-----|
| 1 | `src/data/vendors.js` | Build failure — double comma on `facebook` URL (line 25) caused Vite/Rollup parse error | Removed extra comma |
| 2 | `src/data/venues.js` | Ole Sereni Hotel hero image blank — Unsplash photo ID `1415301722433` expired | Replaced with working ID `1566073771259` |
| 3 | `src/pages/Venues.jsx` | Venue cards non-navigable — only "View Venue →" text was a `<Link>`, rest of card was inert `<div>` | Wrapped entire card in `<Link to="/venues/:slug">` |
| 4 | `src/pages/Vendors.jsx` | Same card-click bug as Venues | Same fix — full card wrapped in `<Link>` |
| 5 | `src/pages/VenueProfile.jsx` | "← All Venues" back button used `navigate(-1)` — broken for direct/external arrivals | Replaced `<button onClick={() => navigate(-1)}>` with `<Link to="/venues">` |
| 6 | `src/pages/VendorProfile.jsx` | Same back-button bug as VenueProfile | Replaced with `<Link to="/vendors">` |

### 🗂️ Housekeeping
- `package.json` — version corrected from `1.6.0` to `3.1.0` (was not bumped since V1.6)
- `CHANGELOG.md` — back-filled V1.7–V3.0 entries (docs lapsed after V1.6)

---

## [3.0.0] — 2026-03-19 · Venue Directory

- 18 venues across 5 categories (Garden & Estate, Hotel & Ballroom, Beach & Coast, Safari & Bush, Cultural & Unique)
- `src/data/venues.js` — full venue data with capacity, catering policy, accommodation, map links
- `src/pages/Venues.jsx` — listing page with category + region filters and search
- `src/pages/VenueProfile.jsx` — full profile page with hero, gallery, lightbox, services sidebar
- `/venues` and `/venues/:slug` routes added to `App.jsx`
- Navbar About dropdown updated to include Venues
- Vendor social links updated to all 4 Harusi Planners accounts
- Intro text added to Vendors and Inspiration pages
- `sitemap.xml` updated — 47 URLs (12 vendor profiles + 18 venue profiles + core pages)

---

## [2.0.0] — 2026-03-19 · About, Contact & Founder Image
*(Released as "V2.9" — version label was a typo; no V2.1–V2.8 ever existed)*

- `src/pages/About.jsx` — full About page rebuild
- `src/pages/Contact.jsx` — full Contact page rebuild
- `src/components/Navbar.jsx` — navigation updates
- `public/founder.webp` — founder portrait added

---

## [1.9.0] — 2026-03-19 · Core Page Rebuild & FAQs

- `src/pages/Home.jsx` — full rebuild
- `src/pages/About.jsx` — updated
- `src/pages/Contact.jsx` — updated
- `src/pages/FAQs.jsx` — new page
- `src/components/Navbar.jsx` — updated with FAQs link
- `src/components/Footer.jsx` — updated
- `src/App.jsx` — `/faqs` route added
- `public/sitemap.xml` — updated

---

## [1.8.0] — 2026-03-19 · Blog System

- `src/pages/Blog.jsx` — blog listing page
- `src/pages/BlogPost.jsx` — individual post page with typed content blocks
- `src/data/blog.js` — blog post data layer
- `/blog` and `/blog/:slug` routes added to `App.jsx`
- README — "Adding a Blog Post" guide added

---

## [1.7.0] — 2026-03-19 · Dark Mode & Inspiration Page

- `src/components/ThemeToggle.jsx` — dark/light mode toggle
- `src/pages/Inspiration.jsx` — new Inspiration gallery page
- Logo SVGs refreshed (`logo.svg`, `logo-white.svg`, `logo-mark.svg`)

---

## [1.6.0] — 2026-03-19 · Vendor Profile Pages & Search Readiness

- `VendorProfile.jsx` — full vendor page: hero, gallery, lightbox, services, sidebar, mobile CTA
- `/vendors/:slug` route added
- Vendor data enriched: `slug`, `longBio`, `services`, `gallery`, `social`, `founded`
- Mailchimp double opt-in (`status: 'pending'`)
- `sitemap.xml` — 16 URLs (4 pages + 12 vendor profiles)
- README — Custom Domain Setup & Google Search Console guides

---

## [1.5.0] — 2026-03-19 · Logo Integration

- `logo.svg`, `logo-white.svg`, `logo-mark.svg` added to `public/`
- Navbar, Footer, Favicon, PageLoader updated to use SVG logos

---

## [1.4.0] — 2026-03-19 · Mailchimp Integration & Form Fixes

- `api/subscribe.js` — Vercel serverless Mailchimp proxy
- Newsletter + quiz email capture wired up
- Email regex validation in Footer
- `sitemap.xml` / `robots.txt` — domain updated to live URL

---

## [1.3.0] — 2026-03-19 · Icons, Wordmark & Image Fixes

- lucide-react installed and applied across 7 UI areas
- Karen Country Club image fixed (third attempt)
- Harusi Planners wordmark added to Navbar

---

## [1.2.0] — 2026-03-19 · Bug Fixes, Performance & UX Polish

- React.lazy() + Suspense code splitting
- 404 / NotFound page
- Testimonials swipeable carousel
- Vendor pagination (12 per page)
- Quiz localStorage persistence
- 3 broken Unsplash image IDs fixed

---

## [1.1.0] — 2026-03-19 · Pricing Overhaul & Architecture Refactor

- `src/data/` layer: packages, vendors, weddings, quiz
- 5-tier pricing (Asili + Safari & Shores added)
- BudgetEstimator, VendorModal, SEOHead components
- Quiz recommendation engine
- `sitemap.xml` + `robots.txt`

---

## [1.0.0] — 2026-03-19 · Initial Release

- Vite + React + Tailwind migration
- 4-page React Router SPA
- 11 prototype bugs fixed
