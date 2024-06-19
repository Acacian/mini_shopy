import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header'; // 수정된 경로
import { UserContextProvider } from './context/UserContext'; // 수정된 경로
import CartStatus from './components/CartStatus'; // 수정된 경로

// QueryClient 인스턴스를 생성합니다.
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Header />
        <CartStatus />
        <Outlet />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
