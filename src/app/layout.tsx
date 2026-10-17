import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { brand } from '@/config/brand'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
  metadataBase: new URL(`https://${brand.domain}`),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: brand.seo.title,
    description: brand.seo.description,
    siteName: brand.name,
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: brand.seo.title,
    description: brand.seo.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Prevent flash of wrong theme — runs before paint */}
      <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('ht-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
      {/* Google Analytics 4 — G-06N6MZW8Z1 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-06N6MZW8Z1"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-06N6MZW8Z1');
      `}</Script>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
