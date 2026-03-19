// ─── Site-wide constants ───────────────────────────────────────────────────
// All environment-sensitive values live here.
// To override, set VITE_WHATSAPP_NUMBER in your .env file.

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '254799644100'
export const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}`

export const SITE_NAME = 'Harusi Planners'
export const SITE_URL  = 'https://harusihub.com'          // update before go-live
export const SITE_DESC = "East Africa's most trusted wedding planning service. Find vendors, venues, and inspiration for the wedding of your dreams."
export const OG_IMAGE  = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200'

// Market data (2026, Nairobi baseline). Source: harusihub.com/blog, ccentricevents.co.ke
export const CATERING_PER_HEAD = { budget: 1150, mid: 2250, luxury: 5500 }  // KSh midpoints
export const OUTSIDE_NAIROBI_DISCOUNT = 0.25   // ~25% average saving
export const VAT_RATE = 0.16
