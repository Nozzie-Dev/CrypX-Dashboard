import React from "react";
import { Line } from "react-chartjs-2";
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
  const data = {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    datasets: [
      {
        label: "BTC Price",
        data: [500, 700, 600, 800, 400, 650],
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
       
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-purple-500 text-white px-3 py-1 rounded-lg shadow-lg">
          $25,240
        </div>
      </div>
    </div>
  );
};

export default BTCPrices;
