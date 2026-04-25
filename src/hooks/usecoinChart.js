import { useEffect, useState } from "react";
import { getCoinChart } from "../Services/CryptoApi";

const cache = new Map();
const CACHE_TIME = 2 * 60 * 1000; // 2 minutes

const useCoinChart = (coin, days) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coin || !days) return;

    const key = `${coin.toLowerCase()}-${days}`;
    const cached = cache.get(key);

    if (cached && Date.now() - cached.time < CACHE_TIME) {
      setData(cached.data);
      setError(null);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getCoinChart(
          coin.toLowerCase(),
          days,
          controller.signal
        );

        const formatted = res.map((item) => ({
          time: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));

        cache.set(key, {
          data: formatted,
          time: Date.now(),
        });

        if (isMounted) setData(formatted);
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          if (err.message === "RATE_LIMIT") {
            setError("Too many requests. Wait 2-5 minutes.");
          } else {
            setError("Failed to fetch chart data.");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [coin, days]);

  return { data, loading, error };
};

export default useCoinChart;