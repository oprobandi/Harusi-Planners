import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { WHATSAPP_URL } from '../utils/constants'

const STATS = [
  { value: '2,400+', label: 'Couples Served' },
  { value: '850+',   label: 'Verified Vendors' },
  { value: '12 yrs', label: 'In East Africa' },
  { value: '5',      label: 'Countries' },
]

const VALUES = [
  {
    icon: '🌍',
    title: 'East Africa First',
    desc: 'Every feature, every vendor, every pricing model is built around the realities of East African weddings — from Nairobi garden estates to Diani beachfront venues to Mara bush ceremonies.',
  },
  {
    icon: '🤝',
    title: 'Transparency',
    desc: 'No hidden fees. No vague quotes. Our pricing page shows real numbers, our budget estimator uses real 2026 Kenya market data, and our planners give you honest advice — even when it saves you money.',
  },
  {
    icon: '✦',
    title: 'Every Detail Matters',
    desc: 'A wedding is a single day. It cannot be redone. We treat every couple\'s celebration as the once-in-a-lifetime event it is — not a transaction to be processed.',
  },
  {
    icon: '🔗',
    title: 'Vendor Relationships',
    desc: 'We have spent years building relationships with the best photographers, florists, venues, and caterers in East Africa. Those relationships mean better access, better pricing, and better outcomes for you.',
  },
  {
    icon: '📱',
    title: 'Built for How You Live',
    desc: 'From the style quiz to WhatsApp enquiries to mobile-first vendor profiles — every part of Harusi is designed for how East Africans actually use technology.',
  },
  {
    icon: '🏆',
    title: 'Outcomes, Not Packages',
    desc: 'Our packages are starting points, not ceilings. We measure success by one thing: whether you and your family look back on your day with complete joy.',
  },
]

const TEAM = [
  {
    name: "Paul Nyang'wara",
    role: 'Founder & Lead Architect',
    bio: "Paul is the Founder & CEO of NeuroSpark Corporation, Kenya's AI and digital studio. A Computer Science graduate of the University of Nairobi, ex-Safaricom, and ex-Andela, he built Harusi Planners to solve a real problem he witnessed repeatedly: East African couples navigating a fragmented, opaque wedding industry with no trusted digital platform to guide them. Paul leads the product and technology vision.",
    img: '/founder.webp',
    location: '🇰🇪 Nairobi, Kenya',
  },
  {
    name: 'Planning Team',
    role: 'Senior Wedding Planners',
    bio: 'Our planning team brings over a decade of combined experience coordinating weddings across Kenya, Tanzania, Uganda, and beyond. Every planner on the team has personally coordinated at least 50 weddings and holds relationships with our full vendor network.',
    img: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=400',
    location: '🇰🇪 Nairobi & Coast',
  },
  {
    name: 'Vendor Relations',
    role: 'Vendor Curation & Partnerships',
    bio: 'Our vendor team is responsible for sourcing, vetting, and maintaining relationships with every professional on the platform. Every vendor is personally reviewed — no paid listings, no shortcuts.',
    img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=400',
    location: '🇰🇪 East Africa',
  },
]

export default function About() {
  return (
    <>
      <SEOHead
        title="About Us"
        description="Harusi Planners is East Africa's most trusted wedding planning platform. Built by Paul Nyang'wara and NeuroSpark Corporation to give every couple the planning experience they deserve."
        path="/about"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 bg-plum dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-blush/10 blur-3xl" />
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60 mb-5">
            Our Story
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white italic leading-tight mb-8">
            Built for East Africa's<br />Greatest Celebrations.
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Harusi Planners was created to give every couple in East Africa the planning experience they deserve — transparent, expert, and built around how they actually live.
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-gold py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-serif font-bold text-plum">{value}</p>
              <p className="text-[10px] uppercase tracking-widest text-plum/60 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Origin story ── */}
      <section className="py-24 bg-ivory dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-4">
                Why We Exist
              </p>
              <h2 className="text-4xl font-serif text-plum dark:text-ivory mb-6">
                East Africa deserved a better wedding platform.
              </h2>
              <p className="text-plum/70 dark:text-ivory/70 leading-relaxed mb-5">
                When Paul Nyang'wara — Founder of NeuroSpark Corporation and one of Kenya's leading technologists — began mapping the East African wedding industry, the gap was clear. Couples were navigating a fragmented landscape of WhatsApp referrals, outdated directories, and word-of-mouth guesswork. No transparent pricing. No vetted vendor network. No tools built for the way Kenyan couples actually plan.
              </p>
              <p className="text-plum/70 dark:text-ivory/70 leading-relaxed mb-5">
                Harusi Planners was the answer. Built from the ground up in Nairobi, the platform combines a curated vendor directory, real planning tools, transparent pricing, and a team of experienced East African wedding planners — all in one place.
              </p>
              <p className="text-plum/70 dark:text-ivory/70 leading-relaxed">
                The name says it all. <em>Harusi</em> — the Swahili word for wedding — is not just a product name. It is a statement of intent: this platform belongs to East Africa, and it was built to honour the way our cultures celebrate love.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-plum/10">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200"
                  alt="East African wedding celebration"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-plum text-white rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-3xl font-serif font-bold gold-shimmer">2022</p>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">Founded in Nairobi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">
              How We Work
            </p>
            <h2 className="text-4xl font-serif text-plum dark:text-ivory">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-ivory dark:bg-dark-card rounded-3xl p-8 hover:shadow-lg hover:shadow-plum/5 transition group"
              >
                <p className="text-3xl mb-5" aria-hidden="true">{icon}</p>
                <h3 className="font-bold text-plum dark:text-ivory mb-3 group-hover:text-rose dark:group-hover:text-gold transition">
                  {title}
                </h3>
                <p className="text-sm text-plum/60 dark:text-ivory/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 bg-ivory dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">
              The People
            </p>
            <h2 className="text-4xl font-serif text-plum dark:text-ivory">
              Who's Behind Harusi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map(({ name, role, bio, img, location }) => (
              <div key={name} className="bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="h-56 overflow-hidden">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <p className="text-[10px] uppercase tracking-widest text-rose font-bold mb-1">{role}</p>
                  <h3 className="text-lg font-bold text-plum dark:text-ivory mb-1">{name}</h3>
                  <p className="text-[10px] text-plum/40 dark:text-ivory/40 mb-4">{location}</p>
                  <p className="text-sm text-plum/60 dark:text-ivory/60 leading-relaxed">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built by NeuroSpark ── */}
      <section className="py-20 bg-plum dark:bg-dark-surface px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/40 mb-5">
          Technology Partner
        </p>
        <h2 className="text-3xl font-serif text-white italic mb-5">
          Designed & built by NeuroSpark Corporation
        </h2>
        <p className="text-white/50 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
          Harusi Planners is a product of NeuroSpark Corporation — Kenya's AI and digital studio. For custom digital products, AI agents, or web development, visit neurosparkcorporation.ai
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-rose/80 transition"
          >
            Work With Our Planners
          </a>
          <Link
            to="/pricing"
            className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:border-white hover:bg-white/10 transition"
          >
            View Packages
          </Link>
        </div>
      </section>
    </>
  )
}
