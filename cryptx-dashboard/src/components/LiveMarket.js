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
import Litecoin from "../assets/Lit.png";
import Bitcoin from "../assets/Bit.png";
import Cardano from "../assets/car.png";
import Ethereum from "../assets/Eth.png";

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

        // Fetch historical data for the graphs
        const historicalDataPromises = cryptos.map(async (crypto) => {
          const historyResponse = await axios.get(
            `https://api.coincap.io/v2/assets/${crypto.id}/history?interval=d1`
          );

          // Extract price history for the last 30 days
          const history = historyResponse.data.data.slice(-30).map((item) => parseFloat(item.priceUsd));

          return {
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            price: parseFloat(crypto.priceUsd).toFixed(2),
            change: parseFloat(crypto.changePercent24Hr).toFixed(2),
            tradingPair: `${crypto.symbol} / USDT`,
            logo: getLogo(crypto.id),
            history,
          };
        });

        const marketInfo = await Promise.all(historicalDataPromises);
        setMarketData(marketInfo);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchData();
  }, []);

  // Helper function to get the logo based on crypto ID
  const getLogo = (id) => {
    switch (id) {
      case "bitcoin":
        return Bitcoin;
      case "ethereum":
        return Ethereum;
      case "litecoin":
        return Litecoin;
      case "cardano":
        return Cardano;
      default:
        return null;
    }
  };

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

      {/* Cryptocurrency Data */}
      <div className="space-y-3">
        {marketData.map((crypto, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center p-3 bg-gray-50 rounded-lg shadow-sm"
          >
            {/* Name, Symbol, and Icon */}
            <div className="flex items-center space-x-3">
              <img
                src={crypto.logo}
                alt={crypto.name}
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="text-sm font-medium">{crypto.name}</h3>
                <p className="text-xs text-gray-500">{crypto.tradingPair}</p>
              </div>
            </div>

            {/* Change Heading and Value */}
            <div className="text-center">
              <p className="text-xs font-medium text-gray-500">Change</p>
              <div
                className={`text-sm font-bold ${
                  crypto.change > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {crypto.change > 0 ? `+${crypto.change}%` : `${crypto.change}%`}
              </div>
            </div>

            {/* Price Heading and Value */}
            <div className="text-center">
              <p className="text-xs font-medium text-gray-500">Price</p>
              <div className="text-sm font-medium">
                ${Number(crypto.price).toLocaleString()} USD
              </div>
            </div>

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
