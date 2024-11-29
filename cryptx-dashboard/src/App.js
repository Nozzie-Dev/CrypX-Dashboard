import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import LiveMarket from "./components/LiveMarket";
import Transactions from "./components/Transactions";
import BTCPrices from "./components/BTCPrice";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from CoinCap.io API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets");
        setCryptoData(response.data.data);

        // Get Bitcoin Price separately
        const btcResponse = await axios.get("https://api.coincap.io/v2/assets/bitcoin");
        setBtcPrice(btcResponse.data.data.priceUsd);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto p-4 space-y-4">
          
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <StatCards />
            </div>
            <div className="flex-1 min-w-[300px]">
              <BTCPrices />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <LiveMarket />
            </div>
            <div className="flex-1 min-w-[300px]">
              <Transactions cryptoData={cryptoData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
