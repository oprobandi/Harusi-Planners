import { useState, useEffect, useCallback, useRef } from 'react'

const TESTIMONIALS = [
  {
    quote: "Harusi made our Karen garden wedding feel effortless. Every detail was perfect — we didn't have to worry about a single thing.",
    name:    'Amina & David K.',
    wedding: 'Karen Country Club · March 2024',
    package: 'Kati',
    img:     'https://images.unsplash.com/photo-1544161442-e3db36c4f67c?q=80&w=400',
  },
  {
    quote: 'Our Mara bush wedding was beyond imagination. The team coordinated vendors we could never have found on our own.',
    name:    'Fatuma & James M.',
    wedding: 'Angama Mara · October 2023',
    package: 'Safari & Shores',
    img:     'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=400',
  },
  {
    quote: "The Asili package was everything we hoped for. Our ruracio and church ceremony flowed seamlessly — family was so impressed.",
    name:    'Grace & Samuel O.',
    wedding: "Murang'a Cultural Centre · April 2024",
    package: 'Asili',
    img:     'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400',
  },
  {
    quote: "We were planning from London and had zero stress. Harusi handled every vendor, every visit, every detail. Worth every shilling.",
    name:    'Zara & Mohamed H.',
    wedding: 'Leopard Beach, Diani · January 2024',
    package: 'Safari & Shores',
    img:     'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400',
  },
  {
    quote: 'The budget estimator helped us understand exactly where our money was going. We ended up saving almost KSh 200k vs. DIY planning.',
    name:    'Wanjiru & Felix N.',
    wedding: 'Radisson Blu, Westlands · February 2024',
    package: 'Kubwa',
    img:     'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400',
  },
]

const PACKAGE_COLORS = {
  'Kati':           'bg-rose/10 text-rose',
  'Safari & Shores':'bg-sage/10 text-sage',
  'Asili':          'bg-gold/15 text-gold',
  'Kubwa':          'bg-plum/10 text-plum',
  'Ndogo':          'bg-blush/30 text-rose',
}

export default function TestimonialsCarousel() {
  const [current,   setCurrent]   = useState(0)
  const [paused,    setPaused]    = useState(false)
  const [animDir,   setAnimDir]   = useState('next') // 'next' | 'prev'
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)
  const total    = TESTIMONIALS.length

  const goTo = useCallback((index, dir = 'next') => {
    if (animating) return
    setAnimDir(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 320)
  }, [animating])

  const next = useCallback(() => {
    goTo((current + 1) % total, 'next')
  }, [current, total, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, 'prev')
  }, [current, total, goTo])

  // Auto-advance every 5s unless paused
  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [paused, next])

  const t = TESTIMONIALS[current]

  return (
    <section className="py-24 bg-ivory overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3 text-center">
          Real Couples
        </p>
        <h2 className="text-4xl font-serif text-center text-plum mb-16">
          Voices from the Aisle
        </h2>

        {/* Card */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            key={current}
            className={`bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-plum/5 transition-all duration-300 ${
              animating
                ? animDir === 'next'
                  ? 'opacity-0 translate-x-4'
                  : 'opacity-0 -translate-x-4'
                : 'opacity-100 translate-x-0'
            }`}
            style={{ transform: animating
              ? `translateX(${animDir === 'next' ? '12px' : '-12px'})`
              : 'translateX(0)',
              opacity: animating ? 0 : 1,
              transition: 'opacity 0.32s ease, transform 0.32s ease',
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Photo */}
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-blush/40">
                  <img
                    src={t.img}
                    alt={`${t.name} wedding`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Stars */}
                <p className="text-gold text-sm mb-4" aria-label="5 out of 5 stars">★★★★★</p>

                {/* Quote */}
                <blockquote className="font-serif italic text-xl md:text-2xl text-plum/80 leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-bold text-plum text-sm">{t.name}</p>
                    <p className="text-xs text-plum/40 mt-0.5">{t.wedding}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${PACKAGE_COLORS[t.package] ?? 'bg-ivory text-plum'}`}>
                    {t.package}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-md shadow-plum/10 flex items-center justify-center text-plum hover:bg-rose hover:text-white transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-white shadow-md shadow-plum/10 flex items-center justify-center text-plum hover:bg-rose hover:text-white transition"
          >
            ›
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial slides">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-rose'
                  : 'w-2 h-2 bg-plum/20 hover:bg-plum/40'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-[10px] uppercase tracking-widest text-plum/30 mt-4">
          {current + 1} / {total}
        </p>
      </div>
    </section>
  )
}
