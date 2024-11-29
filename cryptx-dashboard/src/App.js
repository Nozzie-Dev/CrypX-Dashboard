import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import LiveMarket from "./components/LiveMarket";
import Transactions from "./components/Transactions";
import BTCPrices from "./components/BTCPrice";

const defaultUser = {
  name: "Admin",
  username: "Admin",
  password: "Admin@1", 
};

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState(""); 
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Toggle between login and register
  const [isLogin, setIsLogin] = useState(true); 

  useEffect(() => {
    // Check if JWT token exists in localStorage (session persists)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      setUser({ username: localStorage.getItem("username") });
    }

    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://api.coincap.io/v2/assets");
          setCryptoData(response.data.data);

          const btcResponse = await axios.get("https://api.coincap.io/v2/assets/bitcoin");
          setBtcPrice(btcResponse.data.data.priceUsd);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginUsername === defaultUser.username && loginPassword === defaultUser.password) {
      
      const token = "fake-jwt-token"; 
      localStorage.setItem("authToken", token); 
      localStorage.setItem("username", defaultUser.username); 
      setIsAuthenticated(true);
      setUser({ username: defaultUser.username });
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    
    if (registerName && registerUsername && registerPassword) {
      const token = "fake-jwt-token"; 
      localStorage.setItem("authToken", token); 
      localStorage.setItem("username", registerUsername); 
      setIsAuthenticated(true);
      setUser({ username: registerUsername, name: registerName });
      setErrorMessage("");
    } else {
      setErrorMessage("Please fill out all fields");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("username"); 
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev); 
    setErrorMessage(""); 
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 border rounded shadow-lg space-y-4 w-80">
          <div className="flex justify-between">
            <button
              className={`w-1/2 p-2 ${isLogin ? "bg-blue-500" : "bg-gray-200"}`}
              onClick={toggleForm}
            >
              Login
            </button>
            <button
              className={`w-1/2 p-2 ${!isLogin ? "bg-blue-500" : "bg-gray-200"}`}
              onClick={toggleForm}
            >
              Register
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">{isLogin ? "Login" : "Register"}</h2>
            {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

            
            {!isLogin && (
              <div>
                <label className="block" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border rounded"
                value={isLogin ? loginUsername : registerUsername}
                onChange={(e) => isLogin ? setLoginUsername(e.target.value) : setRegisterUsername(e.target.value)}
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
                  value={isLogin ? loginPassword : registerPassword}
                  onChange={(e) => isLogin ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
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
