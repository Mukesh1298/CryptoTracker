import useMarket from "../hooks/useMarket";
function MarketCard(){
  const market = useMarket();
  if (!market) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-[#020617] min-h-screen text-white p-4">
      {/* Navbar */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">CryptoTracker</h1>
        <span className="text-blue-400">Market</span>
      </div>

      {/* Total Market Cap */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 rounded-2xl mb-6">
        <p className="text-sm text-gray-200">TOTAL MARKET CAP</p>
        <h1 className="text-3xl font-bold">
          ${(market.total_market_cap.usd / 1e12).toFixed(2)}T
        </h1>
        <p className="text-green-300 text-sm">
          ↑ {market.market_cap_change_percentage_24h_usd.toFixed(2)}%
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-4">

        {/* Volume */}
        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Total Volume (24h)</p>
          <h2 className="text-xl font-semibold">
            ${(market.total_volume.usd / 1e9).toFixed(2)}B
          </h2>
        </div>

        {/* Active Coins */}
        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Active Cryptocurrencies</p>
          <h2 className="text-xl font-semibold">
            {market.active_cryptocurrencies.toLocaleString()}
          </h2>
        </div>

        {/* Markets */}
        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Number of Markets</p>
          <h2 className="text-xl font-semibold">
            {market.markets.toLocaleString()}
          </h2>
        </div>

        {/* BTC Dominance */}
        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-sm text-gray-400">BTC Dominance</p>
          <h2 className="text-xl font-semibold">
            {market.market_cap_percentage.btc.toFixed(1)}%
          </h2>
          <div className="w-full bg-gray-700 h-2 rounded mt-2">
            <div
              className="bg-orange-400 h-2 rounded"
              style={{ width: `${market.market_cap_percentage.btc}%` }}
            ></div>
          </div>
        </div>

        {/* ETH Dominance */}
        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-sm text-gray-400">ETH Dominance</p>
          <h2 className="text-xl font-semibold">
            {market.market_cap_percentage.eth.toFixed(1)}%
          </h2>
          <div className="w-full bg-gray-700 h-2 rounded mt-2">
            <div
              className="bg-blue-400 h-2 rounded"
              style={{ width: `${market.market_cap_percentage.eth}%` }}
            ></div>
          </div>
        </div>

        {/* Market Change */}
        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-sm text-gray-400">24h Market Change</p>
          <h2 className="text-xl font-semibold">
            {market.market_cap_change_percentage_24h_usd > 0 ? "+" : ""}
            {market.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </h2>
        </div>

      </div>
    </div>
  );
};

export default MarketCard;