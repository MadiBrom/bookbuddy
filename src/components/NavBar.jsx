import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { loginUser, registerUser } from "../API";

function NavBar() {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up
  const [loginData, setLoginData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  }); // State to store login/sign-up data
  const [message, setMessage] = useState(""); // State to store feedback messages
  const { isAuthenticated, login, logout, signup } = useAuth(); // Access authentication functions
  const { getCartCount } = useCart(); // Access cart count from CartContext
  const navigate = useNavigate(); // React Router hook for navigation

  // Function to open the modal and toggle between login and sign-up forms
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
  async function handleLoginSubmit(e) {
    e.preventDefault();
    const result = await loginUser(loginData.email, loginData.password);
    setMessage(result.message); // Display message in the modal

    if (result.success) {
      setLoginData({ ...loginData, password: "" });
      closeModal(); // Close the modal on successful login
    } else {
      console.error("Login failed:", result.message);
    }
  }

  // Handle sign-up form submission
  async function handleSignUpSubmit(e) {
    e.preventDefault();
    const result = await registerUser(
      loginData.first,
      loginData.last,
      loginData.email,
      loginData.password
    );
    setMessage(result.message); // Display message in the modal

    if (result.success) {
      setLoginData({
        first: "",
        last: "",
        email: "",
        password: "",
      });
      closeModal(); // Close the modal on successful sign-up
    }
  }

  // Navigation functions
  const handleHomeClick = () => navigate("/");
  const handleCartClick = () => navigate("/cart");
  const handleLogOutClick = () => logout();
  const handleAccountClick = () => navigate("/myaccount");

  // Handle modal accessibility and closing with the Esc key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="navbar">
      <h2 id="title">Book Store</h2>
      <div className="search">
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleCartClick} className="cart-button">
          Cart ({getCartCount()}) {/* Display cart count */}
        </button>
        {!isAuthenticated ? (
          <button onClick={() => openModal()}>Log In / Sign Up</button> // Toggle modal for login/sign-up
        ) : (
          <button onClick={handleLogOutClick}>Logout</button> // Logout button
        )}
        <button onClick={handleAccountClick}>My Account</button>{" "}
        {/* Navigate to My Account */}
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
    </nav>
  );
}

export default NavBar;
