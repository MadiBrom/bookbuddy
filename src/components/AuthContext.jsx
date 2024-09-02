import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, fetchCurrentUser } from "../API"; // Adjust paths as needed

const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // State to store user information
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication status

  // Function to fetch current user info
  const fetchUserInfo = async () => {
    try {
      const userInfo = await fetchCurrentUser(); // Fetch user info
      setUser(userInfo);
      setIsAuthenticated(!!userInfo); // Set authentication status
    } catch (error) {
      console.error("Error fetching user info:", error); // Log the error for debugging
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check for auth token in localStorage
    if (token) {
      fetchUserInfo(); // Fetch user info if token exists
    }
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      fetchUserInfo(); // Fetch user info after successful login
    }
    return result;
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("authToken"); // Clear the auth token
    setUser(null); // Reset user state
    setIsAuthenticated(false); // Set authentication status to false
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
