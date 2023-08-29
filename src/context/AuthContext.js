import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component to wrap the entire application with the context
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

 useEffect(() => {
    // Check if a token is present in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
