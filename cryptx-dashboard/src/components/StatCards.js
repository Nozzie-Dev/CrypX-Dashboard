import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Litecoin from "../assets/Litecoin.png";
import Bitcoin from "../assets/Bitcoin.png";
import Cardano from "../assets/Cardano.png";
import Ethereum from "../assets/Ethereum.png";

const StatCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Fetch cryptocurrency data from the CoinCap API
        const response = await axios.get("https://api.coincap.io/v2/assets");
        const cryptos = response.data.data;

        // Filter for specific cryptocurrencies per Figma 
        const selectedCryptos = ["bitcoin", "ethereum", "litecoin", "cardano"];
        const filteredData = cryptos.filter((crypto) =>
          selectedCryptos.includes(crypto.id)
        );

        // Map the data into the required format
        const formattedData = filteredData.map((crypto) => {
          let icon;
          switch (crypto.id) {
            case "bitcoin":
              icon = Bitcoin;
              break;
            case "ethereum":
              icon = Ethereum;
              break;
            case "litecoin":
              icon = Litecoin;
              break;
            case "cardano":
              icon = Cardano;
              break;
            default:
              icon = Bitcoin; 
          }

          return {
            name: `${crypto.name} - ${crypto.symbol.toUpperCase()}`,
            value: `$${parseFloat(crypto.priceUsd).toFixed(2)}`,
            change: `${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`,
            icon,
          };
        });

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
          
          <div className="absolute top-4 left-4">
            <img src={item.icon} alt={item.name} className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold mt-8">{item.value}</h3>
          <p className="text-gray-500">{item.name}</p>
          
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
