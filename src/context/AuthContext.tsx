// client/src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of our authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap your application and provide auth state
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Effect to check for an existing token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you might want to validate the token's expiry here
      setIsAuthenticated(true);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle user login
  const login = (token: string) => {
    localStorage.setItem('token', token); // Store the token
    setIsAuthenticated(true); // Update auth status
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token
    setIsAuthenticated(false); // Update auth status
  };

  // Provide the auth state and functions to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
