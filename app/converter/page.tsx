import CurrencyConverter from "@/components/dashboard/CurrencyConverter";
import ExchangeChart from "@/components/dashboard/ExchangeChart";
import PageHeader from "@/components/layout/PageHeader";

export default function ConverterPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Currency Converter"
          description="Convert global currencies and view recent exchange movement."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <CurrencyConverter />

          <div className="lg:col-span-2">
            <ExchangeChart />
          </div>
        </div>
      </div>
    </main>
  );
}