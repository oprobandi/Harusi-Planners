import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import BudgetEstimator from '../components/BudgetEstimator'
import { PACKAGES, ADDONS, FAQS } from '../data/packages'
import { WHATSAPP_URL } from '../utils/constants'

const BADGE_STYLES = {
  'Most Popular': 'bg-gold text-white',
  'New':          'bg-rose text-white',
  'Premium':      'bg-plum text-white',
  'Destination':  'bg-sage text-white',
}

function PackageCard({ pkg }) {
  const {
    name, swahili, guests, priceDisplay, featured, accentColor,
    badge, features, notIncluded, cta, whatsappMsg, idealFor,
  } = pkg

  const waLink = `${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <div
      className={`relative p-8 md:p-10 rounded-3xl border-2 flex flex-col transition-all duration-300 ${accentColor} ${
        featured
          ? 'bg-white shadow-2xl shadow-gold/10 md:scale-[1.04] md:z-10'
          : 'bg-ivory/50 hover:bg-white hover:shadow-lg hover:shadow-plum/5'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${BADGE_STYLES[badge] ?? 'bg-plum text-white'}`}>
          {badge}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 pt-2">
        <h2 className="text-3xl font-serif text-plum mb-1">{name}</h2>
        <p className="text-[10px] font-bold uppercase tracking-widest text-rose/60">{swahili}</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-plum/40 mt-1">{guests}</p>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-plum/5">
        <p className="text-4xl font-bold text-plum">{priceDisplay}</p>
        <p className="text-[10px] text-plum/30 mt-1">Excl. 16% VAT · Starting price</p>
      </div>

      {/* Ideal for */}
      <div className="bg-ivory/70 rounded-xl px-4 py-3 mb-6">
        <p className="text-[10px] uppercase tracking-widest text-plum/40 mb-1">Ideal for</p>
        <p className="text-xs text-plum/70 leading-relaxed">{idealFor}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6 flex-grow">
        {features.map(f => (
          <li key={f} className="flex items-start gap-3 text-sm text-plum/70">
            <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">✓</span> {f}
          </li>
        ))}
        {notIncluded.map(f => (
          <li key={f} className="flex items-start gap-3 text-sm text-plum/25 line-through">
            <span className="mt-0.5 shrink-0" aria-hidden="true">✕</span> {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest text-center transition block ${
          featured
            ? 'bg-rose text-white hover:bg-plum shadow-lg'
            : 'border-2 border-rose text-rose hover:bg-rose hover:text-white'
        }`}
      >
        {cta}
      </a>
    </div>
  )
}

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <SEOHead
        title="Pricing & Packages"
        description="Transparent wedding planning packages for every couple in Kenya and East Africa. From intimate ceremonies to luxury destination weddings — Ndogo, Asili, Kati, Kubwa, and Safari & Shores."
        path="/pricing"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 bg-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blush/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-5">Transparent Pricing</p>
          <h1 className="text-5xl md:text-7xl font-serif text-plum italic leading-tight mb-6">
            Simple Plans,<br />Perfect Days.
          </h1>
          <p className="text-plum/50 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            Five packages designed around real Kenya wedding budgets. No hidden fees. No surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] font-bold uppercase tracking-widest text-plum/40">
            <span>All prices excl. 16% VAT</span>
            <span className="text-blush">·</span>
            <span>Outside Nairobi? Costs may be lower — ask us</span>
          </div>
        </div>
      </section>

      {/* ── Package grid — 5 tiers ── */}
      <section className="py-10 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: stack / Desktop: 5-col with featured scaled */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 items-start">
            {PACKAGES.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <p className="text-center text-xs text-plum/40 mt-12 max-w-xl mx-auto leading-relaxed">
            All prices are starting rates for Nairobi. Final quotes are tailored to your date, location, guest count and scope.{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose hover:underline"
            >
              WhatsApp us for a custom quote.
            </a>
          </p>
        </div>
      </section>

      {/* ── Comparison table (desktop) ── */}
      <section className="py-20 bg-ivory px-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3 text-center">Side by Side</p>
          <h2 className="text-3xl font-serif text-center text-plum mb-12">What's Included</h2>
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-plum/10">
                <th className="text-left py-3 pr-6 text-xs font-bold uppercase tracking-widest text-plum/40 w-1/3">Feature</th>
                {PACKAGES.map(p => (
                  <th key={p.id} className={`text-center py-3 px-2 font-serif text-lg font-semibold ${p.featured ? 'text-rose' : 'text-plum'}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Guest Capacity',           vals: ['50',  '200', '250',  'Unlimited', 'Any'] },
                { label: 'Starting Price',            vals: ['55k', '90k', '175k', '380k',       '450k+'] },
                { label: 'Vendor Shortlist',          vals: ['✓', '✓', '✓', '✓', '✓'] },
                { label: 'On-Day Coordination',       vals: ['✕', '✕', '✓', '✓', '✓'] },
                { label: 'Site Visits',               vals: ['✕', '✕', '3',  'Unlimited', 'Unlimited'] },
                { label: 'Guest Management Portal',   vals: ['✕', '✕', '✓', '✓', '✓'] },
                { label: 'Cultural Ceremony Support', vals: ['✕', '✓', '✕', '✕', '✓'] },
                { label: 'Multi-Day Management',      vals: ['✕', '✕', '✕', '✓', '✓'] },
                { label: 'International Logistics',   vals: ['✕', '✕', '✕', '✓', '✓'] },
                { label: 'Dedicated Senior Planner',  vals: ['✕', '✕', '✕', '✓', '✓'] },
              ].map(({ label, vals }) => (
                <tr key={label} className="border-b border-plum/5 hover:bg-ivory/60 transition">
                  <td className="py-3.5 pr-6 text-plum/70 font-medium">{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={`py-3.5 px-2 text-center ${
                      v === '✓' ? 'text-gold font-bold' :
                      v === '✕' ? 'text-plum/20' :
                      'text-plum font-medium'
                    } ${PACKAGES[i].featured ? 'bg-rose/3' : ''}`}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Budget Estimator ── */}
      <BudgetEstimator />

      {/* ── Add-ons ── */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3 text-center">À La Carte</p>
          <h2 className="text-4xl font-serif text-center text-plum mb-16">Popular Add-Ons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ADDONS.map(({ name, price, desc }) => (
              <div key={name} className="bg-ivory rounded-2xl p-6 flex justify-between items-start gap-6 hover:shadow-md transition">
                <div>
                  <h3 className="font-bold text-plum mb-1">{name}</h3>
                  <p className="text-sm text-plum/50 leading-relaxed">{desc}</p>
                </div>
                <p className="text-sm font-bold text-rose whitespace-nowrap shrink-0">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-ivory px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3 text-center">Got Questions?</p>
          <h2 className="text-4xl font-serif text-center text-plum mb-16">Frequently Asked</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="border border-blush/30 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-8 py-6 flex justify-between items-center gap-4 hover:bg-ivory/50 transition"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-plum text-sm">{q}</span>
                  <span className={`text-rose text-xl transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 text-sm text-plum/60 leading-relaxed border-t border-blush/20">
                    <p className="pt-4">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-plum py-24 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/40 mb-5">Ready to Begin?</p>
        <h2 className="text-4xl md:text-5xl font-serif text-white italic mb-6">
          Let's Plan Your Perfect Day
        </h2>
        <p className="text-white/50 mb-12 max-w-md mx-auto text-sm leading-relaxed">
          Start with our free style quiz, use the budget estimator, or just message a planner directly — we respond fast.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/#quiz"
            className="bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-rose/80 transition"
          >
            Take the Quiz ✨
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-white hover:text-plum transition"
          >
            WhatsApp a Planner
          </a>
        </div>
      </section>
    </>
  )
}
