import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

const SOCIAL = [
  { Icon: Instagram,  label: 'Instagram', href: '#' },
  { Icon: Facebook,   label: 'Facebook',  href: '#' },
  { Icon: TikTokIcon, label: 'TikTok',    href: '#' },
  { Icon: Youtube,    label: 'YouTube',   href: '#' },
]

const company = [
  { label: 'About Us',      to: '/' },
  { label: 'Real Weddings', to: '/inspiration' },
  { label: 'The Blog',      to: '/' },
  { label: 'Pricing',       to: '/pricing' },
]

const support = [
  { label: 'Contact Us',     to: '/' },
  { label: 'Vendor Portal',  to: '/vendors' },
  { label: 'Privacy Policy', to: '/' },
  { label: 'FAQs',           to: '/' },
]

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function NewsletterForm() {
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()

    // Client-side validation
    if (!trimmed) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }
    if (!EMAIL_RX.test(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: trimmed, source: 'newsletter' }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setMessage(data.message ?? 'You\'re on the list!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 size={16} className="text-gold shrink-0" aria-hidden="true" />
        <span className="text-white/70">{message}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex border-b border-white/20 pb-2 mb-2">
        <Mail size={14} className="text-white/30 shrink-0 mt-0.5 mr-2" aria-hidden="true" />
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          aria-label="Email address for newsletter"
          value={email}
          onChange={e => { setEmail(e.target.value); setStatus('idle'); setMessage('') }}
          disabled={status === 'loading'}
          className="bg-transparent text-sm w-full outline-none text-white dark:text-ivory placeholder-white/30 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="text-gold text-[10px] uppercase font-bold whitespace-nowrap hover:text-gold/70 transition ml-3 disabled:opacity-50 flex items-center gap-1"
          aria-label="Subscribe to newsletter"
        >
          {status === 'loading'
            ? <Loader2 size={12} className="animate-spin" aria-hidden="true" />
            : 'Join'
          }
        </button>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div role="alert" className="flex items-center gap-1.5 text-[11px] text-rose/80">
          <AlertCircle size={12} aria-hidden="true" />
          {message}
        </div>
      )}
    </form>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-plum dark:bg-dark-bg pt-28 pb-12 px-6 md:px-10 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-px">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none"
          className="w-full h-12 md:h-16 fill-ivory dark:fill-dark-bg" aria-hidden="true">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,0V0Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 mb-20">

        {/* Brand */}
        <div>
          <img
            src="/logo-white.svg"
            alt="Harusi Planners"
            className="h-10 w-auto mb-6"
          />
          <p className="text-sm text-white/40 leading-relaxed mb-8">
            Dedicated to the dreamers, the lovers, and the beautiful celebrations of East Africa.
          </p>
          <div className="flex gap-3">
            {SOCIAL.map(({ Icon, label, href }) => (
              <a key={label} href={href} aria-label={label}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-[10px] uppercase font-bold tracking-widest text-gold mb-8">Company</h5>
          <ul className="space-y-4 text-sm text-white/60">
            {company.map(({ label, to }) => (
              <li key={label}><Link to={to} className="hover:text-white transition">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-[10px] uppercase font-bold tracking-widest text-gold mb-8">Support</h5>
          <ul className="space-y-4 text-sm text-white/60">
            {support.map(({ label, to }) => (
              <li key={label}><Link to={to} className="hover:text-white transition">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-[10px] uppercase font-bold tracking-widest text-gold mb-8">Newsletter</h5>
          <p className="text-xs text-white/40 mb-5 leading-relaxed">
            Inspiration, vendor spotlights &amp; planning tips — straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="text-center text-[10px] uppercase tracking-[0.4em] text-white/20 pt-10 border-t border-white/5">
        © {year} Harusi Planners · Handcrafted in Kenya
      </div>
    </footer>
  )
}
