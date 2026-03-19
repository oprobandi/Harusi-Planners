import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Head back to Harusi Planners."
        path="/404"
      />

      <section className="min-h-screen bg-ivory dark:bg-dark-bg flex items-center justify-center px-6">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blush/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-xl">
          {/* Large decorative number */}
          <p className="text-[160px] md:text-[220px] font-serif font-bold leading-none text-plum/5 dark:text-ivory/5 select-none">
            404
          </p>

          {/* Content overlaid on number */}
          <div className="-mt-16 md:-mt-24 relative">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-rose/60 mb-4">
              Lost in Translation
            </p>
            <h1 className="text-4xl md:text-5xl font-serif italic text-plum dark:text-ivory mb-5 leading-tight">
              This page doesn't exist.
            </h1>
            <p className="text-plum/50 dark:text-ivory/50 text-base mb-10 leading-relaxed max-w-sm mx-auto">
              The page you're looking for has wandered off. Let's get you back to planning the perfect day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-plum transition"
              >
                Back to Home
              </Link>
              <Link
                to="/vendors"
                className="border-2 border-rose/40 text-rose px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-rose hover:text-white transition"
              >
                Browse Vendors
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-12 pt-8 border-t border-plum/10 flex flex-wrap justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-plum/30">
              <Link to="/pricing"     className="hover:text-rose transition">Pricing</Link>
              <Link to="/inspiration" className="hover:text-rose transition">Real Weddings</Link>
              <Link to="/#quiz"       className="hover:text-rose transition">Style Quiz</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
