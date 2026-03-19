import { useState } from 'react'
import { Link } from 'react-router-dom'

const PACKAGES = [
  {
    id: 'ndogo',
    name: 'Ndogo',
    swahili: 'Small & Intimate',
    guests: 'Up to 50 Guests',
    price: 'KSh 45,000',
    featured: false,
    features: [
      'Essential vendor shortlist (5 categories)',
      'Budget tracking dashboard',
      'Digital invitation design',
      'Curated venue recommendations',
      'Email support (48hr response)',
    ],
    notIncluded: [
      'On-day coordination',
      'Site visits',
      'Guest management portal',
    ],
    cta: 'Get Started',
    color: 'border-blush/40',
  },
  {
    id: 'kati',
    name: 'Kati',
    swahili: 'The Perfect Balance',
    guests: 'Up to 250 Guests',
    price: 'KSh 120,000',
    featured: true,
    features: [
      'Full vendor management (all categories)',
      'Site visits & venue booking (3 visits)',
      'On-day coordination (2 staff)',
      'RSVP & guest management portal',
      'Budget & timeline dashboard',
      'Rehearsal dinner planning',
      'Priority WhatsApp support',
    ],
    notIncluded: [
      'International vendor logistics',
      '3-day event management',
    ],
    cta: 'Choose Kati',
    color: 'border-gold',
  },
  {
    id: 'kubwa',
    name: 'Kubwa',
    swahili: 'No Limits, Pure Luxury',
    guests: 'Unlimited Guests',
    price: 'KSh 250,000',
    featured: false,
    features: [
      'Bespoke wedding theme & design',
      'International vendor logistics',
      '3-day event management',
      'Luxury transport coordination',
      'Dedicated senior planner',
      'Unlimited site visits',
      'Post-wedding gifting service',
    ],
    notIncluded: [],
    cta: 'Go Kubwa',
    color: 'border-blush/40',
  },
]

const FAQS = [
  { q: 'Can I upgrade my package later?', a: 'Absolutely. You can upgrade at any point during the planning process. We\'ll simply adjust the scope and invoice the difference.' },
  { q: 'Do you work with couples outside Kenya?', a: 'Yes! We plan destination weddings across East Africa — Tanzania, Uganda, Rwanda, and Zanzibar. Contact us to discuss logistics.' },
  { q: 'What if my wedding is in less than 3 months?', a: 'We offer rush planning support. WhatsApp us directly and we\'ll assess availability immediately.' },
  { q: 'Is the listing fee refundable?', a: 'We offer a full refund within 14 days of sign-up if planning has not commenced.' },
  { q: 'Do you provide day-of coordination only?', a: 'Yes — a Day-Of Coordination add-on is available from KSh 30,000. Reach out for a custom quote.' },
]

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blush rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-4">Transparent Pricing</p>
          <h1 className="text-5xl md:text-7xl font-serif text-plum italic mb-6">Simple Plans,<br />Perfect Days</h1>
          <p className="text-plum/50 text-lg">
            Three packages. No hidden fees. Every celebration deserves a planner.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map(({ id, name, swahili, guests, price, featured, features, notIncluded, cta, color }) => (
              <div
                key={id}
                className={`relative p-10 rounded-3xl border-2 flex flex-col transition-shadow ${color} ${
                  featured
                    ? 'bg-white shadow-2xl shadow-gold/10 md:scale-105 md:z-10'
                    : 'bg-ivory/40 shadow-sm'
                }`}
              >
                {featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-3xl font-serif text-plum mb-1">{name}</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-rose/60 mb-1">{swahili}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-plum/40">{guests}</p>
                </div>

                <p className="text-4xl font-bold text-plum mb-10">{price}</p>

                <ul className="space-y-4 mb-8 flex-grow">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-plum/70">
                      <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">✓</span> {f}
                    </li>
                  ))}
                  {notIncluded.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-plum/30 line-through">
                      <span className="mt-0.5 shrink-0" aria-hidden="true">✕</span> {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/254799644100"
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
            ))}
          </div>

          <p className="text-center text-xs text-plum/40 mt-12">
            All prices are starting rates. Final quotes depend on date, location, and scope.{' '}
            <a href="https://wa.me/254799644100" target="_blank" rel="noopener noreferrer" className="text-rose hover:underline">
              WhatsApp us for a custom quote.
            </a>
          </p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-ivory px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3 text-center">À La Carte</p>
          <h2 className="text-4xl font-serif text-center text-plum mb-16">Popular Add-Ons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: 'Day-Of Coordination',     price: 'From KSh 30,000', desc: 'One dedicated planner with you from setup to send-off.' },
              { name: 'Honeymoon Planning',       price: 'From KSh 15,000', desc: 'Itinerary curation for your African or international escape.' },
              { name: 'Digital RSVP Platform',    price: 'KSh 8,000',       desc: 'Beautiful RSVP page with real-time guest tracking.' },
              { name: 'Post-Wedding Brunch',      price: 'From KSh 25,000', desc: 'Next-day brunch planning and coordination.' },
              { name: 'Extra Site Visits',        price: 'KSh 5,000 each',  desc: 'Additional venue or vendor scouting visits.' },
              { name: 'Video Highlight Reel',     price: 'From KSh 50,000', desc: 'Cinematic 3–5 minute wedding film.' },
            ].map(({ name, price, desc }) => (
              <div key={name} className="bg-white rounded-2xl p-6 flex justify-between items-start gap-6 shadow-sm">
                <div>
                  <h3 className="font-bold text-plum mb-1">{name}</h3>
                  <p className="text-sm text-plum/50">{desc}</p>
                </div>
                <p className="text-sm font-bold text-rose whitespace-nowrap shrink-0">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3 text-center">Got Questions?</p>
          <h2 className="text-4xl font-serif text-center text-plum mb-16">Frequently Asked</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="border border-blush/30 rounded-2xl overflow-hidden">
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

      {/* Final CTA */}
      <section className="bg-plum py-24 px-6 text-center">
        <h2 className="text-4xl font-serif text-white mb-6 italic">Ready to Begin?</h2>
        <p className="text-white/50 mb-10 max-w-md mx-auto text-sm">
          Start with our free wedding style quiz or message a planner directly on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/#quiz"
            className="bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-rose/80 transition"
          >
            Take the Quiz ✨
          </Link>
          <a
            href="https://wa.me/254799644100"
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
