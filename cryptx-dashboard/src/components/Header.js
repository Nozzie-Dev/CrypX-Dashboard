const Header = ({ user }) => {
    return (
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <input
          type="text"
          placeholder="Search type of keywords"
          className="px-4 py-2 w-1/2 border rounded-lg"
        />
  
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-2">
              {/* Display the user's name and username */}
              <p className="text-black-900 font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;
  