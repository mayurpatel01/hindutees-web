import { createClient } from '@/lib/supabase/server'
import type { Design } from '@/types'

export async function getFeaturedDesigns(limit = 8): Promise<Design[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('gelato_status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) { console.error('getFeaturedDesigns:', error); return [] }
  return data ?? []
}

export async function getDesignBySlug(slug: string): Promise<Design | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('slug', slug)
    .eq('gelato_status', 'active')
    .single()

  if (error) { console.error('getDesignBySlug:', error); return null }
  return data
}

export async function getRelatedByDeity(deity: string, excludeId: number, limit = 4): Promise<Design[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('deity', deity)
    .eq('gelato_status', 'active')
    .neq('id', excludeId)
    .limit(limit)

  if (error) { console.error('getRelatedByDeity:', error); return [] }
  return data ?? []
}

export async function getRelatedByCountry(country: string, excludeId: number, limit = 4): Promise<Design[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('country_primary', country)
    .eq('gelato_status', 'active')
    .neq('id', excludeId)
    .limit(limit)

  if (error) { console.error('getRelatedByCountry:', error); return [] }
  return data ?? []
}

export async function getAllActiveDesigns(): Promise<Design[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('gelato_status', 'active')
    .order('deity', { ascending: true })

  if (error) { console.error('getAllActiveDesigns:', error); return [] }
  return data ?? []
}
