import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/blog'
import { getFeaturedDesigns } from '@/lib/designs'
import ProductCard from '@/components/product/ProductCard'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — HinduTee`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const related = await getFeaturedDesigns(4)

  return (
    <>
      {/* Article header */}
      <section className="pt-28 pb-10 px-6 text-center max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs mb-8 hover:opacity-70 transition-opacity"
          style={{ color: 'var(--color-text-muted)' }}>
          ← Back to Blog
        </Link>
        <span className="block text-xs font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          {post.category}
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-semibold leading-tight mb-6"
          style={{ color: 'var(--color-text-heading)' }}>
          {post.title}
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)', maxWidth: '560px', margin: '0 auto 2rem' }}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-3xl mx-auto px-6 mb-14">
        <div
          className="rounded-2xl aspect-video flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-surface-2)' }}
        >
          <span className="font-display text-8xl" style={{ color: 'var(--color-primary)', opacity: 0.25 }}>
            ✦
          </span>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-2xl mx-auto px-6 pb-20 prose-hindutee">
        <div
          className="blog-body text-base leading-relaxed"
          style={{ color: 'var(--color-text-dark)' }}
          // Post body is static trusted HTML authored in blog.ts — safe to render directly.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <hr style={{ borderColor: 'var(--color-border)' }} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-2xl font-semibold"
              style={{ color: 'var(--color-text-heading)' }}>
              Shop the Collection
            </h2>
            <Link href="/shop" className="text-sm font-medium"
              style={{ color: 'var(--color-primary)' }}>
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(asset => (
              <ProductCard key={asset.id} asset={asset} />
            ))}
          </div>
        </section>
      )}

      {/* Back to blog */}
      <section className="border-t py-16 text-center px-6"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <Link href="/blog" className="text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: 'var(--color-primary)' }}>
          ← More stories
        </Link>
      </section>
    </>
  )
}
