# TODO — Harusi Planners

Prioritised backlog for V1.2 and beyond.

---

## 🔴 High Priority (V1.2)

### Backend / Data
- [ ] **Replace mock data with CMS** — All content is still in `src/data/*.js`. Migrate to Sanity (recommended for its image pipeline) or Contentful. See ADR-005.
- [ ] **Quiz email → real submission** — Currently no-ops after form submit. Wire to Mailchimp, ConvertKit, or a serverless `/api/leads` endpoint. Add success/failure handling beyond the current optimistic UI.
- [ ] **Newsletter footer → real submission** — Same as above; consolidate both into a single email service integration.
- [ ] **Vendor portal** — Self-serve listing management for vendors (CRUD profile, photos, pricing, availability). Requires auth (see ADR-006).

### Auth
- [ ] **Couple dashboard** — After quiz capture, create lightweight user accounts so couples can return to their vendor shortlist and planning progress. Recommended stack: Supabase Auth with magic links.

### SEO
- [ ] **Update sitemap.xml** — Replace placeholder `https://harusihub.com` with live domain before go-live.
- [ ] **robots.txt domain** — Same; update to live domain.
- [ ] **Per-vendor/venue canonical URLs** — Currently vendor pages don't exist as routes. Once `/vendors/:slug` is built (see below), add them to the sitemap.

---

## 🟠 Medium Priority (V1.2–V1.3)

### UX / Features
- [ ] **Vendor profile pages** — Individual routes `/vendors/:slug` with full photo gallery, availability indicator, service tiers, and contact form. Currently only a modal; needs a dedicated page for SEO and direct linking.
- [ ] **Venue detail pages** — `/venues/:slug` with capacity, layout photos, Google Maps embed, and pricing ranges.
- [ ] **Quiz results persistence** — Save answers to `localStorage` so results survive page refresh and back-navigation. One-liner: `localStorage.setItem('harusi-quiz', JSON.stringify(answers))`.
- [ ] **Vendor pagination** — The grid renders all vendors at once. Add pagination (12 per page) or infinite scroll (Intersection Observer) before vendor count grows beyond ~30.
- [ ] **Testimonials carousel** — Replace static 2-up grid on Home with swipeable carousel (Embla Carousel recommended — lightweight, no dependencies).
- [ ] **Blog / editorial section** — "The Blog" link in footer has no route. Implement with CMS-backed posts (Sanity + GROQ queries).
- [ ] **BudgetEstimator refinement** — Add catering style selector (buffet vs plated vs cocktail), ceremony type (church/civil/outdoor), and photographer hours. Each adds precision to the estimate.

### Performance
- [ ] **`React.lazy()` + `Suspense`** — Wrap each page route in lazy imports to code-split by route and reduce initial bundle size.
- [ ] **`<picture>` with WebP** — Replace all `<img>` tags with responsive `<picture srcSet>` elements and WebP sources. Especially high-impact for the hero collage (3 images loaded eagerly).
- [ ] **Self-host fonts** — Download and serve Cormorant Garamond + DM Sans from `public/fonts/`. Removes Google Fonts dependency and improves GDPR compliance.
- [ ] **Core Web Vitals audit** — Run Lighthouse on staging. Hero images likely cause LCP issues; preload the centre hero image with `<link rel="preload">`.

### Accessibility
- [ ] **Focus trap in mobile nav drawer** — Keyboard users can currently tab out of the open drawer. Add a focus trap (use `focus-trap-react` or a custom hook).
- [ ] **`aria-live` region on quiz** — Step transitions should be announced to screen readers. Add `<div aria-live="polite">` that receives the new question text on step change.
- [ ] **Color contrast audit** — Verify `text-plum/40`, `text-white/40`, and `text-plum/30` variants meet WCAG AA (4.5:1 for normal text). Run axe-core or Stark.
- [ ] **`prefers-reduced-motion`** — Wrap all `animation-*` and `transition` classes in `@media (prefers-reduced-motion: reduce)` in `index.css`.
- [ ] **BudgetEstimator range input** — Native `<input type="range">` has poor screen reader support. Add a visible numeric input fallback alongside the slider.

---

## 🟡 Low Priority / Nice to Have (V1.3+)

- [ ] **Dark mode** — Add Tailwind dark mode variant. The plum/gold palette adapts naturally to dark backgrounds.
- [ ] **Swahili / English language toggle** — Full bilingual content with `react-i18next`. All Swahili copy is currently decorative; real bilingual support would serve upcountry and diaspora couples.
- [ ] **Verified couple reviews** — Allow post-wedding couples to leave authenticated reviews on vendor profiles. Requires auth layer.
- [ ] **Referral mechanic** — "Refer a couple, earn KSh 5,000 off your package." Trackable via referral codes.
- [ ] **Availability calendar on vendor profiles** — Simple blocked-dates display so couples can self-qualify before enquiring.
- [ ] **404 / Not Found page** — Branded route for unmatched paths.
- [ ] **WhatsApp Business API** — Replace `wa.me` links with WhatsApp Business API for tracked conversions and automated follow-up sequences.
- [ ] **Analytics** — Integrate Plausible (privacy-first, no cookie banner needed) or GA4. Track: quiz starts, quiz completions, email captures, WhatsApp clicks, package CTA clicks.

---

## 🛠️ Tech Debt

- [ ] Create a shared `Button` component to eliminate repeated Tailwind class strings across CTAs
- [ ] Create a shared `SectionHeader` component (`eyebrow + h2 + subline` pattern repeats on every section)
- [ ] Add ESLint (`eslint-plugin-react`, `eslint-plugin-jsx-a11y`) + Prettier with shared config
- [ ] Set up Vitest for unit tests — priority targets: `recommendPackage()` in `quiz.js`, form validation in Quiz and Footer
- [ ] Add GitHub Actions CI: lint → test → build on every PR
- [ ] Commit `package-lock.json` to lock dependency versions
- [ ] Remove the stale `src/{components/` directory if still present after clean install
