import PageHeader from "@/components/layout/PageHeader";
import CompareRatesGrid from "@/components/charts/CompareRatesGrid";

export default function ComparePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Currency Compare"
          description="Compare major global currencies against NPR."
        />

        <CompareRatesGrid />
      </div>
    </main>
  );
}