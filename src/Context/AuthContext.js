


import React, { createContext, useContext, useState } from 'react';
import { BASE_URL } from '../config/config';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store user information
  const [token, setToken] = useState(null); // To store authentication token
  const [isLogged, setIsLogged] = useState(false); // To track login state

  

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsLogged(true); // Set logged-in state to true
  };

  const logout = async () => {
    try {
      // Make API call to logout the user with credentials included
      await axios.post(`${BASE_URL}/logout`, {}, {
        
        withCredentials: true, // Include credentials (cookies, etc.)
      });
      
    //   Clear user data from state
      setUser(null);
      setToken(null);
      setIsLogged(false); // Set logged-in state to false
  
      
  
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally handle any error messages or alerts here
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
