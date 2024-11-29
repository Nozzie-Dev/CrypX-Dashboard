import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cryptocurrency data from CoinCap API
        const response = await axios.get("https://api.coincap.io/v2/assets");
        const cryptoData = response.data.data.slice(0, 4); // Limit to top 4 cryptos

        // Simulate transaction history
        const simulatedTransactions = cryptoData.map((crypto, index) => {
          return {
            name: crypto.name,
            symbol: crypto.symbol,
            price: parseFloat(crypto.priceUsd).toFixed(2),
            transactionType: Math.random() > 0.5 ? "Buy" : "Received", // Randomized transaction type
            amount: Math.floor(Math.random() * 10000) + 100, // Simulate transaction amount
            time: new Date(
              Date.now() - index * 60 * 60 * 1000 // Simulated time (1 hour apart)
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
        });

        setTransactions(simulatedTransactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            {/* Left: Icon and Name */}
            <div className="flex items-center space-x-3">
              {/* Transaction Type Icon */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  transaction.transactionType === "Buy"
                    ? "bg-orange-100 text-orange-500"
                    : "bg-green-100 text-green-500"
                }`}
              >
                {transaction.transactionType === "Buy" ? "⬇" : "⬆"}
              </div>
              <div>
                <h3 className="text-sm font-medium">{transaction.name}</h3>
                <p className="text-xs text-gray-500">{transaction.transactionType}</p>
              </div>
            </div>

            {/* Right: Price, Amount, Time */}
            <div className="text-right">
              <p className="text-sm font-semibold">${transaction.price}</p>
              <p className="text-xs text-gray-500">{transaction.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
