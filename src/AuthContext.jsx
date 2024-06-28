import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token in the cookies when the component mounts
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/user', {
          withCredentials: true,
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      await axios.post('/api/login', credentials, {
        withCredentials: true,
      });
      const response = await axios.get('/api/user', credentials, {
        withCredentials: true,
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Incorrect username or password, please try again');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
