import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Tag } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { POSTS, BLOG_CATEGORIES } from '../data/blog'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

const CATEGORY_COLORS = {
  'Wedding Planning Tips': 'bg-rose/10 text-rose',
  'Vendor Spotlights':     'bg-gold/15 text-gold',
  'Real Wedding Stories':  'bg-sage/10 text-sage',
  'East Africa Trends':    'bg-plum/10 text-plum',
  'Budget & Finance':      'bg-blush/40 text-rose',
}

function PostCard({ post, featured = false }) {
  const { slug, title, category, date, readTime, excerpt, coverImage } = post

  if (featured) {
    return (
      <Link
        to={`/blog/${slug}`}
        className="group relative rounded-3xl overflow-hidden col-span-1 md:col-span-2 h-[480px] flex items-end"
        aria-label={`Read: ${title}`}
      >
        <img
          src={coverImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/40 to-transparent" />
        <div className="relative p-8 md:p-10 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${CATEGORY_COLORS[category] ?? 'bg-white/20 text-white'}`}>
              {category}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-xs">
              <Clock size={11} aria-hidden="true" /> {readTime}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif mb-3 group-hover:text-gold transition-colors">
            {title}
          </h2>
          <p className="text-white/60 text-sm max-w-xl leading-relaxed mb-4 hidden md:block">
            {excerpt}
          </p>
          <p className="text-white/40 text-xs uppercase tracking-widest">{formatDate(date)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/blog/${slug}`}
      className="group flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-dark-card hover:shadow-lg hover:shadow-plum/5 transition-all duration-300"
      aria-label={`Read: ${title}`}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm ${CATEGORY_COLORS[category] ?? 'bg-white/80 text-plum'}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-xs text-plum/40 dark:text-ivory/40 mb-3">
          <span>{formatDate(date)}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock size={11} aria-hidden="true" /> {readTime}</span>
        </div>
        <h3 className="font-serif text-lg text-plum dark:text-ivory mb-2 leading-snug group-hover:text-rose dark:group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-sm text-plum/50 dark:text-ivory/50 leading-relaxed flex-1 line-clamp-3">
          {excerpt}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-rose mt-5 group-hover:text-plum transition-colors">
          Read More ⟶
        </p>
      </div>
    </Link>
  )
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? POSTS
      : POSTS.filter(p => p.category === activeCategory),
    [activeCategory]
  )

  const [featured, ...rest] = filtered

  return (
    <>
      <SEOHead
        title="The Blog"
        description="Wedding planning advice, vendor spotlights, real wedding stories, and East Africa trends from the Harusi Planners team."
        path="/blog"
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 bg-ivory dark:bg-dark-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blush/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose/60 mb-5">
            Ideas, Stories & Advice
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-plum dark:text-ivory italic leading-tight mb-6">
            The Blog
          </h1>
          <p className="text-plum/50 dark:text-ivory/50 text-lg max-w-lg mx-auto leading-relaxed">
            Planning tips, vendor spotlights, real wedding stories, and what is happening in East Africa weddings right now.
          </p>
        </div>
      </section>

      {/* ── Category filter ── */}
      <section className="sticky top-[60px] z-40 bg-ivory/92 dark:bg-dark-bg/92 backdrop-blur-md border-b border-plum/5 dark:border-dark-border py-4 px-6">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition ${
                activeCategory === cat
                  ? 'bg-plum dark:bg-gold text-ivory dark:text-plum'
                  : 'bg-white dark:bg-dark-card text-plum/60 dark:text-ivory/60 hover:text-plum dark:hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Posts grid ── */}
      <section className="py-20 bg-ivory dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-plum/40">
              <p className="text-4xl mb-4" aria-hidden="true">✍️</p>
              <p className="font-serif text-2xl">No posts in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured + first row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {featured && <PostCard post={featured} featured />}
                {rest[0] && <PostCard post={rest[0]} />}
              </div>

              {/* Remaining posts */}
              {rest.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.slice(1).map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="bg-plum dark:bg-dark-surface py-24 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/40 mb-5">
          Never Miss a Post
        </p>
        <h2 className="text-4xl font-serif text-white italic mb-5">
          Planning advice, straight to your inbox.
        </h2>
        <p className="text-white/50 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Vendor spotlights, budgeting guides, and East Africa trend reports — every two weeks, no spam.
        </p>
        <Link
          to="/#quiz"
          className="inline-block bg-rose text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-rose/80 transition"
        >
          Subscribe via the Homepage ⟶
        </Link>
      </section>
    </>
  )
}
