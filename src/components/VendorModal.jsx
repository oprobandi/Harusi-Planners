import { useEffect } from 'react'
import { MapPin, Phone, Tag, Star, X, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../utils/constants'

export default function VendorModal({ vendor, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!vendor) return null

  const { name, category, location, from, rating, badge, img, bio, tags, phone } = vendor
  const msgText = encodeURIComponent(`Hi! I found ${name} on Harusi Planners and would love to know more about their services.`)
  const waUrl   = `https://wa.me/${phone ?? WHATSAPP_URL}?text=${msgText}`

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} vendor profile`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-plum/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-fade-up z-10">

        {/* Hero image */}
        <div className="relative h-56 sm:h-64">
          <img
            src={img}
            alt={`${name} — ${category}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/70 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close vendor profile"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-5 left-6 text-white">
            <p className="text-[10px] uppercase tracking-widest text-blush mb-1">{category}</p>
            <h2 className="text-2xl font-serif font-bold">{name}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">

          {/* Meta row */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 bg-ivory text-plum text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                <MapPin size={11} aria-hidden="true" /> {location}
              </span>
              {badge && (
                <span className="flex items-center gap-1.5 bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  <Star size={11} aria-hidden="true" /> {badge}
                </span>
              )}
            </div>
            <span className="flex items-center gap-0.5 text-gold text-sm" aria-label={`${rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < rating ? 'currentColor' : 'none'}
                  aria-hidden="true"
                />
              ))}
            </span>
          </div>

          {/* Bio */}
          <p className="text-sm text-plum/70 leading-relaxed mb-5">{bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map(t => (
              <span
                key={t}
                className="flex items-center gap-1.5 bg-ivory text-plum/60 text-[11px] font-bold px-3 py-1 rounded-full border border-blush/30"
              >
                <Tag size={10} aria-hidden="true" /> {t}
              </span>
            ))}
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between py-4 border-y border-plum/5 mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-plum/40 mb-0.5">Starting from</p>
              <p className="text-xl font-bold text-plum">{from}</p>
            </div>
            <p className="text-[10px] text-plum/30 max-w-[160px] text-right leading-relaxed">
              Final price depends on date, scope, and location.
            </p>
          </div>

          {/* CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-rose text-white py-4 rounded-xl font-bold text-sm hover:bg-plum transition"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Enquire via WhatsApp
          </a>
          <p className="text-center text-[10px] text-plum/30 mt-3">
            Harusi Planners will connect you with this vendor.
          </p>
        </div>
      </div>
    </div>
  )
}
