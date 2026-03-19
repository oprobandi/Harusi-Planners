import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import VendorModal from '../components/VendorModal'
import { VENDORS, CATEGORIES } from '../data/vendors'
import { WHATSAPP_URL } from '../utils/constants'

const BADGE_COLORS = {
  'Top Rated': 'bg-gold/20 text-gold',
  'Fan Fave':  'bg-rose/10 text-rose',
  'Exclusive': 'bg-plum/10 text-plum',
  'Iconic':    'bg-sage/10 text-sage',
  'Luxury':    'bg-gold/20 text-gold',
}

export default function Vendors() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search,         setSearch]         = useState('')
  const [activeVendor,   setActiveVendor]   = useState(null)

  const filtered = VENDORS.filter(v => {
    const matchCat = activeCategory === 'All' || v.category === activeCategory
    const q = search.toLowerCase()
    const matchQ = v.name.toLowerCase().includes(q) ||
                   v.location.toLowerCase().includes(q) ||
                   v.category.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  return (
    <>
      <SEOHead
        title="Vendors & Venues"
        description="Browse 850+ verified wedding vendors and venues across Kenya and East Africa. Photographers, florals, music, cakes, décor, and more — all hand-selected by Harusi Planners."
        path="/vendors"
      />

      {/* ── Page hero ── */}
      <section className="relative pt-40 pb-24 bg-plum overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blush blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 rounded-full bg-gold blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60 mb-4">850+ Verified Professionals</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white italic mb-6">Vendors &amp; Venues</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Hand-selected professionals who understand the art of East African celebration.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-[60px] z-40 bg-ivory/92 backdrop-blur-md border-b border-plum/5 py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 w-full sm:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition ${
                  activeCategory === cat
                    ? 'bg-plum text-ivory'
                    : 'bg-white text-plum/60 hover:text-plum hover:bg-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search name, category or location…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search vendors"
            className="w-full sm:w-72 bg-white border border-blush/40 rounded-full px-5 py-2 text-sm outline-none focus:border-rose transition placeholder-plum/30 shrink-0"
          />
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-plum/40">
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <p className="font-serif text-2xl mb-2">No vendors found</p>
              <p className="text-sm">Try a different category or search term.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-plum/40 mb-10 uppercase tracking-widest">
                Showing {filtered.length} vendor{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(vendor => {
                  const { id, name, category, location, from, rating, badge, img } = vendor
                  return (
                    <div key={id} className="vendor-card group">
                      <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                        <img
                          src={img}
                          alt={`${name} — ${category} in ${location}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                          <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-plum">
                            {location}
                          </span>
                          {badge && (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-sm ${BADGE_COLORS[badge] ?? 'bg-white/80 text-plum'}`}>
                              {badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-plum">{name}</h3>
                        <span className="text-gold text-xs" aria-label={`${rating} stars`}>
                          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                        </span>
                      </div>
                      <p className="text-xs text-rose font-medium mb-1">{category}</p>

                      <div className="flex justify-between items-center border-t border-plum/5 pt-4 mt-4">
                        <span className="text-xs text-plum/40">{from}</span>
                        <button
                          onClick={() => setActiveVendor(vendor)}
                          className="text-[10px] font-bold uppercase tracking-widest text-rose hover:text-plum transition cursor-pointer"
                        >
                          View Profile ⟶
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Vendor CTA ── */}
      <section className="bg-sage py-20 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">For Professionals</p>
        <h2 className="text-3xl font-serif text-white mb-4">List Your Business — It's Free</h2>
        <p className="text-white/60 mb-10 text-sm max-w-md mx-auto leading-relaxed">
          Join 850+ professionals serving East Africa's most celebrated weddings.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-white text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-white hover:text-sage transition"
        >
          Apply as a Vendor ⟶
        </a>
      </section>

      {/* Vendor profile modal */}
      {activeVendor && (
        <VendorModal vendor={activeVendor} onClose={() => setActiveVendor(null)} />
      )}
    </>
  )
}
