import React, { useState } from "react";
import { createNewUser } from "../API";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await createNewUser(firstName, lastName, email, password);
      console.log("Registration result:", result); // Check the API response structure
      if (result && result.token) {
        setToken(result.token); // Store the token if it's available
        navigate("/users/login"); // Redirect to login after successful registration
      } else {
        console.error("Registration failed:", result); // Log an error if registration fails
      }
    } catch (error) {
      console.error("Error during registration:", error); // Handle any unexpected errors
    }
  }

  return (
    <div id="register">
      <h2 className="header1" id="login">
        Register New Account
      </h2>
      <div className="registration">
        <form onSubmit={handleSubmit}>
          <label>
            First name:{" "}
            <input
              placeholder="First name"
              value={firstName}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Last name:{" "}
            <input
              placeholder="Last name"
              value={lastName}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Email:{" "}
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Password:{" "}
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button className="login-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
