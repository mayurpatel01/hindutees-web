// Gelato Order API v4 — place print orders after Stripe payment
// Docs: https://dashboard.gelato.com/docs/orders/v4/

const GELATO_ORDER_URL = 'https://order.gelatoapis.com/v4'
const GELATO_ECOM_URL = 'https://ecommerce.gelatoapis.com/v1'

function apiKey(): string {
  const key = process.env.GELATO_API_KEY
  if (!key) throw new Error('GELATO_API_KEY is not set')
  return key
}

function storeId(): string {
  const id = process.env.GELATO_STORE_ID
  if (!id) throw new Error('GELATO_STORE_ID is not set')
  return id
}

export type GelatoVariant = {
  id: string
  title?: string
  productUid?: string
  variantOptions?: Array<{ name: string; value: string }>
}

/** Fetch a store product's variants to find the right size */
export async function getProductVariants(gelatoProductId: string): Promise<GelatoVariant[]> {
  const res = await fetch(
    `${GELATO_ECOM_URL}/stores/${storeId()}/products/${encodeURIComponent(gelatoProductId)}`,
    { headers: { 'X-API-KEY': apiKey() }, signal: AbortSignal.timeout(15_000) }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Gelato product fetch ${res.status}: ${text.slice(0, 200)}`)
  }
  const data = await res.json() as { variants?: GelatoVariant[] }
  return data.variants ?? []
}

/**
 * Find the variant ID matching a requested size label ('S', 'M', 'L', 'XL', '2XL').
 * Gelato variant titles are like "White / S" or "Black / Medium" — we match flexibly.
 */
export function findVariantForSize(variants: GelatoVariant[], size: string): string | null {
  const sizeUpper = size.toUpperCase()
  const sizeMap: Record<string, string[]> = {
    'S':   ['S', 'SMALL'],
    'M':   ['M', 'MEDIUM'],
    'L':   ['L', 'LARGE'],
    'XL':  ['XL', 'X-LARGE', 'XLARGE', 'EXTRA LARGE'],
    '2XL': ['2XL', 'XXL', '2X-LARGE', 'XX-LARGE'],
  }
  const candidates = sizeMap[sizeUpper] ?? [sizeUpper]

  for (const variant of variants) {
    // Check variantOptions first (most reliable)
    const sizeOption = variant.variantOptions?.find(o => o.name.toLowerCase() === 'size')
    if (sizeOption && candidates.includes(sizeOption.value.toUpperCase())) return variant.id

    // Fall back to title matching
    if (variant.title) {
      const titleUpper = variant.title.toUpperCase()
      if (candidates.some(c => {
        // Match as a word boundary: " S " or "/ S " or ends with " S"
        const re = new RegExp(`(^|[\\s/])${c}([\\s/]|$)`)
        return re.test(titleUpper)
      })) {
        return variant.id
      }
    }
  }
  return null
}

export type GelatoShippingAddress = {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  city: string
  postCode: string
  state?: string
  country: string // ISO alpha-2
  email: string
  phone?: string
}

export type GelatoOrderItem = {
  itemReferenceId: string
  /** Gelato store variant ID from getProductVariants() */
  storeProductVariantId: string
  quantity: number
}

export type PlaceOrderParams = {
  orderReferenceId: string // e.g. "hindutee-{stripeSessionId}"
  items: GelatoOrderItem[]
  shippingAddress: GelatoShippingAddress
  currency?: string
}

export type GelatoOrderResponse = {
  id: string
  orderReferenceId?: string
  status?: string
  [key: string]: unknown
}

/** Place a production order with Gelato */
export async function placeGelatoOrder(params: PlaceOrderParams): Promise<GelatoOrderResponse> {
  const body = {
    orderType: 'order',
    orderReferenceId: params.orderReferenceId,
    storeId: storeId(),
    currency: params.currency ?? 'USD',
    items: params.items,
    shipmentMethodUid: 'normal',
    shippingAddress: params.shippingAddress,
  }

  const res = await fetch(`${GELATO_ORDER_URL}/orders`, {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  })

  const text = await res.text()
  let data: unknown
  try { data = JSON.parse(text) } catch { data = text }

  if (!res.ok) {
    const msg = (data as { message?: string } | null)?.message ?? (typeof data === 'string' ? data : '')
    throw new Error(`Gelato order API ${res.status}: ${msg || text.slice(0, 200)}`)
  }

  return data as GelatoOrderResponse
}
