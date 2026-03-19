# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.2.0] — 2026-03-19 · Bug Fixes, Performance & UX Polish

### 🐛 Bug Fixes
| # | Bug | Fix |
|---|-----|-----|
| 1 | Karen Country Club — broken Unsplash image | Replaced photo ID in `vendors.js` |
| 2 | Petal & Vine Co. — broken Unsplash image | Replaced photo ID in `vendors.js` |
| 3 | Fatuma & James (Angama Mara) — showing zebra crossing | Replaced photo ID in `weddings.js` |
| 4 | No Home link in navigation | Added `Home` as first entry in `navLinks` in `Navbar.jsx` |

### ⚡ Performance
- **Route-based code splitting** via `React.lazy()` + `Suspense` in `App.jsx`
  - Each page (`Home`, `Vendors`, `Pricing`, `Inspiration`, `NotFound`) is now a separate JS chunk
  - Only the current route's bundle is loaded on initial visit
  - Branded `Harusi.` pulse loader shown during chunk fetch
  - Reduces initial bundle size significantly as the app grows

### ✨ New Features

**404 / Not Found Page (`NotFound.jsx`)**
- Branded page with large decorative `404` typography in plum/5 opacity
- Two primary CTAs: Back to Home + Browse Vendors
- Quick links: Pricing, Real Weddings, Style Quiz
- Wildcard `*` route added to `App.jsx` — catches all unmatched URLs
- `SEOHead` with appropriate title/description

**Testimonials Carousel (`TestimonialsCarousel.jsx`)**
- Replaces static 2-up grid on Home page
- 5 testimonials (up from 2) — added Grace & Samuel (Asili), Zara & Mohamed (Safari & Shores), Wanjiru & Felix (Kubwa)
- Auto-advances every 5 seconds
- Pauses on hover and touch (mobile-friendly)
- Slide direction-aware fade + translate animation (pure CSS, zero new dependencies)
- Dot indicators with active pill style; prev/next arrow buttons
- Package tag on each card (colour-coded by package tier)
- Step counter (e.g. "2 / 5")
- Full ARIA: `role="tablist"`, `aria-selected`, `role="status"` on loader

**Vendor Pagination**
- Vendors grid now shows 12 per page (`ITEMS_PER_PAGE = 12`)
- Pagination component with prev/next buttons and numbered page buttons
- Active page highlighted in plum; hover state rose
- "Showing X–Y of Z vendors" count updates with filters
- Page resets to 1 on category or search change
- Smooth `scrollTo({ top: 0 })` on page change
- Fully accessible: `role="navigation"`, `aria-label`, `aria-current="page"`, `disabled` on boundary buttons

**Quiz localStorage Persistence**
- Quiz step and answers saved to `localStorage` key `harusi-quiz-v1` on every change
- Survives page refresh and back-navigation
- Cleared on "Retake Quiz" (handleReset)
- Wrapped in try/catch — safe in private browsing mode where storage may be blocked

---

## [1.1.0] — 2026-03-19 · Pricing Overhaul & Architecture Refactor

### Pricing corrections (2026 Kenya market data)
| Package | V1.0 | V1.1 | Rationale |
|---------|------|------|-----------|
| Ndogo   | KSh 45,000  | KSh 55,000  | Minor uplift |
| Kati    | KSh 120,000 | KSh 175,000 | Mid-range correction |
| Kubwa   | KSh 250,000 | KSh 380,000 | Luxury tier severely underpriced |

### New packages
- **Asili** (KSh 90,000) — cultural/traditional weddings
- **Safari & Shores** (from KSh 450,000) — destination weddings

### New components
- `BudgetEstimator.jsx` — interactive cost calculator with 2026 market data
- `VendorModal.jsx` — vendor profile bottom-sheet (fixes dead-end View Profile)
- `SEOHead.jsx` — per-page meta via react-helmet-async

### Architecture
- `src/data/` layer introduced (packages, vendors, weddings, quiz)
- `src/utils/constants.js` — single source for config + market rates
- Quiz recommendation engine upgraded (landscape + size + budget)
- Quiz skip button added

### SEO
- `sitemap.xml` + `robots.txt` added
- Per-page title, OG, Twitter Card tags via react-helmet-async

---

## [1.0.0] — 2026-03-19 · Initial Release

### Migrated from standalone HTML prototype
- Vite + React + Tailwind CSS with full custom config
- 4-page SPA: Home, Vendors, Pricing, Inspiration
- Functional 5-step quiz with email capture
- 11 prototype bugs fixed (see V1.0 CHANGELOG entry in ADRs.md)

---

## [Unreleased]
See `TODO.md` for the V1.3+ backlog.
