import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, registerUser, loginUser } from "../API";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const loadUser = async () => {
        try {
          const currentUser = await fetchCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setUser(null); // Ensure the user state is cleared on failure
        } finally {
          setLoading(false);
        }
      };

      loadUser();
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setUser(result.user);
        localStorage.setItem("authToken", result.token); // Store token on successful login
        navigate("/");
      }
      return result;
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: error.message };
    }
  };

  const signup = async (first, last, email, password) => {
    try {
      const result = await registerUser(first, last, email, password);
      if (result.success) {
        localStorage.setItem("authToken", result.token); // Store token on successful signup
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
        navigate("/");
      }
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
