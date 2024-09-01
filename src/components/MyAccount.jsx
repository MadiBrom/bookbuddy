import React from "react";
import { useUser } from "./UserContext.jsx";

const MyAccount = () => {
  const user = useUser();
  return (
    <div>
      <h2>My Account</h2>
      <p>
        <strong>First Name:</strong> {user.first}
      </p>
      <p>
        <strong>Last Name:</strong> {user.last}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default MyAccount;
