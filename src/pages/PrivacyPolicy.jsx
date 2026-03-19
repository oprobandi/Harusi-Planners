import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

// ── Reusable prose components ────────────────────────────────────────────────

function Section({ eyebrow, heading, children }) {
  return (
    <section className="mb-14">
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-2">{eyebrow}</p>
      )}
      {heading && (
        <h2 className="text-2xl font-serif text-plum dark:text-ivory mb-5">{heading}</h2>
      )}
      <div className="space-y-4 text-plum/70 dark:text-ivory/60 leading-relaxed text-sm">
        {children}
      </div>
    </section>
  )
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-plum/10 dark:border-dark-border">
            {headers.map(h => (
              <th key={h} className="text-left py-3 pr-6 text-[10px] uppercase tracking-widest font-bold text-plum/40 dark:text-ivory/40">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-plum/5 dark:border-dark-border/50">
              {row.map((cell, j) => (
                <td key={j} className="py-3 pr-6 text-plum/70 dark:text-ivory/60 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RightsList({ items }) {
  return (
    <ul className="space-y-3 mt-2">
      {items.map(({ right, desc }) => (
        <li key={right} className="flex gap-3">
          <span className="w-2 h-2 rounded-full bg-rose shrink-0 mt-1.5" aria-hidden="true" />
          <span><strong className="text-plum dark:text-ivory font-semibold">{right}</strong> — {desc}</span>
        </li>
      ))}
    </ul>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="How Harusi Planners collects, uses, and protects your personal data under the Kenya Data Protection Act, 2019."
        path="/privacy"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-plum dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blush/10 blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60 mb-4">Legal</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white italic mb-6">Privacy Policy</h1>
          <p className="text-white/50 text-sm">
            Effective date: 20 March 2026 &nbsp;·&nbsp; Last updated: 20 March 2026
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="bg-ivory dark:bg-dark-bg py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <Section eyebrow="1. Who We Are">
            <p>
              Harusi Planners is an online wedding planning platform operated by{' '}
              <strong className="text-plum dark:text-ivory">NeuroSpark Corporation</strong>, a company
              incorporated and registered in Kenya. We connect couples planning weddings across East Africa
              with curated vendors, venues, and planning tools.
            </p>
            <p>
              When this policy says "Harusi Planners", "we", "us", or "our", it means NeuroSpark
              Corporation operating the Harusi Planners platform.
            </p>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-blush/20 dark:border-dark-border mt-4 space-y-1 text-sm">
              <p><strong className="text-plum dark:text-ivory">Email:</strong> hello@harusihub.com</p>
              <p><strong className="text-plum dark:text-ivory">Location:</strong> Nairobi, Kenya</p>
              <p>
                <strong className="text-plum dark:text-ivory">Contact:</strong>{' '}
                <Link to="/contact" className="text-rose hover:text-plum transition">harusi-planners.vercel.app/contact</Link>
              </p>
            </div>
          </Section>

          <Section eyebrow="2. Legal Framework">
            <p>This Privacy Policy complies with:</p>
            <ul className="space-y-2 mt-2">
              {[
                'The Kenya Data Protection Act, 2019 (Act No. 24 of 2019) and its subsidiary legislation',
                'The Kenya Information and Communications Act (Cap. 411A)',
                'The Consumer Protection Act, 2012 (Act No. 46 of 2012)',
                'Regulations issued by the Office of the Data Protection Commissioner (ODPC)',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              As a data controller under the Data Protection Act, 2019, we are responsible for determining
              how and why your personal data is processed.
            </p>
          </Section>

          <Section eyebrow="3. Information We Collect">
            <p><strong className="text-plum dark:text-ivory">Information you give us directly:</strong></p>
            <Table
              headers={['Information', 'How it is collected']}
              rows={[
                ['Full name', 'Newsletter signup, quiz, or contact form'],
                ['Email address', 'Newsletter signup, quiz, or contact form'],
                ['Wedding enquiry details', 'Contact form'],
                ['WhatsApp number', 'Only when you initiate a WhatsApp conversation with us'],
              ]}
            />
            <p><strong className="text-plum dark:text-ivory">Information collected automatically:</strong></p>
            <p>
              When you visit our website, we may collect browser type, pages visited, referring website,
              device type, and general geographic region (country/city level — not precise location).
              We do <strong className="text-plum dark:text-ivory">not</strong> use cookies for advertising
              or cross-site tracking.
            </p>
            <p><strong className="text-plum dark:text-ivory">Information we do not collect:</strong></p>
            <p>
              We do not collect National ID or passport numbers, payment card details (we process no
              payments on this platform), biometric data, or sensitive personal data as defined under
              Section 2 of the Data Protection Act, 2019, unless you voluntarily provide it in a
              free-text message.
            </p>
          </Section>

          <Section eyebrow="4. How We Use Your Information">
            <Table
              headers={['Purpose', 'Lawful Basis']}
              rows={[
                ['Sending the newsletter you subscribed to', 'Consent'],
                ['Responding to your contact or enquiry form', 'Legitimate interest / Consent'],
                ['Improving the platform based on usage patterns', 'Legitimate interest'],
                ['Complying with legal obligations', 'Legal obligation'],
              ]}
            />
            <p>
              We will <strong className="text-plum dark:text-ivory">never</strong> sell, rent, or trade
              your personal data to third parties for marketing purposes.
            </p>
          </Section>

          <Section eyebrow="5. Newsletter & Email Communications">
            <p>If you subscribe to the Harusi Planners newsletter:</p>
            <ul className="space-y-2 mt-2">
              <li className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-rose shrink-0 mt-1.5" aria-hidden="true" />
                <span>
                  You will receive a <strong className="text-plum dark:text-ivory">confirmation email</strong>{' '}
                  before being added to our list (double opt-in). Adding your email to the form does not
                  mean you have been subscribed — you must confirm via the email sent to you.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-rose shrink-0 mt-1.5" aria-hidden="true" />
                <span>
                  You may <strong className="text-plum dark:text-ivory">unsubscribe at any time</strong>{' '}
                  by clicking the unsubscribe link in any newsletter email.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-rose shrink-0 mt-1.5" aria-hidden="true" />
                <span>
                  We use <strong className="text-plum dark:text-ivory">Mailchimp</strong> to manage our
                  mailing list. Your email address and name are stored on Mailchimp's servers in the United
                  States. You may review Mailchimp's privacy policy at{' '}
                  <a href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noopener noreferrer"
                    className="text-rose hover:text-plum transition">mailchimp.com/legal/privacy</a>.
                </span>
              </li>
            </ul>
          </Section>

          <Section eyebrow="6. Third-Party Services">
            <Table
              headers={['Service', 'Purpose', 'Data shared']}
              rows={[
                ['Vercel Inc.', 'Website hosting', 'Server logs (IP, browser, pages visited)'],
                ['Mailchimp', 'Newsletter distribution', 'Name, email address'],
                ['WhatsApp (Meta)', 'Customer communication', 'Phone number, conversation content'],
                ['Unsplash Inc.', 'Stock photography', 'No personal data'],
              ]}
            />
            <p>
              Where any of these providers are located outside Kenya, we ensure appropriate safeguards
              are in place consistent with Part V of the Data Protection Act, 2019.
            </p>
          </Section>

          <Section eyebrow="7. Vendor & Venue Listings">
            <p>
              Business names, phone numbers, social media handles, and other business contact details
              displayed on vendor and venue profiles are business contact information published in the
              context of commercial promotion.
            </p>
            <p>
              If you are a vendor or venue owner and wish to update or remove your listing, contact us
              at <strong className="text-plum dark:text-ivory">hello@harusihub.com</strong> and we will
              action your request promptly.
            </p>
          </Section>

          <Section eyebrow="8. Data Retention">
            <Table
              headers={['Data type', 'Retention period']}
              rows={[
                ['Newsletter subscriber records', 'Until you unsubscribe, then deleted within 30 days'],
                ['Contact form submissions', '12 months from receipt, then securely deleted'],
                ['Server / access logs', '90 days, then automatically purged by hosting provider'],
              ]}
            />
          </Section>

          <Section eyebrow="9. Your Rights Under the Data Protection Act, 2019">
            <p>Under the Kenya Data Protection Act, 2019, you have the following rights:</p>
            <RightsList items={[
              { right: 'Right of access',          desc: 'Request a copy of the personal data we hold about you (Section 26).' },
              { right: 'Right to rectification',   desc: 'Ask us to correct inaccurate or incomplete data (Section 27).' },
              { right: 'Right to erasure',         desc: 'Ask us to delete your data where there is no compelling reason to continue processing it (Section 28).' },
              { right: 'Right to restriction',     desc: 'Ask us to restrict processing in certain circumstances (Section 29).' },
              { right: 'Right to portability',     desc: 'Request your data in a structured, machine-readable format (Section 30).' },
              { right: 'Right to object',          desc: 'Object to processing based on legitimate interests (Section 31).' },
              { right: 'Right to withdraw consent',desc: 'Withdraw consent at any time without affecting the lawfulness of prior processing.' },
            ]} />
            <p className="mt-4">
              To exercise any of these rights, contact us at{' '}
              <strong className="text-plum dark:text-ivory">hello@harusihub.com</strong>. We will respond
              within <strong className="text-plum dark:text-ivory">21 days</strong> as required under the Act.
              We will not charge a fee unless the request is manifestly unfounded or excessive.
            </p>
            <p>
              If you are not satisfied with our response, you may lodge a complaint with the{' '}
              <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer"
                className="text-rose hover:text-plum transition">
                Office of the Data Protection Commissioner (ODPC)
              </a>.
            </p>
          </Section>

          <Section eyebrow="10. Children's Privacy">
            <p>
              Our platform is intended for adults planning weddings. We do not knowingly collect personal
              data from persons under the age of 18. If you believe we have inadvertently collected data
              from a minor, please contact us immediately at hello@harusihub.com and we will delete it promptly.
            </p>
          </Section>

          <Section eyebrow="11. Security">
            <p>
              We take reasonable technical and organisational measures to protect your personal data,
              including HTTPS encryption on all pages (TLS), restricted internal access on a
              need-to-know basis, and the use of reputable, security-certified third-party providers.
              No method of transmission over the internet is 100% secure.
            </p>
          </Section>

          <Section eyebrow="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we make material changes, we will
              update the "Last updated" date at the top of this page. Continued use of the platform after
              changes are posted constitutes acceptance of the updated policy.
            </p>
          </Section>

          {/* Contact callout */}
          <div className="bg-plum rounded-3xl p-10 text-center text-white mt-6">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60 mb-3">Questions?</p>
            <h2 className="text-2xl font-serif mb-4">We're here to help.</h2>
            <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">
              For any questions or requests relating to this Privacy Policy or your personal data,
              contact us at hello@harusihub.com or via WhatsApp.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-rose text-white px-8 py-3 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-plum transition"
            >
              Contact Us ⟶
            </Link>
          </div>

          {/* Link to Terms */}
          <p className="text-center text-sm text-plum/40 dark:text-ivory/40 mt-10">
            Also read our{' '}
            <Link to="/terms" className="text-rose hover:text-plum dark:hover:text-gold transition font-medium">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
