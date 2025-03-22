import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';
import { HelmetProvider } from "react-helmet-async";
import 'antd/dist/reset.css'; 
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* Wrap your app inside HelmetProvider */}
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
