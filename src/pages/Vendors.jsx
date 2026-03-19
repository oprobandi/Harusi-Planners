import { useState } from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = ['All', 'Photographers', 'Florals', 'Music', 'Venues', 'Cakes', 'Decor']

const VENDORS = [
  { name: 'Malaika Media',       category: 'Photographers', location: 'Nairobi',   from: 'KSh 150,000', rating: 5, badge: 'Top Rated', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800' },
  { name: 'Kilimanjaro Lens',    category: 'Photographers', location: 'Mombasa',   from: 'KSh 90,000',  rating: 5, badge: null,       img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800' },
  { name: 'Bloom & Wild',        category: 'Florals',       location: 'Karen',      from: 'KSh 80,000',  rating: 5, badge: 'Fan Fave',  img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800' },
  { name: 'Petal & Vine Co.',    category: 'Florals',       location: 'Westlands',  from: 'KSh 55,000',  rating: 4, badge: null,       img: 'https://images.unsplash.com/photo-1487530811015-780780169980?q=80&w=800' },
  { name: 'Serenade Band',       category: 'Music',         location: 'Nairobi',   from: 'KSh 60,000',  rating: 5, badge: 'Top Rated', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800' },
  { name: 'Sauti Sol Productions',category: 'Music',        location: 'Nairobi',   from: 'KSh 40,000',  rating: 4, badge: null,       img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800' },
  { name: 'Leopard Beach Resort', category: 'Venues',       location: 'Diani',     from: 'KSh 300,000', rating: 5, badge: 'Exclusive', img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800' },
  { name: 'Karen Country Club',  category: 'Venues',        location: 'Karen',     from: 'KSh 220,000', rating: 5, badge: 'Iconic',    img: 'https://images.unsplash.com/photo-1464195157867-e8f745a5da44?q=80&w=800' },
  { name: 'Angama Mara',         category: 'Venues',        location: 'Mara',      from: 'KSh 500,000', rating: 5, badge: 'Luxury',    img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800' },
  { name: 'The Pastry Lab',      category: 'Cakes',         location: 'Westlands', from: 'KSh 35,000',  rating: 5, badge: 'Top Rated', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800' },
  { name: 'Sugar & Spice KE',    category: 'Cakes',         location: 'Kilimani',  from: 'KSh 20,000',  rating: 4, badge: null,       img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800' },
  { name: 'Divine Decor Events', category: 'Decor',         location: 'Nairobi',   from: 'KSh 100,000', rating: 5, badge: 'Fan Fave',  img: 'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?q=80&w=800' },
]

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

  const filtered = VENDORS.filter(v => {
    const matchCat = activeCategory === 'All' || v.category === activeCategory
    const matchQ   = v.name.toLowerCase().includes(search.toLowerCase()) ||
                     v.location.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <>
      {/* Page hero */}
      <section className="relative pt-40 pb-24 bg-plum overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
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

      {/* Filters */}
      <section className="sticky top-[64px] z-40 bg-ivory/90 backdrop-blur-md border-b border-plum/5 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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

          {/* Search */}
          <input
            type="search"
            placeholder="Search vendors or locations…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search vendors"
            className="w-full sm:w-64 bg-white border border-blush/40 rounded-full px-5 py-2 text-sm outline-none focus:border-rose transition placeholder-plum/30"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-plum/40">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-serif text-2xl mb-2">No vendors found</p>
              <p className="text-sm">Try a different category or search term.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-plum/40 mb-10 uppercase tracking-widest">
                Showing {filtered.length} vendor{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(({ name, category, location, from, rating, badge, img }) => (
                  <div key={name} className="vendor-card group cursor-pointer">
                    <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                      <img
                        src={img}
                        alt={`${name} — ${category} in ${location}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-4 left-4 flex gap-2">
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
                      <button className="text-[10px] font-bold uppercase tracking-widest text-rose hover:text-plum transition">
                        View Profile ⟶
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="bg-sage py-20 px-6 text-center">
        <h2 className="text-3xl font-serif text-white mb-4">List Your Business — It's Free</h2>
        <p className="text-white/60 mb-10 text-sm max-w-md mx-auto">
          Join 850+ professionals serving East Africa's most celebrated weddings.
        </p>
        <a
          href="https://wa.me/254799644100"
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
