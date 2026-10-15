import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getDesignBySlug, getRelatedByDeity, getRelatedByCountry } from '@/lib/designs'
import ProductCard from '@/components/product/ProductCard'
import { brand } from '@/config/brand'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

function formatTitle(name: string) {
  const parts = name?.split('_') ?? []
  const deity = parts[0] ? parts[0].charAt(0) + parts[0].slice(1).toLowerCase() : ''
  const countries = parts[1] ?? ''
  const [c1, c2] = countries.split('-')
  if (!c1) return name
  return `${deity} — ${c1}${c2 ? ` × ${c2}` : ''}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const design = await getDesignBySlug(slug)
  if (!design) return {}
  const title = formatTitle(design.name)
  return {
    title: `${title} | ${brand.name}`,
    description: `${title} Hindu deity t-shirt. Celebrating diaspora heritage with premium print-on-demand quality.`,
    openGraph: {
      images: design.mockup_female_url
        ? [design.mockup_female_url]
        : design.image_url
        ? [design.image_url]
        : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const design = await getDesignBySlug(slug)
  if (!design) notFound()

  const title = formatTitle(design.name)
  const primaryImage = design.mockup_female_url ?? design.mockup_male_url ?? design.image_url
  const secondaryImage = design.mockup_male_url && design.mockup_female_url
    ? design.mockup_male_url
    : design.image_url

  const [relatedDeity, relatedCountry] = await Promise.all([
    getRelatedByDeity(design.deity, design.id, 4),
    getRelatedByCountry(design.country_primary, design.id, 4),
  ])

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">

          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-xl overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)' }}>
              {primaryImage && (
                <Image
                  src={primaryImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>

            {secondaryImage && secondaryImage !== primaryImage && (
              <div className="relative aspect-square rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--color-surface)' }}>
                <Image
                  src={secondaryImage}
                  alt={`${title} — alternate view`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-medium tracking-widest mb-3"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              {design.deity} — {design.country_primary}{design.country_secondary ? ` × ${design.country_secondary}` : ''}
            </p>

            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4 leading-tight"
              style={{ color: 'var(--color-text-light)' }}>
              {title}
            </h1>

            <p className="text-2xl font-semibold mb-8"
              style={{ color: 'var(--color-text-light)' }}>
              From $29.99
            </p>

            <p className="text-sm leading-relaxed mb-8"
              style={{ color: 'var(--color-text-muted)' }}>
              A celebration of dual identity — {design.deity} rendered in the colors and symbolism of
              {design.country_primary && ` ${design.country_primary}`}
              {design.country_secondary && ` and ${design.country_secondary}`}.
              Premium unisex t-shirt, printed fresh when you order.
            </p>

            {/* CTA — Gelato buy link (to be wired to Gelato storefront) */}
            {design.gelato_product_id ? (
              <a
                href={`https://www.gelato.com/store/hindutee/${design.gelato_product_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 rounded-full font-medium text-center text-sm transition-all duration-200 hover:opacity-90 mb-4"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}
              >
                Buy Now
              </a>
            ) : (
              <button
                disabled
                className="block w-full py-4 rounded-full font-medium text-center text-sm mb-4 opacity-40 cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}
              >
                Coming Soon
              </button>
            )}

            {/* Product details */}
            <div className="border-t pt-6 mt-6 space-y-3"
              style={{ borderColor: 'var(--color-border)' }}>
              {[
                ['Material', '100% ring-spun cotton, 180 GSM'],
                ['Print', 'Direct-to-film (DTF), vibrant & durable'],
                ['Fulfillment', 'Printed locally in your region by Gelato'],
                ['Ships to', 'USA, Canada, UK, Australia, India + more'],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4 text-sm">
                  <span className="w-28 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                  <span style={{ color: 'var(--color-text-light)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations — same deity */}
        {relatedDeity.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-xl font-semibold mb-6"
              style={{ color: 'var(--color-text-light)' }}>
              More {design.deity} designs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedDeity.map(d => <ProductCard key={d.id} design={d} />)}
            </div>
          </section>
        )}

        {/* Recommendations — same country */}
        {relatedCountry.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold mb-6"
              style={{ color: 'var(--color-text-light)' }}>
              More {design.country_primary} designs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedCountry.map(d => <ProductCard key={d.id} design={d} />)}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
