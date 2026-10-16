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
  tagline: 'Wear Your Dharma',
  domain: 'hindutee.com',
  niche: 'hindu-diaspora',
  description: 'Premium deity apparel celebrating Hindu culture and diaspora pride.',
  colors: {
    primary: '#C69C46',    // Antique Gold
    secondary: '#D97932',  // Muted Saffron
    canvas: '#F7F3E9',     // Warm Ivory
    surface: '#EDE8DB',    // Slightly deeper ivory for cards
    textLight: '#F7F3E9',  // ivory — used on dark/colored backgrounds
    textDark: '#202B27',   // Deep Charcoal — primary body text on ivory
  },
  fonts: {
    display: 'Cinzel',
    body: 'Inter',
  },
  seo: {
    title: 'HinduTee — Wear Your Dharma',
    description: 'Premium Hindu deity apparel celebrating diaspora pride. Ganesh, Lakshmi, Krishna and more, fused with the colors and spirit of your two homelands.',
  },
  nav: {
    links: [
      { label: 'Shop', href: '/shop' },
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
    ],
  },
  social: {
    instagram: 'https://instagram.com/hindutee',
  },
}

// Active brand — swap this import to switch brands
export const brand = hinduteesBrand
