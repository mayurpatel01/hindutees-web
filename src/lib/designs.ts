import { createClient } from '@/lib/supabase/server'
import type { Asset } from '@/types'

export async function getFeaturedDesigns(limit = 8): Promise<Asset[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('gelato_status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit * 4) // over-fetch to account for mockup filter

  if (error) { console.error('getFeaturedDesigns:', error); return [] }
  return (data ?? [] as Asset[]).filter((a: Asset) => a.mockup_reviewed_at != null).slice(0, limit)
}

export async function getAssetBySlug(slug: string): Promise<Asset | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('slug', slug)
    .eq('gelato_status', 'active')
    .single()

  if (error) { console.error('getAssetBySlug:', error); return null }
  const asset = data as Asset | null
  return asset?.mockup_reviewed_at != null ? asset : null
}

export async function getRelatedByGod(god: string, excludeId: string, limit = 4): Promise<Asset[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('god', god)
    .eq('gelato_status', 'active')
    .neq('id', excludeId)
    .limit(limit * 4)

  if (error) { console.error('getRelatedByGod:', error); return [] }
  return (data ?? [] as Asset[]).filter((a: Asset) => a.mockup_reviewed_at != null).slice(0, limit)
}

export async function getRelatedByCountry(country: string, excludeId: string, limit = 4): Promise<Asset[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('country', country)
    .eq('gelato_status', 'active')
    .neq('id', excludeId)
    .limit(limit * 4)

  if (error) { console.error('getRelatedByCountry:', error); return [] }
  return (data ?? [] as Asset[]).filter((a: Asset) => a.mockup_reviewed_at != null).slice(0, limit)
}

export async function getAllActiveAssets(): Promise<Asset[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('gelato_status', 'active')
    .order('god', { ascending: true })

  if (error) { console.error('getAllActiveAssets:', error); return [] }
  return (data ?? [] as Asset[]).filter((a: Asset) => a.mockup_reviewed_at != null)
}
