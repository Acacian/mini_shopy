import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import { UserProvider } from './context/UserContext';
import CartStatus from './components/CartStatus';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Header />
        <CartStatus />
        <Outlet />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
