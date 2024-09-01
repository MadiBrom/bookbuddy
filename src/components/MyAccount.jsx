import React from "react";
import { useUser } from "./UserContext";

const MyAccount = () => {
  const user = useUser();
  return (
    <div>
      <h2>My Account</h2>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default MyAccount;
