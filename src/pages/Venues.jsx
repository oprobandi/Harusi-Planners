import { useState, useMemo } from 'react'
import { MapPin, Star, Users, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { VENUES, VENUE_CATEGORIES } from '../data/venues'
import { WHATSAPP_URL } from '../utils/constants'

const BADGE_COLORS = {
  'Top Rated': 'bg-gold/20 text-gold',
  'Exclusive': 'bg-plum/10 text-plum',
  'Iconic':    'bg-sage/10 text-sage',
  'Luxury':    'bg-gold/20 text-gold',
}

const REGION_FILTERS = ['All Regions', 'Nairobi', 'Coast', 'Rift Valley', 'Laikipia']

export default function Venues() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeRegion,   setActiveRegion]   = useState('All Regions')
  const [search,         setSearch]         = useState('')

  const filtered = useMemo(() => VENUES.filter(v => {
    const matchCat    = activeCategory === 'All' || v.category === activeCategory
    const matchRegion = activeRegion === 'All Regions' || v.region === activeRegion
    const q = search.toLowerCase()
    const matchQ = v.name.toLowerCase().includes(q) ||
                   v.location.toLowerCase().includes(q) ||
                   v.category.toLowerCase().includes(q)
    return matchCat && matchRegion && matchQ
  }), [activeCategory, activeRegion, search])

  return (
    <>
      <SEOHead
        title="Wedding Venues"
        description="Browse 18+ curated wedding venues across Kenya and East Africa — garden estates in Karen, beachfront resorts in Diani, safari lodges in the Mara, and more."
        path="/venues"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 bg-plum dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blush/10 blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60 mb-4">
            Curated Across East Africa
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white italic mb-6">
            Wedding Venues
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            From Karen garden estates to Diani beachfront resorts to the Maasai Mara escarpment — every venue on this list has been personally reviewed by our team.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-[60px] z-40 bg-ivory/92 dark:bg-dark-bg/92 backdrop-blur-md border-b border-plum/5 dark:border-dark-border py-4 px-6">
        <div className="max-w-6xl mx-auto space-y-3">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {VENUE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition ${
                  activeCategory === cat
                    ? 'bg-plum dark:bg-gold text-ivory dark:text-plum'
                    : 'bg-white dark:bg-dark-card text-plum/60 dark:text-ivory/60 hover:text-plum dark:hover:text-ivory'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Region + Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {REGION_FILTERS.map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  aria-pressed={activeRegion === r}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition ${
                    activeRegion === r
                      ? 'bg-rose text-white'
                      : 'bg-white dark:bg-dark-card text-plum/50 dark:text-ivory/50 hover:text-plum dark:hover:text-ivory border border-plum/10 dark:border-dark-border'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <input
              type="search"
              placeholder="Search venues…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search venues"
              className="w-full sm:w-64 bg-white dark:bg-dark-card border border-blush/40 dark:border-dark-border rounded-full px-5 py-2 text-sm outline-none focus:border-rose transition placeholder-plum/30 dark:placeholder-ivory/30 text-plum dark:text-ivory shrink-0"
            />
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-plum/40">
              <p className="text-4xl mb-4" aria-hidden="true">🏛️</p>
              <p className="font-serif text-2xl mb-2">No venues found</p>
              <p className="text-sm">Try a different category, region, or search term.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-plum/40 dark:text-ivory/40 uppercase tracking-widest mb-10">
                {filtered.length} venue{filtered.length !== 1 ? 's' : ''} found
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(venue => {
                  const { slug, name, category, location, from, capacity, rating, badge, img } = venue
                  return (
                    <Link key={slug} to={`/venues/${slug}`} className="group block">
                      <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                        <img
                          src={img}
                          alt={`${name} — ${category} in ${location}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={12} fill={i < rating ? 'currentColor' : 'none'} aria-hidden="true" />
                          ))}
                        </span>
                      </div>
                      <p className="flex items-center gap-1.5 text-xs text-rose font-medium mb-1">
                        <Tag size={11} aria-hidden="true" />{category}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-plum/40 dark:text-ivory/40 mb-4">
                        <Users size={11} aria-hidden="true" />Up to {capacity.toLocaleString()} guests
                      </p>
                      <div className="flex justify-between items-center border-t border-plum/5 dark:border-dark-border pt-4">
                        <span className="text-xs text-plum/40 dark:text-ivory/40">{from}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose group-hover:text-plum dark:group-hover:text-gold transition">
                          View Venue ⟶
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-sage dark:bg-dark-surface py-20 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">Not Sure Where to Start?</p>
        <h2 className="text-3xl font-serif text-white mb-5">Let us match you to the right venue.</h2>
        <p className="text-white/60 mb-10 text-sm max-w-lg mx-auto leading-relaxed">
          Tell us your date, guest count, and style — and our planners will shortlist the three best venues for your wedding within 24 hours.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-plum transition"
        >
          Get Venue Recommendations ⟶
        </a>
      </section>
    </>
  )
}
