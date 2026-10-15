import type { Metadata } from 'next'
import './globals.css'
import { brand } from '@/config/brand'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
  metadataBase: new URL(`https://${brand.domain}`),
  openGraph: {
    title: brand.seo.title,
    description: brand.seo.description,
    siteName: brand.name,
    type: 'website',
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
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
