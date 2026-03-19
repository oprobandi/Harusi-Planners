import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'Home',           to: '/' },
  { label: 'Planning Tools', to: '/#quiz' },
  { label: 'Vendors',        to: '/vendors' },
  { label: 'Inspiration',    to: '/inspiration' },
  { label: 'Pricing',        to: '/pricing' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleStartPlanning = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'nav-glass shadow-sm border-b border-plum/5 dark:border-white/5 py-3'
            : 'bg-transparent py-5'
        } px-6 md:px-10 flex justify-between items-center`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="Harusi Planners — Home"
          className="hover:opacity-80 transition-opacity"
        >
          <img src="/logo.svg"       alt="Harusi Planners" className="h-10 w-auto dark:hidden" />
          <img src="/logo-white.svg" alt="Harusi Planners" className="h-10 w-auto hidden dark:block" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-10 text-[11px] uppercase tracking-[0.2em] font-bold">
          {navLinks.map(({ label, to }) =>
            to.startsWith('/#') ? (
              <button
                key={label}
                onClick={handleStartPlanning}
                className="hover:text-rose dark:hover:text-gold transition text-plum dark:text-ivory/70"
              >
                {label}
              </button>
            ) : (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? 'text-rose dark:text-gold border-b border-rose dark:border-gold pb-0.5'
                      : 'text-plum dark:text-ivory/70 hover:text-rose dark:hover:text-gold'
                  }`
                }
              >
                {label}
              </NavLink>
            )
          )}
        </div>

        {/* Right side: Theme toggle + CTA + Hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={handleStartPlanning}
            className="hidden md:flex items-center gap-2 bg-plum dark:bg-gold text-ivory dark:text-plum px-7 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-rose dark:hover:bg-gold/80 transition-colors"
          >
            <Sparkles size={13} aria-hidden="true" />
            Start Planning
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 relative z-[110]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span className={`block w-6 h-0.5 bg-plum dark:bg-ivory transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-plum dark:bg-ivory transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-plum dark:bg-ivory transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[100] bg-ivory dark:bg-dark-bg flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col items-center gap-10">
          {navLinks.map(({ label, to }, i) =>
            to.startsWith('/#') ? (
              <button
                key={label}
                onClick={handleStartPlanning}
                className="text-3xl font-serif italic text-plum dark:text-ivory hover:text-rose dark:hover:text-gold transition"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {label}
              </button>
            ) : (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `text-3xl font-serif italic transition ${
                    isActive
                      ? 'text-rose dark:text-gold'
                      : 'text-plum dark:text-ivory hover:text-rose dark:hover:text-gold'
                  }`
                }
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {label}
              </NavLink>
            )
          )}
          <button
            onClick={handleStartPlanning}
            className="mt-6 flex items-center gap-2 bg-plum dark:bg-gold text-ivory dark:text-plum px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-rose dark:hover:bg-gold/80 transition-colors"
          >
            <Sparkles size={15} aria-hidden="true" />
            Start Planning
          </button>
        </nav>
      </div>
    </>
  )
}
