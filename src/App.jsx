import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

const Home          = lazy(() => import('./pages/Home'))
const Vendors       = lazy(() => import('./pages/Vendors'))
const VendorProfile = lazy(() => import('./pages/VendorProfile'))
const Venues        = lazy(() => import('./pages/Venues'))
const VenueProfile  = lazy(() => import('./pages/VenueProfile'))
const Pricing       = lazy(() => import('./pages/Pricing'))
const Inspiration   = lazy(() => import('./pages/Inspiration'))
const Blog          = lazy(() => import('./pages/Blog'))
const BlogPost      = lazy(() => import('./pages/BlogPost'))
const About         = lazy(() => import('./pages/About'))
const Contact       = lazy(() => import('./pages/Contact'))
const FAQs          = lazy(() => import('./pages/FAQs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const NotFound      = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center" role="status" aria-label="Loading">
      <img src="/logo.svg" alt="Loading Harusi Planners" className="h-10 w-auto opacity-20 animate-pulse" />
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
            <Route path="/"                  element={<Home />} />
            <Route path="/vendors"           element={<Vendors />} />
            <Route path="/vendors/:slug"     element={<VendorProfile />} />
            <Route path="/venues"            element={<Venues />} />
            <Route path="/venues/:slug"      element={<VenueProfile />} />
            <Route path="/pricing"           element={<Pricing />} />
            <Route path="/inspiration"       element={<Inspiration />} />
            <Route path="/blog"              element={<Blog />} />
            <Route path="/blog/:slug"        element={<BlogPost />} />
            <Route path="/about"             element={<About />} />
            <Route path="/contact"           element={<Contact />} />
            <Route path="/faqs"              element={<FAQs />} />
            <Route path="/privacy"           element={<PrivacyPolicy />} />
            <Route path="/terms"             element={<TermsOfService />} />
            <Route path="*"                  element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </HelmetProvider>
  )
}
