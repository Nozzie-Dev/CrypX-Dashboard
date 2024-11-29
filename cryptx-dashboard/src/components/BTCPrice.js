import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const BTCPrices = () => {
  const [btcPrices, setBtcPrices] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    const fetchBTCData = async () => {
      try {
        // Fetch historical BTC data from CoinCap
        const historicalResponse = await axios.get(
          "https://api.coincap.io/v2/assets/bitcoin/history",
          {
            params: {
              interval: "m1", // Monthly interval (last 6 months)
            },
          }
        );

        const historicalData = historicalResponse.data.data.map((entry) => ({
          date: new Date(entry.time).toLocaleString("default", { month: "short" }),
          price: parseFloat(entry.priceUsd),
        }));

        // Extract the last 6 months of prices
        const prices = historicalData.slice(-6);
        setBtcPrices(prices.map((entry) => entry.price));
        setCurrentPrice(prices[prices.length - 1].price); // Set the latest price
      } catch (error) {
        console.error("Error fetching BTC data:", error);
      }
    };

    fetchBTCData();
  }, []);

  const data = {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"], // Static labels for visualization
    datasets: [
      {
        label: "BTC Price",
        data: btcPrices, // Use live BTC prices
        borderColor: "#7B61FF",
        borderWidth: 2,
        pointBackgroundColor: "#7B61FF",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#7B61FF",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9CA3AF" },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { color: "#9CA3AF" },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">BTC Prices</h2>
      <div className="relative">
        <Line data={data} options={options} />
        {currentPrice && (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-purple-500 text-white px-3 py-1 rounded-lg shadow-lg">
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BTCPrices;
