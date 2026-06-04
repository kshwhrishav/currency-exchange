"use client";

import { useEffect, useState } from "react";

type LivePrice = {
  symbol: string;
  price: number;
  change: number;
};

type PricePoint = {
  time: string;
  price: number;
};

const products = ["BTC-USD", "ETH-USD", "SOL-USD"];

const initialPrices: Record<string, number> = {
  "BTC-USD": 108000,
  "ETH-USD": 5400,
  "SOL-USD": 245,
};

export function useLivePrices() {
  const [prices, setPrices] = useState<Record<string, LivePrice>>({});
  const [history, setHistory] = useState<Record<string, PricePoint[]>>({});
  const [connected, setConnected] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let fallbackInterval: NodeJS.Timeout | null = null;

    function pushPrice(symbol: string, price: number, change = 0) {
      setPrices((prev) => ({
        ...prev,
        [symbol]: { symbol, price, change },
      }));

      setHistory((prev) => {
        const current = prev[symbol] ?? [];

        return {
          ...prev,
          [symbol]: [
            ...current.slice(-29),
            {
              time: new Date().toLocaleTimeString(),
              price,
            },
          ],
        };
      });
    }

    function startFallback() {
      setUsingFallback(true);
      setConnected(true);

      fallbackInterval = setInterval(() => {
        products.forEach((symbol) => {
          const last =
            history[symbol]?.at(-1)?.price ??
            initialPrices[symbol];

          const randomMovement =
            last * (Math.random() * 0.002 - 0.001);

          const nextPrice = last + randomMovement;

          pushPrice(symbol, nextPrice, randomMovement);
        });
      }, 1200);
    }

    const socket = new WebSocket("wss://ws-feed.exchange.coinbase.com");

    const failTimer = setTimeout(() => {
      if (socket.readyState !== WebSocket.OPEN) {
        socket.close();
        startFallback();
      }
    }, 3000);

    socket.onopen = () => {
      clearTimeout(failTimer);
      setConnected(true);

      socket.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: products,
          channels: ["ticker"],
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type !== "ticker") return;

      pushPrice(data.product_id, Number(data.price), 0);
    };

    socket.onerror = () => {
      clearTimeout(failTimer);
      startFallback();
    };

    socket.onclose = () => {
      if (!usingFallback) {
        setConnected(false);
      }
    };

    return () => {
      clearTimeout(failTimer);
      socket.close();

      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
    };
  }, []);

  return {
    prices: Object.values(prices),
    history,
    connected,
    usingFallback,
  };
}