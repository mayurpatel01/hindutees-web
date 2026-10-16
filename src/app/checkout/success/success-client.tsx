'use client'
import { useEffect } from 'react'
import { useCart } from '@/lib/cart'

/** Clears the cart after a successful checkout */
export default function SuccessClient() {
  const clearCart = useCart(s => s.clearCart)
  const setOpen = useCart(s => s.setOpen)

  useEffect(() => {
    clearCart()
    setOpen(false)
  }, [clearCart, setOpen])

  return null
}
