import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}

interface CartState {
  items: Record<number, CartItem>;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useCartStore = createWithEqualityFn<CartState>()(
  persist(
    devtools((set) => ({
      items: {},

      add: (item) =>
        set((state) => {
          const existing = state.items[item.id];
          const qty = existing ? existing.qty + 1 : 1;
          return {
            items: { ...state.items, [item.id]: { ...item, qty } },
          };
        }),

      remove: (id) =>
        set((state) => {
          const copy = { ...state.items };
          delete copy[id];
          return { items: copy };
        }),

      clear: () => set({ items: {} }),
    })),
    { name: "fincart-cart" }
  ),
  Object.is
);

export const useCartItems = () =>
  useCartStore((s) => Object.values(s.items), shallow);

export const useCartSummary = () =>
  useCartStore((s) => {
    const items = Object.values(s.items);
    return {
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
    };
  }, shallow);
