import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Vendors from './pages/Vendors'
import Pricing from './pages/Pricing'
import Inspiration from './pages/Inspiration'

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
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/vendors"     element={<Vendors />} />
          <Route path="/pricing"     element={<Pricing />} />
          <Route path="/inspiration" element={<Inspiration />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </HelmetProvider>
  )
}
