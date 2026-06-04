import PageHeader from "@/components/layout/PageHeader";
import HeatmapGrid from "@/components/heatmap/HeatmapGrid";

export default function HeatmapPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Currency Heatmap"
          description="Visual overview of currency strength relationships."
        />

        <HeatmapGrid />
      </div>
    </main>
  );
}