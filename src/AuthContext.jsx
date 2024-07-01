import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useEasyToast } from 'easy-toast-react-bootstrap';
import ErrorToast from './ErrorToast';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [showToast] = useEasyToast();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pending, setPending] = useState(true);

  const isAdmin = useMemo(
    () => user?.admin_level.indexOf('GameMaster') > -1,
    [user],
  );

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
      } finally {
        setPending(false);
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
      showToast(
        <ErrorToast message="Incorrect username or password, please try again" />,
      );
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
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, isAdmin, pending }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
