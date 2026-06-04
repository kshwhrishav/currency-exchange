import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrencyState = {
  from: string;
  to: string;
  amount: number;
  favorites: string[];
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  setAmount: (value: number) => void;
  addFavorite: (pair: string) => void;
  swapCurrencies: () => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      from: "USD",
      to: "NPR",
      amount: 1,
      favorites: [],
      setFrom: (value) => set({ from: value }),
      setTo: (value) => set({ to: value }),
      setAmount: (value) => set({ amount: value }),
      addFavorite: (pair) => {
        const existing = get().favorites;
        if (!existing.includes(pair)) {
          set({ favorites: [...existing, pair] });
        }
      },
      swapCurrencies: () =>
        set((state) => ({
          from: state.to,
          to: state.from,
        })),
    }),
    {
      name: "fxpulse-store",
    }
  )
);
