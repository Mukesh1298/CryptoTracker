import React, { useState } from "react";
import useCoinChart from "../hooks/usecoinChart";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts() {
  const [activeRange, setActiveRange] = useState("7D");
const ranges = {
  "1D": 1,
  "7D": 7,
  "1M": 30,
  "1Y": 365,
};




  const [input, setInput] = useState("");
  const [coin, setCoin] = useState("bitcoin");
  
  const days = ranges[activeRange]; 

const { data:chartData, loading, error } = useCoinChart(coin,days); // 🔥 coin passed here

  const handleSearch = () => {
    setCoin(input.toLowerCase()); // 🔥 update coin
  };
const prices = chartData.map((d)=>d.price);

  const current = prices[prices.length - 1] || 0;
  const high = Math.max(...prices) || 0;
  const low = Math.min(...prices) || 0;

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">{coin.toUpperCase()} ANAlYTICS</h1>
          <p className="text-gray-400 text-sm">
            Track {coin}price trends (7 Days)
          </p>
        </div>
        <div className="flex gap-4 text-xl">
      <input
          placeholder="Enter coin..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3"
        >
          Search
        </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="CURRENT PRICE" value={`$${current.toFixed(0)}`} />
        <Card title="24H CHANGE" value="+3.2%" green />
        <Card title="7D HIGH" value={`$${high.toFixed(0)}`} />
        <Card title="7D LOW" value={`$${low.toFixed(0)}`} />
      </div>

      {/* Chart Section */}
      <div className="bg-[#162036] p-4 rounded-2xl mb-6">

        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-semibold">Price Performance</h2>
            <p className="text-gray-400 text-sm">
              Market trend for the last week
            </p>
          </div>
          <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
            LIVE
          </span>
        </div>

        {/* ✅ Real Chart */}
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
           <XAxis dataKey="time" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>

        {/* Time Filters */}
     <div className="flex flex-wrap justify-center gap-4 mt-4">
  {["1D", "7D", "1M", "1Y"].map((item) => (
    <button
      key={item}
      onClick={() => setActiveRange(item)}
      className={`px-4 py-1 rounded-full ${
        item === activeRange
          ? "bg-purple-500 text-white"
          : "bg-gray-700 text-gray-300"
      }`}
    >
      {item}
    </button>
  ))}
</div>
      </div>

      {/* Market Activity */}
      <div className="bg-[#162036] p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Market Activity</h2>

        <Activity
          title="Exchange Inflow"
          subtitle="BEARISH SIGNAL"
          value="High"
          red
        />

        <Activity
          title="Whale Wallet Count"
          subtitle="NEUTRAL SIGNAL"
          value="+1.2k"
        />
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0B1220] p-3 flex justify-around border-t border-gray-700 text-sm">
        {["Market", "Assets", "Alerts", "Settings"].map((item) => (
          <button key={item} className="text-gray-400">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

/* Components */

function Card({ title, value, green }) {
  return (
    <div className="bg-[#162036] p-4 rounded-xl">
      <p className="text-gray-400 text-xs">{title}</p>
      <h2 className={`text-lg font-bold ${green ? "text-green-400" : ""}`}>
        {value}
      </h2>
    </div>
  );
}

function Activity({ title, subtitle, value, red }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <span className={red ? "text-red-400" : "text-blue-400"}>
        {value}
      </span>
    </div>
  );
}