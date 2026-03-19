import { useState } from 'react'
import { Link } from 'react-router-dom'

const STYLES = ['All', 'Garden Romance', 'Coastal', 'Wilderness', 'City Chic', 'Boho']

const WEDDINGS = [
  {
    couple:   'Amina & David',
    venue:    'Karen Country Club',
    style:    'Garden Romance',
    date:     'March 2024',
    span:     true,
    img:      'https://images.unsplash.com/photo-1544161442-e3db36c4f67c?q=80&w=1200',
    guests:   180,
    theme:    'Blush & Ivory',
  },
  {
    couple:   'Fatuma & James',
    venue:    'Angama Mara',
    style:    'Wilderness',
    date:     'October 2023',
    span:     false,
    img:      'https://images.unsplash.com/photo-1513273111310-633750595440?q=80&w=800',
    guests:   60,
    theme:    'Terracotta & Gold',
  },
  {
    couple:   'Zara & Mohamed',
    venue:    'Leopard Beach, Diani',
    style:    'Coastal',
    date:     'January 2024',
    span:     false,
    img:      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800',
    guests:   120,
    theme:    'Sage & White',
  },
  {
    couple:   'Cynthia & Brian',
    venue:    'Tribe Hotel Nairobi',
    style:    'City Chic',
    date:     'July 2023',
    span:     true,
    img:      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200',
    guests:   250,
    theme:    'Black & Gold',
  },
  {
    couple:   'Njeri & Kamau',
    venue:    'Giraffe Centre Gardens',
    style:    'Garden Romance',
    date:     'May 2024',
    span:     false,
    img:      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    guests:   90,
    theme:    'Lavender & Peach',
  },
  {
    couple:   'Aisha & Robert',
    venue:    'Saruni Mara',
    style:    'Wilderness',
    date:     'August 2023',
    span:     false,
    img:      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800',
    guests:   40,
    theme:    'Olive & Copper',
  },
  {
    couple:   'Wanjiru & Felix',
    venue:    'Radisson Blu Westlands',
    style:    'City Chic',
    date:     'February 2024',
    span:     false,
    img:      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
    guests:   200,
    theme:    'Navy & Rose Gold',
  },
  {
    couple:   'Laila & Kwame',
    venue:    'Shela Beach, Lamu',
    style:    'Boho',
    date:     'December 2023',
    span:     true,
    img:      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200',
    guests:   75,
    theme:    'Natural & Earthy',
  },
]

function WeddingCard({ couple, venue, style, date, span, img, guests, theme }) {
  return (
    <div className={`relative group overflow-hidden rounded-3xl cursor-pointer ${span ? 'span-2' : ''}`}>
      <img
        src={img}
        alt={`${couple} wedding at ${venue}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-7 text-white">
        <p className="text-[9px] uppercase tracking-widest text-blush mb-1">{style} · {date}</p>
        <h3 className="text-xl md:text-2xl font-serif mb-1">{couple}</h3>
        <p className="text-sm text-white/70 mb-3">{venue}</p>
        <div className="flex gap-3 text-[10px] uppercase tracking-wider text-white/60">
          <span>👥 {guests} guests</span>
          <span>🎨 {theme}</span>
        </div>
      </div>
    </div>
  )
}

export default function Inspiration() {
  const [activeStyle, setActiveStyle] = useState('All')

  const filtered = WEDDINGS.filter(w =>
    activeStyle === 'All' || w.style === activeStyle
  )

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden" style={{ background: '#F9E5EC' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-rose/10 rounded-full blur-3xl" />
          <div className="absolute top-10 right-10 w-48 h-48 bg-gold/10 rounded-full blur-2xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-4">Real Stories, Real Love</p>
          <h1 className="text-5xl md:text-7xl font-serif text-plum italic mb-6">Real Weddings</h1>
          <p className="text-plum/50 text-lg max-w-xl mx-auto">
            Every love story is unique. Let our couples inspire yours.
          </p>
        </div>
      </section>

      {/* Style filter */}
      <section className="sticky top-[64px] z-40 bg-ivory/90 backdrop-blur-md border-b border-plum/5 py-4 px-6">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {STYLES.map(style => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition ${
                activeStyle === style
                  ? 'bg-plum text-ivory'
                  : 'bg-white text-plum/60 hover:text-plum'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-16 px-6" style={{ background: '#F9E5EC' }}>
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-plum/40">
              <p className="text-4xl mb-4">💍</p>
              <p className="font-serif text-2xl">No weddings in this style yet.</p>
            </div>
          ) : (
            <div className="masonry-grid">
              {filtered.map(w => <WeddingCard key={w.couple} {...w} />)}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-plum py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: '2,400+', label: 'Weddings Planned' },
            { value: '98%',    label: 'Couple Satisfaction' },
            { value: '12',     label: 'Years of Experience' },
            { value: '5',      label: 'Countries Served' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-serif font-bold gold-shimmer mb-2">{value}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Submit story CTA */}
      <section className="py-20 bg-ivory px-6 text-center">
        <h2 className="text-4xl font-serif text-plum mb-5">Share Your Harusi Story</h2>
        <p className="text-plum/50 mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Did you plan your wedding with us? We'd love to feature your celebration and inspire the next couple.
        </p>
        <a
          href="https://wa.me/254799644100"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-plum transition"
        >
          Submit Our Wedding ⟶
        </a>
      </section>

      {/* Planning CTA */}
      <section className="bg-sage py-20 px-6 text-center">
        <h2 className="text-3xl font-serif text-white mb-5">Inspired? Let's Start Planning.</h2>
        <p className="text-white/60 mb-10 text-sm max-w-md mx-auto">
          Take our 5-minute style quiz and get matched with the perfect vendors and venues for your wedding.
        </p>
        <Link
          to="/"
          className="inline-block border-2 border-white text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-white hover:text-sage transition"
        >
          Take the Style Quiz ⟶
        </Link>
      </section>
    </>
  )
}
