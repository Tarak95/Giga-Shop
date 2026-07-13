import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { Dashboard } from './pages/Dashboard';
import { Contact } from './pages/Contact';
import { Auth } from './pages/Auth';

function AppContent() {
  const { currentScreen, currentUser } = useShop();

  // Dynamically select which page to load in the main viewport area
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'wishlist':
        return <Wishlist />;
      case 'checkout':
        return <Checkout />;
      case 'dashboard':
        // If not logged in, show Auth screen instead of Dashboard
        return currentUser ? <Dashboard /> : <Auth />;
      case 'contact':
        return <Contact />;
      case 'auth':
        return <Auth />;
      default:
        return <Home />;
    }
  };

  return <MainLayout>{renderActiveScreen()}</MainLayout>;
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
