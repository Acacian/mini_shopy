import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        // login data
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3001/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const getUserState = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/user");
      setUser(response.data.user);
    } catch (error) {
      console.error("User state error", error);
    }
  };

  useEffect(() => {
    getUserState();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
