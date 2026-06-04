"use client";

import { useQuery } from "@tanstack/react-query";
import { getExchangeRate } from "@/lib/frankfurter";

export function useExchangeRate(
  from: string,
  to: string,
  amount: number
) {
  return useQuery({
    queryKey: ["exchange-rate", from, to, amount],

    queryFn: () =>
      getExchangeRate(from, to, amount),
  });
}