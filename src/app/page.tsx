import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/config/brand'
import { getFeaturedDesigns } from '@/lib/designs'
import { getAllPosts, formatDate } from '@/lib/blog'
import ProductCard from '@/components/product/ProductCard'

export const revalidate = 3600

export default async function HomePage() {
  const [featured, posts] = await Promise.all([
    getFeaturedDesigns(8),
    getAllPosts(),
  ])
  const blogPreviews = posts.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Decorative gold radial — very subtle on ivory */}
        <div
          className="marigold-glow absolute rounded-full pointer-events-none"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(198,156,70,0.14) 0%, transparent 68%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Decorative Om symbol — large, ghosted behind text */}
        <div
          className="absolute select-none pointer-events-none"
          aria-hidden="true"
          style={{
            fontSize: 'clamp(220px, 38vw, 480px)',
            fontFamily: 'serif',
            color: 'var(--color-primary)',
            opacity: 0.04,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -52%)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          ॐ
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-medium tracking-[0.25em] mb-6 animate-fade-up uppercase"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            {brand.name}
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6 animate-fade-up-delay"
            style={{ color: 'var(--color-text-heading)' }}>
            {brand.tagline}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-10 animate-fade-up-delay-2"
            style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
            Premium apparel celebrating Hindu deities and the countries we call home.
            Two flags. One identity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-2">
            <Link href="/shop"
              className="px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-emerald)', color: 'var(--color-text-light)' }}>
              Shop All Designs
            </Link>
            <Link href="/shop?god=ganesh"
              className="px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-200 hover:bg-[var(--color-surface)]"
              style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-dark)' }}>
              Start with Ganesh
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'var(--color-text-muted)' }}>
          <span className="text-xs tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>SCROLL</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <rect x="6" y="4" width="4" height="7" rx="2" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Social proof marquee */}
      <div className="border-y overflow-hidden py-3"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="flex gap-10 animate-marquee whitespace-nowrap text-xs font-medium tracking-widest uppercase"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
          {[
            '🇺🇸 USA', '🇨🇦 Canada', '🇬🇧 United Kingdom', '🇦🇺 Australia',
            '🇹🇹 Trinidad', '🇬🇾 Guyana', '🇫🇯 Fiji', '🇲🇺 Mauritius',
            '🇮🇳 India', '✦ 130+ orders shipped', '✦ 224 designs',
            '🇺🇸 USA', '🇨🇦 Canada', '🇬🇧 United Kingdom', '🇦🇺 Australia',
            '🇹🇹 Trinidad', '🇬🇾 Guyana', '🇫🇯 Fiji', '🇲🇺 Mauritius',
            '🇮🇳 India', '✦ 130+ orders shipped', '✦ 224 designs',
          ].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              {item}
              <span style={{ opacity: 0.3 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Browse by Deity */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            Find your deity
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold"
            style={{ color: 'var(--color-text-heading)' }}>
            Shop by Deity
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-4">
          {[
            { name: 'Ganesh',  symbol: 'ॐ',  description: 'Remover of Obstacles', value: 'ganesh'  },
            { name: 'Lakshmi', symbol: '₹',  description: 'Goddess of Prosperity', value: 'lakshmi' },
            { name: 'Shiva',   symbol: '☽',  description: 'The Destroyer & Creator', value: 'shiva'   },
            { name: 'Krishna', symbol: '♪',  description: 'Divine Love & Wisdom', value: 'krishna' },
            { name: 'Hanuman', symbol: '⚡', description: 'Devotion & Strength', value: 'hanuman' },
            { name: 'Durga',   symbol: '✦',  description: 'Goddess of Power', value: 'durga'   },
            { name: 'Om',      symbol: 'ॐ',  description: 'Universal Consciousness', value: 'om'      },
          ].map(deity => (
            <Link
              key={deity.value}
              href={`/shop?god=${deity.value}`}
              className="deity-card group flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl border text-center transition-all duration-200 hover:shadow-md"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              {/* Symbol circle */}
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl transition-transform duration-200 group-hover:scale-110"
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'serif',
                  color: 'var(--color-primary)',
                }}
              >
                {deity.symbol}
              </div>
              <span className="text-xs font-semibold leading-tight"
                style={{ color: 'var(--color-text-heading)' }}>
                {deity.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured designs */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-semibold"
              style={{ color: 'var(--color-text-heading)' }}>
              New Arrivals
            </h2>
            <Link href="/shop" className="text-sm font-medium"
              style={{ color: 'var(--color-primary)' }}>
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map(asset => (
              <ProductCard key={asset.id} asset={asset} />
            ))}
          </div>
        </section>
      )}

      {/* Browse by Country */}
      <section className="border-t py-16" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="shrink-0">
              <p className="text-xs font-medium tracking-[0.25em] uppercase mb-1"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                Diaspora
              </p>
              <h2 className="font-display text-xl font-semibold"
                style={{ color: 'var(--color-text-heading)' }}>
                Your country
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { flag: '🇮🇳', label: 'India',     value: 'india'     },
                { flag: '🇺🇸', label: 'USA',       value: 'usa'       },
                { flag: '🇨🇦', label: 'Canada',    value: 'canada'    },
                { flag: '🇬🇧', label: 'UK',        value: 'uk'        },
                { flag: '🇦🇺', label: 'Australia', value: 'australia' },
                { flag: '🇹🇹', label: 'Trinidad',  value: 'trinidad'  },
                { flag: '🇬🇾', label: 'Guyana',    value: 'guyana'    },
                { flag: '🇫🇯', label: 'Fiji',      value: 'fiji'      },
                { flag: '🇲🇺', label: 'Mauritius', value: 'mauritius' },
              ].map(c => (
                <Link
                  key={c.value}
                  href={`/shop?country=${c.value}`}
                  className="country-pill inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:shadow-sm"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-dark)',
                    backgroundColor: 'var(--color-surface)',
                  }}
                >
                  <span>{c.flag}</span>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand values */}
      <section className="border-t border-b py-20"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: '✦',
              title: 'Heritage in every thread',
              body: 'Each design fuses a Hindu deity with the flags of your homeland and your new home — a wearable bridge between two worlds.',
            },
            {
              icon: '◈',
              title: 'Printed fresh, shipped fast',
              body: 'No inventory, no waste. Every shirt is printed on demand, fulfilled locally to you by Gelato — USA, Canada, UK, Australia, India and more.',
            },
            {
              icon: '◉',
              title: 'Premium quality',
              body: '100% ring-spun cotton, 180 GSM. Direct-to-film printing that stays vibrant through hundreds of washes. Made to last.',
            },
          ].map(item => (
            <div key={item.title}>
              <span className="block text-lg mb-4" style={{ color: 'var(--color-primary)' }}>{item.icon}</span>
              <h3 className="font-display text-base font-semibold mb-3"
                style={{ color: 'var(--color-text-heading)' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* From the blog */}
      {blogPreviews.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                Stories
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold"
                style={{ color: 'var(--color-text-heading)' }}>
                From the Community
              </h2>
            </div>
            <Link href="/blog" className="text-sm font-medium"
              style={{ color: 'var(--color-primary)' }}>
              All stories →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPreviews.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="rounded-xl overflow-hidden mb-4 relative aspect-video"
                  style={{ backgroundColor: 'var(--color-surface)' }}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-surface-2)' }}>
                      <span className="font-display text-3xl" style={{ color: 'var(--color-primary)', opacity: 0.35 }}>✦</span>
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium tracking-widest uppercase mb-1 block"
                  style={{ color: 'var(--color-primary)' }}>
                  {post.category}
                </span>
                <h3 className="font-display text-base font-semibold mb-1 group-hover:opacity-75 transition-opacity leading-snug"
                  style={{ color: 'var(--color-text-heading)' }}>
                  {post.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA strip */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-emerald)' }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4"
            style={{ color: 'var(--color-text-light)' }}>
            Wear Your Dharma
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(247,243,233,0.7)' }}>
            Designs for the Hindu diaspora — wherever in the world you call home.
          </p>
          <Link href="/shop"
            className="inline-block px-10 py-4 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text-light)' }}>
            Explore the Collection
          </Link>
        </div>
      </section>
    </>
  )
}
