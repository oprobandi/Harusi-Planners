# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.3.0] — 2026-03-19 · Icons, Wordmark & Image Fixes

### 🐛 Bug Fixes
| # | Bug | Fix |
|---|-----|-----|
| 1 | Karen Country Club — still broken after V1.2 fix | Third replacement with confirmed Unsplash ID |

### 🎨 Design
- **Navbar wordmark** updated from `"Harusi."` to `"Harusi Planners"` — two-weight
  treatment: italic serif "Harusi" + small-caps sans "Planners" in rose/80
- **Footer brand** updated to match Navbar wordmark style
- **Logo swap guide** added to README — step-by-step instructions for when
  the designed logo is delivered (Navbar, Footer, favicon)

### 🔲 Icons — Lucide React (`^0.383.0`)

**Installed:** `lucide-react` added to `dependencies` in `package.json`.

**Navbar (`Navbar.jsx`)**
- `Sparkles` icon added to "Start Planning" CTA button (desktop + mobile drawer)

**Footer (`Footer.jsx`)**
- `Instagram`, `Facebook`, `Youtube` from Lucide React on social links
- Custom inline `TikTokIcon` SVG matching Lucide's stroke style (TikTok not in Lucide library)
- `Mail` icon in newsletter input field

**Vendor Cards (`Vendors.jsx`)**
- `MapPin` — location pill on card image overlay
- `Star` — rating stars (filled/outline based on rating value, replaces Unicode ★☆)
- `Tag` — category label

**Vendor Modal (`VendorModal.jsx`)**
- `MapPin` — location chip
- `Star` — badge chip + filled/outline star rating row
- `Tag` — each tag chip
- `X` — close button (replaces Unicode ✕)
- `MessageCircle` — WhatsApp CTA button

**Pricing — Package feature lists (`Pricing.jsx`)**
- `CheckCircle2` — included features (gold)
- `XCircle` — not-included features (plum/15, with strikethrough text)
- `ChevronDown` — FAQ accordion toggle (replaces Unicode +, animates rotate-180)

**Pricing — Comparison table (`Pricing.jsx`)**
- `CheckCircle2` / `XCircle` replace `✓` / `✕` Unicode characters in table cells

**Pricing — Add-on cards (`Pricing.jsx` + `packages.js`)**
- Each add-on now has a contextual icon in a rounded tile:
  - Day-Of Coordination → `CalendarCheck`
  - Honeymoon Planning → `Plane`
  - Digital RSVP Platform → `MailCheck`
  - Post-Wedding Brunch → `UtensilsCrossed`
  - Extra Site Visits → `MapPin`
  - Cinematic Highlight → `Film`
  - Traditional Ceremony → `Heart`
  - Rush Planning → `Zap`
- `ADDON_ICONS` map added to `packages.js`; `Pricing.jsx` resolves to components via `ICON_MAP`

**BudgetEstimator (`BudgetEstimator.jsx`)**
- `Users` — Guest Count section header
- `Sliders` — Wedding Tier section header
- `MapPin` — Outside Nairobi toggle label
- `MessageCircle` — WhatsApp CTA button

---

## [1.2.0] — 2026-03-19 · Bug Fixes, Performance & UX Polish
- 3 broken image IDs fixed, Home nav link added
- React.lazy + Suspense code splitting, 404 page
- Testimonials carousel (pure React), vendor pagination (12/page)
- Quiz localStorage persistence

## [1.1.0] — 2026-03-19 · Pricing Overhaul & Architecture Refactor
- 5-tier pricing, BudgetEstimator, VendorModal, SEOHead
- src/data/ layer, src/utils/constants.js

## [1.0.0] — 2026-03-19 · Initial Release
- Vite + React + Tailwind migration, 11 prototype bugs fixed

---

## [Unreleased]
See `TODO.md` for the V1.4+ backlog.
