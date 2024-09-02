import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add a book to the cart
  const addToCart = (book) => {
    setCart((prevCart) => {
      const bookExists = prevCart.some((item) => item.id === book.id);
      if (bookExists) {
        return prevCart;
      }
      return [...prevCart, book];
    });
  };

  // Function to remove a book from the cart
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to get the total number of items in the cart
  const getCartCount = () => cart.length;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
