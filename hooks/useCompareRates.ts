"use client";

import { useQuery } from "@tanstack/react-query";
import { getCompareRates } from "@/lib/frankfurter";

export function useCompareRates(
  target = "NPR"
) {
  return useQuery({
    queryKey: ["compare-rates", target],
    queryFn: () =>
      getCompareRates(target),
  });
}