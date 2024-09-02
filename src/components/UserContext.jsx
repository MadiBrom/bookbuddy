import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  // Initial state for the user, could be more structured depending on app requirements
  const [user, setUser] = useState({
    name: "",
    email: "",
    // add other fields as necessary
  });

  // Function to update user details
  const updateUser = (userData) => {
    // Update the user state with the provided data
    if (userData && typeof userData === "object") {
      setUser(userData);
    } else {
      console.error("Invalid user data provided");
    }
  };

  // Function to clear user details (e.g., on logout)
  const clearUser = () => {
    // Reset the user state to null or initial state
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in other components
export const useUser = () => {
  return useContext(UserContext);
};
