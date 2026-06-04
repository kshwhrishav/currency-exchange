"use client";

import PageHeader from "@/components/layout/PageHeader";
import { useCurrencyStore } from "@/store/currencyStore";

export default function WatchlistPage() {
  const favorites = useCurrencyStore((state) => state.favorites);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Watchlist"
          description="Your saved currency pairs for quick reference."
        />

        {favorites.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold">No saved pairs yet</h2>
            <p className="text-gray-400 mt-2">
              Save a currency pair from the converter to see it here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {favorites.map((pair) => (
              <div
                key={pair}
                className="bg-white/5 border border-white/10 rounded-3xl p-6"
              >
                <p className="text-gray-400 text-sm">Saved Pair</p>
                <h3 className="text-3xl font-bold mt-3">{pair}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}