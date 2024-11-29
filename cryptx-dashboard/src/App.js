import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import LiveMarket from "./components/LiveMarket";
import Transactions from "./components/Transactions";
import BTCPrices from "./components/BTCPrice";

// Default Admin Credentials for mock login
const defaultUser = {
  name: "Admin",
  username: "Admin",
  password: "Admin@1", // Plain password for login
};

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch data from CoinCap.io API if authenticated
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername === defaultUser.username && loginPassword === defaultUser.password) {
      setIsAuthenticated(true);
      setUser({ username: defaultUser.username });
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleLogin} className="p-8 border rounded shadow-lg space-y-4 w-80">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
          <div>
            <label className="block" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={handleLogout} />
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {error && (
            <div className="text-red-500 bg-red-100 p-4 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <StatCards />
            </div>
            <div className="flex-1 min-w-[300px]">
              <BTCPrices btcPrice={btcPrice} />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-stretch">
            <div className="flex-[2_2_0%] min-w-[300px] h-full">
              <div className="h-full">
                <LiveMarket cryptoData={cryptoData} />
              </div>
            </div>

            <div className="flex-[1_1_0%] min-w-[300px] h-full">
              <div className="h-full">
                <Transactions cryptoData={cryptoData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
