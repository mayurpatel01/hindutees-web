export type BrandConfig = {
  id: string
  name: string
  tagline: string
  domain: string
  niche: string
  description: string
  colors: {
    primary: string    // main accent
    secondary: string  // hover/badge
    canvas: string     // page background
    surface: string    // card/section background
    textLight: string  // on dark backgrounds
    textDark: string   // on light backgrounds
  }
  fonts: {
    display: string
    body: string
  }
  seo: {
    title: string
    description: string
    ogImage?: string
  }
  nav: {
    links: { label: string; href: string }[]
  }
  social?: {
    instagram?: string
    tiktok?: string
    facebook?: string
  }
}

export const hinduteesBrand: BrandConfig = {
  id: 'hindutees',
  name: 'HinduTee',
  tagline: 'Wear Your Devotion',
  domain: 'hindutee.com',
  niche: 'hindu-diaspora',
  description: 'Premium deity apparel celebrating Hindu culture and diaspora pride.',
  colors: {
    primary: '#F5A100',    // marigold
    secondary: '#9B1B3A',  // kumkum red
    canvas: '#08071A',     // deep indigo-black
    surface: '#110F2A',    // slightly lighter indigo
    textLight: '#F0EBE0',  // warm parchment
    textDark: '#1A1526',   // deep text on light
  },
  fonts: {
    display: 'Cinzel',
    body: 'Inter',
  },
  seo: {
    title: 'HinduTee — Wear Your Devotion',
    description: 'Premium Hindu deity apparel celebrating diaspora pride. Ganesh, Lakshmi, Krishna and more, fused with the flags of your two homelands.',
  },
  nav: {
    links: [
      { label: 'Shop', href: '/shop' },
      { label: 'About', href: '/about' },
    ],
  },
  social: {
    instagram: 'https://instagram.com/hindutee',
  },
}

// Active brand — swap this import to switch brands
export const brand = hinduteesBrand
