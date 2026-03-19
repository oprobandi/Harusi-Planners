import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import Quiz from '../components/quiz/Quiz'
import { VENDORS } from '../data/vendors'
import { WHATSAPP_URL } from '../utils/constants'

const HERO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000', alt: 'Couple exchanging vows at a coastal wedding ceremony' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000', alt: 'Elegant wedding reception with floral table arrangements' },
  { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2000', alt: 'Beautiful outdoor wedding ceremony setup' },
]

const STATS = [
  { value: '2,400+', label: 'Couples Served' },
  { value: '850+',   label: 'Verified Vendors' },
  { value: '200+',   label: 'Venue Partners' },
  { value: '12 yrs', label: 'In East Africa' },
]

const TESTIMONIALS = [
  {
    quote: "Harusi made our Karen garden wedding feel effortless. Every detail was perfect — we didn't have to worry about a single thing.",
    name:    'Amina & David K.',
    wedding: 'Karen Country Club, March 2024',
    img:     'https://images.unsplash.com/photo-1544161442-e3db36c4f67c?q=80&w=400',
  },
  {
    quote: 'Our Mara bush wedding was beyond imagination. The team coordinated vendors we could never have found on our own.',
    name:    'Fatuma & James M.',
    wedding: 'Angama Mara, October 2023',
    img:     'https://images.unsplash.com/photo-1513273111310-633750595440?q=80&w=400',
  },
]

// Show 4 featured vendors on the homepage
const FEATURED_VENDORS = VENDORS.filter(v => v.badge).slice(0, 4)

export default function Home() {
  return (
    <>
      <SEOHead path="/" />

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 grid grid-cols-3 gap-px" aria-hidden="true">
          {HERO_IMAGES.map(({ src, alt }) => (
            <div
              key={src}
              className="bg-cover bg-center"
              style={{ backgroundImage: `url('${src}')` }}
              role="img"
              aria-label={alt}
            />
          ))}
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-ivory/60 via-ivory/40 to-ivory/95" aria-hidden="true" />

        <div className="relative z-20 text-center max-w-4xl px-6 animate-fade-in">
          <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-rose/80 mb-6 animate-fade-up">
            East Africa's Most Trusted Wedding Planners
          </p>
          <h1 className="text-5xl md:text-8xl font-serif text-plum leading-[1.05] mb-8 animate-fade-up-d1">
            Your Love Story <br /> Deserves a <em>Perfect</em> Day.
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-rose mb-3 animate-fade-up-d2">
            Tunakusaidia Kuandaa Harusi ya Ndoto Yako
          </p>
          <p className="text-sm text-plum/50 mb-12 animate-fade-up-d2">
            (We help you plan the wedding of your dreams)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up-d3">
            <a
              href="#quiz"
              className="bg-rose text-white px-10 py-5 rounded-full font-bold shadow-xl hover:bg-plum transition-all flex items-center justify-center gap-3 text-sm"
            >
              💍 Start Planning My Wedding
            </a>
            <Link
              to="/vendors"
              className="border-2 border-rose/40 text-rose px-10 py-5 rounded-full font-bold hover:bg-rose hover:text-white transition-all flex items-center justify-center gap-3 text-sm"
            >
              🔍 Browse Vendors &amp; Venues
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.3em] font-bold text-plum/40 animate-fade-up-d3">
            {STATS.map(({ value, label }, i) => (
              <span key={label} className="flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline text-blush">•</span>}
                {value} {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-plum py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-serif font-bold gold-shimmer">{value}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quiz ── */}
      <Quiz />

      {/* ── Featured vendors ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">Hand-Selected Professionals</p>
              <h2 className="text-4xl font-serif text-plum">The Vendor Selection</h2>
              <p className="text-plum/50 max-w-md italic mt-3">
                Professionals who truly understand the art of celebration.
              </p>
            </div>
            <Link
              to="/vendors"
              className="text-sm font-bold uppercase tracking-widest text-rose border-b border-rose pb-1 whitespace-nowrap hover:text-plum hover:border-plum transition"
            >
              See All Vendors ⟶
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_VENDORS.map(({ name, category, location, from, rating, img }) => (
              <div key={name} className="vendor-card group cursor-pointer">
                <div className="relative h-72 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={img}
                    alt={`${name} — ${category}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-plum">
                    {location}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-plum">{name}</h3>
                  <span className="text-gold text-xs" aria-label={`${rating} stars`}>{'★'.repeat(rating)}</span>
                </div>
                <p className="text-xs text-rose font-medium mb-4">{category}</p>
                <div className="flex justify-between items-center border-t border-plum/5 pt-4">
                  <span className="text-xs text-plum/40">{from}</span>
                  <Link to="/vendors" className="text-[10px] font-bold uppercase tracking-widest text-rose hover:text-plum transition">
                    View Profile ⟶
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-ivory">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3 text-center">Real Couples</p>
          <h2 className="text-4xl font-serif text-center text-plum mb-16">Voices from the Aisle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {TESTIMONIALS.map(({ quote, name, wedding, img }) => (
              <div key={name} className="bg-white rounded-3xl p-8 shadow-lg shadow-plum/5 flex flex-col gap-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                  <img src={img} alt={`${name} wedding`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <p className="font-serif italic text-lg text-plum/80 leading-relaxed mb-4">"{quote}"</p>
                  <p className="font-bold text-plum text-sm">{name}</p>
                  <p className="text-xs text-plum/40">{wedding}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vendor CTA ── */}
      <section className="bg-sage py-20 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">For Professionals</p>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-5">Are You a Wedding Vendor?</h2>
        <p className="text-white/60 mb-10 text-sm max-w-lg mx-auto leading-relaxed">
          Join the most prestigious wedding directory in East Africa and connect with couples who share your vision.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-white text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-white hover:text-sage transition"
        >
          Join as a Vendor — Free Listing ⟶
        </a>
      </section>
    </>
  )
}
