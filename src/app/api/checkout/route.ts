import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import type { CartItem } from '@/lib/cart'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json() as { items: CartItem[] }

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hindutee.com'

    // Persist the order in Supabase so the webhook can read it
    const supabase = await createClient()
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        status: 'pending_payment',
        items: items.map(i => ({
          key: i.key,
          assetId: i.assetId,
          slug: i.slug,
          title: i.title,
          size: i.size,
          price: i.price,
          gelatoProductId: i.gelatoProductId,
          fileUrl: i.fileUrl,
        })),
        total_usd: items.reduce((sum, i) => sum + i.price, 0),
      })
      .select('id')
      .single()

    if (orderErr || !order) {
      console.error('[checkout] Failed to create order:', orderErr?.message)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: `${item.title} — ${item.size}`,
            description: `HinduTee print-on-demand t-shirt, Size ${item.size}`,
            images: item.image ? [item.image] : [],
          },
        },
        quantity: 1,
      })),
      metadata: {
        orderId: order.id,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'IN', 'NZ', 'SG', 'MY', 'AE', 'ZA'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 7 },
              maximum: { unit: 'business_day', value: 14 },
            },
          },
        },
      ],
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop`,
    })

    // Link the Stripe session to the order
    await supabase
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout] Error:', err)
    const msg = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
