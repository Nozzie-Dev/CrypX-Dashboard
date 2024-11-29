// src/components/StatCards.jsx
const StatCards = () => {
    const data = [
      { name: "Bitcoin - BTC", value: "$40,291", change: "+0.25%" },
      { name: "Ethereum - ETH", value: "$18,291", change: "+0.25%" },
      { name: "Litecoin - LTC", value: "$8,291", change: "+0.25%" },
      { name: "Cardano - ADA", value: "$3,291", change: "-2.05%" },
    ];
  
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <h3 className="text-xl font-bold">{item.value}</h3>
            <p className="text-gray-500">{item.name}</p>
            <span
              className={`text-lg font-semibold ${
                item.change.startsWith("-") ? "text-red-500" : "text-green-500"
              }`}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatCards;
  