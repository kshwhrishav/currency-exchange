"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

type PricePoint = {
  time: string;
  price: number;
};

type Props = {
  symbol: string;
  data: PricePoint[];
};

export default function LivePriceChart({ symbol, data }: Props) {
  return (
    <div className="bg-black/20 border border-white/10 rounded-3xl p-6 mt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Live Price Movement</h2>
        <p className="text-gray-400 text-sm mt-1">
          Streaming chart for {symbol}
        </p>
      </div>

      <div className="h-[360px]">
        {data.length < 2 ? (
          <p className="text-gray-400">Waiting for live ticks...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" stroke="#94a3b8" hide />
              <YAxis
                stroke="#94a3b8"
                domain={["auto", "auto"]}
                tickFormatter={(value) => Number(value).toLocaleString()}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}