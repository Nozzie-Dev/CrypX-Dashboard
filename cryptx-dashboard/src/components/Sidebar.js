import { SiWindows11 } from "react-icons/si";
import { RiPieChart2Line } from "react-icons/ri";
import { GoCreditCard } from "react-icons/go";
import { BsBagDash } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { MdMailOutline } from "react-icons/md";

const Sidebar = () => {
  const menuItems = [
    { label: <SiWindows11 />, name: "Overview", isActive: true },
    { label:<RiPieChart2Line />,name: "Chart", isActive: false },
    { label:<GoCreditCard/>,name: "Transactions", isActive: false },
    { label:<BsBagDash/>,name: "Wallet", isActive: false },
    { label:<MdMailOutline/>,name: "Mail Box", isActive: false },
    { label:<LuSettings/>,name: "Setting", isActive: false },
    { label:<BiLogOut/>,name: "Logout", isActive: false },
  ];

  return (
    <div className="bg-gray-200 text-gray-600 w-64 h-screen flex flex-col py-4">
      <h1 className="text-center text-2xl font-bold mb-6 text-black">
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
            <div className="flex items-center space-x-2">
              {item.label} {/* Icon */}
              <span>{item.name}</span> {/* Text */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
