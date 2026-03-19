import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

// ── Route-based code splitting ─────────────────────────────────────────────
const Home        = lazy(() => import('./pages/Home'))
const Vendors     = lazy(() => import('./pages/Vendors'))
const Pricing     = lazy(() => import('./pages/Pricing'))
const Inspiration = lazy(() => import('./pages/Inspiration'))
const NotFound    = lazy(() => import('./pages/NotFound'))

// ── Page loading fallback ──────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      className="min-h-screen bg-ivory flex items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <div className="text-center">
        <p className="text-2xl font-serif italic text-plum/30 animate-pulse">
          Harusi.
        </p>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/vendors"     element={<Vendors />} />
            <Route path="/pricing"     element={<Pricing />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="*"            element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </HelmetProvider>
  )
}
