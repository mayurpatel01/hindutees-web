import type { Metadata } from 'next'
import { getAllActiveAssets } from '@/lib/designs'
import ProductCard from '@/components/product/ProductCard'
import { brand } from '@/config/brand'
import { countryDisplayName } from '@/lib/countries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Shop All Designs | ${brand.name}`,
  description: `Browse all ${brand.name} designs — Hindu deity apparel celebrating diaspora pride.`,
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ god?: string; country?: string }>
}) {
  const { god, country } = await searchParams
  const allAssets = await getAllActiveAssets()

  const gods = [...new Set(allAssets.map(a => a.god).filter(Boolean))].sort()
  const countries = [...new Set(allAssets.map(a => a.country).filter(Boolean))].sort()

  const filtered = allAssets.filter(a => {
    if (god && a.god?.toLowerCase() !== god.toLowerCase()) return false
    if (country && a.country?.toLowerCase() !== country.toLowerCase()) return false
    return true
  })

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2"
            style={{ color: 'var(--color-text-heading)' }}>
            All Designs
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {filtered.length} design{filtered.length !== 1 ? 's' : ''}
            {god ? ` · ${god}` : ''}
            {country ? ` · ${country}` : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(god || country) && (
            <a href="/shop" className="text-xs px-3 py-1.5 rounded-full border"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
              Clear filters
            </a>
          )}
          {gods.map(g => {
            const active = god?.toLowerCase() === g.toLowerCase()
            return (
              <a key={g}
                href={`/shop?god=${g}${country ? `&country=${country}` : ''}`}
                className="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
                style={{
                  borderColor: active ? 'var(--color-emerald)' : 'var(--color-border)',
                  color: active ? 'var(--color-text-light)' : 'var(--color-text-muted)',
                  backgroundColor: active ? 'var(--color-emerald)' : 'transparent',
                }}>
                {g.charAt(0).toUpperCase() + g.slice(1).toLowerCase()}
              </a>
            )
          })}
          {countries.map(c => {
            const active = country?.toLowerCase() === c.toLowerCase()
            return (
              <a key={c}
                href={`/shop?country=${c}${god ? `&god=${god}` : ''}`}
                className="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
                style={{
                  borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                  color: active ? 'var(--color-text-dark)' : 'var(--color-text-muted)',
                  backgroundColor: active ? 'rgba(198,156,70,0.15)' : 'transparent',
                }}>
                {countryDisplayName(c)}
              </a>
            )
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(asset => (
              <ProductCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>No designs found</p>
            <a href="/shop" className="text-sm" style={{ color: 'var(--color-primary)' }}>View all designs</a>
          </div>
        )}
      </div>
    </div>
  )
}
