'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const SIZES = ['S', 'M', 'L', 'XL', '2XL'] as const
export type Size = typeof SIZES[number]

export type CartItem = {
  /** Unique key = assetId + size */
  key: string
  assetId: string
  slug: string
  title: string
  image: string | null
  size: Size
  price: number
  gelatoProductId: string
  fileUrl: string
}

type CartState = {
  items: CartItem[]
  open: boolean
  addItem: (item: Omit<CartItem, 'key'>) => void
  removeItem: (key: string) => void
  updateQty: (key: string, qty: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,

      addItem: (item) => {
        const key = `${item.assetId}-${item.size}`
        const existing = get().items.find(i => i.key === key)
        if (existing) {
          set({ items: get().items.map(i => i.key === key ? { ...i } : i), open: true })
        } else {
          set({ items: [...get().items, { ...item, key }], open: true })
        }
      },

      removeItem: (key) =>
        set({ items: get().items.filter(i => i.key !== key) }),

      updateQty: (key, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter(i => i.key !== key) })
        } else {
          set({ items: get().items.map(i => i.key === key ? { ...i } : i) })
        }
      },

      clearCart: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: 'hindutee-cart',
      // Only persist items, not open state
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
