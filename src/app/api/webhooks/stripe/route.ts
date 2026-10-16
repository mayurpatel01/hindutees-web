import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import {
  getProductVariants,
  findVariantForSize,
  placeGelatoOrder,
  type GelatoShippingAddress,
  type GelatoOrderItem,
} from '@/lib/gelato/orders'
import type Stripe from 'stripe'

export const maxDuration = 60

// Use the service-role key for webhook processing (no user auth context)
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js')
  return createClient(url, key)
}

type OrderItem = {
  assetId: string
  slug: string
  title: string
  size: string
  price: number
  gelatoProductId: string
  fileUrl: string
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: 'Missing webhook config' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] Invalid signature:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const orderId = session.metadata?.orderId

  if (!orderId) {
    console.error('[stripe-webhook] No orderId in session metadata', session.id)
    return NextResponse.json({ error: 'No orderId in metadata' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  // Fetch the order from Supabase
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (orderErr || !order) {
    console.error('[stripe-webhook] Order not found:', orderId, orderErr?.message)
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // Build Gelato shipping address from Stripe's collected address
  // In Stripe API 2026+, shipping info lives under collected_information.shipping_details
  const collectedShipping = session.collected_information?.shipping_details
  const stripeAddress = collectedShipping?.address
  const stripeName = collectedShipping?.name ?? session.customer_details?.name ?? ''
  const stripeEmail = session.customer_details?.email ?? ''
  const [firstName, ...lastParts] = stripeName.split(' ')
  const lastName = lastParts.join(' ')

  if (!stripeAddress) {
    console.error('[stripe-webhook] No shipping address on session', session.id)
    // Mark as paid but without shipping — needs manual review
    await supabase
      .from('orders')
      .update({
        status: 'paid_no_address',
        stripe_session_id: session.id,
        stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        customer_email: stripeEmail,
      })
      .eq('id', orderId)
    return NextResponse.json({ received: true })
  }

  const shippingAddress: GelatoShippingAddress = {
    firstName: firstName || 'Customer',
    lastName: lastName || '',
    addressLine1: stripeAddress.line1 ?? '',
    addressLine2: stripeAddress.line2 ?? undefined,
    city: stripeAddress.city ?? '',
    postCode: stripeAddress.postal_code ?? '',
    state: stripeAddress.state ?? undefined,
    country: stripeAddress.country ?? 'US',
    email: stripeEmail,
  }

  const items: OrderItem[] = order.items ?? []
  const gelatoItems: GelatoOrderItem[] = []
  const errors: string[] = []

  // For each cart item, look up the Gelato variant for the chosen size
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    try {
      const variants = await getProductVariants(item.gelatoProductId)
      const variantId = findVariantForSize(variants, item.size)

      if (!variantId) {
        // Log all available variant titles for debugging
        const titles = variants.map(v => v.title ?? v.id).join(', ')
        console.error(`[stripe-webhook] No variant found for size ${item.size} on product ${item.gelatoProductId}. Available: ${titles}`)
        errors.push(`Size ${item.size} not found for ${item.title}`)
        continue
      }

      gelatoItems.push({
        itemReferenceId: `item-${i + 1}`,
        storeProductVariantId: variantId,
        quantity: 1,
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`[stripe-webhook] Failed to get variants for ${item.gelatoProductId}:`, msg)
      errors.push(`Failed to resolve ${item.title}: ${msg}`)
    }
  }

  // Update order as paid with shipping details
  await supabase
    .from('orders')
    .update({
      status: gelatoItems.length > 0 ? 'paid' : 'paid_variant_error',
      stripe_session_id: session.id,
      stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      customer_email: stripeEmail,
      shipping_address: shippingAddress,
    })
    .eq('id', orderId)

  if (gelatoItems.length === 0) {
    console.error('[stripe-webhook] No Gelato items resolved — skipping order placement', errors)
    return NextResponse.json({ received: true, errors })
  }

  // Place the Gelato order
  try {
    const gelatoOrder = await placeGelatoOrder({
      orderReferenceId: `hindutee-${orderId}`,
      items: gelatoItems,
      shippingAddress,
      currency: session.currency?.toUpperCase() ?? 'USD',
    })

    await supabase
      .from('orders')
      .update({
        status: 'gelato_placed',
        gelato_order_id: gelatoOrder.id,
      })
      .eq('id', orderId)

    console.log(`[stripe-webhook] ✓ Gelato order placed: ${gelatoOrder.id} for order ${orderId}`)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[stripe-webhook] Gelato order failed:', msg)
    await supabase
      .from('orders')
      .update({ status: 'gelato_error', gelato_error: msg })
      .eq('id', orderId)
  }

  return NextResponse.json({ received: true })
}
