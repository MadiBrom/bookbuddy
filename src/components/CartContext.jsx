import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const bookExists = prevCart.some((item) => item.id === book.id);
      if (bookExists) {
        return prevCart;
      }
      return [...prevCart, book];
    });
  };

  const getCartCount = () => cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
