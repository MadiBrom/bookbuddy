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
    const response = await createNewUser(firstName, lastName, email, password);
    const result = await response;
    setToken(result.token);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    navigate("/users/login");
  }

  return (
    <div>
      <>
        <h2 className="unauthorized">Register New Account</h2>
        <div className="registration">
          <form onSubmit={handleSubmit}>
            <label>
              First name:{" "}
              <input
                placeholder="First name"
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
      </>
    </div>
  );
};

export default Register;
