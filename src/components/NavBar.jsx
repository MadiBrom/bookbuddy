import React, { useState } from "react";

function NavBar({ setSearchParams, handleLogin, handleSignUp }) {
  const [showLogIn, setShowLogIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  const toggleLogIn = () => {
    setShowLogIn((prev) => !prev);
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const token = await handleLogin(loginData.email, loginData.password);
      if (token) {
        console.log("Login successful!");
        setLoginData({ ...loginData, password: "" });
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
      }
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="search">
        <label>
          Search:
          <input
            type="text"
            placeholder="Search for a book..."
            onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
          />
        </label>

        <button onClick={toggleLogIn}>
          {showLogIn ? "Close" : "Log In / Sign Up"}
        </button>
      </div>

      {showLogIn && (
        <div className="auth-form">
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
                <span onClick={toggleSignUp}>Log In</span>
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
                Don't have an account?{" "}
                <span onClick={toggleSignUp}>Sign Up</span>
              </p>
            </form>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
