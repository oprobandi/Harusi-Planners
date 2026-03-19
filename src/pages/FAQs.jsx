import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { WHATSAPP_URL } from '../utils/constants'

const FAQ_SECTIONS = [
  {
    category: 'Getting Started',
    faqs: [
      {
        q: 'How does Harusi Planners work?',
        a: 'We are a full-service wedding planning platform. You can use our free tools — the style quiz, budget estimator, and vendor directory — independently, or book one of our planning packages to have a dedicated planner manage your wedding from start to finish. Most couples do both: explore the tools first, then book a package.',
      },
      {
        q: 'How do I start the planning process?',
        a: 'The best starting point is our 5-minute style quiz on the homepage. It gives you a personalised vendor shortlist and package recommendation based on your style, guest count, and budget. From there, you can WhatsApp a planner directly to begin the formal booking process.',
      },
      {
        q: 'How early should I start planning?',
        a: 'For a Nairobi wedding, 9–12 months is comfortable. 6 months is the minimum — and only if your venue and photographer are locked in week one. During peak season (December–February, July–August), top venues book 12+ months out. Outside Nairobi or for smaller weddings, 6 months is workable.',
      },
      {
        q: 'Do I need to be based in Kenya to use Harusi Planners?',
        a: 'No. We regularly work with couples planning from the UK, US, Canada, and Australia. We handle all site visits, vendor briefings, and day-of coordination on your behalf. Many diaspora couples find our service especially valuable for this reason.',
      },
    ],
  },
  {
    category: 'Packages & Pricing',
    faqs: [
      {
        q: 'Can I upgrade my package later?',
        a: "Absolutely. You can upgrade at any point during the planning process. We'll simply adjust the scope and invoice the difference.",
      },
      {
        q: 'Do prices include VAT?',
        a: 'All displayed prices are exclusive of 16% VAT. Your final quote will clearly show the VAT-inclusive total. No hidden fees.',
      },
      {
        q: 'Do you work with couples outside Nairobi?',
        a: "Yes — and your package may cost less. Wedding costs drop 15–40% outside Nairobi, which we factor into your quote. We cover all of Kenya and work across East Africa.",
      },
      {
        q: 'What if our wedding is in less than 3 months?',
        a: "We offer rush planning support. WhatsApp us directly and we'll assess availability immediately. A rush supplement may apply.",
      },
      {
        q: 'What does the Asili package cover for traditional ceremonies?',
        a: "The Asili package is built for multi-ceremony celebrations — ruracio, dowry events, nikah, church, and civil registrations. We handle cultural vendor sourcing, family liaison, and scheduling so nothing falls through the cracks.",
      },
      {
        q: 'Is a deposit required to book?',
        a: "Yes — we require a 30% deposit to secure your date. The balance is split across milestones agreed in your planning contract. Full refund within 14 days if planning has not commenced.",
      },
      {
        q: 'Do you plan destination weddings outside Kenya?',
        a: "Yes. The Safari & Shores package covers Tanzania, Uganda, Rwanda, Zanzibar, and beyond. WhatsApp us to discuss your specific location.",
      },
    ],
  },
  {
    category: 'Vendors',
    faqs: [
      {
        q: 'How are vendors vetted?',
        a: 'Every vendor on the platform is personally reviewed by our team. We assess portfolio quality, client feedback, pricing transparency, reliability history, and professionalism. We do not accept paid listings — inclusion is merit-based only.',
      },
      {
        q: 'Can I book vendors directly through the platform?',
        a: 'Yes. Every vendor profile has a direct WhatsApp enquiry button. For couples on a planning package, we handle all vendor negotiations, contracts, and coordination on your behalf.',
      },
      {
        q: 'What if a vendor I want is not on the platform?',
        a: "Tell us — WhatsApp us the name and we'll assess them for inclusion or, if you're on a planning package, we'll work with them directly as part of your vendor team.",
      },
      {
        q: 'Can I apply to be listed as a vendor?',
        a: "Yes. WhatsApp us or use the 'Join as a Vendor' link in the footer. We'll review your portfolio and respond within 5 business days.",
      },
    ],
  },
  {
    category: 'On the Day',
    faqs: [
      {
        q: 'Does the planner attend on the wedding day?',
        a: "This depends on your package. The Kati, Kubwa, and Safari & Shores packages include on-day coordination. Ndogo and Asili packages include a detailed briefing document and remote support. See the Pricing page for a full comparison.",
      },
      {
        q: 'What happens if a vendor cancels close to the date?',
        a: "This is rare but we plan for it. Every vendor contract includes a cancellation and replacement clause. If a vendor pulls out, we activate our backup vendor network immediately. Our depth of relationships in the industry means we can replace most vendors within 24 hours.",
      },
      {
        q: 'Who do guests and family contact on the day?',
        a: "On-day coordination packages include a dedicated point of contact for vendors, venue staff, and family — so you are not the one answering calls on your wedding morning. We handle it.",
      },
    ],
  },
  {
    category: 'Technical & Account',
    faqs: [
      {
        q: 'Why is my newsletter subscription not going through?',
        a: "If you see a 'server configuration error', this is a temporary setup issue on our end. Please WhatsApp us your email address and we'll add you to the list manually while we resolve it.",
      },
      {
        q: 'Is my data safe with Harusi Planners?',
        a: "Yes. We do not sell or share your personal data with third parties. Email addresses collected via the newsletter are stored securely in Mailchimp and used only for Harusi Planners communications. You can unsubscribe at any time.",
      },
      {
        q: 'I found a bug or issue on the site. How do I report it?',
        a: "Please use the Contact form or WhatsApp us directly. Include a screenshot if possible and describe what you were trying to do. We typically resolve reported issues within 24–48 hours.",
      },
    ],
  },
]

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border border-blush/30 dark:border-dark-border rounded-2xl overflow-hidden bg-white dark:bg-dark-card">
      <button
        onClick={onToggle}
        className="w-full text-left px-7 py-5 flex justify-between items-center gap-4 hover:bg-ivory/50 dark:hover:bg-dark-surface transition"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-plum dark:text-ivory text-sm leading-snug">{q}</span>
        <ChevronDown
          size={16}
          className={`text-rose shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-7 pb-6 text-sm text-plum/60 dark:text-ivory/60 leading-relaxed border-t border-blush/20 dark:border-dark-border">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQs() {
  const [openItem, setOpenItem] = useState(null) // 'category-index'

  const toggle = (key) => setOpenItem(prev => prev === key ? null : key)

  return (
    <>
      <SEOHead
        title="FAQs"
        description="Answers to the most common questions about Harusi Planners — packages, vendors, pricing, on-day coordination, and more."
        path="/faqs"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 bg-ivory dark:bg-dark-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blush/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-5">
            Got Questions?
          </p>
          <h1 className="text-5xl md:text-6xl font-serif text-plum dark:text-ivory italic leading-tight mb-6">
            Frequently Asked
          </h1>
          <p className="text-plum/50 dark:text-ivory/50 text-lg max-w-lg mx-auto leading-relaxed">
            Everything couples, vendors, and partners ask us most. Can't find your answer? WhatsApp us directly.
          </p>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-ivory dark:bg-dark-bg">
        <div className="max-w-3xl mx-auto px-6 space-y-14">
          {FAQ_SECTIONS.map(({ category, faqs }) => (
            <div key={category}>
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-6">
                {category}
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => {
                  const key = `${category}-${i}`
                  return (
                    <FAQItem
                      key={key}
                      q={faq.q}
                      a={faq.a}
                      isOpen={openItem === key}
                      onToggle={() => toggle(key)}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section className="bg-plum py-24 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/40 mb-5">
          Still not sure?
        </p>
        <h2 className="text-4xl font-serif text-white italic mb-5">
          Ask us directly.
        </h2>
        <p className="text-white/50 mb-10 max-w-md mx-auto text-sm leading-relaxed">
          No question is too small. WhatsApp us or send a message and a planner will respond personally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-rose/80 transition"
          >
            WhatsApp a Planner
          </a>
          <Link
            to="/contact"
            className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:border-white hover:bg-white/10 transition"
          >
            Send a Message
          </Link>
        </div>
      </section>
    </>
  )
}
