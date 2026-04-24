const BASE_URL = "https://api.coingecko.com/api/v3";

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

export const getCoinChart = async (coin,days) => {
  const res = await fetch(
    `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
  );
  const data = await res.json();
  return data.prices;
};