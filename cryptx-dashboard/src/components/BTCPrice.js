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
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title);

const BTCPrices = () => {
  const [btcPrices, setBtcPrices] = useState([]);
  const [labels, setLabels] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [hoveredPrice, setHoveredPrice] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [clickedPrice, setClickedPrice] = useState(null);
  const [clickedLabel, setClickedLabel] = useState(null);

  useEffect(() => {
    const fetchBTCData = async () => {
      try {
        // Fetch historical BTC data from CoinCap for the last 6 months 
        const historicalResponse = await axios.get(
          "https://api.coincap.io/v2/assets/bitcoin/history",
          {
            params: {
              interval: "d1", 
              limit: 180, 
            },
          }
        );

        const historicalData = historicalResponse.data.data.map((entry) => ({
          date: new Date(entry.time),
          price: parseFloat(entry.priceUsd),
        }));

        // Group the data by month and calculate the average price for each month
        const groupedData = groupDataByMonth(historicalData);
        const prices = groupedData.map((entry) => entry.avgPrice);
        const months = groupedData.map((entry) => entry.monthLabel);

        setBtcPrices(prices);
        setLabels(months);
        setCurrentPrice(prices[prices.length - 1]); 
      } catch (error) {
        console.error("Error fetching BTC data:", error);
      }
    };

    fetchBTCData();
  }, []);

  const groupDataByMonth = (data) => {
    const grouped = [];
    let currentMonth = data[0].date.getMonth();
    let currentYear = data[0].date.getFullYear();
    let currentMonthData = [];

    data.forEach((entry) => {
      const entryMonth = entry.date.getMonth();
      const entryYear = entry.date.getFullYear();

      if (entryMonth === currentMonth && entryYear === currentYear) {
        currentMonthData.push(entry.price);
      } else {
        const avgPrice =
          currentMonthData.reduce((acc, price) => acc + price, 0) /
          currentMonthData.length;
        grouped.push({
          monthLabel: `${new Date(currentYear, currentMonth).toLocaleString("default", { month: "short" })} ${currentYear}`,
          avgPrice,
        });
        currentMonthData = [entry.price];
        currentMonth = entryMonth;
        currentYear = entryYear;
      }
    });

    // Add the last month data
    if (currentMonthData.length > 0) {
      const avgPrice =
        currentMonthData.reduce((acc, price) => acc + price, 0) /
        currentMonthData.length;
      grouped.push({
        monthLabel: `${new Date(currentYear, currentMonth).toLocaleString("default", { month: "short" })} ${currentYear}`,
        avgPrice,
      });
    }

    
    return grouped.slice(-6);
  };

  const data = {
    labels, 
    datasets: [
      {
        label: "BTC Price",
        data: btcPrices, 
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
        enabled: false, 
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
    hover: {
      mode: "nearest",
      intersect: false,
      onHover: (event, chartElement) => {
        if (chartElement && chartElement.length > 0) {
          const index = chartElement[0].index;
          setHoveredPrice(btcPrices[index]);
          setHoveredLabel(labels[index]);
        } else {
          setHoveredPrice(null);
          setHoveredLabel(null);
        }
      },
    },
    onClick: (event, chartElement) => {
      if (chartElement && chartElement.length > 0) {
        const index = chartElement[0].index;
        setClickedPrice(btcPrices[index]);
        setClickedLabel(labels[index]);
      }
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">BTC Prices </h2>
      <div className="relative">
        <Line data={data} options={options} />
        {hoveredPrice !== null && hoveredLabel !== null && (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-purple-500 text-white px-3 py-1 rounded-lg shadow-lg">
            <p>{hoveredLabel}</p>
            <p>${hoveredPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        )}
        {currentPrice && !hoveredPrice && (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-purple-500 text-white px-3 py-1 rounded-lg shadow-lg">
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        )}
        {clickedPrice !== null && clickedLabel !== null && (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-green-500 text-white px-3 py-1 rounded-lg shadow-lg">
            <p>{clickedLabel}</p>
            <p>${clickedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BTCPrices;
