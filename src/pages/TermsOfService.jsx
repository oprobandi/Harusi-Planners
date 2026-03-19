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

function BulletList({ items }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="The terms governing your use of the Harusi Planners platform, operated by NeuroSpark Corporation under the laws of Kenya."
        path="/terms"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-plum dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blush/10 blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60 mb-4">Legal</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white italic mb-6">Terms of Service</h1>
          <p className="text-white/50 text-sm">
            Effective date: 20 March 2026 &nbsp;·&nbsp; Last updated: 20 March 2026
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="bg-ivory dark:bg-dark-bg py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <Section eyebrow="1. About These Terms">
            <p>
              These Terms of Service ("Terms") govern your access to and use of the Harusi Planners
              website and platform ("Platform"), operated by{' '}
              <strong className="text-plum dark:text-ivory">NeuroSpark Corporation</strong> ("we", "us",
              "our"), a company registered in Kenya.
            </p>
            <p>
              By accessing or using the Platform, you agree to be bound by these Terms. If you do not
              agree, please do not use the Platform.
            </p>
            <p>
              These Terms are governed by the laws of Kenya, including the{' '}
              <strong className="text-plum dark:text-ivory">Consumer Protection Act, 2012</strong>, the{' '}
              <strong className="text-plum dark:text-ivory">Kenya Information and Communications Act</strong>{' '}
              (Cap. 411A), and the{' '}
              <strong className="text-plum dark:text-ivory">Law of Contract Act</strong> (Cap. 23).
            </p>
          </Section>

          <Section eyebrow="2. Who May Use This Platform">
            <p>You may use the Platform if:</p>
            <BulletList items={[
              'You are at least 18 years of age; and',
              'You are accessing the Platform from Kenya or any other jurisdiction where access is not prohibited by applicable law.',
            ]} />
            <p className="mt-3">
              By using the Platform, you represent and warrant that you meet these requirements.
            </p>
          </Section>

          <Section eyebrow="3. What Harusi Planners Is">
            <p>Harusi Planners is an <strong className="text-plum dark:text-ivory">information and connection platform</strong>. We:</p>
            <BulletList items={[
              'Publish curated profiles of wedding vendors and venues across Kenya and East Africa',
              'Provide planning tools including a wedding budget estimator and style quiz',
              'Publish editorial content, pricing guidance, and inspiration resources',
              'Facilitate initial connections between couples and vendors/venues via WhatsApp',
            ]} />
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-blush/20 dark:border-dark-border mt-4">
              <p className="font-semibold text-plum dark:text-ivory mb-1">Important</p>
              <p>
                We are <strong className="text-plum dark:text-ivory">not a party to any contract or
                agreement</strong> entered into between you and any vendor, venue, or service provider
                listed on the Platform. Any booking, payment, or service agreement is made directly
                between you and the relevant vendor or venue.
              </p>
            </div>
          </Section>

          <Section eyebrow="4. Vendor & Venue Listings">
            <p><strong className="text-plum dark:text-ivory">Nature of listings.</strong> Vendor and
            venue profiles are published for information purposes. We exercise reasonable care in
            curating listings, but we do not:</p>
            <BulletList items={[
              'Guarantee the availability, quality, or suitability of any listed vendor or venue for your specific requirements',
              'Warrant the accuracy of any prices shown (all prices are starting rates and subject to change)',
              'Act as an agent for any vendor or venue',
              'Accept responsibility for the conduct, performance, or outputs of any vendor or venue',
            ]} />
            <p className="mt-4">
              <strong className="text-plum dark:text-ivory">Your relationship with vendors and venues.</strong>{' '}
              When you enquire about or engage a vendor or venue, you are entering into a direct
              contractual relationship with that party. You should conduct your own due diligence —
              reviewing contracts, requesting references, and confirming pricing in writing before
              making any payment.
            </p>
            <p>
              <strong className="text-plum dark:text-ivory">Pricing information.</strong> All prices
              displayed are indicative starting rates based on our research and vendor submissions.
              Final pricing depends on your specific requirements, date, location, and guest count.
              Harusi Planners is not liable for any discrepancy between prices shown on the Platform
              and prices quoted to you directly.
            </p>
          </Section>

          <Section eyebrow="5. Planning Tools">
            <p>
              <strong className="text-plum dark:text-ivory">Budget Estimator.</strong> The Budget
              Estimator provides estimates based on generalised 2026 Kenya market data. Output is for
              guidance only and should not be relied upon as a financial commitment or contractual
              quotation from any vendor, venue, or from Harusi Planners.
            </p>
            <p>
              <strong className="text-plum dark:text-ivory">Style Quiz.</strong> The Style Quiz
              generates package recommendations based on your responses. Recommendations are
              algorithmic and illustrative. They do not constitute professional planning advice and
              you are not obligated to act on them.
            </p>
          </Section>

          <Section eyebrow="6. Acceptable Use">
            <p>You agree not to use the Platform to:</p>
            <BulletList items={[
              'Submit false, misleading, or fraudulent information',
              'Impersonate any person or entity',
              'Transmit any content that is unlawful, defamatory, obscene, or harmful',
              'Attempt to gain unauthorised access to any part of the Platform or its underlying systems',
              'Scrape, copy, or reproduce any part of the Platform\'s content or data for commercial purposes without our prior written consent',
              'Use the Platform in a manner that violates any applicable Kenyan law or regulation, including the Computer Misuse and Cybercrimes Act, 2018',
            ]} />
          </Section>

          <Section eyebrow="7. Intellectual Property">
            <p>
              <strong className="text-plum dark:text-ivory">Our content.</strong> All text, graphics,
              logos, editorial content, data compilations, and software on the Platform are owned by or
              licensed to NeuroSpark Corporation and are protected by Kenyan and international
              intellectual property laws. You may not reproduce, distribute, or create derivative works
              without our express written permission.
            </p>
            <p>
              <strong className="text-plum dark:text-ivory">Photography.</strong> Venue and vendor
              photography is either licensed from Unsplash, provided by the respective vendor/venue,
              or owned by us. All photography rights remain with their respective owners.
            </p>
            <p>
              <strong className="text-plum dark:text-ivory">Vendor trade names.</strong> Trade names,
              logos, and marks of vendors and venues displayed on the Platform remain the property of
              their respective owners. Their appearance does not imply any endorsement beyond the
              listing relationship.
            </p>
          </Section>

          <Section eyebrow="8. Disclaimer of Warranties">
            <p>To the fullest extent permitted by Kenyan law:</p>
            <BulletList items={[
              'The Platform is provided on an "as is" and "as available" basis without warranties of any kind, express or implied',
              'We do not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components',
              'We do not warrant the accuracy, completeness, or suitability of any information on the Platform for any particular purpose',
              'Nothing on this Platform constitutes professional legal, financial, or wedding planning advice',
            ]} />
          </Section>

          <Section eyebrow="9. Limitation of Liability">
            <p>
              To the fullest extent permitted by the Consumer Protection Act, 2012 and applicable
              Kenyan law, NeuroSpark Corporation shall not be liable for:
            </p>
            <BulletList items={[
              'Any indirect, incidental, special, or consequential loss arising from your use of the Platform',
              'Any loss arising from your reliance on vendor or venue profiles, pricing information, or planning tool outputs',
              'Any loss or damage arising from the acts or omissions of any vendor or venue listed on the Platform',
              'Any loss arising from third-party services (including WhatsApp, Mailchimp, or Vercel) used in connection with the Platform',
            ]} />
            <p className="mt-4">
              Our total aggregate liability in respect of any claim shall not exceed{' '}
              <strong className="text-plum dark:text-ivory">KSh 10,000</strong>. Nothing in these Terms
              limits liability for fraud, fraudulent misrepresentation, or any liability that cannot be
              excluded by Kenyan law.
            </p>
          </Section>

          <Section eyebrow="10. Vendors and Venues — Listing Terms">
            <p>If you are a vendor or venue whose profile appears on the Platform:</p>
            <BulletList items={[
              'You grant Harusi Planners a non-exclusive, royalty-free licence to display your business name, description, pricing information, and photography for the purpose of connecting you with potential clients',
              'You represent that you have the right to provide any content (including photographs) associated with your listing',
              'You may request removal of your listing at any time by contacting hello@harusihub.com; we will process removal requests within 14 days',
              'You remain solely responsible for the accuracy of your listing information and for fulfilling any engagements booked through the Platform',
            ]} />
          </Section>

          <Section eyebrow="11. Dispute Resolution">
            <p>
              <strong className="text-plum dark:text-ivory">Disputes between users and vendors/venues.</strong>{' '}
              Harusi Planners is not a party to such disputes. Where a vendor or venue fails to perform
              services paid for, you may have recourse under the Consumer Protection Act, 2012 and
              should consider contacting the{' '}
              <strong className="text-plum dark:text-ivory">Competition Authority of Kenya</strong>.
            </p>
            <p>
              <strong className="text-plum dark:text-ivory">Disputes with Harusi Planners.</strong>{' '}
              Any dispute between you and Harusi Planners shall be:
            </p>
            <ol className="space-y-2 mt-2 list-none">
              {[
                'First referred to good-faith negotiations between the parties',
                'If unresolved within 30 days, submitted to mediation under the Nairobi Centre for International Arbitration (NCIA) Mediation Rules',
                'If mediation fails, resolved by binding arbitration in Nairobi under the Arbitration Act (Cap. 49), with proceedings conducted in English',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-plum/10 dark:bg-ivory/10 text-plum dark:text-ivory text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4">
              Nothing prevents either party from seeking urgent interlocutory relief from the courts
              of Kenya. These Terms are governed by the laws of Kenya and both parties submit to the
              exclusive jurisdiction of the courts of Kenya.
            </p>
          </Section>

          <Section eyebrow="12. General">
            <Table
              headers={['Provision', 'Detail']}
              rows={[
                ['Entire agreement', 'These Terms, together with the Privacy Policy, constitute the entire agreement between you and Harusi Planners in relation to your use of the Platform.'],
                ['Severability', 'If any provision is found to be unenforceable, the remaining provisions continue in full force.'],
                ['No waiver', 'Failure by us to enforce any provision shall not constitute a waiver of our right to enforce it subsequently.'],
                ['Assignment', 'We may assign our rights and obligations to any successor entity. You may not assign your rights without our written consent.'],
                ['Changes', 'We reserve the right to update these Terms at any time. Continued use after changes constitutes acceptance.'],
              ]}
            />
          </Section>

          {/* Contact callout */}
          <div className="bg-plum rounded-3xl p-10 text-center text-white mt-6">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60 mb-3">Questions?</p>
            <h2 className="text-2xl font-serif mb-4">We're here to help.</h2>
            <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">
              For any questions regarding these Terms, contact us at hello@harusihub.com or speak
              to us directly on WhatsApp.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-rose text-white px-8 py-3 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-plum transition"
            >
              Contact Us ⟶
            </Link>
          </div>

          {/* Link to Privacy */}
          <p className="text-center text-sm text-plum/40 dark:text-ivory/40 mt-10">
            Also read our{' '}
            <Link to="/privacy" className="text-rose hover:text-plum dark:hover:text-gold transition font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
