import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

function NavBar({ setSearchParams }) {
  // State for controlling the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // State to toggle between signup and login forms
  const [isSignUp, setIsSignUp] = useState(false);

  // State to store the input data for the login/signup form
  const [loginData, setLoginData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  // State to display messages to the user, like login errors
  const [message, setMessage] = useState("");

  // Getting authentication functions and state from AuthContext
  const { isAuthenticated, login, logout, signup } = useAuth();

  // Getting the cart count from the CartContext
  const { getCartCount } = useCart();

  // useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // Function to open the modal and optionally set it for signup
  function openModal(signUp = false) {
    setIsSignUp(signUp);
    setShowModal(true);
  }

  // Function to close the modal and reset any message
  function closeModal() {
    setShowModal(false);
    setMessage("");
  }

  // Function to handle changes in the input fields of the form
  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  // Function to handle the login form submission
  async function handleLoginSubmit(e) {
    e.preventDefault();
    // Attempt login with the provided email and password
    const result = await login(loginData.email, loginData.password);
    setMessage(result.message); // Display any messages returned by the login
    if (result.success) {
      setLoginData({ ...loginData, password: "" }); // Clear the password field
      closeModal(); // Close the modal on successful login
    }
  }

  // Function to handle the signup form submission
  async function handleSignUpSubmit(e) {
    e.preventDefault();
    // Attempt signup with the provided data
    const result = await signup(
      loginData.first,
      loginData.last,
      loginData.email,
      loginData.password
    );
    setMessage(result.message); // Display any messages returned by the signup
    if (result.success) {
      setLoginData({
        first: "",
        last: "",
        email: "",
        password: "",
      }); // Clear the form fields
      closeModal(); // Close the modal on successful signup
    }
  }

  // Function to navigate to the cart page when the cart button is clicked
  const handleCartClick = () => {
    navigate("/cart");
  };

  // Function to log out the user
  const handleLogOutClick = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <h2 id="title">Book Store</h2>
      <div className="search">
        {/* Button to navigate to the cart page */}
        <button onClick={handleCartClick} className="cart-button">
          Cart ({getCartCount()})
        </button>

        {/* Button to open the login/signup modal */}
        {!isAuthenticated && (
          <button onClick={() => openModal()}>Log In / Sign Up</button>
        )}

        {/* Button to log out, only visible if the user is logged in */}
        {isAuthenticated && <button onClick={handleLogOutClick}>Logout</button>}
      </div>

      {/* Modal for login/signup forms */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {message && <p className="message">{message}</p>}
            {/* Conditional rendering of either signup or login form */}
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
            {/* Button to close the modal */}
            <button id="close-modal" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
