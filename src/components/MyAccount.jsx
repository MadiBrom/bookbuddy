import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function MyAccount({ showLoginModal }) {
  const { user, isAuthenticated } = useAuth(); // Access user info and authentication status
  const [userInfo, setUserInfo] = useState(null); // State to store user information
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setUserInfo(user); // Set user info when authenticated
    } else {
      showLoginModal(); // Show the login modal if not authenticated
      navigate("/"); // Navigate to home or another page after showing modal
    }
  }, [isAuthenticated, user, showLoginModal, navigate]); // Dependencies ensure this effect runs when authentication status or user data changes

  // If user is not authenticated, the modal will show, so don't render anything else
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="my-account">
      <h2>My Account</h2>
      {userInfo ? (
        <div>
          <p>
            <strong>Name:</strong> {userInfo.first}{" "}
            {userInfo.last || "No name available"}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email || "No email available"}
          </p>
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
}

export default MyAccount;
