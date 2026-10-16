import Link from 'next/link'
import Image from 'next/image'
import type { Asset } from '@/types'

type Props = { asset: Asset }

function formatTitle(asset: Asset) {
  const deity = asset.god
    ? asset.god.charAt(0).toUpperCase() + asset.god.slice(1).toLowerCase()
    : ''
  const country = asset.country ?? ''
  return deity && country ? `${deity} — ${country}` : asset.name
}

export default function ProductCard({ asset }: Props) {
  const displayImage = asset.mockup_female_url ?? asset.mockup_male_url ?? asset.file_url
  const slug = asset.slug ?? asset.id
  const title = formatTitle(asset)

  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3"
        style={{ backgroundColor: 'var(--color-surface)' }}>
        {displayImage ? (
          <Image
            src={displayImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ color: 'var(--color-text-muted)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
        {asset.gelato_status === 'active' && (
          <span className="absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}>
            In Stock
          </span>
        )}
      </div>
      <p className="font-display text-sm font-medium leading-snug"
        style={{ color: 'var(--color-text-dark)' }}>
        {title}
      </p>
      <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
        From $29.99
      </p>
    </Link>
  )
}
