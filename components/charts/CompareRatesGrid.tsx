"use client";

import { useCompareRates } from "@/hooks/useCompareRates";
import CompareRateCard from "@/components/cards/CompareRateCard";

export default function CompareRatesGrid() {
  const { data, isLoading, error } = useCompareRates("NPR");

  if (isLoading) {
    return <p className="text-gray-400">Loading comparison...</p>;
  }

  if (error) {
    return <p className="text-red-400">Failed to load comparison rates.</p>;
  }

  const sortedData = [...(data ?? [])].sort(
    (a, b) => b.rate - a.rate
  );

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5">
        {sortedData.map((item) => (
          <CompareRateCard
            key={item.base}
            base={item.base}
            quote={item.quote}
            rate={item.rate}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}