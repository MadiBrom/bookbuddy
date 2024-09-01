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
        } finally {
          setLoading(false);
        }
      };

      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.user);
      navigate("/");
    }
    return result;
  };

  const signup = async (first, last, email, password) => {
    try {
      const token = await registerUser(first, last, email, password); // Register and get the token
      if (token) {
        localStorage.setItem("authToken", token);
        const currentUser = await fetchCurrentUser(); // Fetch the current user with the token
        setUser(currentUser);
        navigate("/");
        return { success: true, message: "Sign-up successful!" };
      } else {
        throw new Error("Sign-up failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
