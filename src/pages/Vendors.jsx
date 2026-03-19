import { useState, useMemo } from 'react'
import { MapPin, Star, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { VENDORS, CATEGORIES } from '../data/vendors'
import { WHATSAPP_URL } from '../utils/constants'

const ITEMS_PER_PAGE = 12

const BADGE_COLORS = {
  'Top Rated': 'bg-gold/20 text-gold',
  'Fan Fave':  'bg-rose/10 text-rose',
  'Exclusive': 'bg-plum/10 text-plum',
  'Iconic':    'bg-sage/10 text-sage',
  'Luxury':    'bg-gold/20 text-gold',
}

function Pagination({ current, total, onChange }) {
  if (total <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-14" role="navigation" aria-label="Vendor pages">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous page"
        className="w-9 h-9 rounded-full border border-plum/10 flex items-center justify-center text-plum/50 hover:bg-rose hover:text-white hover:border-rose transition disabled:opacity-20 disabled:cursor-not-allowed text-sm"
      >
        ‹
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === current ? 'page' : undefined}
          className={`w-9 h-9 rounded-full text-xs font-bold transition ${
            page === current
              ? 'bg-plum text-ivory'
              : 'border border-plum/10 text-plum/50 hover:bg-rose hover:text-white hover:border-rose'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Next page"
        className="w-9 h-9 rounded-full border border-plum/10 flex items-center justify-center text-plum/50 hover:bg-rose hover:text-white hover:border-rose transition disabled:opacity-20 disabled:cursor-not-allowed text-sm"
      >
        ›
      </button>
    </div>
  )
}

export default function Vendors() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search,         setSearch]         = useState('')
  const [currentPage,    setCurrentPage]    = useState(1)

  const filtered = useMemo(() => VENDORS.filter(v => {
    const matchCat = activeCategory === 'All' || v.category === activeCategory
    const q = search.toLowerCase()
    const matchQ = v.name.toLowerCase().includes(q) ||
                   v.location.toLowerCase().includes(q) ||
                   v.category.toLowerCase().includes(q)
    return matchCat && matchQ
  }), [activeCategory, search])

  // Reset to page 1 whenever filter/search changes
  const totalPages   = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages))
  const paginated    = filtered.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (value, type) => {
    setCurrentPage(1)
    type === 'category' ? setActiveCategory(value) : setSearch(value)
  }

  return (
    <>
      <SEOHead
        title="Vendors & Venues"
        description="Browse 850+ verified wedding vendors and venues across Kenya and East Africa. Photographers, florals, music, cakes, décor, and more — hand-selected by Harusi Planners."
        path="/vendors"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 bg-plum dark:bg-dark-surface overflow-hidden">
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


      {/* ── Intro ── */}
      <section className="py-14 bg-ivory dark:bg-dark-bg border-b border-plum/5 dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-plum/60 dark:text-ivory/60 text-base leading-relaxed max-w-2xl mx-auto">
            Every vendor on this platform has been personally reviewed by our team — portfolio quality, client feedback, reliability, and pricing transparency. No paid listings. No shortcuts.
            Browse by category or search by name, location, or service type.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-[60px] z-40 bg-ivory/92 dark:bg-dark-bg/92 backdrop-blur-md border-b border-plum/5 dark:border-dark-border py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 w-full sm:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat, 'category')}
                aria-pressed={activeCategory === cat}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition ${
                  activeCategory === cat
                    ? 'bg-plum dark:bg-gold text-ivory dark:text-plum'
                    : 'bg-white dark:bg-dark-card text-plum/60 dark:text-ivory/60 hover:text-plum dark:hover:text-ivory hover:bg-white/80'
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
            onChange={e => handleFilterChange(e.target.value, 'search')}
            aria-label="Search vendors"
            className="w-full sm:w-72 bg-white dark:bg-dark-card border border-blush/40 dark:border-dark-border rounded-full px-5 py-2 text-sm outline-none focus:border-rose transition placeholder-plum/30 dark:placeholder-ivory/30 text-plum dark:text-ivory shrink-0"
          />
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-plum/40">
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <p className="font-serif text-2xl mb-2">No vendors found</p>
              <p className="text-sm">Try a different category or search term.</p>
            </div>
          ) : (
            <>
              {/* Count + page indicator */}
              <div className="flex items-center justify-between mb-10">
                <p className="text-xs text-plum/40 dark:text-ivory/40 uppercase tracking-widest">
                  Showing {((safeCurrentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} vendor{filtered.length !== 1 ? 's' : ''}
                </p>
                {totalPages > 1 && (
                  <p className="text-xs text-plum/30 uppercase tracking-widest">
                    Page {safeCurrentPage} of {totalPages}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginated.map(vendor => {
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
                          <span className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-plum">
                            <MapPin size={10} aria-hidden="true" />{location}
                          </span>
                          {badge && (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-sm ${BADGE_COLORS[badge] ?? 'bg-white/80 text-plum'}`}>
                              {badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-plum dark:text-ivory">{name}</h3>
                        <span className="flex items-center gap-0.5 text-gold" aria-label={`${rating} stars`}>
                          {Array.from({length: 5}, (_, i) => (
                            <Star key={i} size={12} fill={i < rating ? 'currentColor' : 'none'} aria-hidden="true" />
                          ))}
                        </span>
                      </div>
                      <p className="flex items-center gap-1.5 text-xs text-rose font-medium mb-1">
                        <Tag size={11} aria-hidden="true" />{category}
                      </p>
                      <div className="flex justify-between items-center border-t border-plum/5 dark:border-dark-border pt-4 mt-4">
                        <span className="text-xs text-plum/40 dark:text-ivory/40">{from}</span>
                        <Link
                          to={`/vendors/${vendor.slug}`}
                          className="text-[10px] font-bold uppercase tracking-widest text-rose hover:text-plum dark:hover:text-gold transition"
                        >
                          View Profile ⟶
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Pagination
                current={safeCurrentPage}
                total={totalPages}
                onChange={p => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              />
            </>
          )}
        </div>
      </section>

      {/* ── Vendor CTA ── */}
      <section className="bg-sage dark:bg-dark-surface py-20 px-6 text-center">
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

    </>
  )
}
