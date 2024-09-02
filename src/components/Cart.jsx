import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";

function Cart() {
  const navigate = useNavigate(); // React Router hook for navigation
  const { cart } = useCart(); // Access the cart from CartContext
  const { user, login, signup } = useAuth(); // Access authentication functions
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up
  const [loginData, setLoginData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  }); // State to store login/sign-up data
  const [message, setMessage] = useState(""); // State to store feedback messages

  console.log("User state in Cart component:", user);

  // Function to open the login/sign-up modal
  function openModal(signUp = false) {
    setIsSignUp(signUp);
    setShowModal(true);
  }

  // Function to close the modal and reset the message
  function closeModal() {
    setShowModal(false);
    setMessage("");
  }

  // Handle input change for login/sign-up forms
  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await login(loginData.email, loginData.password);
    setMessage(result.message);

    if (result.success) {
      closeModal();
      navigate("/cart"); // Redirect to cart after successful login
    } else {
      setMessage("Login failed. Please try again."); // Display an error message in the modal
    }
  };

  // Handle sign-up form submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(
      loginData.first,
      loginData.last,
      loginData.email,
      loginData.password
    );
    setMessage(result.message);

    if (result.success) {
      closeModal();
      navigate("/cart"); // Redirect to cart after successful sign-up
    } else {
      setMessage("Sign-up failed. Please try again."); // Display an error message in the modal
    }
  };

  // If the user is not logged in, show the login/sign-up prompt
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
          <button onClick={() => navigate("/")}>Home</button>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {message && <p className="message">{message}</p>}{" "}
              {/* Display feedback message */}
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
                      <span onClick={() => openModal(false)}>Log In</span>{" "}
                      {/* Toggle to login form */}
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
                      <span onClick={() => openModal(true)}>Sign Up</span>{" "}
                      {/* Toggle to sign-up form */}
                    </p>
                  </div>
                </form>
              )}
              <button id="close-modal" onClick={closeModal}>
                X {/* Close modal button */}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If the user is logged in, display the cart contents
  return (
    <div className="cart-container">
      <NavBar setSearchParams={() => {}} />
      <div className="cart">
        <h1 id="title">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p> // Display message if the cart is empty
        ) : (
          <ul>
            {cart.map((book, index) => (
              <li key={index}>
                {book.title} by {book.author}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Cart;
