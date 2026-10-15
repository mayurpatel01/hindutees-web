export type Design = {
  id: number
  slug: string
  name: string
  deity: string
  country_primary: string
  country_secondary?: string
  size_variant: 'FULL' | 'CHEST'
  status: string
  gelato_status: string | null
  image_url: string | null
  mockup_female_url: string | null
  mockup_male_url: string | null
  gelato_product_id: string | null
  price?: number
  created_at: string
}

export type GalatoVariant = {
  id: string
  title: string
  color: string
  size: string
  price: number
  available: boolean
}
