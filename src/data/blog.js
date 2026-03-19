// ─── Blog Data ────────────────────────────────────────────────────────────────
// Static post data. Each post has a content array of typed blocks for
// structured rendering. Easy to migrate to Sanity: replace this file with
// a fetch() call and the page components stay unchanged.
//
// Block types: 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote'

export const BLOG_CATEGORIES = [
  'All',
  'Wedding Planning Tips',
  'Vendor Spotlights',
  'Real Wedding Stories',
  'East Africa Trends',
  'Budget & Finance',
]

export const POSTS = [
  // ── 1 ─────────────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: 'how-to-plan-your-nairobi-wedding-in-6-months',
    title: 'How to Plan Your Nairobi Wedding in 6 Months',
    category: 'Wedding Planning Tips',
    date: '2026-03-10',
    author: 'Harusi Editorial',
    readTime: '7 min read',
    excerpt:
      'Six months feels tight — and in Nairobi it is. Here is exactly how to use every week wisely, from locking the venue to the final vendor briefing.',
    coverImage:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600',
    tags: ['planning', 'nairobi', 'timeline', 'checklist'],
    content: [
      {
        type: 'paragraph',
        text: 'Six months is the minimum viable runway for a Nairobi wedding. Not comfortable — minimum. Venues at Karen Country Club, Hemingways, and the Radisson Blu book 8–12 months ahead during peak season (December–February, July–August). If you are reading this with six months on the clock, the first call you make today is to confirm venue availability.',
      },
      {
        type: 'heading',
        text: 'Month 1: Lock the Non-Negotiables',
      },
      {
        type: 'paragraph',
        text: 'Your first month is entirely about locking things that cannot move once booked. The venue determines your guest ceiling, your caterer options, and often your décor constraints. Your photographer determines the visual memory of the day — do not compromise here to save money.',
      },
      {
        type: 'list',
        items: [
          'Confirm venue and pay deposit (week 1)',
          'Book photographer and videographer (week 1–2)',
          'Set your guest list ceiling — the number that drives every other budget decision',
          'Book your caterer if the venue is not all-inclusive',
          'Begin dress shopping — lead times from Nairobi designers run 10–14 weeks',
        ],
      },
      {
        type: 'heading',
        text: 'Month 2–3: Build the Vendor Team',
      },
      {
        type: 'paragraph',
        text: 'With venue and photography locked, the pressure eases. Use months two and three to shortlist and book the rest of your vendor team. Florists and décor teams are the next most time-sensitive — the best ones in Nairobi are booked solid on Saturdays by month three of any given season.',
      },
      {
        type: 'list',
        items: [
          'Florist and décor team',
          'Band or DJ — live bands need 4+ months for custom set preparation',
          'Wedding cake designer',
          'Hair and makeup artist (book a trial in month 3)',
          'Transport and logistics',
        ],
      },
      {
        type: 'heading',
        text: 'Month 4: Stationery, Guest Management & Fittings',
      },
      {
        type: 'paragraph',
        text: 'Month four is coordination-heavy. Send save-the-dates immediately if you have upcountry or diaspora guests — Nairobi traffic alone can disrupt a Friday evening ceremony. Begin dress and suit fittings. Confirm dietary requirements with your caterer.',
      },
      {
        type: 'heading',
        text: 'Month 5: Final Confirmations',
      },
      {
        type: 'paragraph',
        text: 'Walk through every vendor contract. Confirm setup times, access arrangements, and payment schedules. Do a venue walkthrough with your décor team. This is also the month to handle the civil or church paperwork — the Registrar of Marriages in Nairobi requires at least 21 days notice.',
      },
      {
        type: 'heading',
        text: 'Month 6: The Final Stretch',
      },
      {
        type: 'paragraph',
        text: 'Final dress fitting. Final vendor briefing document — one document, every vendor, every timeline, every contact number. Delegate the day-of coordination to your planner or a trusted family coordinator so you are not the one answering vendor calls at 6am on your wedding day.',
      },
      {
        type: 'quote',
        text: 'The couples who enjoy their day are the ones who stopped managing it the night before.',
      },
    ],
  },

  // ── 2 ─────────────────────────────────────────────────────────────────────
  {
    id: 2,
    slug: 'vendor-spotlight-malaika-media',
    title: 'Vendor Spotlight: Malaika Media',
    category: 'Vendor Spotlights',
    date: '2026-03-05',
    author: 'Harusi Editorial',
    readTime: '5 min read',
    excerpt:
      'We sat down with the team behind some of Nairobi\'s most cinematic wedding films to talk about light, emotion, and what makes East African celebrations uniquely beautiful to capture.',
    coverImage:
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1600',
    tags: ['photography', 'videography', 'vendor spotlight', 'nairobi'],
    content: [
      {
        type: 'paragraph',
        text: 'Malaika Media has been documenting East African weddings for over eight years. What started as a one-person photography operation in Westlands has grown into a full-service photo and film studio with a team of seven, covering weddings from the Maasai Mara to Diani Beach.',
      },
      {
        type: 'heading',
        text: 'The Malaika Approach',
      },
      {
        type: 'paragraph',
        text: 'The studio\'s signature is what they call "earned moments" — candid frames captured not by chance but by anticipation. Their team studies the schedule, the family dynamics, and the light conditions before the day begins. The result is a gallery that feels spontaneous but is actually the product of careful preparation.',
      },
      {
        type: 'quote',
        text: 'A Kenyan wedding has layers that a Western wedding simply does not — the ruracio, the colour, the aunties who will dance regardless of the photographer. Our job is to honour all of it.',
      },
      {
        type: 'heading',
        text: 'What Couples Should Know',
      },
      {
        type: 'list',
        items: [
          'Book at least 6 months ahead for peak season dates (December, July–August)',
          'The golden hour shoot is included in all packages — plan your schedule around it',
          'Drone coverage is available for outdoor venues with prior permission',
          'Film deliverables take 8–10 weeks; photo galleries are ready in 3–4 weeks',
          'Engagement shoots are available and strongly recommended for camera-shy couples',
        ],
      },
      {
        type: 'heading',
        text: 'Pricing',
      },
      {
        type: 'paragraph',
        text: 'Photography packages start from KSh 85,000 for a single-day coverage. Combined photo and film packages start from KSh 150,000. All packages include a private online gallery and high-resolution digital files with full print rights.',
      },
    ],
  },

  // ── 3 ─────────────────────────────────────────────────────────────────────
  {
    id: 3,
    slug: 'amina-and-davids-karen-garden-wedding',
    title: "Amina & David's Karen Garden Wedding",
    category: 'Real Wedding Stories',
    date: '2026-02-28',
    author: 'Harusi Editorial',
    readTime: '6 min read',
    excerpt:
      'A March afternoon at Karen Country Club, 180 guests, and a colour palette of ivory, sage and deep rose. Here is how it all came together.',
    coverImage:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600',
    tags: ['real wedding', 'karen', 'garden wedding', 'nairobi'],
    content: [
      {
        type: 'paragraph',
        text: 'Amina and David met at a mutual friend\'s dinner party in Kilimani in 2022. Three years later, they chose Karen Country Club for their ceremony and reception — a venue that matched Amina\'s vision of a lush, garden setting with the gravitas the occasion deserved.',
      },
      {
        type: 'heading',
        text: 'The Vision',
      },
      {
        type: 'paragraph',
        text: 'Amina came to us with a clear brief: ivory and sage with deep rose accents, no synthetic flowers, and a reception that felt like an elegant garden party rather than a formal banquet. The challenge was delivering that feeling for 180 guests without the setting feeling sparse.',
      },
      {
        type: 'heading',
        text: 'The Vendor Team',
      },
      {
        type: 'list',
        items: [
          'Photography & Film: Malaika Media',
          'Florals & Décor: Bloom Wild Kenya',
          'Catering: Karen Country Club in-house',
          'Cake: Pastry Lab Nairobi (three-tier fig and honey)',
          'Music: Serenade Live Band, acoustic set during ceremony',
          'Hair & Makeup: Studio Zuri, Westlands',
        ],
      },
      {
        type: 'heading',
        text: 'The Day',
      },
      {
        type: 'paragraph',
        text: 'The ceremony took place on the club\'s garden terrace at 3pm, catching the soft afternoon light that Karen is known for in March. Bloom Wild had installed a 12-metre floral arch of white ranunculus, sage eucalyptus, and deep rose garden roses — a structure that took their team two full days to construct on site.',
      },
      {
        type: 'paragraph',
        text: 'Dinner followed inside the main hall, which had been transformed with hanging florals, candlelight, and long banquet tables replacing the club\'s standard round configurations. Serenade\'s band played a full set through dinner and into the first dances.',
      },
      {
        type: 'quote',
        text: 'We did not have to think about a single thing on the day. Every decision had been made weeks earlier. We just arrived and enjoyed it.',
        author: 'Amina K.',
      },
      {
        type: 'heading',
        text: 'Package Used',
      },
      {
        type: 'paragraph',
        text: 'Amina and David worked with us on the Kati package, with add-ons for the floral arch installation and extended photography coverage for the ruracio the day before.',
      },
    ],
  },

  // ── 4 ─────────────────────────────────────────────────────────────────────
  {
    id: 4,
    slug: '2026-east-africa-wedding-trends',
    title: '2026 East Africa Wedding Trends',
    category: 'East Africa Trends',
    date: '2026-02-14',
    author: 'Harusi Editorial',
    readTime: '8 min read',
    excerpt:
      'From micro-weddings in the Mara to maximalist Swahili coast receptions, here is what East African couples are choosing in 2026 — and why.',
    coverImage:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600',
    tags: ['trends', '2026', 'east africa', 'style'],
    content: [
      {
        type: 'paragraph',
        text: 'We looked at 200+ enquiries and 80 confirmed bookings from January through March 2026 to identify the patterns shaping this year\'s weddings across Kenya, Tanzania, and Uganda. Some trends are continuations. Others are genuinely new.',
      },
      {
        type: 'heading',
        text: '1. The Intimate Luxury Wedding',
      },
      {
        type: 'paragraph',
        text: 'Guest lists are shrinking while per-head spend is rising. Couples are choosing 60–80 guests over 200, redirecting the savings into better food, better photography, and destination venues. The Angama Mara, Segera Retreat, and Sirikoi Lodge in Laikipia are fully booked every weekend through August.',
      },
      {
        type: 'heading',
        text: '2. Cultural Ceremony Integration',
      },
      {
        type: 'paragraph',
        text: 'The ruracio and white wedding are increasingly designed as a single, cohesive event rather than two separate occasions. Couples are working with planners to create visual and tonal consistency across both days — shared colour palettes, the same photographer, and printed programmes that explain the cultural elements to non-Kikuyu or non-Luo guests.',
      },
      {
        type: 'heading',
        text: '3. Local Florals Over Imported Stems',
      },
      {
        type: 'paragraph',
        text: 'Kenya is the world\'s third largest flower exporter, yet imported European roses have dominated wedding florals for years. In 2026, leading florists like Bloom Wild and Petal & Vine are seeing couples actively request Kenyan-grown varieties — local roses from Naivasha, protea from the highlands, tropical foliage from the coast.',
      },
      {
        type: 'heading',
        text: '4. Honest Catering',
      },
      {
        type: 'paragraph',
        text: 'The era of the generic buffet is ending. Couples are commissioning menus that reflect their families\' actual food cultures — Coastal Swahili spreads, Nyama Choma stations, Ugandan rolex bars, Ethiopian injera corners. Guests are noticing, and they are talking about it.',
      },
      {
        type: 'heading',
        text: '5. The Unplugged Ceremony',
      },
      {
        type: 'paragraph',
        text: 'More couples are asking guests to put phones away for the ceremony and trust the professional photographer. The result in the room is noticeably different — guests are present, emotional, and not blocking sightlines with iPad cameras.',
      },
      {
        type: 'list',
        items: [
          'Trending venues: Angama Mara, Segera Retreat, Leopard Beach, Ololo Safari Lodge',
          'Trending florals: Local Naivasha roses, protea, bird of paradise, tropical foliage',
          'Trending palettes: Terracotta + ivory, sage + warm gold, deep plum + blush',
          'Trending food: Coastal Swahili spreads, live Nyama Choma stations',
          'Trending music: Afrobeats reception sets, acoustic Benga during cocktail hour',
        ],
      },
    ],
  },

  // ── 5 ─────────────────────────────────────────────────────────────────────
  {
    id: 5,
    slug: 'how-much-does-a-wedding-cost-in-kenya-2026',
    title: 'How Much Does a Wedding Cost in Kenya? (2026)',
    category: 'Budget & Finance',
    date: '2026-02-01',
    author: 'Harusi Editorial',
    readTime: '9 min read',
    excerpt:
      'Real numbers from real weddings. We break down what couples in Kenya are actually spending in 2026 across five budget tiers — and where the money goes.',
    coverImage:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600',
    tags: ['budget', 'cost', 'kenya', 'planning', 'finance'],
    content: [
      {
        type: 'paragraph',
        text: 'The most common question we receive from newly engaged couples is: "How much will this cost?" The honest answer is: it depends on four variables — guest count, venue tier, location (Nairobi vs. outside), and how much you choose to do yourself. Here are the real numbers.',
      },
      {
        type: 'heading',
        text: 'The Five Budget Tiers',
      },
      {
        type: 'list',
        items: [
          'Budget (under KSh 500,000) — Home or church venue, 50 guests, DIY décor, family catering',
          'Mid-range (KSh 500k–1.5M) — Garden hotel, 150 guests, professional photography, catering',
          'Upper mid (KSh 1.5M–3M) — Premium hotel or private estate, 200 guests, full vendor team',
          'Luxury (KSh 3M–6M) — 5-star venue, 300 guests, premium everything, dedicated planner',
          'Ultra (KSh 6M+) — Destination venue, bespoke everything, multi-day events',
        ],
      },
      {
        type: 'heading',
        text: 'Where the Money Goes',
      },
      {
        type: 'paragraph',
        text: 'Across all tiers, catering and venue hire consistently account for 50–60% of total spend. This surprises couples who assume photography is the biggest cost. It is not — but it is the most visible after the day, which is why we recommend protecting the photography budget above almost everything else.',
      },
      {
        type: 'heading',
        text: 'The Planner Fee Question',
      },
      {
        type: 'paragraph',
        text: 'A professional wedding planner charges 8–12% of total budget. On a KSh 2M wedding, that is KSh 160,000–240,000. Couples consistently report that the planner fee pays for itself in vendor negotiations, avoided mistakes, and the ability to actually enjoy their day rather than coordinate it.',
      },
      {
        type: 'quote',
        text: 'We saved more than the planner\'s fee just on the catering negotiation alone. We had no idea we could negotiate.',
        author: 'Wanjiru N., Kubwa Package',
      },
      {
        type: 'heading',
        text: 'The Contingency Line',
      },
      {
        type: 'paragraph',
        text: 'Always budget 10% contingency. Not because things go wrong — they rarely do with a good team — but because your preferences will change between booking and the day, and change costs money. Couples who build in contingency finish the day without financial stress.',
      },
      {
        type: 'heading',
        text: 'Use Our Free Estimator',
      },
      {
        type: 'paragraph',
        text: 'Our Budget Estimator on the Pricing page uses 2026 Kenya market data to give you a real breakdown by category. Adjust guest count, tier, and location — it updates in real time.',
      },
    ],
  },

  // ── 6 ─────────────────────────────────────────────────────────────────────
  {
    id: 6,
    slug: 'the-ultimate-kenyan-wedding-checklist',
    title: 'The Ultimate Kenyan Wedding Checklist',
    category: 'Wedding Planning Tips',
    date: '2026-01-20',
    author: 'Harusi Editorial',
    readTime: '6 min read',
    excerpt:
      'Every task, every timeline, organised by month. Save this — it is the checklist we give every couple who books with us.',
    coverImage:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1600',
    tags: ['checklist', 'planning', 'kenya', 'timeline'],
    content: [
      {
        type: 'paragraph',
        text: 'This is the master checklist we hand to every couple on their first planning call. It is built from 12 years of Kenya weddings — the tasks that matter, in the order they matter, without the filler that most checklists pad themselves with.',
      },
      {
        type: 'heading',
        text: '12+ Months Out',
      },
      {
        type: 'list',
        items: [
          'Set your total budget and who is contributing what',
          'Draft your guest list — this determines everything else',
          'Research and visit venues',
          'Book your venue and pay deposit',
          'Hire your wedding planner',
          'Begin bridal wear research',
        ],
      },
      {
        type: 'heading',
        text: '9–12 Months Out',
      },
      {
        type: 'list',
        items: [
          'Book photographer and videographer',
          'Book florist and décor team',
          'Book band or DJ',
          'Book caterer (if not venue-inclusive)',
          'Send save-the-dates to diaspora and upcountry guests',
          'Begin dress shopping and designer consultations',
        ],
      },
      {
        type: 'heading',
        text: '6–9 Months Out',
      },
      {
        type: 'list',
        items: [
          'Book cake designer',
          'Book hair and makeup artist; schedule trial',
          'Book transport',
          'Confirm all vendor contracts and payment schedules',
          'Begin honeymoon research',
        ],
      },
      {
        type: 'heading',
        text: '3–6 Months Out',
      },
      {
        type: 'list',
        items: [
          'Send formal invitations (8 weeks minimum before the date)',
          'Confirm dietary requirements with caterer',
          'First dress fitting',
          'Handle civil or church paperwork (Registrar requires 21 days notice)',
          'Book honeymoon',
          'Create wedding-day timeline with your planner',
        ],
      },
      {
        type: 'heading',
        text: '1 Month Out',
      },
      {
        type: 'list',
        items: [
          'Final dress fitting',
          'Final vendor briefing document — all contacts, all timelines',
          'Confirm guest numbers with caterer',
          'Prepare payments and envelopes for vendors',
          'Delegate day-of tasks — you should not be coordinating on the day',
        ],
      },
      {
        type: 'heading',
        text: 'The Week Before',
      },
      {
        type: 'list',
        items: [
          'Venue walkthrough with décor team',
          'Rehearsal (if applicable)',
          'Confirm all vendor arrival times',
          'Hand over the day-of briefing document to your planner',
          'Rest',
        ],
      },
    ],
  },

  // ── 7 ─────────────────────────────────────────────────────────────────────
  {
    id: 7,
    slug: 'coast-vs-nairobi-choosing-your-wedding-destination',
    title: 'Coast vs Nairobi: Choosing Your Wedding Destination',
    category: 'East Africa Trends',
    date: '2026-01-08',
    author: 'Harusi Editorial',
    readTime: '7 min read',
    excerpt:
      'The two most popular wedding destinations in Kenya offer completely different experiences. Here is how to choose — and what nobody tells you about each.',
    coverImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600',
    tags: ['coast', 'nairobi', 'destination', 'venue', 'kenya'],
    content: [
      {
        type: 'paragraph',
        text: 'Nairobi and the Kenyan Coast are separated by a 45-minute flight and a completely different wedding experience. Choosing between them is not just about aesthetics — it is a logistical, financial, and guest-experience decision.',
      },
      {
        type: 'heading',
        text: 'The Case for Nairobi',
      },
      {
        type: 'paragraph',
        text: 'Nairobi is where your vendors live. Your photographer, your florist, your band — they are all based here, which means lower travel costs, easier site visits, and a vendor team that knows the venues intimately. The city also has the widest range of catering options, from 5-star hotel kitchens to specialist cultural caterers.',
      },
      {
        type: 'list',
        items: [
          'Easier vendor logistics — no travel, accommodation, or per-diem costs',
          'Wider venue range from garden estates to hotel ballrooms to private farms',
          'Most of your guests are likely based here',
          'Cooler temperatures — comfortable for formal attire',
          'Year-round availability outside rainy seasons (April–May, October–November)',
        ],
      },
      {
        type: 'heading',
        text: 'The Case for the Coast',
      },
      {
        type: 'paragraph',
        text: 'A coast wedding offers something Nairobi cannot: the Indian Ocean as your backdrop. Leopard Beach, Diani Reef, Pinewood Beach, and the boutique properties around Watamu deliver an experience that photographs in a way that Nairobi venues simply do not. The trade-off is logistics.',
      },
      {
        type: 'list',
        items: [
          'Unmatched visual setting — beach, ocean, tropical gardens',
          'Natural light that is harder to replicate in Nairobi',
          'Destination-feel that makes the event a full experience for guests',
          'All vendors must travel from Nairobi — add KSh 80,000–200,000 for vendor logistics',
          'Guests need accommodation — budget for this or negotiate group rates',
          'Best months: December–March (dry season)',
        ],
      },
      {
        type: 'heading',
        text: 'The Real Question',
      },
      {
        type: 'paragraph',
        text: 'The coast makes sense when: you have a guest list under 120, you are comfortable with vendor travel costs, and the visual experience is the primary driver. Nairobi makes sense when: your guest list is large, your family is based here, and you want maximum vendor choice.',
      },
      {
        type: 'quote',
        text: 'We wanted our guests to feel like they had gone somewhere. The coast delivered that. But plan for the logistics — they are real.',
        author: 'Fatuma & James M., Leopard Beach',
      },
    ],
  },

  // ── 8 ─────────────────────────────────────────────────────────────────────
  {
    id: 8,
    slug: 'getting-the-most-from-your-wedding-budget',
    title: 'Getting the Most from Your Wedding Budget',
    category: 'Budget & Finance',
    date: '2025-12-30',
    author: 'Harusi Editorial',
    readTime: '6 min read',
    excerpt:
      'Where to spend, where to save, and the five budget mistakes Kenyan couples make most often — from planners who have seen it all.',
    coverImage:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1600',
    tags: ['budget', 'finance', 'tips', 'saving', 'kenya'],
    content: [
      {
        type: 'paragraph',
        text: 'After planning over 2,400 weddings in East Africa, we have seen every budget decision that works and every one that does not. Here is the honest guide — where the money creates lasting value and where it simply disappears.',
      },
      {
        type: 'heading',
        text: 'Where to Spend',
      },
      {
        type: 'list',
        items: [
          'Photography — you will look at these images every year for the rest of your life',
          'Food and drink — your guests will remember how they were fed above almost everything else',
          'The venue — it sets the ceiling of every other aesthetic decision',
          'Music — a bad band or DJ can genuinely ruin a reception atmosphere',
          'Your planner — the fee pays for itself in negotiations and avoided mistakes',
        ],
      },
      {
        type: 'heading',
        text: 'Where to Save',
      },
      {
        type: 'list',
        items: [
          'Elaborate stationery — most guests will not keep the invitation',
          'Favours — most end up left on tables',
          'Elaborate floral centrepieces on every table — focus budget on the ceremony arch and head table',
          'Luxury transport for the full day — just the ceremony arrival and departure',
          'The cake as a budget item — a beautiful cake is worth it, but the cost does not need to scale with guest count',
        ],
      },
      {
        type: 'heading',
        text: 'The Five Most Common Budget Mistakes',
      },
      {
        type: 'list',
        items: [
          'No contingency line — when preferences change (they always do), there is no buffer',
          'Underestimating catering — per-head costs compound fast with guest list creep',
          'Booking cheap photography to save money — then regretting it every time the album is opened',
          'Paying vendors in full upfront — always pay a deposit then balance on completion',
          'Forgetting the "day after" costs — accommodation, brunch hosting, coordinator gratuities',
        ],
      },
      {
        type: 'quote',
        text: 'The best wedding is not the most expensive one. It is the one where every shilling was spent intentionally.',
      },
      {
        type: 'heading',
        text: 'The Negotiation Nobody Talks About',
      },
      {
        type: 'paragraph',
        text: 'Almost every vendor in Nairobi will negotiate on price for off-peak dates — January, February, March, June, September, November. If your date is flexible, choosing a Wednesday or Thursday over a Saturday can reduce venue and catering costs by 15–25%. This is one of the most underused levers in Kenyan wedding budgeting.',
      },
    ],
  },
]
