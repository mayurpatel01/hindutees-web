import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hindutee.com'

export const revalidate = 3600 // regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  try {
    const supabase = await createClient()

    // Product pages
    const { data: assets } = await supabase
      .from('assets')
      .select('slug, updated_at')
      .eq('gelato_status', 'active')
      .not('slug', 'is', null)
      .order('design_number', { ascending: true })

    const productPages: MetadataRoute.Sitemap = (assets ?? [])
      .filter(a => a.slug)
      .map(a => ({
        url: `${BASE_URL}/products/${a.slug}`,
        lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))

    // Blog pages
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })

    const blogPages: MetadataRoute.Sitemap = (posts ?? [])
      .filter(p => p.slug)
      .map(p => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: p.published_at ? new Date(p.published_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))

    return [...staticPages, ...productPages, ...blogPages]
  } catch {
    // If Supabase is unreachable, return just static pages
    return staticPages
  }
}
