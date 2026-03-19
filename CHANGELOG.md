# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.0] — 2026-03-19 · Pricing Overhaul & Architecture Refactor

### 🏗️ Architecture
- Introduced `src/data/` layer — all content extracted from page components into dedicated data files:
  - `src/data/packages.js` — pricing tiers, add-ons, FAQs
  - `src/data/vendors.js` — vendor listings with full profile data
  - `src/data/weddings.js` — real weddings gallery data
  - `src/data/quiz.js` — quiz steps, recommendation engine, result profiles
- Introduced `src/utils/constants.js` — single source of truth for WhatsApp number, site URL, OG image, and market rate constants
- Added `react-helmet-async` for per-page SEO head management

### 💰 Pricing Overhaul (Critical)
Prices corrected against 2026 Kenya market data (planners charge 5–15% of total wedding budget).

| Package | V1.0 Price   | V1.1 Price   | Rationale |
|---------|-------------|-------------|-----------|
| Ndogo   | KSh 45,000  | KSh 55,000  | Minor uplift; still accessible |
| Kati    | KSh 120,000 | KSh 175,000 | Mid-range weddings now KSh 500k–2M |
| Kubwa   | KSh 250,000 | KSh 380,000 | Luxury weddings KSh 3M–5M+; severe underpricing corrected |

### ✨ New in V1.1

**Asili Package (New Tier)**
- Cultural/traditional wedding tier: KSh 90,000 · Up to 200 guests
- Features: cultural vendor sourcing, family liaison, dowry logistics, multi-ceremony scheduling
- Addresses ruracio, nikah, and church+cultural combo weddings

**Safari & Shores Package (New Tier)**
- Destination wedding tier: From KSh 450,000 · Any guest count · Multi-day
- Covers Diani, Lamu, Zanzibar, Maasai Mara, and international destinations

**Budget Estimator (BudgetEstimator.jsx)**
- Guest count slider (20–500), venue tier selector, Outside Nairobi toggle
- Real-time cost estimate using 2026 Kenya market data
- Live breakdown bar chart across 7 cost categories
- Auto-suggests matching Harusi package with planner fee + VAT preview
- WhatsApp CTA pre-populates message with calculated total

**Vendor Profile Modal (VendorModal.jsx)**
- "View Profile" now opens a full modal with bio, tags, pricing, and WhatsApp enquiry CTA
- Escape key + backdrop dismiss; scroll lock while open

**Comparison Table**
- 10-row feature comparison table on Pricing page spanning all 5 packages

**Per-Page SEO (SEOHead.jsx)**
- Each route sets its own title, meta description, canonical URL, OG, and Twitter Card tags
- Powered by react-helmet-async

**Quiz Intelligence**
- Recommendation engine now factors landscape + size + budget
- Cultural Heritage → Asili; Coastal/Wilderness → Safari & Shores
- Skip button added to every step

**VAT Transparency**
- All prices labelled "Excl. 16% VAT · Starting price"
- BudgetEstimator shows planner fee + VAT as separate line items
- FAQ: "Do prices include VAT?" added

**Outside Nairobi Callout**
- Pricing hero surfaces upcountry savings
- BudgetEstimator toggle applies 25% location discount in real time

**New Add-Ons**
- Traditional Ceremony support: From KSh 35,000
- Rush Planning (under 3 months): From KSh 25,000

### 🗂️ SEO & Crawlability
- `public/sitemap.xml` added with all four routes
- `public/robots.txt` pointing to sitemap

### 🔧 Bug Fixes
- Removed orphaned `src/{components/` directory from V1.0 scaffolding error
- WhatsApp URL now sourced from `WHATSAPP_URL` constant throughout

### 📝 Add-On Repricing
| Add-On                 | V1.0         | V1.1         |
|------------------------|-------------|-------------|
| Day-Of Coordination    | From KSh 30k | From KSh 45k |
| Honeymoon Planning     | From KSh 15k | From KSh 20k |
| Post-Wedding Brunch    | From KSh 25k | From KSh 30k |
| Extra Site Visits      | KSh 5,000    | KSh 6,000    |
| Cinematic Highlight    | From KSh 50k | From KSh 55k |

---

## [1.0.0] — 2026-03-19 · Initial Release

### Bug Fixes from HTML prototype
| # | Bug | Fix |
|---|-----|-----|
| 1 | `</nav>` closing footer | Replaced with `</footer>` |
| 2 | Custom Tailwind colors not resolving | Added `tailwind.config.js` with brand token palette |
| 3 | Quiz fully static | Rebuilt as functional 5-step React component |
| 4 | Vendor tabs had no handlers | Implemented useState filter |
| 5 | No mobile navigation | Animated hamburger drawer |
| 6 | Missing `alt` on all images | Descriptive alt text added sitewide |
| 7 | No lazy loading | `loading="lazy"` on all below-fold images |
| 8 | Wrong WhatsApp SVG | Official WhatsApp brand SVG path |
| 9 | Hardcoded copyright year | `new Date().getFullYear()` |
| 10 | No SEO meta tags | OG + meta description in index.html |
| 11 | Newsletter form unvalidated | Email regex + required attribute |

---

## [Unreleased]

See `TODO.md` for the V1.2+ backlog.
