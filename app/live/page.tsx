import PageHeader from "@/components/layout/PageHeader";
import LiveTicker from "@/components/live/LiveTicker";

export default function LivePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Live Market Pulse"
          description="A real-time WebSocket-powered market feed showing live crypto price movement."
        />

        <LiveTicker />
      </div>
    </main>
  );
}