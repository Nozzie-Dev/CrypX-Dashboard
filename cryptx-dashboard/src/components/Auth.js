import React, { useState } from "react";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Auth = ({ isLoginMode, toggleMode, onAuthenticated, users, setUsers }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long, include upper and lowercase letters, a number, and a special character.");
      return;
    }

    if (isLoginMode) {
      // Login
      const user = users.find(user => user.username === username);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, "secretKey", { expiresIn: "1h" });
        onAuthenticated({ ...user, token }); // Return user data with JWT token
      } else {
        setError("Invalid username or password.");
      }
    } else {
      // Register
      const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
      const newUser = { name, username, password: hashedPassword };
      setUsers([...users, newUser]); // Add new user to users array
      const token = jwt.sign({ username: newUser.username }, "secretKey", { expiresIn: "1h" });
      onAuthenticated({ ...newUser, token });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isLoginMode ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLoginMode && (
          <div>
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="username" className="block">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {isLoginMode ? "Login" : "Register"}
        </button>
        <div className="text-center">
          <button type="button" onClick={toggleMode} className="text-blue-500 mt-4">
            {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
