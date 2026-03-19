# TODO — Harusi Planners

Prioritised backlog. Items shipped in a version are removed and documented in CHANGELOG.md.

---

## ✅ Shipped

### V1.4
- [x] Newsletter form — email regex validation (fixes accepts-any-string bug)
- [x] Newsletter form — Mailchimp API wiring via /api/subscribe serverless fn
- [x] Quiz email capture — Mailchimp API wiring, loading/error states
- [x] api/subscribe.js — Vercel serverless function with tag differentiation
- [x] .env.example — Mailchimp variables documented
- [x] README — Mailchimp setup guide (4 steps)
- [x] Home "View Profile" — now opens VendorModal, not /vendors page
- [x] sitemap.xml — updated to live harusi-planners.vercel.app domain
- [x] robots.txt — domain updated to match sitemap

### V1.3
- [x] Fix Karen Country Club image (third attempt — confirmed ID)
- [x] Navbar wordmark: "Harusi Planners" two-weight treatment
- [x] Logo swap guide added to README
- [x] lucide-react installed
- [x] Sparkles icon on Navbar CTA
- [x] Footer social icons (Instagram, Facebook, TikTok, YouTube)
- [x] Vendor cards — MapPin, Star (filled/outline), Tag
- [x] Vendor modal — MapPin, Star, Tag, X, MessageCircle
- [x] Pricing feature lists — CheckCircle2, XCircle
- [x] Pricing comparison table — CheckCircle2, XCircle
- [x] Pricing FAQ accordion — ChevronDown (animated)
- [x] Pricing add-ons — contextual icon per add-on (8 icons)
- [x] BudgetEstimator — Users, Sliders, MapPin, MessageCircle

### V1.2
- [x] Fix 3 broken Unsplash image IDs
- [x] Add Home tab to Navbar
- [x] React.lazy() + Suspense route-based code splitting
- [x] 404 / Not Found branded page
- [x] Testimonials swipeable carousel (pure React, no deps)
- [x] Vendor pagination (12 per page)
- [x] Quiz localStorage persistence (survives refresh)

### V1.1
- [x] src/data/ layer (packages, vendors, weddings, quiz)
- [x] src/utils/constants.js
- [x] 5-tier pricing (Asili + Safari & Shores added)
- [x] Market-rate price corrections
- [x] BudgetEstimator.jsx
- [x] VendorModal.jsx
- [x] SEOHead.jsx + react-helmet-async
- [x] Quiz recommendation engine (landscape + size + budget)
- [x] Quiz skip button
- [x] sitemap.xml + robots.txt

### V1.0
- [x] Vite + React + Tailwind migration
- [x] 4-page React Router SPA
- [x] All 11 prototype bugs fixed

---

## 🔴 High Priority (V1.5)

### Logo
- [ ] **Swap text wordmark for designed logo** — when logo SVG is delivered,
  follow the Logo Swap Guide in README.md. Three files needed:
  `public/logo.svg`, `public/logo-white.svg`, `public/logo-mark.svg`
- [ ] **Update favicon** — replace with logo mark SVG in `index.html`

### Backend & Data

- [ ] **Set VITE_WHATSAPP_NUMBER in Vercel dashboard** — Currently falls back to
  hardcoded default. Vercel: Project → Settings → Environment Variables.
- [ ] **Submit sitemap to Google Search Console** — now that domain is confirmed.
- [ ] **Add MAILCHIMP env vars to Vercel** — follow Mailchimp Setup Guide in README.
  Without this, /api/subscribe returns 500 in production.
- [ ] **Double opt-in consideration** — currently `status: 'subscribed'` sends
  contacts straight to your list. Change to `status: 'pending'` in api/subscribe.js
  to require email confirmation (recommended for GDPR compliance).

### Backend & Data
- [ ] **Replace src/data/*.js with CMS** — Migrate to Sanity (recommended)
  or Contentful. See ADR-005 for migration path.
  - Priority order: packages.js → vendors.js → weddings.js
- [ ] **Move VITE_WHATSAPP_NUMBER to Vercel env vars** — Currently falls back
  to hardcoded default. Set in Vercel dashboard: Settings → Environment Variables.

### Auth (required for V1.3 vendor portal)
- [ ] **Supabase Auth** — Magic link flow (email-first, suits EA market).
  Required before vendor portal or couple dashboard can be built.
  See ADR-006 for full rationale and stack recommendation.

### SEO
- [ ] **Update sitemap.xml domain** — Replace `https://harusihub.com` with
  live Vercel URL or custom domain before indexing.
- [ ] **Google Search Console** — Submit sitemap after domain is confirmed.
- [ ] **Vendor/venue routes for SEO** — `/vendors/:slug` pages (see below)
  need to be in sitemap once built.

---

## 🟠 Medium Priority (V1.3–V1.4)

### UX / Features
- [ ] **Vendor profile pages** — `/vendors/:slug` full page with:
  - Photo gallery (lightbox)
  - Services list + pricing tiers
  - Availability indicator
  - Contact form / WhatsApp CTA
  - SEO: own title, OG image, canonical URL
- [ ] **Venue detail pages** — `/venues/:slug` with capacity, photos,
  Google Maps embed, catering options
- [ ] **Blog / editorial** — `/blog` + `/blog/:slug`. CMS-backed (Sanity).
  "The Blog" link in footer currently goes nowhere.
- [ ] **Couple dashboard** — Post-quiz account creation; return to saved
  vendor shortlist and planning checklist.
- [ ] **BudgetEstimator refinements:**
  - Catering style selector (buffet / plated / cocktail)
  - Ceremony type (church / civil / outdoor / traditional)
  - Photography hours slider
- [ ] **Vendor search improvements:**
  - Price range filter (slider)
  - Sort by: Rating, Price (low–high), Newest
  - Location radius filter (Nairobi / Coast / Rift Valley / etc.)

### Performance
- [ ] **`<picture>` with WebP + srcSet** — Replace all `<img>` with
  responsive picture elements. High impact on hero collage (3 eager loads).
- [ ] **Preload hero centre image** — Add `<link rel="preload">` in
  `index.html` to fix LCP on Home page.
- [ ] **Self-host fonts** — Download Cormorant Garamond + DM Sans to
  `public/fonts/`. Removes Google Fonts dependency, improves GDPR compliance.
- [ ] **Lighthouse audit** — Run on Vercel prod URL, target 90+ on all
  four metrics before V1.3 launch.

### Accessibility
- [ ] **Focus trap in mobile nav drawer** — Keyboard users can tab out.
  Use `focus-trap-react` or a custom hook.
- [ ] **`aria-live` on quiz step transitions** — Announce new question
  text to screen readers on each step change.
- [ ] **Color contrast audit** — Verify `text-plum/40`, `text-white/40`,
  `text-plum/30` pass WCAG AA (4.5:1). Run axe-core.
- [ ] **`prefers-reduced-motion`** — Wrap carousel auto-advance and CSS
  animations in the reduced-motion media query.
- [ ] **BudgetEstimator range input** — Add visible numeric input fallback
  alongside the slider for screen reader users.

---

## 🟡 Low Priority / Nice to Have (V1.4+)

- [ ] **Dark mode** — Tailwind `dark:` variant. Plum/gold palette adapts well.
- [ ] **Swahili / English toggle** — `react-i18next`. All Swahili is currently
  decorative; real bilingual support for upcountry and diaspora couples.
- [ ] **Verified couple reviews** — Authenticated post-wedding reviews on
  vendor profiles. Requires auth layer first.
- [ ] **Referral mechanic** — "Refer a couple, earn KSh 5,000 off."
  Trackable referral codes.
- [ ] **WhatsApp Business API** — Replace `wa.me` links with Business API
  for tracked conversions and automated follow-up sequences.
- [ ] **Analytics** — Plausible (privacy-first, no cookie banner) or GA4.
  Track: quiz completions, email captures, WhatsApp clicks, package CTAs.
- [ ] **Availability calendar** on vendor profiles — Blocked-dates display.
- [ ] **Custom domain** — Point `harusi-planners.vercel.app` to custom domain
  in Vercel dashboard once purchased.

---

## 🛠️ Tech Debt

- [ ] Shared `<Button>` component — repeated Tailwind CTA class strings
- [ ] Shared `<SectionHeader>` component — eyebrow + h2 + subline pattern
  repeats across every page section
- [ ] ESLint (`eslint-plugin-react`, `eslint-plugin-jsx-a11y`) + Prettier
- [ ] Vitest unit tests — priority: `recommendPackage()`, form validation,
  pagination logic
- [ ] GitHub Actions CI — lint → test → build on every PR
- [ ] Commit `package-lock.json`
