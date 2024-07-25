import React, { createContext, useState } from "react";

// Create a context
export const UserContext = createContext();

// Create a provider component
const Context = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("currentUser") || ""
  );

  const login = (email) => {
    setUserEmail(email);
    localStorage.setItem("currentUser", email);
  };

  const logout = () => {
    setUserEmail("");
    localStorage.removeItem("currentUser");
  };

  return (
    <UserContext.Provider value={{ userEmail, login, logout ,loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
