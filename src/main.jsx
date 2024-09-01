import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);
