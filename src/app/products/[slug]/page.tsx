import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAssetBySlug, getRelatedByGod, getRelatedByCountry } from '@/lib/designs'
import ProductCard from '@/components/product/ProductCard'
import AddToCartButton from '@/components/cart/AddToCartButton'
import ShareButton from '@/components/product/ShareButton'
import ImageCarousel from '@/components/product/ImageCarousel'
import SizeChart from '@/components/product/SizeChart'
import { brand } from '@/config/brand'
import { countryDisplayName } from '@/lib/countries'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

function formatTitle(asset: { god: string; country: string }) {
  const deity = asset.god
    ? asset.god.charAt(0).toUpperCase() + asset.god.slice(1).toLowerCase()
    : ''
  const country = countryDisplayName(asset.country)
  return deity && country ? `${deity} — ${country}` : deity
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const asset = await getAssetBySlug(slug)
  if (!asset) return {}
  const title = formatTitle(asset)
  return {
    title: `${title} | ${brand.name}`,
    description: asset.seo_description ?? `${title} Hindu deity t-shirt. Celebrating diaspora heritage with premium print-on-demand quality.`,
    openGraph: {
      images: asset.mockup_female_url ? [asset.mockup_female_url]
        : asset.file_url ? [asset.file_url] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const asset = await getAssetBySlug(slug)
  if (!asset) notFound()
  const productUrl = `https://${brand.domain}/products/${slug}`

  const title = formatTitle(asset)
  const primaryImage = asset.mockup_female_url ?? asset.mockup_male_url ?? asset.file_url

  // Build carousel images: female first, then male (if different), then raw design
  const carouselImages: { src: string; alt: string }[] = []
  if (asset.mockup_female_url)
    carouselImages.push({ src: asset.mockup_female_url, alt: `${title} — women's lifestyle` })
  if (asset.mockup_male_url && asset.mockup_male_url !== asset.mockup_female_url)
    carouselImages.push({ src: asset.mockup_male_url, alt: `${title} — men's lifestyle` })
  if (asset.file_url && carouselImages.length === 0)
    carouselImages.push({ src: asset.file_url, alt: title })

  const [relatedGod, relatedCountry] = await Promise.all([
    getRelatedByGod(asset.god, asset.id, 4),
    getRelatedByCountry(asset.country, asset.id, 4),
  ])

  const displayTitle = asset.seo_title ?? title

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Image carousel */}
          <ImageCarousel images={carouselImages} priority />

          {/* Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-medium tracking-widest mb-3"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              {asset.god?.toUpperCase()} — {countryDisplayName(asset.country)}
            </p>

            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4 leading-tight"
              style={{ color: 'var(--color-text-heading)' }}>
              {displayTitle}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-semibold" style={{ color: 'var(--color-text-dark)' }}>
                From $29.99
              </p>
              <ShareButton
                title={`${displayTitle} — Hindu Deity T-Shirt | HinduTees`}
                url={productUrl}
                imageUrl={primaryImage}
              />
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
              {asset.seo_description ?? `A celebration of dual identity — ${asset.god} rendered in the colors and symbolism of ${countryDisplayName(asset.country)}. Premium unisex t-shirt, printed fresh when you order.`}
            </p>

            {/* Add to cart — only when the product is live in Gelato */}
            {asset.gelato_product_id ? (
              <AddToCartButton
                assetId={asset.id}
                slug={slug}
                title={displayTitle}
                image={primaryImage ?? null}
                price={29.99}
                gelatoProductId={asset.gelato_product_id}
                fileUrl={asset.file_url ?? ''}
              />
            ) : (
              <button disabled
                className="block w-full py-4 rounded-full font-medium text-center text-sm mb-4 opacity-40 cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}>
                Coming Soon
              </button>
            )}

            <SizeChart />

            <div className="border-t pt-6 mt-6 space-y-3" style={{ borderColor: 'var(--color-border)' }}>
              {[
                ['Material', '100% ring-spun cotton, 180 GSM'],
                ['Print', 'Direct-to-film (DTF), vibrant & durable'],
                ['Fulfillment', 'Printed locally in your region by Gelato'],
                ['Ships to', 'USA, Canada, UK, Australia, India + more'],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4 text-sm">
                  <span className="w-28 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                  <span style={{ color: 'var(--color-text-dark)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related by deity */}
        {relatedGod.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-xl font-semibold mb-6"
              style={{ color: 'var(--color-text-heading)' }}>
              More {asset.god?.charAt(0).toUpperCase()}{asset.god?.slice(1).toLowerCase()} designs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedGod.map(a => <ProductCard key={a.id} asset={a} />)}
            </div>
          </section>
        )}

        {/* Related by country */}
        {relatedCountry.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold mb-6"
              style={{ color: 'var(--color-text-heading)' }}>
              More {countryDisplayName(asset.country)} designs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedCountry.map(a => <ProductCard key={a.id} asset={a} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
