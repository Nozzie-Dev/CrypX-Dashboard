import SearchIcon from "../assets/search-normal.png"; 
import HelpIcon from "../assets/help.png"; 
import NotificationIcon from "../assets/notification.png"; 

const Header = ({ user }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Search Bar */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search type of keywords"
          className="px-4 py-2 w-full border rounded-lg pr-10" // Added padding right for space to place icon
        />
        <img
          src={SearchIcon}
          alt="Search"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" // Positioned inside input field on the right
        />
      </div>

    
      <div className="flex items-center space-x-4">
        
        <img src={NotificationIcon} alt="Notifications" className="w-6 h-6" />
        <img src={HelpIcon} alt="Help" className="w-6 h-6" />

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-black font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
