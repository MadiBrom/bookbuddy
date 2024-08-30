import React from "react";

const Cart = ({ cart }) => {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((book, index) => (
            <li key={index}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Available? {book.available ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
