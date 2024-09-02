import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import { loginUser, registerUser, checkoutBooks } from "../API"; // Import the API functions

function Cart() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, login, signup } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function openModal(signUp = false) {
    setIsSignUp(signUp);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setMessage("");
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(loginData.email, loginData.password);
      setMessage(result.message);
      if (result.success) {
        closeModal();
        navigate("/cart"); // Redirect to cart after successful login
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(
        loginData.first,
        loginData.last,
        loginData.email,
        loginData.password
      );
      setMessage(result.message);
      if (result.success) {
        closeModal();
        navigate("/cart"); // Redirect to cart after successful signup
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const checkout = async () => {
    if (!user) {
      setMessage("You must be logged in to checkout.");
      return;
    }

    if (!cart || cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    try {
      for (const book of cart) {
        console.log("Checking out book:", book);

        // Pass user and other params to checkoutBooks
        const result = await checkoutBooks(book.id, user);
        console.log("Checkout result:", result);

        if (result.success) {
          console.log(`${book.title} has been checked out successfully!`);
        } else {
          console.error(result.message);
          setMessage(`Error checking out ${book.title}.`);
          return;
        }
      }

      setMessage("Checkout successful!");
      clearCart();
      navigate("/");
    } catch (error) {
      setMessage("An error occurred during checkout.");
      console.error("Checkout error:", error);
    }
  };

  if (!user) {
    return (
      <div className="cart-container">
        <NavBar setSearchParams={() => {}} />
        <div className="cart">
          <h1 id="title">You need to log in</h1>
          <div id="access">
            <button onClick={() => openModal(false)}>Log In</button>
            <button onClick={() => openModal(true)}>Sign Up</button>
          </div>
          <button is="home" onClick={() => navigate("/")}>
            Home
          </button>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {message && <p className="message">{message}</p>}
              {isSignUp ? (
                <form onSubmit={handleSignUpSubmit}>
                  <label>
                    First:
                    <input
                      type="text"
                      name="first"
                      value={loginData.first}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Last:
                    <input
                      type="text"
                      name="last"
                      value={loginData.last}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <div className="login-actions">
                    <button type="submit">Sign Up</button>
                    <p>
                      Already have an account?{" "}
                      <span onClick={() => openModal(false)}>Log In</span>
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit}>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <div className="login-actions">
                    <button type="submit">Log In</button>
                    <p>
                      Don't have an account?{" "}
                      <span onClick={() => openModal(true)}>Sign Up</span>
                    </p>
                  </div>
                </form>
              )}
              <button id="close-modal" onClick={closeModal}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cart-container">
      <NavBar setSearchParams={() => {}} />
      <div className="cart">
        <h1 id="title">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((book, index) => (
                <li key={index}>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
            <button onClick={checkout}>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
