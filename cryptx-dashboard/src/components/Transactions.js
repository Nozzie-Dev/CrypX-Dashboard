const Transactions = () => {
    const transactionsData = [
      {
        name: "Ethereum",
        type: "Received",
        amount: "$24,102",
        time: "Today, 19:30",
        iconColor: "bg-green-500",
      },
      {
        name: "Bitcoin",
        type: "Buy",
        amount: "$4,157",
        time: "Today, 14:32",
        iconColor: "bg-orange-500",
      },
      {
        name: "Bitcoin",
        type: "Buy",
        amount: "$64,784",
        time: "Today, 12:50",
        iconColor: "bg-orange-500",
      },
      {
        name: "Litecoin",
        type: "Buy",
        amount: "$14,265",
        time: "Today, 09:38",
        iconColor: "bg-orange-500",
      },
    ];
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <ul className="space-y-4">
          {transactionsData.map((transaction, index) => (
            <li key={index} className="flex items-center justify-between">

              <div className="flex items-center space-x-4">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.iconColor} text-white`}
                >
                  {transaction.name[0]}
                </div>
  
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-gray-500">{transaction.type}</p>
                </div>
              </div>
  
              <div className="text-right">
                <p className="font-medium">{transaction.amount}</p>
                <p className="text-sm text-gray-500">{transaction.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Transactions;
  