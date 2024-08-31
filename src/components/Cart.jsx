import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart } = useCart();

  return (
    <div className="cart">
      <h1 id="title">Welcome (USER)</h1>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((book, index) => (
            <li key={index}>
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      )}
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
}

export default Cart;
