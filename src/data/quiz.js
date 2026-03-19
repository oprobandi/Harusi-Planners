// ─── Quiz data & recommendation engine ────────────────────────────────────

export const QUIZ_STEPS = [
  {
    id: 'landscape',
    question: "What's your preferred wedding landscape?",
    options: [
      { emoji: '🌊', label: 'Coastal Serenity',   description: 'Beachfront elegance in Mombasa or Diani.' },
      { emoji: '🌲', label: 'Garden Romance',      description: 'Lush lawns and floral blooms in Karen.' },
      { emoji: '🏢', label: 'City Chic',           description: 'Sophisticated rooftop vibes in Westlands.' },
      { emoji: '🦁', label: 'Wilderness Luxury',   description: 'Boutique safari elegance in the Mara.' },
      { emoji: '🎋', label: 'Cultural Heritage',   description: 'Honouring tradition — ruracio, nikah, church.' },
    ],
  },
  {
    id: 'size',
    question: 'How many guests are you imagining?',
    options: [
      { emoji: '💏', label: 'Intimate',     description: 'Under 50 — close family & friends only.' },
      { emoji: '👥', label: 'Medium',       description: '50–150 guests — the sweet spot.' },
      { emoji: '🎉', label: 'Grand',        description: '150–300 guests — a true celebration.' },
      { emoji: '👑', label: 'Extravagant',  description: '300+ guests — no limits.' },
    ],
  },
  {
    id: 'style',
    question: 'Which aesthetic speaks to your heart?',
    options: [
      { emoji: '🌸', label: 'Romantic Florals',   description: 'Overflowing blooms, soft pinks & greens.' },
      { emoji: '✨', label: 'Luxury Modern',       description: 'Gold accents, clean lines, dramatic lighting.' },
      { emoji: '🌿', label: 'Boho Organic',        description: 'Natural textures, earth tones, wildflowers.' },
      { emoji: '🏛️', label: 'Classic Elegance',   description: 'Timeless tones, grand floral arches.' },
    ],
  },
  {
    id: 'budget',
    question: "What's your approximate wedding budget?",
    options: [
      { emoji: '💵', label: 'Under KSh 500k',    description: 'Tight & beautiful — we love a challenge.' },
      { emoji: '💰', label: 'KSh 500k – 1.5M',   description: 'A comfortable mid-range celebration.' },
      { emoji: '💎', label: 'KSh 1.5M – 3M',     description: 'Premium vendors & venues.' },
      { emoji: '🚀', label: 'KSh 3M+',           description: 'No limits — spare no expense.' },
    ],
  },
  {
    id: 'timeline',
    question: 'When is the big day?',
    options: [
      { emoji: '⚡', label: 'Under 3 months',  description: 'Rush planning — we can do it!' },
      { emoji: '📅', label: '3–6 months',       description: 'Enough time to do it right.' },
      { emoji: '🗓️', label: '6–12 months',     description: 'The ideal planning window.' },
      { emoji: '🌅', label: '1 year or more',  description: 'We have all the time in the world.' },
    ],
  },
]

// ─── Recommendation engine ─────────────────────────────────────────────────
// Scores each package based on landscape + size + budget answers.
// Returns the best-match package ID.

export function recommendPackage(answers) {
  const { landscape, size, budget } = answers

  // Destination always wins for Coastal + Wilderness landscapes
  if (landscape === 'Coastal Serenity' || landscape === 'Wilderness Luxury') {
    return 'safari'
  }

  // Cultural heritage → Asili
  if (landscape === 'Cultural Heritage') {
    return 'asili'
  }

  // Budget + size matrix for remaining
  const bigGuests = size === 'Grand' || size === 'Extravagant'
  const highBudget = budget === 'KSh 1.5M – 3M' || budget === 'KSh 3M+'
  const lowBudget  = budget === 'Under KSh 500k'
  const intimate   = size === 'Intimate'

  if (intimate && lowBudget)       return 'ndogo'
  if (bigGuests && highBudget)     return 'kubwa'
  if (highBudget || bigGuests)     return 'kati'
  if (lowBudget)                   return 'ndogo'

  return 'kati' // default
}

// ─── Result profiles (keyed by package id) ────────────────────────────────
export const QUIZ_RESULTS = {
  ndogo: {
    title:       'An Intimate Celebration',
    description: 'Surrounded only by those who matter most — your Ndogo wedding will be personal, warm, and unforgettable.',
    venues:      ['Fuchsia Gardens, Limuru', 'The Pink Flamingo, Westlands', 'Private Home Venue, Karen'],
    package:     'Ndogo',
    packageId:   'ndogo',
  },
  asili: {
    title:       'A Heritage Celebration',
    description: 'Honouring the traditions that shaped you while celebrating the love you\'ve built. Asili weddings are deeply meaningful.',
    venues:      ['Community Halls, Murang\'a', 'Cultural Centres, Kisumu', 'Church Grounds, Nakuru'],
    package:     'Asili',
    packageId:   'asili',
  },
  kati: {
    title:       'The Perfect Garden Affair',
    description: 'The sweet spot of scope and style — enough guests to fill the dance floor, elegant enough to take your breath away.',
    venues:      ['Karen Country Club', 'Lukenya Getaway', 'Hemingways Nairobi'],
    package:     'Kati',
    packageId:   'kati',
  },
  kubwa: {
    title:       'A Grand Luxury Celebration',
    description: 'A true occasion. Every detail elevated, every guest delighted, every moment documented for generations.',
    venues:      ['Kempinski Villa Rosa', 'Serena Hotel Nairobi', 'Windsor Golf & Country Club'],
    package:     'Kubwa',
    packageId:   'kubwa',
  },
  safari: {
    title:       'A Destination Dream Wedding',
    description: 'The African continent as your backdrop — from the Mara plains to the Indian Ocean shores. Pure, unforgettable magic.',
    venues:      ['Angama Mara', 'Leopard Beach Resort, Diani', 'The Majlis, Lamu'],
    package:     'Safari & Shores',
    packageId:   'safari',
  },
}
