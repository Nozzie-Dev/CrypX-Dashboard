const Sidebar = () => {
  const menuItems = [
    { name: "Overview", isActive: true },
    { name: "Chart", isActive: false },
    { name: "Transactions", isActive: false },
    { name: "Wallet", isActive: false },
    { name: "Mail Box", isActive: false },
    { name: "Setting", isActive: false },
    { name: "Logout", isActive: false },
  ];

  return (
    <div className="bg-gray-200 text-gray-600 w-64 h-screen flex flex-col py-4">
      <h1 className="text-center text-2xl font-bold mb-6 text-black-600">
        CryptX
      </h1>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`relative px-6 py-2 rounded-lg cursor-pointer hover:text-purple-600 hover:bg-gray-300 ${
              item.isActive
                ? "text-purple-600 bg-gray-300"
                : "text-gray-600"
            }`}
          >
            {item.isActive && (
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-600 rounded-full"></span>
            )}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
