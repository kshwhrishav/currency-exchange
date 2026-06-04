"use client";

import { useHeatmap } from "@/hooks/useHeatmap";

function getColor(rate: number) {
  if (rate > 100) return "bg-emerald-600";
  if (rate > 10) return "bg-green-600";
  if (rate > 1) return "bg-lime-600";
  if (rate > 0.5) return "bg-yellow-600";
  return "bg-red-600";
}

export default function HeatmapGrid() {
  const { data, isLoading, error } = useHeatmap();

  if (isLoading) {
    return <p>Loading heatmap...</p>;
  }

  if (error) {
    return <p>Failed to load heatmap.</p>;
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((currencyData: any, index: number) => {
        const base = currencyData[0]?.base;

        return currencyData.map((item: any) => (
          <div
            key={`${base}-${item.quote}`}
            className={`${getColor(
              item.rate
            )} rounded-3xl p-5 text-white`}
          >
            <p className="text-sm opacity-80">
              {base} → {item.quote}
            </p>

            <h3 className="text-3xl font-bold mt-3">
              {item.rate.toFixed(2)}
            </h3>
          </div>
        ));
      })}
    </div>
  );
}