import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin, Star, Users, Tag, MessageCircle,
  Instagram, Facebook, ArrowLeft, CheckCircle2,
  Calendar, ChevronLeft, ChevronRight, X, ExternalLink,
  UtensilsCrossed, BedDouble,
} from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { VENUES } from '../data/venues'
import { WHATSAPP_URL } from '../utils/constants'

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const total = images.length
  const prev = () => setCurrent(i => (i - 1 + total) % total)
  const next = () => setCurrent(i => (i + 1) % total)

  return (
    <div
      className="fixed inset-0 z-[300] bg-plum/95 backdrop-blur-md flex items-center justify-center"
      role="dialog" aria-modal="true" aria-label="Photo gallery"
    >
      <button onClick={onClose} aria-label="Close gallery"
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
        <X size={18} />
      </button>
      <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest">
        {current + 1} / {total}
      </p>
      <button onClick={prev} aria-label="Previous photo"
        className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
        <ChevronLeft size={22} />
      </button>
      <img src={images[current]} alt={`Gallery photo ${current + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl" />
      <button onClick={next} aria-label="Next photo"
        className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-6 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to photo ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`} />
        ))}
      </div>
    </div>
  )
}

export default function VenueProfile() {
  const { slug } = useParams()
  const venue    = VENUES.find(v => v.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!venue) {
    return (
      <>
        <SEOHead title="Venue Not Found" path={`/venues/${slug}`} />
        <section className="min-h-screen bg-ivory flex items-center justify-center px-6 pt-24">
          <div className="text-center">
            <p className="text-5xl mb-4" aria-hidden="true">🏛️</p>
            <h1 className="text-3xl font-serif text-plum mb-4">Venue not found</h1>
            <p className="text-plum/50 mb-8">This venue profile doesn't exist or may have moved.</p>
            <Link to="/venues" className="bg-rose text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-plum transition">
              Back to All Venues
            </Link>
          </div>
        </section>
      </>
    )
  }

  const {
    name, category, location, from, capacity, rating, badge, img,
    longBio, tags, phone, founded, social, services, gallery,
    catering, accommodation, mapUrl,
  } = venue

  const waMsg = encodeURIComponent(`Hi! I found ${name} on Harusi Planners and would love to enquire about availability and pricing for my wedding.`)
  const waUrl = `https://wa.me/${phone}?text=${waMsg}`
  const wpNumber = WHATSAPP_URL.replace('https://wa.me/', '')

  const related = VENUES
    .filter(v => v.category === category && v.slug !== slug)
    .slice(0, 2)

  return (
    <>
      <SEOHead
        title={`${name} — ${category} in ${location}`}
        description={`${name} is a ${category.toLowerCase()} venue in ${location}. ${venue.bio} Starting from ${from}.`}
        image={img}
        path={`/venues/${slug}`}
      />

      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[380px] overflow-hidden">
        <img src={img} alt={`${name} — ${category}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/40 to-transparent" />
        <Link
          to="/venues"
          className="absolute top-24 left-6 md:left-10 flex items-center gap-2 text-white/70 hover:text-white transition text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} aria-hidden="true" /> All Venues
        </Link>
        <div className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  <Tag size={10} aria-hidden="true" /> {category}
                </span>
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  <MapPin size={10} aria-hidden="true" /> {location}
                </span>
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  <Users size={10} aria-hidden="true" /> Up to {capacity.toLocaleString()}
                </span>
                {badge && <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{badge}</span>}
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-white font-bold">{name}</h1>
              <div className="flex items-center gap-1.5 mt-2" aria-label={`${rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} fill={i < rating ? '#C9A84C' : 'none'} stroke="#C9A84C" aria-hidden="true" />
                ))}
              </div>
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-rose text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-plum transition shadow-xl">
              <MessageCircle size={16} aria-hidden="true" /> Enquire Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 pb-28 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left: content */}
          <div className="lg:col-span-2 space-y-14">

            {/* About */}
            <section>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">About</p>
              <h2 className="text-3xl font-serif text-plum mb-5">About {name}</h2>
              <p className="text-plum/70 leading-relaxed">{longBio}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {tags.map(t => (
                  <span key={t} className="flex items-center gap-1.5 bg-ivory text-plum/60 text-[11px] font-bold px-3 py-1.5 rounded-full border border-blush/30">
                    <Tag size={10} aria-hidden="true" /> {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Gallery */}
            {gallery?.length > 0 && (
              <section>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">Gallery</p>
                <h2 className="text-3xl font-serif text-plum mb-6">Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gallery.map((src, i) => (
                    <button key={i} onClick={() => setLightboxIndex(i)}
                      className="group relative overflow-hidden rounded-2xl aspect-square focus:outline-none focus:ring-2 focus:ring-rose"
                      aria-label={`Open photo ${i + 1}`}>
                      <img src={src} alt={`${name} venue photo ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-plum/0 group-hover:bg-plum/20 transition-colors duration-300" />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Packages */}
            {services?.length > 0 && (
              <section>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">Packages</p>
                <h2 className="text-3xl font-serif text-plum mb-6">Event Spaces & Pricing</h2>
                <div className="space-y-4">
                  {services.map(({ name: sName, price, desc }) => (
                    <div key={sName} className="bg-ivory rounded-2xl p-6 flex items-start justify-between gap-6 hover:shadow-md transition">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <h3 className="font-bold text-plum mb-1">{sName}</h3>
                          <p className="text-sm text-plum/60 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-rose whitespace-nowrap shrink-0">{price}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-plum/40 mt-4">All prices are starting rates. Final quotes depend on date, guest count, and specific requirements.</p>
              </section>
            )}
          </div>

          {/* Right: sidebar */}
          <aside className="space-y-6">

            {/* Sticky enquiry card */}
            <div className="bg-plum rounded-3xl p-7 text-white sticky top-24">
              <p className="text-[10px] uppercase tracking-widest text-gold/60 mb-2">Starting from</p>
              <p className="text-3xl font-bold mb-1">{from}</p>
              <p className="text-white/30 text-xs mb-7">Final quote on enquiry</p>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-rose text-white py-4 rounded-xl font-bold text-sm hover:bg-rose/80 transition mb-3">
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp Enquiry
              </a>
              <a href={`https://wa.me/${wpNumber}?text=${encodeURIComponent(`Hi! I'd like to book ${name} through Harusi Planners.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-white/20 text-white/70 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-white/50 hover:text-white transition">
                Book via Harusi Planners
              </a>
              <p className="text-center text-[10px] text-white/30 mt-4">Harusi Planners can negotiate rates on your behalf.</p>
            </div>

            {/* Details */}
            <div className="bg-ivory rounded-3xl p-7 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-plum/40 mb-2">Venue Details</h3>
              <div className="flex items-center gap-3 text-sm"><MapPin size={15} className="text-rose shrink-0" aria-hidden="true" /><span className="text-plum/70">{location}</span></div>
              <div className="flex items-center gap-3 text-sm"><Users size={15} className="text-rose shrink-0" aria-hidden="true" /><span className="text-plum/70">Up to {capacity.toLocaleString()} guests</span></div>
              <div className="flex items-center gap-3 text-sm"><Tag size={15} className="text-rose shrink-0" aria-hidden="true" /><span className="text-plum/70">{category}</span></div>
              {founded && <div className="flex items-center gap-3 text-sm"><Calendar size={15} className="text-rose shrink-0" aria-hidden="true" /><span className="text-plum/70">Est. {founded}</span></div>}
              {catering && <div className="flex items-start gap-3 text-sm"><UtensilsCrossed size={15} className="text-rose shrink-0 mt-0.5" aria-hidden="true" /><span className="text-plum/70">{catering}</span></div>}
              {accommodation && <div className="flex items-start gap-3 text-sm"><BedDouble size={15} className="text-rose shrink-0 mt-0.5" aria-hidden="true" /><span className="text-plum/70">{accommodation}</span></div>}
              {mapUrl && (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-rose hover:text-plum transition font-bold mt-2">
                  <ExternalLink size={13} aria-hidden="true" /> View on Google Maps
                </a>
              )}
              {social && Object.keys(social).length > 0 && (
                <div className="pt-4 border-t border-plum/10">
                  <p className="text-[10px] uppercase tracking-widest text-plum/40 mb-3">Follow</p>
                  <div className="flex gap-3">
                    {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name} on Instagram`} className="w-9 h-9 rounded-full bg-white border border-blush/30 flex items-center justify-center text-plum/50 hover:text-rose hover:border-rose transition"><Instagram size={14} /></a>}
                    {social.facebook  && <a href={social.facebook}  target="_blank" rel="noopener noreferrer" aria-label={`${name} on Facebook`}  className="w-9 h-9 rounded-full bg-white border border-blush/30 flex items-center justify-center text-plum/50 hover:text-rose hover:border-rose transition"><Facebook  size={14} /></a>}
                  </div>
                </div>
              )}
            </div>

            {/* More in category */}
            {related.length > 0 && (
              <div className="bg-white rounded-3xl p-7">
                <h3 className="text-xs font-bold uppercase tracking-widest text-plum/40 mb-5">More {category}</h3>
                <div className="space-y-4">
                  {related.map(v => (
                    <Link key={v.slug} to={`/venues/${v.slug}`} className="flex items-center gap-3 group">
                      <img src={v.img} alt={v.name} className="w-12 h-12 rounded-xl object-cover shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-plum text-sm group-hover:text-rose transition truncate">{v.name}</p>
                        <p className="text-xs text-plum/40">{v.location} · {v.from}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link to="/venues" className="block text-center text-[10px] font-bold uppercase tracking-widest text-rose mt-6 hover:text-plum transition">
                  See All Venues ⟶
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-ivory/95 backdrop-blur-sm border-t border-plum/5 md:hidden z-[80]">
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-rose text-white py-4 rounded-xl font-bold text-sm hover:bg-plum transition">
          <MessageCircle size={16} aria-hidden="true" /> Enquire via WhatsApp
        </a>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={gallery} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  )
}
