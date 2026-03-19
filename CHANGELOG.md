# Changelog

All notable changes to **Harusi Planners** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2026-03-19 · Initial Release

### 🏗️ Architecture
- Bootstrapped with **Vite + React 18** (migrated from standalone HTML file)
- **React Router v6** with four discrete page routes
- **Tailwind CSS v3** with full custom design token config (replaces CDN script approach)
- PostCSS + Autoprefixer pipeline for production builds

### ✅ Bug Fixes (from original HTML prototype)

| # | Bug | Fix |
|---|-----|-----|
| 1 | `</nav>` used as footer closing tag | Replaced with correct `</footer>` in `Footer.jsx` |
| 2 | Tailwind custom colors (`bg-ivory`, `text-blush`, `bg-sage`, etc.) not resolving | Added complete `tailwind.config.js` extending the color palette |
| 3 | Quiz was fully static — no JS, no state, no step progression | Rebuilt as fully functional 5-step `Quiz.jsx` component with React state |
| 4 | Vendor category tabs had no click handlers | Implemented `useState`-based filter in `Vendors.jsx` |
| 5 | No mobile navigation | Added animated hamburger drawer with full-screen overlay in `Navbar.jsx` |
| 6 | All `<img>` tags missing `alt` attributes | Added descriptive `alt` text to every image sitewide |
| 7 | No lazy loading on below-fold images | Added `loading="lazy"` to all non-hero images |
| 8 | Wrong WhatsApp SVG (generic message bubble) | Replaced with official WhatsApp brand SVG path in `WhatsAppFloat.jsx` |
| 9 | Copyright year hardcoded as `2024` | Replaced with `new Date().getFullYear()` |
| 10 | No SEO meta tags | Added `<meta name="description">` and Open Graph tags to `index.html` |
| 11 | Newsletter form had no validation | Added email regex validation + `required` in `Footer.jsx` |

### ✨ New Features
- **Multi-step quiz** (5 steps) with answer state management, back navigation, and results
- **Email capture** at end of quiz with name + email validation and personalised result card
- **Filterable vendor grid** with category tabs + live search input
- **Filterable inspiration masonry** with wedding style filter
- **FAQ accordion** on Pricing page
- **Add-ons section** on Pricing page
- **Testimonials section** on Home page
- **Trust/stats bar** on Home page
- **Social links** in footer
- Smooth scroll-to-top on route change
- Glassmorphism nav that transitions on scroll
- Body scroll lock when mobile menu is open
- WhatsApp label expands on hover

### 🎨 Design
- Preserved original brand palette: Plum, Rose, Blush, Gold, Ivory, Sage
- Typography retained: Cormorant Garamond (serif) + DM Sans (sans)
- Animations: `fadeUp`, `fadeIn`, gold shimmer on brand marks
- Masonry grid layout for Inspiration page
- Sticky filter bars on Vendors and Inspiration pages

---

## [Unreleased]

See `TODO.md` for planned improvements.
