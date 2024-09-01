// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../API";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("authToken", data.token);
      setUser({ token: data.token });
      navigate("/");
      return { success: true, message: "Login successful!" };
    } catch (error) {
      console.error("An error occurred during login:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const signup = async (first, last, email, password) => {
    try {
      const data = await signupUser(first, last, email, password);
      localStorage.setItem("authToken", data.token);
      setUser({ token: data.token });
      navigate("/");
      return { success: true, message: "Sign-up successful!" };
    } catch (error) {
      console.error("An error occurred during sign-up:", error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
