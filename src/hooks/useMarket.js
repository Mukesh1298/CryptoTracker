import { useEffect, useState } from "react";
import { getGlobalData } from "../Services/CryptoApi";
const useMarket = () => {
  const [market, setMarket] = useState(null);

useEffect(() => {
  getGlobalData()
    .then((data) => setMarket(data.data))
    .catch((error) => {
      console.error("Error fetching market:", error);
      setMarket(null); 
    });
}, []);

return market;
};

export default useMarket;