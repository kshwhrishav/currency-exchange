type Props = {
  base: string;
  quote: string;
  rate: number;
  date?: string;
};

export default function CompareRateCard({
  base,
  quote,
  rate,
  date,
}: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition">
      <p className="text-gray-400 text-sm">
        {base} / {quote}
      </p>

      <h3 className="text-3xl font-bold mt-3">
        {rate.toFixed(2)}
      </h3>

      <p className="text-gray-500 text-sm mt-3">
        Updated {date}
      </p>
    </div>
  );
}