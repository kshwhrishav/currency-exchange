"use client";

import { useQuery } from "@tanstack/react-query";
import { getExchangeHistory } from "@/lib/frankfurter";

export function useExchangeHistory(from: string, to: string) {
  return useQuery({
    queryKey: ["exchange-history", from, to],
    queryFn: () => getExchangeHistory(from, to),
  });
}