import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../API";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUser = { token };
      setUser(storedUser);
      loadUserCart(storedUser);
    }
  }, []);

  const loadUserCart = async (user) => {
    try {
      const cartData = await fetchUserCart(user.token);
      setCart(cartData);
    } catch (error) {
      console.error("Failed to load user cart", error);
    }
  };

  const login = async (email, password) => {
    try {
      const token = await loginUser(email, password);
      const loggedInUser = { token };
      setUser(loggedInUser);
      localStorage.setItem("authToken", token);
      await loadUserCart(loggedInUser);
      navigate("/");
      return { success: true, message: "Login successful!" };
    } catch (error) {
      console.error("An error occurred during login:", error);
      return { success: false, message: error.message };
    }
  };

  const signup = async (first, last, email, password) => {
    try {
      const token = await registerUser(first, last, email, password);
      const newUser = { token };
      setUser(newUser);
      localStorage.setItem("authToken", token);
      await loadUserCart(newUser);
      navigate("/");
      return { success: true, message: "Sign-up successful!" };
    } catch (error) {
      console.error("An error occurred during sign-up:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, cart, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
