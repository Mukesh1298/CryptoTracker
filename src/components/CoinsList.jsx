import { Link } from "react-router-dom";
import { useState,useRef, useEffect } from "react";
import useCoins from "../hooks/useCoins";
import { Coins, BarChart2, LineChart, SlidersHorizontal } from "lucide-react";
function CoinsList(){
const [search, setSearch] = useState("");
const coins=useCoins();
   const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 100); 
  return (
    <div className="bg-[#020617] min-h-screen text-white p-4 pb-24">
     

      {/* Search */}
      <div className="bg-[#111827] rounded-xl flex items-center px-4 py-3 mb-4">
        <input
          type="text"
          placeholder="Search assets..."
          className="bg-transparent outline-none w-full text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          <button className="bg-blue-600 px-4  rounded-full text-sm">
            Price
          </button>
         <Link to="/market">Market</Link>
        </div>

        <button className="bg-[#111827] p-3 rounded-full">
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* Coins */}
      {filtered.map((coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;

        return (
          <div
            key={coin.id}
            className="bg-[#111827] rounded-2xl p-5 mb-6 shadow-lg"
          >
            {/* Top */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={coin.image}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {coin.name}
                  </h2>
                  <p className="text-gray-400 text-sm uppercase">
                    {coin.symbol}
                  </p>
                </div>

                <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                  RANK {coin.market_cap_rank}
                </span>
              </div>

              <div className="text-right">
                <h2 className="text-xl font-bold">
                  ${coin.current_price.toLocaleString()}
                </h2>
                <p
                  className={`text-sm ${
                    isPositive
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-4"></div>

            {/* Bottom */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Market Cap</p>
                <p>
                  $
                  {(coin.market_cap / 1e9).toFixed(2)}B
                </p>
              </div>

              <div className="text-right">
                <p className="text-gray-400">24H Change</p>
                <p
                  className={
                    isPositive
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  ${coin.price_change_24h.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-gray-400">24H Low</p>
                <p>${coin.low_24h.toLocaleString()}</p>
              </div>

              <div className="text-right">
                <p className="text-gray-400">24H High</p>
                <p>${coin.high_24h.toLocaleString()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoinsList;