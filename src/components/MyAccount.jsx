import React, { useState, useEffect } from "react";
import { fetchCurrentUser } from "../API";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const getUserData = async () => {
        try {
          const userData = await fetchCurrentUser();
          setUser(userData);
        } catch (error) {
          setError("Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      };
      getUserData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div>
      <h2>{user.first}'s Account</h2>
      <p>First Name: {user.first}</p>
      <p>Last Name: {user.last}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MyAccount;
