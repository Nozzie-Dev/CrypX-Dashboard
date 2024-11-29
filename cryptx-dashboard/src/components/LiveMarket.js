const LiveMarket = () => {
  const marketData = [
    {
      name: "Ethereum",
      symbol: "ETH / USDT",
      change: "+14.02%",
      price: "39,786 USD",
      color: "text-purple-500",
      chartColor: "stroke-purple-500",
    },
    {
      name: "Bitcoin",
      symbol: "BTC / USDT",
      change: "+4.02%",
      price: "21,786 USD",
      color: "text-yellow-500",
      chartColor: "stroke-yellow-500",
    },
    {
      name: "Litecoin",
      symbol: "LTC / USDT",
      change: "-4.02%",
      price: "9,786 USD",
      color: "text-red-500",
      chartColor: "stroke-blue-500",
    },
    {
      name: "Cardano",
      symbol: "ADA / USDT",
      change: "+0.02%",
      price: "4,786 USD",
      color: "text-green-500",
      chartColor: "stroke-green-500",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Market</h2>
      <ul className="space-y-4">
        {marketData.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between border-b pb-2 last:border-b-0"
          >
          
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-lg font-bold">{item.name[0]}</span>
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.symbol}</p>
              </div>
            </div>

            
            <div className="flex items-center space-x-8">
              <p className={`text-sm font-semibold ${item.color}`}>
                {item.change}
              </p>
              <p className="font-medium">{item.price}</p>
            </div>

          
            <svg
              className={`w-20 h-8 ${item.chartColor}`}
              viewBox="0 0 100 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 30 Q25 10 50 20 T100 10"
                strokeWidth="2"
                className="fill-none"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveMarket;
