'use client'
import { useCart, cartTotal } from '@/lib/cart'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const total = cartTotal(items)

  async function handleCheckout() {
    if (!items.length) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const { url, error } = await res.json() as { url?: string; error?: string }
      if (error || !url) throw new Error(error ?? 'No checkout URL returned')
      router.push(url)
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Could not start checkout. Please try again.')
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col shadow-2xl"
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'var(--color-canvas)',
          borderLeft: '1px solid var(--color-border)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="font-display font-semibold text-lg" style={{ color: 'var(--color-text-heading)' }}>
            Your Cart {items.length > 0 && <span className="text-sm font-normal ml-2" style={{ color: 'var(--color-text-muted)' }}>({items.length})</span>}
          </h2>
          <button onClick={() => setOpen(false)} style={{ color: 'var(--color-text-muted)' }} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🛕</p>
              <p style={{ color: 'var(--color-text-muted)' }} className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.key} className="flex gap-4 items-start">
                  {item.image && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: 'var(--color-surface)' }}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-dark)' }}>{item.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Size: {item.size}</p>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--color-primary)' }}>${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-xs mt-0.5 hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--color-text-muted)' }}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--color-text-dark)' }}>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Shipping calculated at checkout. Printed fresh for you.</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}
            >
              {loading ? 'Redirecting…' : 'Checkout →'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
