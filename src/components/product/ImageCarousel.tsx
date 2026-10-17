'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  images: { src: string; alt: string }[]
  priority?: boolean
}

export default function ImageCarousel({ images, priority = false }: Props) {
  const [active, setActive] = useState(0)

  if (images.length === 0) return null

  const current = images[active]

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)' }}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        {/* Arrow nav — only when multiple images */}
        {images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() => setActive(i => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-sm transition-opacity"
              style={{
                background: 'rgba(0,0,0,0.45)',
                color: '#fff',
                opacity: active === 0 ? 0.35 : 0.85,
              }}
            >
              ‹
            </button>
            <button
              aria-label="Next image"
              onClick={() => setActive(i => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-sm transition-opacity"
              style={{
                background: 'rgba(0,0,0,0.45)',
                color: '#fff',
                opacity: active === images.length - 1 ? 0.35 : 0.85,
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              aria-label={`View image ${i + 1}`}
              onClick={() => setActive(i)}
              className="relative flex-shrink-0 rounded-lg overflow-hidden transition-all"
              style={{
                width: 72,
                height: 72,
                outline: i === active
                  ? '2px solid var(--color-primary)'
                  : '2px solid transparent',
                outlineOffset: 2,
                opacity: i === active ? 1 : 0.55,
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="72px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
