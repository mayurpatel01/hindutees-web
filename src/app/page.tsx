import Link from 'next/link'
import { brand } from '@/config/brand'
import { getFeaturedDesigns } from '@/lib/designs'
import ProductCard from '@/components/product/ProductCard'

export const revalidate = 3600

export default async function HomePage() {
  const featured = await getFeaturedDesigns(8)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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

      {/* Featured designs */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
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
