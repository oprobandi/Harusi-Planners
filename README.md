# Harusi Planners · v1.1

> East Africa's most trusted wedding planning platform.

---

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

---

## Project Structure

```
harusi-planners/
├── public/
│   ├── _redirects        # Netlify SPA fallback
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── data/
│   │   ├── packages.js   # 5 pricing tiers, add-ons, FAQs
│   │   ├── vendors.js    # Vendor listings + profile data
│   │   ├── weddings.js   # Real weddings gallery
│   │   └── quiz.js       # Quiz steps + recommendation engine
│   ├── utils/
│   │   └── constants.js  # WhatsApp number, site URL, market rates
│   ├── components/
│   │   ├── quiz/
│   │   │   └── Quiz.jsx        # 5-step quiz + email capture
│   │   ├── BudgetEstimator.jsx # Interactive cost calculator
│   │   ├── VendorModal.jsx     # Vendor profile bottom-sheet
│   │   ├── SEOHead.jsx         # Per-page meta via react-helmet-async
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── WhatsAppFloat.jsx
│   ├── pages/
│   │   ├── Home.jsx        /
│   │   ├── Vendors.jsx     /vendors
│   │   ├── Pricing.jsx     /pricing
│   │   └── Inspiration.jsx /inspiration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
├── vercel.json
├── CHANGELOG.md
├── TODO.md
└── ADRs.md
```

---

## Design Tokens

| Token   | Hex       | Usage |
|---------|-----------|-------|
| `plum`  | `#4A0E2E` | Primary text, hero backgrounds |
| `rose`  | `#A0266A` | CTAs, accents, links |
| `blush` | `#F4A7B9` | Soft borders, decorative, quiz hover |
| `gold`  | `#C9A84C` | Premium accents, shimmer, stars |
| `ivory` | `#F5F0E8` | Page background |
| `sage`  | `#2D4739` | Vendor CTA strip |

All tokens available as Tailwind utilities with opacity modifiers:
`bg-rose/10`, `text-plum/60`, `border-gold/30` etc.

---

## Pricing Packages (V1.1)

| Package          | Price          | Guests       |
|-----------------|----------------|-------------|
| Ndogo           | KSh 55,000     | Up to 50    |
| Asili           | KSh 90,000     | Up to 200   |
| Kati ⭐         | KSh 175,000    | Up to 250   |
| Kubwa           | KSh 380,000    | Unlimited   |
| Safari & Shores | From KSh 450,000 | Any / Multi-day |

All prices exclude 16% VAT. Based on 2026 Kenya market rates.

---

## Environment Variables

Create `.env` at project root (not committed):

```env
VITE_WHATSAPP_NUMBER=254799644100
```

---

## Deployment

### Netlify
Build command: `npm run build` · Publish directory: `dist`
The `public/_redirects` file handles SPA routing automatically.

### Vercel
`vercel.json` at project root handles SPA routing rewrites.

### Cloudflare Pages
Build command: `npm run build` · Output directory: `dist`
Add a redirect rule: `/* → /index.html` (200 rewrite).

---

## Key Docs

- [`CHANGELOG.md`](./CHANGELOG.md) — Full history of changes and bug fixes
- [`TODO.md`](./TODO.md) — Prioritised backlog (V1.2+)
- [`ADRs.md`](./ADRs.md) — Architecture decisions and rationale
