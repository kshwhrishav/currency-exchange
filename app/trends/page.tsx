import PageHeader from "@/components/layout/PageHeader";
import ExchangeChart from "@/components/dashboard/ExchangeChart";

export default function TrendsPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Exchange Trends"
          description="Track short-term movement between selected currency pairs."
        />

        <ExchangeChart />
      </div>
    </main>
  );
}