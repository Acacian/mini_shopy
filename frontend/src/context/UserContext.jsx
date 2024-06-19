import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    if (cookies.user) {
      axios.get(`${apiUrl}/auth/user`, { withCredentials: true })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('User fetch error', error);
          setUser(null); // 오류 발생 시 사용자를 null로 설정
        });
    }
  }, [cookies.user]);

  const login = async (username, password) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      setUser(response.data);
      setCookie('user', response.data, { path: '/' });
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const logout = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    try {
      await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      removeCookie('user', { path: '/' });
    } catch (error) {
      console.error('Logout error', error);
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
