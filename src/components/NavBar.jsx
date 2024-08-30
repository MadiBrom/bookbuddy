// NavBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function NavBar({ setSearchParams, handleLogin, handleSignUp }) {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  const { getCartCount } = useCart();
  const navigate = useNavigate();

  function openModal(signUp = false) {
    setIsSignUp(signUp);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
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
    try {
      const token = await handleLogin(loginData.email, loginData.password);
      if (token) {
        console.log("Login successful!");
        setLoginData({ ...loginData, password: "" });
        closeModal();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function handleSignUpSubmit(e) {
    e.preventDefault();
    try {
      const token = await handleSignUp(
        loginData.first,
        loginData.last,
        loginData.email,
        loginData.password
      );
      if (token) {
        console.log("Sign-up successful!");
        setLoginData({
          first: "",
          last: "",
          email: "",
          password: "",
        });
        closeModal();
      }
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  }

  const handleCartClick = () => {
    navigate("/cart");
    console.log("Cart clicked");
  };

  return (
    <nav className="navbar">
      <h2 id="title">Book Store</h2>
      <div className="search">
        <button onClick={handleCartClick} className="cart-button">
          Cart ({getCartCount()})
        </button>

        <button onClick={() => openModal()}>Log In / Sign Up</button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                <button type="submit">Sign Up</button>
                <p>
                  Already have an account?{" "}
                  <span onClick={() => openModal(false)}>Log In</span>
                </p>
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
                <button type="submit">Log In</button>
                <p>
                  Don't have an account?
                  <span onClick={() => openModal(true)}>Sign Up</span>
                </p>
              </form>
            )}
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
