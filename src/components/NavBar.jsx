import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

function NavBar({ setSearchParams }) {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { isAuthenticated, login, logout, signup } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

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

  async function handleLoginSubmit(e) {
    e.preventDefault();

    const result = await login(loginData.email, loginData.password);
    setMessage(result.message);
    if (result.success) {
      setLoginData({ ...loginData, password: "" });
      closeModal();
    }
  }

  async function handleSignUpSubmit(e) {
    e.preventDefault();

    const result = await signup(
      loginData.first,
      loginData.last,
      loginData.email,
      loginData.password
    );
    setMessage(result.message);
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

  // Function to navigate to the home page
  const handleHomeClick = () => {
    navigate("/"); // Adjust this path if needed
  };

  // Function to navigate to the cart page when the cart button is clicked
  const handleCartClick = () => {
    navigate("/cart");
  };

  // Function to log out the user
  const handleLogOutClick = () => {
    logout();
  };

  const handleAccountClick = () => {
    navigate("/myaccount");
  };
  return (
    <nav className="navbar">
      <h2 id="title">Book Store</h2>
      <div className="search">
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleCartClick} className="cart-button">
          Cart ({getCartCount()})
        </button>
        {!isAuthenticated && (
          <button onClick={() => openModal()}>Log In / Sign Up</button>
        )}
        {isAuthenticated && <button onClick={handleLogOutClick}>Logout</button>}
        <button onClick={handleAccountClick}>My Account</button>
        <button onClick={handleLogOutClick}>Logout</button>
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
