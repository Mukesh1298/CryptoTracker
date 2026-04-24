import { useState,useEffect } from "react";
import { getCoins } from "../Services/CryptoApi";
const useCoins=()=>{
  
const [coins, setCoins] = useState([]);

   useEffect(() => {
  getCoins()
    .then((data) => setCoins(data))
   
}, []);

return coins;
}
export default useCoins;