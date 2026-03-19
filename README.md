# Harusi Planners · v1.0

> East Africa's most trusted wedding planning platform.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173

# 3. Production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Project Structure

```
harusi-planners/
├── public/                   # Static assets (favicon, etc.)
├── src/
│   ├── components/
│   │   ├── quiz/
│   │   │   └── Quiz.jsx      # 5-step interactive quiz + email capture
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx        # Responsive nav with mobile drawer
│   │   └── WhatsAppFloat.jsx
│   ├── pages/
│   │   ├── Home.jsx          # / — Hero, quiz, vendor preview, testimonials
│   │   ├── Vendors.jsx       # /vendors — Filterable vendor & venue grid
│   │   ├── Pricing.jsx       # /pricing — Packages, add-ons, FAQ accordion
│   │   └── Inspiration.jsx   # /inspiration — Real weddings masonry gallery
│   ├── App.jsx               # Router + layout shell
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind directives + global component styles
├── index.html                # HTML entry + meta/OG tags
├── tailwind.config.js        # Brand design tokens
├── vite.config.js
├── CHANGELOG.md
├── TODO.md
└── ADRs.md
```

---

## Design Tokens

| Token   | Hex       | Usage |
|---------|-----------|-------|
| `plum`  | `#4A0E2E` | Primary text, backgrounds |
| `rose`  | `#A0266A` | CTAs, accents, links |
| `blush` | `#F4A7B9` | Soft borders, decorative |
| `gold`  | `#C9A84C` | Premium accents, shimmer |
| `ivory` | `#F5F0E8` | Page background |
| `sage`  | `#2D4739` | Vendor CTA section |

All tokens are available as Tailwind utilities with full opacity modifier support:
`bg-rose/10`, `text-plum/60`, `border-gold/30`, etc.

---

## Deployment

### Netlify
```bash
npm run build
# Deploy dist/ folder
# Add _redirects file: /* /index.html 200
```

### Vercel
```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Cloudflare Pages
Build command: `npm run build` · Output directory: `dist`

---

## Environment Variables

Create a `.env` file at the project root (not committed):

```env
VITE_WHATSAPP_NUMBER=254799644100
```

> Note: All `VITE_` prefixed variables are exposed to the client bundle.
> Do not put secrets here.

---

## Key Docs

- [`CHANGELOG.md`](./CHANGELOG.md) — What changed and what bugs were fixed
- [`TODO.md`](./TODO.md) — Prioritised backlog for v1.1+
- [`ADRs.md`](./ADRs.md) — Architecture decisions and their rationale
