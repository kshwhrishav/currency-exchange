"use client";

import { useCurrencyStore } from "@/store/currencyStore";
import { useExchangeRate } from "@/hooks/useExchangeRate";

const currencies = ["USD", "EUR", "GBP", "JPY", "NPR", "INR", "AUD"];

export default function CurrencyConverter() {
  const from = useCurrencyStore((state) => state.from);
  const to = useCurrencyStore((state) => state.to);
  const amount = useCurrencyStore((state) => state.amount);
  const setFrom = useCurrencyStore((state) => state.setFrom);
  const setTo = useCurrencyStore((state) => state.setTo);
  const setAmount = useCurrencyStore((state) => state.setAmount);
  const addFavorite = useCurrencyStore((state) => state.addFavorite);
  const swapCurrencies = useCurrencyStore((state) => state.swapCurrencies);

  const pair = `${from}/${to}`;

  const { data, isLoading, error } = useExchangeRate(from, to, amount);

  const converted = data?.converted;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-6">Currency Converter</h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm text-gray-400">Amount</label>

          <input
            type="number"
            min={0}
            value={amount === 0 ? "" : amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="Enter amount"
            className="w-full mt-2 p-3 rounded-xl bg-white/10 outline-none"
          />
        </div>

        <SelectField label="From" value={from} onChange={setFrom} />
        
        <button
          onClick={swapCurrencies}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-gray-300 hover:bg-white/10 transition"
        >
          Swap currencies
        </button>

        <SelectField label="To" value={to} onChange={setTo} />

        <div className="pt-4">
          <p className="text-sm text-gray-400">Converted Amount</p>

          <h3 className="text-4xl font-bold mt-2">
            {isLoading
              ? "Loading..."
              : error
              ? "Rate unavailable"
              : converted !== undefined
              ? `${converted.toFixed(2)} ${to}`
              : "Rate unavailable"}
          </h3>
        </div>

        <button
          onClick={() => addFavorite(pair)}
          className="w-full mt-5 bg-emerald-500 hover:bg-emerald-600 transition rounded-xl py-3 font-medium"
        >
          Save {pair}
        </button>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 p-3 rounded-xl bg-white/10 outline-none"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency} className="bg-black">
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
