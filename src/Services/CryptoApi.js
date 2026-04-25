const BASE_URL = "/coingecko";
// ✅ API 1: Get coins list
export const getCoins = async () => {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
  const data = await res.json();
  return data;
};

// ✅ API 2: Get global market data
export const getGlobalData = async () => {
  const res = await fetch(`${BASE_URL}/global`);
  const data = await res.json();
  return data;
};


export const getCoinChart = async (coin, days, signal) => {
  try {
    const res = await fetch(
      `/coingecko/coins/${coin}/market_chart?vs_currency=usd&days=${days}`,
      { signal }
    );

    // 🔴 Handle rate limit
    if (res.status === 429) {
      throw new Error("RATE_LIMIT");
    }

    // 🔴 Handle other errors
    if (!res.ok) {
      throw new Error("API_ERROR");
    }

    const data = await res.json();

    return data.prices; // [[time, price], ...]
  } catch (err) {
    // important: rethrow so hook can handle
    throw err;
  }
};