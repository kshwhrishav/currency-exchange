"use client";

import { useState } from "react";
import { useLivePrices } from "@/hooks/useLivePrices";
import LivePriceChart from "./LivePriceChart";

export default function LiveTicker() {
  const { prices, history, connected, usingFallback } = useLivePrices();
  const [selectedSymbol, setSelectedSymbol] = useState("BTC-USD");

  const selectedHistory = history[selectedSymbol] ?? [];

  return (
    <div>
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Live Market Pulse</h2>
            <p className="text-gray-400 text-sm mt-1">
              Real-time crypto prices via WebSocket stream.
            </p>
            {usingFallback && (
              <p className="text-yellow-400 text-sm mt-2">
                Demo stream active because the public WebSocket is blocked on
                this network.
              </p>
            )}
          </div>

          <span
            className={`text-sm px-3 py-1 rounded-full ${
              connected
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {prices.map((item) => (
            <button
              key={item.symbol}
              onClick={() => setSelectedSymbol(item.symbol)}
              className={`text-left border rounded-2xl p-5 transition ${
                selectedSymbol === item.symbol
                  ? "bg-emerald-500/10 border-emerald-500/40"
                  : "bg-black/20 border-white/10 hover:bg-white/10"
              }`}
            >
              <p className="text-gray-400 text-sm">{item.symbol}</p>

              <h3 className="text-2xl font-bold mt-2">
                ${item.price.toLocaleString()}
              </h3>

              <p
                className={`text-sm mt-2 ${
                  item.change >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                Live
              </p>
            </button>
          ))}
        </div>
      </div>

      <LivePriceChart symbol={selectedSymbol} data={selectedHistory} />
    </div>
  );
}
