import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { QUIZ_STEPS, QUIZ_RESULTS, recommendPackage } from '../../data/quiz'
import { WHATSAPP_URL } from '../../utils/constants'

const LS_KEY = 'harusi-quiz-v1'

function loadSaved() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

// ─── Sub-components ────────────────────────────────────────────────────────

function ProgressBar({ step, total }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="flex items-center justify-center gap-3 mb-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>
      <div className="w-48 h-1.5 bg-blush/30 rounded-full overflow-hidden">
        <div className="h-full bg-rose rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-rose/60">
        Step {step} of {total}
      </span>
    </div>
  )
}

function ResultCard({ answers, onReset }) {
  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [error,     setError]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  const pkgId  = recommendPackage(answers)
  const result = QUIZ_RESULTS[pkgId]

  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRx.test(email.trim())) { setError('Please enter a valid email address.'); return }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim(), name: name.trim(), source: 'quiz' }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setSubmitting(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center animate-fade-up">
        <div className="text-5xl mb-5" aria-hidden="true">🎉</div>
        <h3 className="text-3xl font-serif text-plum mb-3">You're all set, {name.split(' ')[0]}!</h3>
        <p className="text-plum/60 mb-8 max-w-md mx-auto text-sm">
          Your personalised guide is heading to <strong>{email}</strong>.
          A Harusi planner will be in touch within 24 hours.
        </p>

        {/* Result highlight */}
        <div className="bg-plum text-white rounded-3xl p-8 text-left mb-6">
          <p className="text-[10px] uppercase tracking-widest text-gold mb-3">Your Wedding Style</p>
          <h4 className="text-2xl font-serif italic mb-3">{result.title}</h4>
          <p className="text-white/60 text-sm mb-6">{result.description}</p>

          <p className="text-[10px] uppercase tracking-widest text-gold mb-3">Recommended Venues</p>
          <ul className="space-y-1.5 mb-6">
            {result.venues.map(v => (
              <li key={v} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-gold mt-0.5" aria-hidden="true">✦</span>{v}
              </li>
            ))}
          </ul>

          <div className="pt-5 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gold mb-1">Suggested Package</p>
              <span className="inline-block bg-gold/20 text-gold px-4 py-1 rounded-full text-sm font-bold">
                {result.package}
              </span>
            </div>
            <Link
              to="/pricing"
              className="text-[10px] uppercase tracking-widest text-white/60 border-b border-white/20 hover:text-white transition pb-0.5"
            >
              See full details →
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi! I completed the Harusi quiz and was matched with the ${result.package} package. Can we chat?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-rose text-white px-8 py-4 rounded-full font-bold hover:bg-plum transition text-sm"
          >
            💬 Chat with a Planner
          </a>
          <button
            onClick={onReset}
            className="text-plum/40 text-sm font-bold uppercase tracking-widest hover:text-plum transition"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  // Email capture screen
  return (
    <div className="animate-fade-up">
      <h3 className="text-2xl md:text-3xl font-serif text-plum mb-3 text-center">
        Almost there — your plan is ready!
      </h3>
      <p className="text-center text-plum/50 mb-8 text-sm">
        Where should we send your personalised vendor shortlist &amp; venue recommendations?
      </p>

      {/* Answers summary */}
      <div className="bg-plum/5 rounded-2xl p-5 mb-8">
        <p className="text-[10px] uppercase tracking-widest text-rose mb-3 font-bold">Your Selections</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(answers).filter(([, v]) => v !== null).map(([key, val]) => (
            <div key={key} className="bg-white rounded-xl p-3">
              <p className="text-[9px] uppercase tracking-wider text-plum/40 mb-0.5 capitalize">{key}</p>
              <p className="text-xs font-bold text-plum leading-snug">{val}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
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

        {error && <p role="alert" className="text-rose text-xs mb-4 font-medium">{error}</p>}

        <p className="text-[10px] text-plum/30 mb-6">No spam, ever. Unsubscribe anytime.</p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 w-full bg-rose text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-plum transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting
              ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending...</>
              : <>Get My Wedding Plan 💍</>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Main Quiz component ───────────────────────────────────────────────────

export default function Quiz() {
  const total = QUIZ_STEPS.length

  const saved = loadSaved()
  const [step,     setStep]     = useState(saved?.step     ?? 0)
  const [answers,  setAnswers]  = useState(saved?.answers  ?? {})
  const [selected, setSelected] = useState(null)

  // Persist to localStorage on every step/answer change
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ step, answers }))
    } catch { /* storage full or private mode */ }
  }, [step, answers])

  const isEmailStep = step === total
  const currentStep = QUIZ_STEPS[step]

  const handleNext = () => {
    if (step >= total) return
    setAnswers(prev => ({ ...prev, [currentStep.id]: selected ?? null }))
    setSelected(null)
    setStep(s => s + 1)
  }

  const handleSkip = () => {
    setAnswers(prev => ({ ...prev, [currentStep.id]: null }))
    setSelected(null)
    setStep(s => s + 1)
  }

  const handleBack = () => {
    if (step === 0) return
    const prevStep = QUIZ_STEPS[step - 1]
    setSelected(answers[prevStep?.id] ?? null)
    setStep(s => s - 1)
  }

  const handleReset = () => {
    try { localStorage.removeItem(LS_KEY) } catch { /* ignore */ }
    setStep(0)
    setAnswers({})
    setSelected(null)
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
            <ResultCard answers={answers} onReset={handleReset} />
          ) : (
            <div key={step} className="animate-fade-up">
              <h3 className="text-2xl md:text-3xl font-serif text-plum mb-10 text-center">
                {currentStep.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStep.options.map(({ emoji, label, description }) => (
                  <button
                    key={label}
                    onClick={() => setSelected(label)}
                    className={`quiz-option bg-ivory/30 p-6 rounded-2xl text-left ${selected === label ? 'selected' : ''}`}
                    aria-pressed={selected === label}
                  >
                    <span className="block text-2xl mb-3" aria-hidden="true">{emoji}</span>
                    <span className="block font-bold text-plum mb-1">{label}</span>
                    <span className="block text-sm text-plum/50">{description}</span>
                  </button>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="text-plum/40 text-sm font-bold uppercase tracking-widest hover:text-plum transition disabled:opacity-0"
                >
                  ← Back
                </button>

                <div className="flex items-center gap-5">
                  <button
                    onClick={handleSkip}
                    className="text-plum/30 text-xs font-bold uppercase tracking-widest hover:text-plum/60 transition"
                  >
                    Skip
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
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
