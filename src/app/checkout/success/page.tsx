import Link from 'next/link'
import { brand } from '@/config/brand'
import SuccessClient from './success-client'

export const metadata = {
  title: `Order Confirmed | ${brand.name}`,
}

export default function SuccessPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-lg mx-auto px-6 text-center">
        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-primary)' }}>
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-semibold mb-4" style={{ color: 'var(--color-text-heading)' }}>
          Order Confirmed 🙏
        </h1>

        <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Thank you for your order! Your t-shirt is being printed fresh for you by Gelato in your region.
          You&apos;ll receive a shipping confirmation email once it&apos;s on its way.
        </p>

        <div
          className="rounded-xl p-6 mb-8 text-left space-y-3"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          {[
            ['Production', '2–4 business days'],
            ['Shipping', '5–10 business days (varies by region)'],
            ['Tracking', 'Emailed when your order ships'],
            ['Questions', 'hello@hindutee.com'],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4 text-sm">
              <span className="w-28 shrink-0 font-medium" style={{ color: 'var(--color-text-dark)' }}>{label}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Clear cart on the client side */}
        <SuccessClient />

        <Link
          href="/shop"
          className="inline-block px-8 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
