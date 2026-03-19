import { useState } from 'react'
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { WHATSAPP_URL } from '../utils/constants'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgallbr'

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ENQUIRY_TYPES = [
  'Wedding Planning Enquiry',
  'Vendor / Listing Enquiry',
  'Press & Partnerships',
  'Technical Support',
  'Other',
]

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', type: '', message: '' })
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name.trim()) { setStatus('error'); setMessage('Please enter your name.'); return }
    if (!EMAIL_RX.test(form.email.trim())) { setStatus('error'); setMessage('Please enter a valid email address.'); return }
    if (!form.message.trim() || form.message.trim().length < 10) { setStatus('error'); setMessage('Please write a message (at least 10 characters).'); return }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          type:    form.type || 'Not specified',
          message: form.message.trim(),
        }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('')
        setForm({ name: '', email: '', type: '', message: '' })
      } else {
        const data = await res.json()
        setStatus('error')
        setMessage(data?.errors?.[0]?.message ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again or WhatsApp us directly.')
    }
  }

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with Harusi Planners. Whether you're planning a wedding, enquiring about vendors, or need support — we're here to help."
        path="/contact"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 bg-ivory dark:bg-dark-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blush/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-5">
            We'd Love to Hear from You
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-plum dark:text-ivory italic leading-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-plum/50 dark:text-ivory/50 text-lg max-w-lg mx-auto leading-relaxed">
            Whether you're planning a wedding, enquiring about a vendor listing, or just have a question — send us a message and we'll be back within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 bg-ivory dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: info */}
            <div className="lg:col-span-2 space-y-6">

              {/* WhatsApp — primary CTA */}
              <div className="bg-plum rounded-3xl p-8 text-white">
                <p className="text-[10px] uppercase tracking-widest text-gold/60 mb-3">Fastest Response</p>
                <h2 className="text-2xl font-serif mb-3">WhatsApp Us</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  For urgent enquiries or to speak with a planner directly, WhatsApp is the fastest way to reach us. We typically respond within 1 hour during business hours.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-rose text-white py-4 rounded-xl font-bold text-sm hover:bg-rose/80 transition"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Open WhatsApp
                </a>
              </div>

              {/* Contact details */}
              <div className="bg-white dark:bg-dark-card rounded-3xl p-8 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-plum/40 dark:text-ivory/40 mb-4">
                  Contact Details
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-rose/10 flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-rose" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-plum/40 dark:text-ivory/40 uppercase tracking-widest mb-0.5">WhatsApp</p>
                    <p className="text-sm font-bold text-plum dark:text-ivory">+254 799 644 100</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-rose/10 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-rose" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-plum/40 dark:text-ivory/40 uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-sm font-bold text-plum dark:text-ivory">hello@harusihub.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-rose/10 flex items-center justify-center shrink-0">
                    <MapPin size={15} className="text-rose" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-plum/40 dark:text-ivory/40 uppercase tracking-widest mb-0.5">Location</p>
                    <p className="text-sm font-bold text-plum dark:text-ivory">Nairobi, Kenya</p>
                    <p className="text-xs text-plum/40 dark:text-ivory/40">Serving all of East Africa</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white dark:bg-dark-card rounded-3xl p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-plum/40 dark:text-ivory/40 mb-5">
                  Response Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                    { day: 'Saturday',        hours: '9:00 AM – 4:00 PM' },
                    { day: 'Sunday',          hours: 'WhatsApp only' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-plum/60 dark:text-ivory/60">{day}</span>
                      <span className="font-bold text-plum dark:text-ivory">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-10 shadow-sm">
                <h2 className="text-2xl font-serif text-plum dark:text-ivory mb-2">Send a Message</h2>
                <p className="text-sm text-plum/50 dark:text-ivory/50 mb-8">We'll get back to you within 24 hours.</p>

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={48} className="text-gold mx-auto mb-5" aria-hidden="true" />
                    <h3 className="text-2xl font-serif text-plum dark:text-ivory mb-3">Message sent!</h3>
                    <p className="text-plum/60 dark:text-ivory/60 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. We'll be back in touch within 24 hours. For urgent matters, WhatsApp us directly.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-sm font-bold uppercase tracking-widest text-rose hover:text-plum transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-widest text-plum/60 dark:text-ivory/60 mb-2">
                          Your Name <span className="text-rose" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Amina Wanjiku"
                          value={form.name}
                          onChange={e => update('name', e.target.value)}
                          className="w-full border-b-2 border-blush/50 dark:border-dark-border bg-transparent py-3 outline-none text-plum dark:text-ivory placeholder-plum/30 dark:placeholder-ivory/30 focus:border-rose transition text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-widest text-plum/60 dark:text-ivory/60 mb-2">
                          Email Address <span className="text-rose" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="amina@example.com"
                          value={form.email}
                          onChange={e => update('email', e.target.value)}
                          className="w-full border-b-2 border-blush/50 dark:border-dark-border bg-transparent py-3 outline-none text-plum dark:text-ivory placeholder-plum/30 dark:placeholder-ivory/30 focus:border-rose transition text-sm"
                        />
                      </div>
                    </div>

                    {/* Enquiry type */}
                    <div>
                      <label htmlFor="contact-type" className="block text-xs font-bold uppercase tracking-widest text-plum/60 dark:text-ivory/60 mb-2">
                        Enquiry Type
                      </label>
                      <select
                        id="contact-type"
                        value={form.type}
                        onChange={e => update('type', e.target.value)}
                        className="w-full border-b-2 border-blush/50 dark:border-dark-border bg-transparent py-3 outline-none text-plum dark:text-ivory focus:border-rose transition text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Select a category (optional)</option>
                        {ENQUIRY_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-widest text-plum/60 dark:text-ivory/60 mb-2">
                        Message <span className="text-rose" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        placeholder="Tell us about your wedding date, guest count, and what you're looking for..."
                        value={form.message}
                        onChange={e => update('message', e.target.value)}
                        className="w-full border-b-2 border-blush/50 dark:border-dark-border bg-transparent py-3 outline-none text-plum dark:text-ivory placeholder-plum/30 dark:placeholder-ivory/30 focus:border-rose transition text-sm resize-none"
                      />
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <div role="alert" className="flex items-center gap-2 text-sm text-rose">
                        <AlertCircle size={15} aria-hidden="true" />
                        {message}
                      </div>
                    )}

                    <p className="text-[10px] text-plum/30 dark:text-ivory/30">
                      We'll never share your details with third parties.
                    </p>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-rose text-white py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-plum transition disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {status === 'loading'
                        ? <><Loader2 size={15} className="animate-spin" aria-hidden="true" /> Sending...</>
                        : 'Send Message'
                      }
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
