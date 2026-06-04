"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useCurrencyStore } from "@/store/currencyStore";
import { useExchangeHistory } from "@/hooks/useExchangeHistory";

export default function ExchangeChart() {
  const { from, to } = useCurrencyStore();
  const { data, isLoading } = useExchangeHistory(from, to);

  const chartData = Array.isArray(data)
  ? data.map((item: any, index: number) => {
      const firstRate = data[0]?.rate || 1;

      return {
        date: item.date.slice(5),
        rate: item.rate,
        movement: Number(
          (((item.rate - firstRate) / firstRate) * 100).toFixed(2)
        ),
      };
    })
  : [];

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold">7-Day Exchange Trend</h2>

      <p className="text-gray-400 text-sm mt-1 mb-8">
        {from} to {to}
      </p>

      <div className="h-[320px]">
        {isLoading ? (
          <p className="text-gray-400">Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="movement"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}