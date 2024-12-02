import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Litecoin from "../assets/Litecoin.png";

const StatCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Fetch cryptocurrency data from the CoinCap API
        const response = await axios.get("https://api.coincap.io/v2/assets");
        const cryptos = response.data.data;

        // Filter for specific cryptocurrencies
        const selectedCryptos = ["bitcoin", "ethereum", "litecoin", "cardano"];
        const filteredData = cryptos.filter((crypto) =>
          selectedCryptos.includes(crypto.id)
        );

        // Map the data into the required format
        const formattedData = filteredData.map((crypto) => ({
          name: `${crypto.name} - ${crypto.symbol.toUpperCase()}`,
          value: `$${parseFloat(crypto.priceUsd).toFixed(2)}`,
          change: `${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`,
          icon: Litecoin,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start relative"
        >
          {/* Currency icon on the left */}
          <div className="absolute top-4 left-4">
            <img src={item.icon} alt={item.name} className="w-8 h-8" />
          </div>
          {/* Price at the center */}
          <h3 className="text-xl font-bold mt-8">{item.value}</h3>
          <p className="text-gray-500">{item.name}</p>
          {/* Change percentage at the top right corner */}
          <span
            className={`text-lg font-semibold absolute top-4 right-4 ${
              item.change.startsWith("-") ? "text-red-500" : "text-green-500"
            }`}
          >
            {item.change.startsWith("-") ? item.change : `+${item.change}`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
