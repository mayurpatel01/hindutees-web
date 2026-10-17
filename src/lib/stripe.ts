import Stripe from 'stripe'

// Lazy singleton — instantiated on first call so the module can be imported
// during Next.js build without STRIPE_SECRET_KEY being present at that point.
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-09-30.endive',
    })
  }
  return _stripe
}

// Named export kept for backwards compatibility with any direct imports,
// but now uses the lazy getter so it doesn't throw at module evaluation.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
