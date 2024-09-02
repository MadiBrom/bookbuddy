import React, { useState, useEffect } from "react";
import { loginUser } from "../API"; // Import the login function from your API file
import { useNavigate } from "react-router-dom";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/users/me"); // Redirect to My Account page if logged in
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser(email, password);
      if (response.token) {
        setToken(response.token);
      } else {
        setError(
          response.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      {!token ? (
        <>
          <h2 className="unauthorized">Login</h2>
          <div className="registration">
            <form onSubmit={handleSubmit}>
              {error && <p style={{ color: "brown" }}>{error}</p>}
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </label>
              <br />
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Login;
