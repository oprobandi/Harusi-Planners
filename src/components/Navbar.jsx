import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Sparkles, ChevronDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { label: 'Home',    to: '/' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog',    to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const ABOUT_LINKS = [
  { label: 'About Us',    to: '/about',       desc: 'Our story and mission' },
  { label: 'Vendors',     to: '/vendors',     desc: 'Browse 850+ professionals' },
  { label: 'Inspiration', to: '/inspiration', desc: 'Real East African weddings' },
  { label: 'FAQs',        to: '/faqs',        desc: 'Common questions answered' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [aboutOpen,   setAboutOpen]   = useState(false)
  const [mobileAbout, setMobileAbout] = useState(false)
  const navigate    = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAboutOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-bold">

          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition ${isActive
                ? 'text-rose dark:text-gold border-b border-rose dark:border-gold pb-0.5'
                : 'text-plum dark:text-ivory/70 hover:text-rose dark:hover:text-gold'}`
            }
          >
            Home
          </NavLink>

          {/* About dropdown — second item */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAboutOpen(v => !v)}
              aria-expanded={aboutOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 transition ${
                aboutOpen
                  ? 'text-rose dark:text-gold'
                  : 'text-plum dark:text-ivory/70 hover:text-rose dark:hover:text-gold'
              }`}
            >
              About
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {aboutOpen && (
              <div
                className="absolute top-full left-0 mt-3 w-56 bg-white dark:bg-dark-card rounded-2xl shadow-xl shadow-plum/10 border border-plum/5 dark:border-dark-border overflow-hidden"
                role="menu"
              >
                {ABOUT_LINKS.map(({ label, to, desc }) => (
                  <NavLink
                    key={label}
                    to={to}
                    role="menuitem"
                    onClick={() => setAboutOpen(false)}
                    className={({ isActive }) =>
                      `block px-5 py-3.5 hover:bg-ivory dark:hover:bg-dark-surface transition group ${
                        isActive ? 'bg-ivory dark:bg-dark-surface' : ''
                      }`
                    }
                  >
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-plum dark:text-ivory group-hover:text-rose dark:group-hover:text-gold transition">
                      {label}
                    </span>
                    <span className="block text-[10px] text-plum/40 dark:text-ivory/40 mt-0.5 normal-case tracking-normal font-normal">
                      {desc}
                    </span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Pricing, Blog, Contact */}
          {NAV_LINKS.filter(l => l.label !== 'Home').map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `transition ${isActive
                  ? 'text-rose dark:text-gold border-b border-rose dark:border-gold pb-0.5'
                  : 'text-plum dark:text-ivory/70 hover:text-rose dark:hover:text-gold'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
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
        <nav className="flex flex-col items-center gap-8">

          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-3xl font-serif italic transition ${
                isActive ? 'text-rose dark:text-gold' : 'text-plum dark:text-ivory hover:text-rose dark:hover:text-gold'
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          {/* About collapsible */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setMobileAbout(v => !v)}
              className="text-3xl font-serif italic text-plum dark:text-ivory hover:text-rose dark:hover:text-gold transition flex items-center gap-2"
            >
              About
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 mt-1 ${mobileAbout ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {mobileAbout && (
              <div className="flex flex-col items-center gap-3">
                {ABOUT_LINKS.map(({ label, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) =>
                      `text-lg font-serif italic transition ${
                        isActive
                          ? 'text-rose dark:text-gold'
                          : 'text-plum/60 dark:text-ivory/60 hover:text-rose dark:hover:text-gold'
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Pricing, Blog, Contact */}
          {['Pricing', 'Blog', 'Contact'].map((label, i) => {
            const to = `/${label.toLowerCase()}`
            return (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `text-3xl font-serif italic transition ${
                    isActive ? 'text-rose dark:text-gold' : 'text-plum dark:text-ivory hover:text-rose dark:hover:text-gold'
                  }`
                }
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: `${(i + 2) * 50}ms` }}
              >
                {label}
              </NavLink>
            )
          })}

          <button
            onClick={handleStartPlanning}
            className="mt-4 flex items-center gap-2 bg-plum dark:bg-gold text-ivory dark:text-plum px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-rose dark:hover:bg-gold/80 transition-colors"
          >
            <Sparkles size={15} aria-hidden="true" />
            Start Planning
          </button>
        </nav>
      </div>
    </>
  )
}
