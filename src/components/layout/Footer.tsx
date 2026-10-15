import Link from 'next/link'
import { brand } from '@/config/brand'

export default function Footer() {
  return (
    <footer className="border-t mt-24"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display text-lg font-semibold mb-1"
            style={{ color: 'var(--color-primary)' }}>
            {brand.name}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {brand.tagline}
          </p>
        </div>

        <nav className="flex flex-wrap gap-6">
          {brand.nav.links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/shipping" className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Shipping
          </Link>
          <Link href="/returns" className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Returns
          </Link>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-8">
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          © {new Date().getFullYear()} {brand.name}. All rights reserved. Fulfilled by Gelato.
        </p>
      </div>
    </footer>
  )
}
