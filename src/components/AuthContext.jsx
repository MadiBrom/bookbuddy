// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getUserInfo } from "../API"; // Adjust paths as needed

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo(); // Fetch user info
        setUser(userInfo);
        setIsAuthenticated(!!userInfo); // Set authentication status
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchUserInfo();
  }, []);

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.user); // Assume user info is returned
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Handle logout logic (e.g., clearing tokens)
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
