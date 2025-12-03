// User login control center
import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check if token exists and dark mode preference when app starts
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setUser({ token });
      }
      
      // Load dark mode preference
      const darkModePref = localStorage.getItem("darkMode");
      if (darkModePref !== null) {
        setIsDarkMode(JSON.parse(darkModePref));
      }
      
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  // Apply dark/light mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  // Login function
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    // Save token from backend
    localStorage.setItem("token", res.data.token);
    setUser({
      token: res.data.token,
      id: res.data.userId,
      username: res.data.username,
      email: email
    });
    return res.data;
  };

  // Register function
  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });
    return res.data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isDarkMode, toggleDarkMode }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;