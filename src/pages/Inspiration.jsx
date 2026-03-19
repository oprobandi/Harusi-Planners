import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { WEDDINGS, WEDDING_STYLES } from '../data/weddings'
import { WHATSAPP_URL } from '../utils/constants'

function WeddingCard({ couple, venue, style, date, span, img, guests, theme, package: pkg }) {
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
        <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-wider text-white/60">
          <span>👥 {guests} guests</span>
          <span>🎨 {theme}</span>
          <span className="text-gold/80">✦ {pkg}</span>
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
      <SEOHead
        title="Real Weddings & Inspiration"
        description="Browse real weddings planned by Harusi Planners across Kenya and East Africa. Garden romance, coastal celebrations, wilderness luxury, and more."
        path="/inspiration"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#F9E5EC] dark:bg-dark-bg">
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

      {/* ── Style filter ── */}
      <section className="sticky top-[60px] z-40 bg-ivory/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-plum/5 dark:border-dark-border py-4 px-6">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {WEDDING_STYLES.map(style => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              aria-pressed={activeStyle === style}
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

      {/* ── Masonry grid ── */}
      <section className="py-16 px-6 bg-[#F9E5EC] dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-plum/40">
              <p className="text-4xl mb-4" aria-hidden="true">💍</p>
              <p className="font-serif text-2xl">No weddings in this style yet.</p>
            </div>
          ) : (
            <div className="masonry-grid">
              {filtered.map(w => <WeddingCard key={w.couple} {...w} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Stats ── */}
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

      {/* ── Submit story ── */}
      <section className="py-20 bg-ivory px-6 text-center">
        <h2 className="text-4xl font-serif text-plum dark:text-ivory mb-5">Share Your Harusi Story</h2>
        <p className="text-plum/50 dark:text-ivory/50 mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Did you plan your wedding with us? We'd love to feature your celebration.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-plum transition"
        >
          Submit Our Wedding ⟶
        </a>
      </section>

      {/* ── Planning CTA ── */}
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
