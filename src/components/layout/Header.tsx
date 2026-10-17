'use client'
import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/config/brand'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '@/lib/cart'
import CartDrawer from '@/components/cart/CartDrawer'
import ThemeToggle from '@/components/layout/ThemeToggle'

const SHOP_DEITIES = [
  { label: 'Ganesh',  value: 'ganesh'  },
  { label: 'Lakshmi', value: 'lakshmi' },
  { label: 'Shiva',   value: 'shiva'   },
  { label: 'Krishna', value: 'krishna' },
  { label: 'Hanuman', value: 'hanuman' },
  { label: 'Durga',   value: 'durga'   },
  { label: 'Om',      value: 'om'      },
]

const SHOP_COUNTRIES = [
  { label: 'India',    value: 'india'    },
  { label: 'USA',      value: 'usa'      },
  { label: 'Canada',   value: 'canada'   },
  { label: 'UK',       value: 'uk'       },
  { label: 'Australia',value: 'australia'},
  { label: 'Trinidad', value: 'trinidad' },
  { label: 'Guyana',   value: 'guyana'   },
  { label: 'Fiji',     value: 'fiji'     },
  { label: 'Mauritius',value: 'mauritius'},
]

function ShopDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {/* Trigger */}
      <button
        className="flex items-center gap-1 text-sm font-medium transition-colors duration-200"
        style={{ color: open ? 'var(--color-text-dark)' : 'var(--color-text-muted)' }}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Shop
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{
            transition: 'transform 180ms',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            opacity: 0.6,
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute top-full left-1/2 pt-3 z-50"
          style={{ transform: 'translateX(-50%)', minWidth: '380px' }}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <div
            className="rounded-2xl border p-5 shadow-xl"
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderColor: 'var(--color-border)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
            }}
          >
            {/* Top: view all link */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor: 'var(--color-border)' }}>
              <span className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
                Browse Collection
              </span>
              <Link href="/shop"
                className="text-xs font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-primary)' }}
                onClick={() => setOpen(false)}>
                View all →
              </Link>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-2 gap-6">
              {/* By Deity */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
                  By Deity
                </p>
                <div className="flex flex-col gap-0.5">
                  {SHOP_DEITIES.map(d => (
                    <Link
                      key={d.value}
                      href={`/shop?god=${d.value}`}
                      className="text-sm px-2 py-1.5 rounded-lg transition-colors duration-150"
                      style={{ color: 'var(--color-text-dark)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      onClick={() => setOpen(false)}
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* By Country */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
                  By Country
                </p>
                <div className="flex flex-col gap-0.5">
                  {SHOP_COUNTRIES.map(c => (
                    <Link
                      key={c.value}
                      href={`/shop?country=${c.value}`}
                      className="text-sm px-2 py-1.5 rounded-lg transition-colors duration-150"
                      style={{ color: 'var(--color-text-dark)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      onClick={() => setOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopExpanded, setShopExpanded] = useState(false)
  const { items, setOpen: setCartOpen } = useCart()
  const itemCount = items.length

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: 'var(--color-header-bg)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--color-border)',
        }}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label={brand.name}>
            <Image
              src="/logo.png"
              alt={brand.name}
              width={180}
              height={102}
              priority
              className="h-20 w-auto"
              style={{ filter: 'var(--logo-filter)' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Shop with dropdown */}
            <ShopDropdown />

            {/* Blog + About as simple links */}
            {brand.nav.links
              .filter(link => link.href !== '/shop')
              .map(link => (
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

            <ThemeToggle />

            {/* Cart icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1 transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-dark)' }}
              aria-label={`Cart — ${itemCount} items`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold leading-none"
                  style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-canvas)' }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile: theme toggle + cart + menu */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1"
              style={{ color: 'var(--color-text-dark)' }}
              aria-label={`Cart — ${itemCount} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold leading-none"
                  style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-canvas)' }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="p-2"
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
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 flex flex-col gap-1"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-canvas)' }}>

            {/* Shop accordion */}
            <button
              className="flex items-center justify-between text-sm font-medium py-2.5 w-full"
              style={{ color: 'var(--color-text-muted)' }}
              onClick={() => setShopExpanded(v => !v)}
            >
              <span>Shop</span>
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                style={{
                  transition: 'transform 180ms',
                  transform: shopExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  opacity: 0.5,
                }}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {shopExpanded && (
              <div className="pl-3 pb-2">
                {/* View all */}
                <Link
                  href="/shop"
                  className="block text-sm font-medium py-1.5 mb-2"
                  style={{ color: 'var(--color-primary)' }}
                  onClick={() => { setMenuOpen(false); setShopExpanded(false) }}
                >
                  View All →
                </Link>

                <div className="grid grid-cols-2 gap-x-6">
                  {/* By Deity */}
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-2 font-semibold"
                      style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
                      By Deity
                    </p>
                    {SHOP_DEITIES.map(d => (
                      <Link
                        key={d.value}
                        href={`/shop?god=${d.value}`}
                        className="block text-sm py-1"
                        style={{ color: 'var(--color-text-dark)' }}
                        onClick={() => { setMenuOpen(false); setShopExpanded(false) }}
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>

                  {/* By Country */}
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-2 font-semibold"
                      style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
                      By Country
                    </p>
                    {SHOP_COUNTRIES.map(c => (
                      <Link
                        key={c.value}
                        href={`/shop?country=${c.value}`}
                        className="block text-sm py-1"
                        style={{ color: 'var(--color-text-dark)' }}
                        onClick={() => { setMenuOpen(false); setShopExpanded(false) }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Blog + About */}
            {brand.nav.links
              .filter(link => link.href !== '/shop')
              .map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-2.5"
                  style={{ color: 'var(--color-text-muted)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

            <Link
              href="/shop"
              className="text-sm font-medium px-4 py-2.5 rounded-full text-center mt-2 transition-all duration-200"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-canvas)' }}
              onClick={() => setMenuOpen(false)}
            >
              Shop Now
            </Link>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  )
}
