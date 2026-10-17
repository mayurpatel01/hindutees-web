export type Asset = {
  id: string              // uuid
  design_number: number   // numeric ID (1001, 1002...)
  slug: string | null
  name: string
  god: string
  country: string
  size_variant: 'FULL' | 'CHEST'
  status: string
  gelato_status: string | null
  gelato_product_id: string | null
  gelato_product_url: string | null
  file_url: string | null
  mockup_female_url: string | null
  mockup_male_url: string | null
  mockup_reviewed_at: string | null
  seo_title: string | null
  seo_description: string | null
  created_at: string
}
