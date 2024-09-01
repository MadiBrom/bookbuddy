import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state could be null, or you can define a default user object

  // Function to update user details
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user details (e.g., on logout)
  const clearUser = () => {
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
