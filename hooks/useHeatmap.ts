"use client";

import { useQuery } from "@tanstack/react-query";
import { getHeatmapData } from "@/lib/frankfurter";

export function useHeatmap() {
  return useQuery({
    queryKey: ["heatmap"],
    queryFn: getHeatmapData,
  });
}