// ─── Vercel Serverless Function: /api/subscribe ───────────────────────────
// Proxies newsletter + quiz email captures to Mailchimp.
// Runs server-side so MAILCHIMP_API_KEY is never exposed in the browser bundle.
//
// Environment variables required (set in Vercel dashboard):
//   MAILCHIMP_API_KEY      — from mailchimp.com → Account → Extras → API Keys
//   MAILCHIMP_LIST_ID      — from Audience → Settings → Audience name & defaults
//   MAILCHIMP_SERVER_PREFIX — the prefix in your API key, e.g. "us21"
//
// Expected request body (JSON):
//   { email: string, name?: string, source?: 'newsletter' | 'quiz' }

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name = '', source = 'newsletter' } = req.body ?? {}

  // ── Validate ──────────────────────────────────────────────────────────────
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email address is required.' })
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRx.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  // ── Env vars ──────────────────────────────────────────────────────────────
  const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER_PREFIX } = process.env

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.error('Missing Mailchimp environment variables')
    return res.status(500).json({ error: 'Server configuration error. Please contact support.' })
  }

  // ── Split name into FNAME / LNAME for Mailchimp merge fields ─────────────
  const nameParts = name.trim().split(' ')
  const firstName  = nameParts[0] ?? ''
  const lastName   = nameParts.slice(1).join(' ') ?? ''

  // ── Tags — differentiate quiz leads from newsletter subscribers ───────────
  const tags = source === 'quiz'
    ? ['quiz-lead', 'website']
    : ['newsletter', 'website']

  // ── Call Mailchimp API ────────────────────────────────────────────────────
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`

  try {
    const mcRes = await fetch(url, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        // Mailchimp uses HTTP Basic Auth — username is arbitrary, password is API key
        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: email.trim().toLowerCase(),
        status:        'pending',             // double opt-in — subscriber confirms via email
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        tags,
      }),
    })

    const data = await mcRes.json()

    // Mailchimp returns 200 for new subscribers, 400 if already subscribed
    if (mcRes.ok) {
      return res.status(200).json({ success: true, message: 'Subscribed successfully.' })
    }

    // Already subscribed — treat as success (don't alarm the user)
    if (data.title === 'Member Exists') {
      return res.status(200).json({ success: true, message: "You're already on our list!" })
    }

    // Other Mailchimp error
    console.error('Mailchimp error:', data)
    return res.status(400).json({ error: data.detail ?? 'Subscription failed. Please try again.' })

  } catch (err) {
    console.error('Mailchimp fetch error:', err)
    return res.status(500).json({ error: 'Network error. Please try again later.' })
  }
}
