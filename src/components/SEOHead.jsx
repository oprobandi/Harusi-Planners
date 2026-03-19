import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL, SITE_DESC, OG_IMAGE } from '../utils/constants'

/**
 * SEOHead — drop into any page to set title, description & OG tags.
 * Falls back to site-wide defaults if props are omitted.
 */
export default function SEOHead({
  title,
  description = SITE_DESC,
  image = OG_IMAGE,
  path = '',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Your Love Story Deserves a Perfect Day`
  const canonical = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
    </Helmet>
  )
}
