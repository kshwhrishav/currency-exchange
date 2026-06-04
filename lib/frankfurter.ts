const BASE_URL = "https://api.frankfurter.dev/v2";

export async function getExchangeRate(
  from: string,
  to: string,
  amount: number
) {
  const res = await fetch(
    `${BASE_URL}/rates?base=${from}&quotes=${to}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch exchange rate");
  }

  const data = await res.json();

  const rate = data[0]?.rate ?? 0;

  return {
    rate,
    converted: rate * amount,
    date: data[0]?.date,
  };
}

export async function getExchangeHistory(from: string, to: string) {
  const end = new Date();
  const start = new Date();

  start.setDate(end.getDate() - 7);

  const startDate = start.toISOString().split("T")[0];
  const endDate = end.toISOString().split("T")[0];

  const res = await fetch(
    `${BASE_URL}/rates?base=${from}&quotes=${to}&from=${startDate}&to=${endDate}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }

  return res.json();
}

export async function getCompareRates(
  target: string
) {
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "INR",
    "AUD",
  ];

  const results = await Promise.all(
    currencies.map(async (base) => {
      const res = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${target}`
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch ${base}/${target}`
        );
      }

      const data = await res.json();

      return {
        base,
        quote: target,
        rate: data[0]?.rate ?? 0,
        date: data[0]?.date,
      };
    })
  );

  return results;
}

export async function getHeatmapData() {
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "INR",
    "AUD",
  ];

  const results = await Promise.all(
    currencies.map(async (base) => {
      const res = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${currencies
          .filter((c) => c !== base)
          .join(",")}`
      );

      return res.json();
    })
  );

  return results;
}