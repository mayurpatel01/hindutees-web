'use client'
import Link from 'next/link'
import { brand } from '@/config/brand'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: 'rgba(247, 243, 233, 0.92)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--color-border)',
      }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-semibold tracking-wide"
          style={{ color: 'var(--color-text-heading)' }}>
          {brand.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {brand.nav.links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-dark)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-canvas)',
            }}
          >
            Shop Now
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: 'var(--color-text-dark)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen
              ? <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              : <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-canvas)' }}>
          {brand.nav.links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium"
              style={{ color: 'var(--color-text-muted)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="text-sm font-medium px-4 py-2 rounded-full text-center transition-all duration-200"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </Link>
        </div>
      )}
    </header>
  )
}
