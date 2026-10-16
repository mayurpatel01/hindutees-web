'use client'
import { useState } from 'react'
import { SIZES, useCart, type Size } from '@/lib/cart'

type Props = {
  assetId: string
  slug: string
  title: string
  image: string | null
  price: number
  gelatoProductId: string
  fileUrl: string
}

export default function AddToCartButton({ assetId, slug, title, image, price, gelatoProductId, fileUrl }: Props) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  function handleAdd() {
    if (!selectedSize) return
    addItem({ assetId, slug, title, image, size: selectedSize, price, gelatoProductId, fileUrl })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Size selector */}
      <div className="mb-4">
        <p className="text-xs font-medium tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>SELECT SIZE</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
              style={{
                borderColor: selectedSize === size ? 'var(--color-primary)' : 'var(--color-border)',
                backgroundColor: selectedSize === size ? 'var(--color-primary)' : 'transparent',
                color: selectedSize === size ? 'var(--color-canvas)' : 'var(--color-text-dark)',
              }}
            >
              {size}
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>Please select a size</p>
        )}
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAdd}
        disabled={!selectedSize}
        className="block w-full py-4 rounded-full font-medium text-center text-sm transition-all duration-200 hover:opacity-90 mb-3 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}
      >
        {added ? '✓ Added to cart' : 'Add to Cart'}
      </button>

      <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
        Free shipping on orders over $50 · Printed locally by Gelato
      </p>
    </div>
  )
}
