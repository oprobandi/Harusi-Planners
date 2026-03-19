import { useState } from 'react'

const STEPS = [
  {
    id: 'landscape',
    question: "What's your preferred wedding landscape?",
    options: [
      { emoji: '🌊', label: 'Coastal Serenity',   description: 'Beachfront elegance in Mombasa or Diani.' },
      { emoji: '🌲', label: 'Garden Romance',      description: 'Lush lawns and floral blooms in Karen.' },
      { emoji: '🏢', label: 'City Chic',           description: 'Sophisticated rooftop vibes in Westlands.' },
      { emoji: '🦁', label: 'Wilderness Luxury',   description: 'Boutique safari elegance in the Mara.' },
    ],
  },
  {
    id: 'size',
    question: 'How many guests are you imagining?',
    options: [
      { emoji: '💏', label: 'Intimate',     description: 'Under 50 — close family & friends only.' },
      { emoji: '👥', label: 'Medium',       description: '50–150 guests — the sweet spot.' },
      { emoji: '🎉', label: 'Grand',        description: '150–300 guests — a true celebration.' },
      { emoji: '👑', label: 'Extravagant',  description: '300+ guests — no limits.' },
    ],
  },
  {
    id: 'style',
    question: 'Which aesthetic speaks to your heart?',
    options: [
      { emoji: '🌸', label: 'Romantic Florals',    description: 'Overflowing blooms, soft pinks & greens.' },
      { emoji: '✨', label: 'Luxury Modern',        description: 'Gold accents, clean lines, dramatic lighting.' },
      { emoji: '🌿', label: 'Boho Organic',         description: 'Natural textures, earth tones, wildflowers.' },
      { emoji: '🏛️', label: 'Classic Elegance',    description: 'Timeless black & white, grand floral arches.' },
    ],
  },
  {
    id: 'budget',
    question: "What's your approximate wedding budget?",
    options: [
      { emoji: '💵', label: 'Under KSh 500k',     description: 'Tight & beautiful — we love a challenge.' },
      { emoji: '💰', label: 'KSh 500k – 1.5M',    description: 'A comfortable mid-range celebration.' },
      { emoji: '💎', label: 'KSh 1.5M – 3M',      description: 'Premium vendors & venues.' },
      { emoji: '🚀', label: 'KSh 3M+',            description: 'No limits — spare no expense.' },
    ],
  },
  {
    id: 'timeline',
    question: 'When is the big day?',
    options: [
      { emoji: '⚡', label: 'Under 3 months',   description: 'Rush planning — we can do it!' },
      { emoji: '📅', label: '3–6 months',        description: 'Enough time to do it right.' },
      { emoji: '🗓️', label: '6–12 months',      description: 'The ideal planning window.' },
      { emoji: '🌅', label: '1 year or more',   description: 'We have all the time in the world.' },
    ],
  },
]

const RESULTS = {
  'Coastal Serenity': {
    title: 'Beachfront Dream Celebration',
    description: 'The Indian Ocean as your backdrop, white sands underfoot, and a golden sunset ceremony. Your love story belongs by the sea.',
    venues: ['Leopard Beach Resort, Diani', 'Serena Beach Resort, Mombasa', 'Pinewood Beach, Diani'],
    package: 'Kati',
  },
  'Garden Romance': {
    title: 'English Garden Fairytale',
    description: 'Tucked beneath jacaranda trees, surrounded by roses in full bloom — your Karen garden wedding will feel like stepping into a painting.',
    venues: ['Giraffe Centre Gardens', 'The Nairobi Safari Club', 'Karen Country Club'],
    package: 'Kati',
  },
  'City Chic': {
    title: 'Urban Rooftop Affair',
    description: 'The Nairobi skyline at golden hour, bespoke cocktails, and a curated playlist. Sophisticated, modern, unforgettable.',
    venues: ['Radisson Blu, Westlands', 'The Boma Hotel', 'Tribe Hotel Nairobi'],
    package: 'Ndogo',
  },
  'Wilderness Luxury': {
    title: 'Luxury Safari Celebration',
    description: 'Say your vows as the African sun sets over the Mara plains, with elephants in the distance. Pure magic.',
    venues: ['Angama Mara', 'Mahali Mzuri', 'Saruni Mara'],
    package: 'Kubwa',
  },
}

function ProgressBar({ step, total }) {
  const pct = Math.round(((step) / total) * 100)
  return (
    <div className="flex items-center justify-center gap-3 mb-2">
      <div className="w-48 h-1.5 bg-blush/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-rose rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-rose/60">
        Step {step} of {total}
      </span>
    </div>
  )
}

function EmailCapture({ answers, onBack }) {
  const [email,     setEmail]     = useState('')
  const [name,      setName]      = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  const result = RESULTS[answers.landscape] ?? RESULTS['Garden Romance']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRx.test(email)) { setError('Please enter a valid email address.'); return }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center animate-fade-up">
        <div className="text-5xl mb-6">🎉</div>
        <h3 className="text-3xl font-serif text-plum mb-4">You're all set, {name.split(' ')[0]}!</h3>
        <p className="text-plum/60 mb-8 max-w-md mx-auto">
          Your personalised wedding planning guide is heading to <strong>{email}</strong>. 
          A Harusi planner will be in touch within 24 hours.
        </p>

        {/* Result card */}
        <div className="bg-plum text-white rounded-3xl p-8 text-left mb-8">
          <p className="text-[10px] uppercase tracking-widest text-gold mb-3">Your Wedding Style</p>
          <h4 className="text-2xl font-serif italic mb-4">{result.title}</h4>
          <p className="text-white/60 text-sm mb-6">{result.description}</p>
          <p className="text-[10px] uppercase tracking-widest text-gold mb-3">Recommended Venues</p>
          <ul className="space-y-1.5">
            {result.venues.map(v => (
              <li key={v} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-gold mt-0.5">✦</span>{v}
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-gold mb-2">Suggested Package</p>
            <span className="inline-block bg-gold/20 text-gold px-4 py-1 rounded-full text-sm font-bold">{result.package}</span>
          </div>
        </div>

        <a
          href="https://wa.me/254799644100"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-rose text-white px-10 py-4 rounded-full font-bold hover:bg-plum transition"
        >
          💬 Chat with a Planner Now
        </a>
      </div>
    )
  }

  return (
    <div className="animate-fade-up">
      <h3 className="text-3xl font-serif text-plum mb-3 text-center">
        Almost there — your wedding plan is ready!
      </h3>
      <p className="text-center text-plum/50 mb-10">
        Where should we send your personalised vendor shortlist &amp; venue recommendations?
      </p>

      <div className="bg-plum/5 rounded-2xl p-6 md:p-8 mb-8">
        <p className="text-[10px] uppercase tracking-widest text-rose mb-4 font-bold">Your selections</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(answers).map(([key, val]) => (
            <div key={key} className="bg-white rounded-xl p-3">
              <p className="text-[9px] uppercase tracking-wider text-plum/40 mb-1 capitalize">{key}</p>
              <p className="text-xs font-bold text-plum">{val}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="quiz-name" className="block text-xs font-bold text-plum/60 mb-2 uppercase tracking-widest">
              Your Name
            </label>
            <input
              id="quiz-name"
              type="text"
              required
              placeholder="Amina Wanjiku"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border-b-2 border-blush/50 bg-transparent py-3 outline-none text-plum placeholder-plum/30 focus:border-rose transition text-sm"
            />
          </div>
          <div>
            <label htmlFor="quiz-email" className="block text-xs font-bold text-plum/60 mb-2 uppercase tracking-widest">
              Email Address
            </label>
            <input
              id="quiz-email"
              type="email"
              required
              placeholder="amina@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b-2 border-blush/50 bg-transparent py-3 outline-none text-plum placeholder-plum/30 focus:border-rose transition text-sm"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-rose text-xs mb-4 font-medium">{error}</p>
        )}

        <p className="text-[10px] text-plum/30 mb-8">
          We respect your privacy. No spam, ever. Unsubscribe anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="text-plum/40 text-sm font-bold uppercase tracking-widest hover:text-plum transition"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-rose text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-plum transition"
          >
            Get My Wedding Plan 💍
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Quiz() {
  const [step,    setStep]    = useState(0)       // 0-indexed step
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)

  const total = STEPS.length
  const currentStep = STEPS[step]
  const isEmailStep = step === total

  const handleSelect = (label) => setSelected(label)

  const handleNext = () => {
    if (!selected) return
    setAnswers(prev => ({ ...prev, [currentStep.id]: selected }))
    setSelected(null)
    setStep(s => s + 1)
  }

  const handleBack = () => {
    if (step === 0) return
    setStep(s => s - 1)
    const prevStep = STEPS[step - 1]
    setSelected(answers[prevStep.id] ?? null)
  }

  return (
    <section id="quiz" className="py-24 bg-ivory">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">Free Planning Tool</p>
          <h2 className="text-4xl font-serif text-plum mb-6">Let's Find Your Perfect Wedding Match</h2>
          {!isEmailStep && <ProgressBar step={step + 1} total={total} />}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-2xl shadow-plum/5 relative overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blush/10 rounded-full -mr-20 -mt-20 pointer-events-none" aria-hidden="true" />

          {isEmailStep ? (
            <EmailCapture answers={answers} onBack={handleBack} />
          ) : (
            <div key={step} className="animate-fade-up">
              <h3 className="text-2xl md:text-3xl font-serif text-plum mb-10 text-center">
                {currentStep.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStep.options.map(({ emoji, label, description }) => (
                  <button
                    key={label}
                    onClick={() => handleSelect(label)}
                    className={`quiz-option bg-ivory/30 p-6 rounded-2xl text-left ${selected === label ? 'selected' : ''}`}
                    aria-pressed={selected === label}
                  >
                    <span className="block text-2xl mb-3" aria-hidden="true">{emoji}</span>
                    <span className="block font-bold text-plum mb-1">{label}</span>
                    <span className="block text-sm text-plum/50">{description}</span>
                  </button>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="text-plum/40 text-sm font-bold uppercase tracking-widest hover:text-plum transition disabled:opacity-0"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className="text-rose font-bold text-sm tracking-widest border-b border-rose uppercase pb-1 hover:text-plum hover:border-plum transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {step === total - 1 ? 'See My Results' : 'Next Step'} ⟶
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
