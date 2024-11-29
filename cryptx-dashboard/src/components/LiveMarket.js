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
        // Fetch cryptocurrency data from the CoinCap API
        const response = await axios.get("https://api.coincap.io/v2/assets");
        const cryptos = response.data.data.filter((crypto) =>
          ["bitcoin", "ethereum", "litecoin", "cardano"].includes(crypto.id)
        );

        // Map the data to include the required information
        const marketInfo = cryptos.map((crypto) => ({
          name: crypto.name,
          symbol: crypto.symbol,
          price: parseFloat(crypto.priceUsd).toFixed(2),
          change: parseFloat(crypto.changePercent24Hr).toFixed(2),
          logo: crypto.logo, // Logo (Icon) URL from CoinCap API
          history: Array.from({ length: 30 }, () => Math.random() * 800), // Fake data for chart
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
    <div className="p-3 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Live Market</h2>

      {/* Table Headers */}
      <div className="grid grid-cols-4 text-xs font-medium text-gray-500 mb-3">
        <div>Name</div>
        <div>Change</div>
        <div>Price</div>
        <div>Graph</div>
      </div>

      {/* Cryptocurrency Data */}
      <div className="space-y-3">
        {marketData.map((crypto, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center p-2 bg-gray-50 rounded-lg shadow-sm"
          >
            {/* Name, Symbol, and Icon */}
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200">
                <img
                  src={crypto.logo} // Display the logo
                  alt={crypto.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xs font-medium">{crypto.name}</h3>
                <p className="text-xs text-gray-500">{crypto.symbol}</p>
              </div>
            </div>

            {/* Change */}
            <div
              className={`text-xs font-bold ${
                crypto.change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {crypto.change > 0 ? `+${crypto.change}%` : `${crypto.change}%`}
            </div>

            {/* Price */}
            <div className="text-xs font-medium">${crypto.price}</div>

            {/* Graph */}
            <div className="w-full h-12">
              <Line
                data={{
                  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
                  datasets: [
                    {
                      data: crypto.history,
                      borderColor: getGraphColor(crypto.name),
                      borderWidth: 1.5,
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
