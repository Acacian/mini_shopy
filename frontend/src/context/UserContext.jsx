import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    try {
      await axios.post(`${apiUrl}/auth/logout`);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
