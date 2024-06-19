import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage'; // 경로 수정
import Home from './pages/Home'; // 경로 수정
import Products from './pages/Products'; // 경로 수정
import ProductDetail from './pages/ProductDetail'; // 경로 수정
import MyCart from './pages/MyCart'; // 경로 수정
import AddProduct from './pages/AddProduct'; // 경로 수정
import ProtectedRoute from './components/ProtectedRoute'; // 경로 수정

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      {
        path: 'products/new',
        element: (
          <ProtectedRoute requireAdmin>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      { path: 'products/:productId', element: <ProductDetail /> },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
