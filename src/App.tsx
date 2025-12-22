import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

import DesignSystemPage from './DesignSystemPage';
import type { CartItem } from './core/cart';
import { addItemToCart, changeCartQuantity, updateCartQuantity } from './core/cart';
import { initialCart } from './data/uiContent';
import AppLayout from './pages/AppLayout';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import DeliveryPage from './pages/DeliveryPage';
import LoyaltyPage from './pages/LoyaltyPage';
import MenuPage from './pages/MenuPage';
import NotificationsPage from './pages/NotificationsPage';
import PromosPage from './pages/PromosPage';

function AppShell() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const navigate = useNavigate();

  const handlers = useMemo(
    () => ({
      onAddToCart: (item: CartItem) => {
        setCartItems((prev) => addItemToCart(prev, item));
        navigate('/cart');
      },
      onChangeQuantity: (id: string, delta: number) => {
        setCartItems((prev) => changeCartQuantity(prev, id, delta));
      },
      onSetQuantity: (id: string, quantity: number) => {
        setCartItems((prev) => updateCartQuantity(prev, id, quantity));
      },
    }),
    [navigate],
  );

  return (
    <AppLayout
      cartItems={cartItems}
      onAddToCart={handlers.onAddToCart}
      onChangeQuantity={handlers.onChangeQuantity}
      onSetQuantity={handlers.onSetQuantity}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/promos" element={<PromosPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
        </Route>
        <Route path="/ds" element={<DesignSystemPage />} />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
