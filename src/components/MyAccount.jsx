// MyAccount.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function MyAccount() {
  const { user, isAuthenticated } = useAuth(); // Access user info and authentication status
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setUserInfo(user); // Set user info when authenticated
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <p>Please log in to view your account details.</p>;
  }

  return (
    <div className="my-account">
      <h2>My Account</h2>
      {userInfo ? (
        <div>
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          {/* Add other user information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyAccount;
