import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LiveMarket = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets");
        const cryptoData = response.data.data.slice(0, 4); // Limit to 4 cryptos
        const marketInfo = cryptoData.map((crypto) => ({
          name: crypto.name,
          symbol: crypto.symbol,
          price: parseFloat(crypto.priceUsd).toFixed(2),
          change: parseFloat(crypto.changePercent24Hr).toFixed(2),
          history: Array.from({ length: 30 }, () => Math.random() * 800), // Fake data
        }));
        setMarketData(marketInfo);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchData();
  }, []);

  const getGraphColor = (name) => {
    switch (name) {
      case "Ethereum":
        return "#6366F1"; // Purple
      case "Bitcoin":
        return "#F59E0B"; // Yellow
      case "Litecoin":
        return "#F87171"; // Red
      case "Cardano":
        return "#34D399"; // Green
      default:
        return "#60A5FA"; // Default blue
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Live Market</h2>

      {/* Table Headers */}
      <div className="grid grid-cols-4 text-sm font-medium text-gray-500 mb-4">
        <div>Name</div>
        <div>Change</div>
        <div>Price</div>
        <div>Graph</div>
      </div>

      {/* Cryptocurrency Data */}
      <div className="space-y-6">
        {marketData.map((crypto, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            {/* Name and Symbol */}
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200"
              >
                <span className="text-lg font-bold">{crypto.symbol[0]}</span>
              </div>
              <div>
                <h3 className="text-lg font-medium">{crypto.name}</h3>
                <p className="text-sm text-gray-500">{crypto.symbol}</p>
              </div>
            </div>

            {/* Change */}
            <div
              className={`text-lg font-bold ${
                crypto.change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {crypto.change > 0 ? `+${crypto.change}%` : `${crypto.change}%`}
            </div>

            {/* Price */}
            <div className="text-lg font-medium">${crypto.price}</div>

            {/* Graph */}
            <div className="w-full h-24">
              <Line
                data={{
                  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
                  datasets: [
                    {
                      data: crypto.history,
                      borderColor: getGraphColor(crypto.name),
                      borderWidth: 2,
                      tension: 0.4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: { point: { radius: 0 } },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarket;
