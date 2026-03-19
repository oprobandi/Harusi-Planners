import { Link, useParams } from 'react-router-dom'
import { Clock, ArrowLeft, Tag } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { POSTS, CATEGORY_COLORS } from '../data/blog'

// Re-export for internal use
const CAT_COLORS = {
  'Wedding Planning Tips': 'bg-rose/10 text-rose',
  'Vendor Spotlights':     'bg-gold/15 text-gold',
  'Real Wedding Stories':  'bg-sage/10 text-sage',
  'East Africa Trends':    'bg-plum/10 text-plum',
  'Budget & Finance':      'bg-blush/40 text-rose',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-plum/70 dark:text-ivory/70 leading-relaxed text-base md:text-lg mb-6">
          {block.text}
        </p>
      )
    case 'heading':
      return (
        <h2 className="text-2xl font-serif text-plum dark:text-ivory mt-12 mb-4">
          {block.text}
        </h2>
      )
    case 'subheading':
      return (
        <h3 className="text-lg font-bold text-plum dark:text-ivory mt-8 mb-3">
          {block.text}
        </h3>
      )
    case 'list':
      return (
        <ul className="space-y-3 mb-6 pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-plum/70 dark:text-ivory/70 text-base">
              <span className="text-gold mt-1 shrink-0" aria-hidden="true">✦</span>
              {item}
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="border-l-4 border-rose pl-6 my-10">
          <p className="font-serif italic text-xl md:text-2xl text-plum/80 dark:text-ivory/80 leading-relaxed mb-3">
            "{block.text}"
          </p>
          {block.author && (
            <cite className="text-xs uppercase tracking-widest text-plum/40 dark:text-ivory/40 not-italic">
              — {block.author}
            </cite>
          )}
        </blockquote>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find(p => p.slug === slug)

  if (!post) {
    return (
      <>
        <SEOHead title="Post Not Found" path={`/blog/${slug}`} />
        <section className="min-h-screen bg-ivory dark:bg-dark-bg flex items-center justify-center px-6 pt-24">
          <div className="text-center">
            <p className="text-5xl mb-4" aria-hidden="true">✍️</p>
            <h1 className="text-3xl font-serif text-plum dark:text-ivory mb-4">Post not found</h1>
            <p className="text-plum/50 dark:text-ivory/50 mb-8">This post doesn't exist or may have moved.</p>
            <Link to="/blog" className="bg-rose text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-plum transition">
              Back to the Blog
            </Link>
          </div>
        </section>
      </>
    )
  }

  const { title, category, date, author, readTime, excerpt, coverImage, content, tags } = post

  const related = POSTS
    .filter(p => p.category === category && p.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <SEOHead
        title={title}
        description={excerpt}
        image={coverImage}
        path={`/blog/${slug}`}
      />

      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/50 to-transparent" />

        <Link
          to="/blog"
          className="absolute top-24 left-6 md:left-10 flex items-center gap-2 text-white/70 hover:text-white transition text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} aria-hidden="true" /> The Blog
        </Link>

        <div className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${CAT_COLORS[category] ?? 'bg-white/20 text-white'}`}>
              {category}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-xs">
              <Clock size={11} aria-hidden="true" /> {readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            {title}
          </h1>
        </div>
      </section>

      {/* ── Article ── */}
      <article className="max-w-3xl mx-auto px-6 md:px-10 py-16">

        {/* Byline */}
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-plum/10 dark:border-dark-border">
          <div>
            <p className="text-sm font-bold text-plum dark:text-ivory">{author}</p>
            <p className="text-xs text-plum/40 dark:text-ivory/40 mt-0.5">{formatDate(date)}</p>
          </div>
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-end">
              {tags.slice(0, 3).map(t => (
                <span key={t} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-plum/40 dark:text-ivory/40 bg-plum/5 dark:bg-ivory/5 px-3 py-1 rounded-full">
                  <Tag size={9} aria-hidden="true" /> {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content blocks */}
        <div>
          {content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-plum/10 dark:border-dark-border">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-rose hover:text-plum dark:hover:text-gold transition"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to all posts
          </Link>
        </div>
      </article>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="bg-ivory dark:bg-dark-bg py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-3">More to Read</p>
            <h2 className="text-3xl font-serif text-plum dark:text-ivory mb-10">
              More in {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white dark:bg-dark-card hover:shadow-lg transition"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-plum/40 dark:text-ivory/40 mb-2">{formatDate(p.date)}</p>
                    <h3 className="font-serif text-plum dark:text-ivory group-hover:text-rose dark:group-hover:text-gold transition leading-snug">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-plum py-20 px-6 text-center">
        <h2 className="text-3xl font-serif text-white italic mb-5">
          Ready to start planning?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/#quiz"
            className="bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-rose/80 transition"
          >
            Take the Style Quiz ✨
          </Link>
          <Link
            to="/pricing"
            className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:border-white hover:bg-white/10 transition"
          >
            View Packages
          </Link>
        </div>
      </section>
    </>
  )
}
