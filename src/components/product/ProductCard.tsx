import Link from 'next/link'
import Image from 'next/image'
import type { Design } from '@/types'

type Props = {
  design: Design
}

function formatName(design: Design) {
  // "GANESH_USA-IND_FULL_v1" → "Ganesh — USA × India"
  const parts = design.name?.split('_') ?? []
  const deity = parts[0] ? parts[0].charAt(0) + parts[0].slice(1).toLowerCase() : ''
  const countries = parts[1] ?? ''
  const [c1, c2] = countries.split('-')
  if (!c1) return design.name
  return `${deity} — ${c1}${c2 ? ` × ${c2}` : ''}`
}

export default function ProductCard({ design }: Props) {
  const displayImage = design.mockup_female_url ?? design.mockup_male_url ?? design.image_url
  const slug = design.slug ?? String(design.id)
  const title = formatName(design)

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

        {/* Badge */}
        {design.gelato_status === 'active' && (
          <span className="absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}>
            In Stock
          </span>
        )}
      </div>

      <p className="font-display text-sm font-medium leading-snug"
        style={{ color: 'var(--color-text-light)' }}>
        {title}
      </p>
      <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
        From $29.99
      </p>
    </Link>
  )
}
