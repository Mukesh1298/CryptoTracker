import { useEffect, useState } from "react";
import { getCoinChart } from "../Services/CryptoApi";

const useCoinChart = (coin,days) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coin) return;

    let isMounted = true; // prevent memory leak

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getCoinChart(coin,days);

        const formatted = res.map((item) => ({
          time: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));

        if (isMounted) {
          setData(formatted);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch chart data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [coin,days]);

  return { data, loading, error };
};

export default useCoinChart;