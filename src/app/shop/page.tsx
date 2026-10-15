import type { Metadata } from 'next'
import { getAllActiveDesigns } from '@/lib/designs'
import ProductCard from '@/components/product/ProductCard'
import { brand } from '@/config/brand'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Shop All Designs | ${brand.name}`,
  description: `Browse all ${brand.name} designs — Hindu deity apparel celebrating diaspora pride.`,
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ deity?: string; country?: string }>
}) {
  const { deity, country } = await searchParams
  const allDesigns = await getAllActiveDesigns()

  // Derive filter options from live data
  const deities = [...new Set(allDesigns.map(d => d.deity).filter(Boolean))].sort()
  const countries = [...new Set(allDesigns.map(d => d.country_primary).filter(Boolean))].sort()

  // Filter
  const filtered = allDesigns.filter(d => {
    if (deity && d.deity?.toLowerCase() !== deity.toLowerCase()) return false
    if (country && d.country_primary?.toLowerCase() !== country.toLowerCase()) return false
    return true
  })

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2"
            style={{ color: 'var(--color-text-light)' }}>
            All Designs
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {filtered.length} design{filtered.length !== 1 ? 's' : ''}
            {deity ? ` · ${deity}` : ''}
            {country ? ` · ${country}` : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {/* Clear */}
          {(deity || country) && (
            <a
              href="/shop"
              className="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              Clear filters
            </a>
          )}

          {/* Deity filters */}
          {deities.map(d => (
            <a
              key={d}
              href={`/shop?deity=${d}${country ? `&country=${country}` : ''}`}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
              style={{
                borderColor: deity?.toLowerCase() === d.toLowerCase()
                  ? 'var(--color-primary)'
                  : 'var(--color-border)',
                color: deity?.toLowerCase() === d.toLowerCase()
                  ? 'var(--color-primary)'
                  : 'var(--color-text-muted)',
                backgroundColor: deity?.toLowerCase() === d.toLowerCase()
                  ? 'rgba(245,161,0,0.1)'
                  : 'transparent',
              }}
            >
              {d}
            </a>
          ))}

          {/* Country filters */}
          {countries.map(c => (
            <a
              key={c}
              href={`/shop?country=${c}${deity ? `&deity=${deity}` : ''}`}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
              style={{
                borderColor: country?.toLowerCase() === c.toLowerCase()
                  ? 'var(--color-secondary)'
                  : 'var(--color-border)',
                color: country?.toLowerCase() === c.toLowerCase()
                  ? 'var(--color-secondary)'
                  : 'var(--color-text-muted)',
                backgroundColor: country?.toLowerCase() === c.toLowerCase()
                  ? 'rgba(155,27,58,0.1)'
                  : 'transparent',
              }}
            >
              {c}
            </a>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(design => (
              <ProductCard key={design.id} design={design} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
              No designs found
            </p>
            <a href="/shop" className="text-sm" style={{ color: 'var(--color-primary)' }}>
              View all designs
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
