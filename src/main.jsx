import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import { UserProvider } from "./components/UserContext";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <UserProvider>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </UserProvider>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);
