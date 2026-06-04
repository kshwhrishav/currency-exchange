import PageHeader from "@/components/layout/PageHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="About FxPulse"
          description="A portfolio-focused fintech dashboard built with real exchange-rate data."
        />

        <div className="grid gap-6">
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold">Project Purpose</h2>
            <p className="text-gray-400 mt-3">
              FxPulse transforms public currency exchange data into a clean,
              interactive dashboard for conversion, comparison, watchlisting,
              trends, and market-style visualization.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold">Tech Stack</h2>
            <p className="text-gray-400 mt-3">
              Built with Next.js, TypeScript, Tailwind CSS, React Query,
              Zustand, Recharts, and the Frankfurter public exchange-rate API.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <p className="text-gray-400 mt-3">
              Real-time conversion, historical trends, currency comparison,
              persistent watchlist, and heatmap-based market visualization.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}