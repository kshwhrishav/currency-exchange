import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { getCompareRates, getHeatmapData } from "@/lib/frankfurter";

export default async function Home() {
  const [compareData, heatmapData] = await Promise.all([
    getCompareRates("NPR"),
    getHeatmapData(),
  ]);

  const topRates = compareData.slice(0, 3);

  const heatmapPreview = heatmapData.flat().slice(0, 8);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="FxPulse Dashboard"
          description="A server-rendered overview of global currency movement, comparison, and exchange insight."
        />

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <Link
            href="/converter"
            className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition"
          >
            <p className="text-gray-400 text-sm">Tool</p>
            <h2 className="text-2xl font-bold mt-2">Currency Converter</h2>
            <p className="text-gray-500 mt-2">
              Convert selected pairs instantly.
            </p>
          </Link>

          <Link
            href="/compare"
            className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition"
          >
            <p className="text-gray-400 text-sm">Market</p>
            <h2 className="text-2xl font-bold mt-2">Compare Rates</h2>
            <p className="text-gray-500 mt-2">
              Rank major currencies against NPR.
            </p>
          </Link>

          <Link
            href="/heatmap"
            className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition"
          >
            <p className="text-gray-400 text-sm">Visual</p>
            <h2 className="text-2xl font-bold mt-2">Currency Heatmap</h2>
            <p className="text-gray-500 mt-2">
              Explore strength relationships visually.
            </p>
          </Link>
        </div>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Major Currencies vs NPR</h2>

            <Link href="/compare" className="text-sm text-emerald-400">
              View all
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {topRates.map((item) => (
              <div
                key={item.base}
                className="bg-white/5 border border-white/10 rounded-3xl p-6"
              >
                <p className="text-gray-400 text-sm">
                  {item.base} / {item.quote}
                </p>

                <h3 className="text-3xl font-bold mt-3">
                  {item.rate.toFixed(2)}
                </h3>

                <p className="text-gray-500 text-sm mt-3">
                  Updated {item.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Heatmap Preview</h2>

            <Link href="/heatmap" className="text-sm text-emerald-400">
              Open heatmap
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {heatmapPreview.map((item: any) => (
              <div
                key={`${item.base}-${item.quote}`}
                className="bg-white/5 border border-white/10 rounded-3xl p-5"
              >
                <p className="text-gray-400 text-sm">
                  {item.base} → {item.quote}
                </p>

                <h3 className="text-2xl font-bold mt-3">
                  {item.rate.toFixed(2)}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}