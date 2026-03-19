# TODO — Harusi Planners

Prioritised backlog for the next development sprint.

---

## 🔴 High Priority

### Backend / Data
- [ ] **Replace mock data with API** — All vendor, wedding, and package data is currently hardcoded in component files. Move to a CMS (e.g. Contentful, Sanity) or a REST/GraphQL API
- [ ] **Quiz email capture → real submission** — Currently `alert()`s on success. Wire to Mailchimp, ConvertKit, or a custom endpoint (e.g. `/api/leads`)
- [ ] **Newsletter form → real submission** — Footer form needs a live email service integration
- [ ] **WhatsApp number config** — Move `254799644100` to a `.env` variable (`VITE_WHATSAPP_NUMBER`) so it's not hardcoded in multiple files

### Auth & User Accounts
- [ ] **Couple dashboard** — After quiz email capture, create a lightweight user account so couples can return and view their vendor shortlist
- [ ] **Vendor portal** — Vendors need a self-serve listing management interface (CRUD their profile, photos, pricing)

---

## 🟠 Medium Priority

### UX / Features
- [ ] **Vendor profile page** — Individual vendor detail pages (route: `/vendors/:slug`) with photo gallery, full services list, availability calendar, and contact form
- [ ] **Venue detail page** — Similar to vendor pages, venue-specific with capacity, photos, map embed
- [ ] **Real image assets** — Replace Unsplash placeholder images with actual client and vendor photography
- [ ] **Quiz results persistence** — Save quiz results to `localStorage` so results survive a page refresh
- [ ] **Pagination or infinite scroll** — Vendor grid currently shows all vendors; add pagination for scale
- [ ] **Map integration** — Add Google Maps or Mapbox embed on venue pages and a venue-map view
- [ ] **Testimonials carousel** — Replace static 2-up grid with a swipeable carousel (Embla or Keen Slider)
- [ ] **Blog / editorial** — "The Blog" link is in the footer but has no route; implement with CMS

### Performance
- [ ] **Image optimisation** — Implement `<picture>` with WebP sources and responsive `srcSet` for all images
- [ ] **Route-based code splitting** — Add `React.lazy()` + `Suspense` per page route to reduce initial bundle
- [ ] **Font subsetting** — Self-host Cormorant Garamond and DM Sans with only required glyphs
- [ ] **Core Web Vitals audit** — Run Lighthouse and address LCP/CLS issues before launch

### Accessibility
- [ ] **Focus trap in mobile nav** — Keyboard users can tab out of the open mobile drawer; add a focus trap
- [ ] **`aria-live` region for quiz** — Announce step changes to screen readers
- [ ] **Color contrast audit** — Verify all `text-plum/40` and `text-white/40` opacity variants meet WCAG AA (4.5:1)
- [ ] **Reduced motion support** — Wrap animations in `@media (prefers-reduced-motion: reduce)` queries

---

## 🟡 Low Priority / Nice to Have

- [ ] **Dark mode** — Add a Tailwind dark mode variant; the plum/ivory palette adapts nicely
- [ ] **i18n (Swahili / English toggle)** — Full bilingual content with `react-i18next`
- [ ] **Vendor reviews system** — Allow couples to leave verified reviews after their wedding
- [ ] **Referral system** — "Refer a couple, get KSh 5,000 off" mechanic
- [ ] **WhatsApp chat widget** — Replace the float button with a full chat widget (Tidio or similar)
- [ ] **404 page** — Add a branded Not Found route
- [ ] **Sitemap.xml & robots.txt** — For SEO
- [ ] **Cookie consent banner** — GDPR/local compliance if collecting analytics

---

## 🛠️ Tech Debt

- [ ] Move hardcoded data arrays out of page components and into `src/data/*.js` files
- [ ] Create a shared `Button` component to reduce repeated Tailwind class strings
- [ ] Add ESLint + Prettier config
- [ ] Set up Vitest for unit tests (Quiz logic, form validation)
- [ ] Add GitHub Actions CI pipeline (lint → test → build)
- [ ] Pin dependency versions in `package-lock.json` and commit it
