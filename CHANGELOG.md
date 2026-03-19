# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.5.0] — 2026-03-19 · Logo Integration

### 🎨 Brand
- **Logo SVGs integrated** — three files added to `public/`:
  - `logo.svg` — main lockup, plum `#4A0E2E` paths, transparent background (11KB)
  - `logo-white.svg` — white paths, transparent background, for dark sections (5.9KB)
  - `logo-mark.svg` — icon/monogram only, plum, for favicon (4.4KB)
- **Optimisation applied** before inclusion:
  - XML declaration and DOCTYPE removed (unnecessary for web)
  - Fixed-unit `width`/`height` (`pt`) removed — SVGs now scale freely via CSS
  - Background rectangle removed from `logo-white.svg` (was embedded solid fill)
  - Fill colour corrected: `#000000` → `#4A0E2E` (plum) on main/mark, `#FFFFFF` on white
- **Navbar** — text two-span wordmark replaced with `<img src="/logo.svg" className="h-10 w-auto" />`
- **Footer** — text brand block replaced with `<img src="/logo-white.svg" className="h-10 w-auto mb-6" />`
- **Favicon** — `index.html` updated to `<link rel="icon" type="image/svg+xml" href="/logo-mark.svg" />`
- **PageLoader** — Suspense fallback updated to display `logo.svg` at opacity-20 with pulse animation

---

## [1.4.0] — 2026-03-19 · Mailchimp Integration & Form Fixes
- api/subscribe.js serverless function, newsletter validation, quiz wiring

## [1.3.0] — 2026-03-19 · Icons, Wordmark & Image Fixes
- lucide-react across 7 areas, Harusi Planners wordmark, Karen CC fix

## [1.2.0] — 2026-03-19 · Bug Fixes, Performance & UX Polish
- Code splitting, 404 page, carousel, pagination, quiz localStorage

## [1.1.0] — 2026-03-19 · Pricing Overhaul & Architecture Refactor
- 5 pricing tiers, BudgetEstimator, VendorModal, SEOHead, src/data/ layer

## [1.0.0] — 2026-03-19 · Initial Release
- Vite + React + Tailwind migration, 11 prototype bugs fixed

---

## [Unreleased]
See `TODO.md` for the V1.6+ backlog.
