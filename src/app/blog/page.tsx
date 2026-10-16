import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — HinduTee',
  description:
    'Stories, culture, and diaspora identity from the HinduTee community. Exploring Hindu heritage, festivals, and what it means to carry two flags.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const [hero, ...rest] = posts

  return (
    <>
      {/* Page header */}
      <section className="pt-28 pb-14 text-center px-6">
        <p className="text-xs font-medium tracking-[0.25em] mb-4 uppercase"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          From the community
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: 'var(--color-text-heading)' }}>
          Stories & Culture
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          Diaspora identity, Hindu heritage, and what it means to wear both flags with pride.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-24">

        {/* Hero post */}
        {hero && (
          <Link href={`/blog/${hero.slug}`} className="group block mb-16">
            <div
              className="rounded-2xl overflow-hidden flex flex-col md:flex-row"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              {/* Cover image placeholder */}
              <div
                className="md:w-1/2 aspect-video md:aspect-auto flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-surface-2)', minHeight: '280px' }}
              >
                <span className="font-display text-6xl" style={{ color: 'var(--color-primary)', opacity: 0.4 }}>
                  ✦
                </span>
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-xs font-medium tracking-widest uppercase mb-4 block"
                  style={{ color: 'var(--color-primary)' }}>
                  {hero.category}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 group-hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-text-heading)' }}>
                  {hero.title}
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                  {hero.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>{formatDate(hero.publishedAt)}</span>
                  <span>·</span>
                  <span>{hero.readingMinutes} min read</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="rounded-xl overflow-hidden mb-4"
                  style={{ backgroundColor: 'var(--color-surface)' }}>
                  {/* Cover image placeholder */}
                  <div
                    className="aspect-video flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-surface-2)' }}
                  >
                    <span className="font-display text-4xl" style={{ color: 'var(--color-primary)', opacity: 0.4 }}>
                      ✦
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium tracking-widest uppercase mb-2 block"
                  style={{ color: 'var(--color-primary)' }}>
                  {post.category}
                </span>
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity leading-snug"
                  style={{ color: 'var(--color-text-heading)' }}>
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3 line-clamp-2"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <p className="text-center py-20" style={{ color: 'var(--color-text-muted)' }}>
            Posts coming soon.
          </p>
        )}
      </div>

      {/* Shop CTA */}
      <section className="border-t py-20 text-center px-6"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <p className="text-xs tracking-widest uppercase mb-4"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Wear it
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4"
          style={{ color: 'var(--color-text-heading)' }}>
          Find your design
        </h2>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          Every deity, every diaspora country. Browse the full collection.
        </p>
        <Link href="/shop"
          className="inline-block px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text-light)' }}>
          Shop All Designs
        </Link>
      </section>
    </>
  )
}
