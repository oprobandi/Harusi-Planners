import { Link } from 'react-router-dom'

const company = [
  { label: 'About Us',      to: '/' },
  { label: 'Real Weddings', to: '/inspiration' },
  { label: 'The Blog',      to: '/' },
  { label: 'Pricing',       to: '/pricing' },
]

const support = [
  { label: 'Contact Us',    to: '/' },
  { label: 'Vendor Portal', to: '/vendors' },
  { label: 'Privacy Policy',to: '/' },
  { label: 'FAQs',          to: '/' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-plum pt-28 pb-12 px-6 md:px-10 text-white relative overflow-hidden">
      {/* Wave divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-px">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 fill-ivory"
          aria-hidden="true"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,0V0Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 mb-20">
        {/* Brand */}
        <div>
          <div className="text-2xl font-serif italic gold-shimmer mb-6">Harusi.</div>
          <p className="text-sm text-white/40 leading-relaxed">
            Dedicated to the dreamers, the lovers, and the beautiful celebrations of East Africa.
          </p>
          <div className="flex gap-4 mt-8">
            {['ig', 'fb', 'tt'].map(s => (
              <a
                key={s}
                href="#"
                aria-label={s === 'ig' ? 'Instagram' : s === 'fb' ? 'Facebook' : 'TikTok'}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition text-xs font-bold uppercase"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-[10px] uppercase font-bold tracking-widest text-gold mb-8">Company</h5>
          <ul className="space-y-4 text-sm text-white/60">
            {company.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="hover:text-white transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-[10px] uppercase font-bold tracking-widest text-gold mb-8">Support</h5>
          <ul className="space-y-4 text-sm text-white/60">
            {support.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="hover:text-white transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-[10px] uppercase font-bold tracking-widest text-gold mb-8">Newsletter</h5>
          <p className="text-xs text-white/40 mb-5 leading-relaxed">
            Inspiration, vendor spotlights & planning tips — straight to your inbox.
          </p>
          <form
            onSubmit={e => {
              e.preventDefault()
              const email = e.target.email.value.trim()
              if (email) { alert(`Thank you! We'll be in touch at ${email}.`); e.target.reset() }
            }}
            noValidate
            className="flex border-b border-white/20 pb-2"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              aria-label="Email address for newsletter"
              className="bg-transparent text-sm w-full outline-none text-white placeholder-white/30"
            />
            <button
              type="submit"
              className="text-gold text-[10px] uppercase font-bold whitespace-nowrap hover:text-gold/70 transition ml-3"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-[10px] uppercase tracking-[0.4em] text-white/20 pt-10 border-t border-white/5">
        © {year} Harusi Planners · Handcrafted in Kenya
      </div>
    </footer>
  )
}
