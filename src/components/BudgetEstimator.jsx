import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../utils/constants'

// ─── Market data (2026, Kenya) ─────────────────────────────────────────────
// Source: harusihub.com/blog, ccentricevents.co.ke, janatribe.com
const CATERING = { budget: 1150, mid: 2250, luxury: 5500 }   // KSh per head (midpoints)
const VENUE    = { budget: 32500, mid: 97500, luxury: 350000 } // KSh venue hire
const PHOTO    = { budget: 37500, mid: 75000, luxury: 150000 }
const DECOR    = { budget: 45000, mid: 105000, luxury: 275000 }
const DJ       = { budget: 20000, mid: 37500, luxury: 100000 }
const CAKE     = { budget: 11500, mid: 25000, luxury: 57500 }

const OUTSIDE_NAIROBI_SAVING = 0.25   // 25% average cost reduction

// Planner fee as % of budget
const PLANNER_RATE = { budget: 0.09, mid: 0.10, luxury: 0.10 }

function fmt(n) {
  return 'KSh ' + Math.round(n).toLocaleString('en-KE')
}

function Slider({ label, min, max, step, value, onChange, display }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-xs font-bold uppercase tracking-widest text-plum/60">{label}</label>
        <span className="text-sm font-bold text-plum">{display ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-rose h-1.5 rounded-full cursor-pointer"
        aria-label={label}
      />
      <div className="flex justify-between text-[10px] text-plum/30 mt-1">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  )
}

function Bar({ label, value, max, color = 'bg-rose' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-plum/60">{label}</span>
        <span className="font-bold text-plum">{fmt(value)}</span>
      </div>
      <div className="h-1.5 bg-plum/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function BudgetEstimator() {
  const [guests,    setGuests]    = useState(150)
  const [tier,      setTier]      = useState('mid')       // 'budget' | 'mid' | 'luxury'
  const [outside,   setOutside]   = useState(false)

  const tiers = [
    { id: 'budget',  label: 'Budget',  sub: 'Home / church venue' },
    { id: 'mid',     label: 'Mid-Range', sub: 'Garden / hotel' },
    { id: 'luxury',  label: 'Luxury',  sub: '5-star / destination' },
  ]

  const calc = useMemo(() => {
    const t = tier
    const raw = {
      catering: CATERING[t] * guests,
      venue:    VENUE[t],
      photo:    PHOTO[t],
      decor:    DECOR[t],
      dj:       DJ[t],
      cake:     CAKE[t],
    }
    const subtotal   = Object.values(raw).reduce((a, b) => a + b, 0)
    const contingency = subtotal * 0.10
    const total_ex   = subtotal + contingency
    const location_multiplier = outside ? (1 - OUTSIDE_NAIROBI_SAVING) : 1
    const total      = total_ex * location_multiplier
    const planner_fee = total * PLANNER_RATE[t]
    const vat        = planner_fee * 0.16
    const breakdown  = Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, v * location_multiplier])
    )
    return { breakdown, total, planner_fee, vat, contingency: contingency * location_multiplier }
  }, [guests, tier, outside])

  // Suggest package based on guest count + tier
  const suggestedPkg = useMemo(() => {
    if (tier === 'luxury' && guests > 200) return { id: 'kubwa',  name: 'Kubwa',          to: '/pricing' }
    if (tier === 'luxury')                 return { id: 'safari', name: 'Safari & Shores', to: '/pricing' }
    if (guests <= 50)                      return { id: 'ndogo',  name: 'Ndogo',           to: '/pricing' }
    if (guests <= 200)                     return { id: 'kati',   name: 'Kati',            to: '/pricing' }
    return                                        { id: 'kubwa',  name: 'Kubwa',           to: '/pricing' }
  }, [guests, tier])

  const breakdownItems = [
    { label: 'Catering',            value: calc.breakdown.catering, color: 'bg-rose' },
    { label: 'Venue Hire',          value: calc.breakdown.venue,    color: 'bg-plum' },
    { label: 'Photography & Video', value: calc.breakdown.photo,    color: 'bg-gold' },
    { label: 'Décor & Flowers',     value: calc.breakdown.decor,    color: 'bg-sage' },
    { label: 'DJ / Music',          value: calc.breakdown.dj,       color: 'bg-blush' },
    { label: 'Wedding Cake',        value: calc.breakdown.cake,     color: 'bg-rose/60' },
    { label: 'Contingency (10%)',   value: calc.contingency,        color: 'bg-plum/30' },
  ]
  const maxBar = Math.max(...breakdownItems.map(i => i.value))

  return (
    <section className="py-24 bg-ivory" id="estimator">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">Free Planning Tool</p>
          <h2 className="text-4xl font-serif text-plum mb-4">Wedding Budget Estimator</h2>
          <p className="text-plum/50 max-w-lg mx-auto text-sm leading-relaxed">
            Based on 2026 Kenya market rates. Adjust the sliders to build your picture — then we'll suggest the right Harusi package.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: Controls ── */}
          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-plum/5">
            <h3 className="text-lg font-bold text-plum mb-8">Your Wedding Details</h3>

            {/* Guest slider */}
            <div className="mb-8">
              <Slider
                label="Guest Count"
                min={20}
                max={500}
                step={10}
                value={guests}
                onChange={setGuests}
                display={`${guests} guests`}
              />
            </div>

            {/* Tier selector */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-plum/60 mb-3">Wedding Tier</p>
              <div className="grid grid-cols-3 gap-2">
                {tiers.map(({ id, label, sub }) => (
                  <button
                    key={id}
                    onClick={() => setTier(id)}
                    className={`rounded-xl p-3 text-left transition-all border-2 ${
                      tier === id
                        ? 'border-rose bg-rose/5'
                        : 'border-transparent bg-ivory hover:border-blush/60'
                    }`}
                  >
                    <span className="block text-xs font-bold text-plum">{label}</span>
                    <span className="block text-[10px] text-plum/40 mt-0.5 leading-tight">{sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location toggle */}
            <div className="flex items-center justify-between p-4 bg-ivory rounded-xl">
              <div>
                <p className="text-sm font-bold text-plum">Outside Nairobi?</p>
                <p className="text-[11px] text-plum/40 mt-0.5">~25% saving on most costs</p>
              </div>
              <button
                role="switch"
                aria-checked={outside}
                onClick={() => setOutside(v => !v)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${outside ? 'bg-rose' : 'bg-plum/20'}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${outside ? 'translate-x-6' : ''}`}
                />
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-plum/30 mt-6 leading-relaxed">
              Estimates based on Nairobi 2026 market data. Actual costs vary by vendor, season, and specific requirements. All figures exclude 16% VAT.
            </p>
          </div>

          {/* ── Right: Results ── */}
          <div className="space-y-6">

            {/* Total */}
            <div className="bg-plum rounded-3xl p-8 text-white">
              <p className="text-[10px] uppercase tracking-widest text-gold/60 mb-1">Estimated Total Wedding Cost</p>
              <p className="text-4xl font-serif font-bold gold-shimmer mb-1">{fmt(calc.total)}</p>
              <p className="text-white/40 text-xs">{outside ? 'Outside Nairobi estimate' : 'Nairobi baseline'} · excl. VAT</p>

              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gold/50 mb-1">Harusi Planner Fee</p>
                  <p className="text-xl font-bold text-white">{fmt(calc.planner_fee)}</p>
                  <p className="text-[10px] text-white/30">+ KSh {Math.round(calc.vat).toLocaleString()} VAT</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gold/50 mb-1">Suggested Package</p>
                  <Link
                    to={suggestedPkg.to}
                    className="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gold/30 transition mt-0.5"
                  >
                    {suggestedPkg.name} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Breakdown bars */}
            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-plum/5">
              <h3 className="text-sm font-bold text-plum mb-6 uppercase tracking-widest">Cost Breakdown</h3>
              {breakdownItems.map(item => (
                <Bar key={item.label} {...item} max={maxBar} />
              ))}
            </div>

            {/* CTA */}
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi! I used the budget estimator and got a total of ${fmt(calc.total)} for ${guests} guests. Can we talk?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-rose text-white py-4 rounded-2xl font-bold text-sm hover:bg-plum transition"
            >
              💬 Discuss My Budget with a Planner
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
