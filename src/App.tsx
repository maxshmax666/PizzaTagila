import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import DesignSystemPage from './DesignSystemPage';
import type { CartItem } from './core/cart';
import {
  addItemToCart,
  changeCartQuantity,
  removeItemFromCart,
  updateCartQuantity,
} from './core/cart';
import { initialCart } from './data/uiContent';
import AppLayout from './pages/AppLayout';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactsPage from './pages/ContactsPage';
import DealsPage from './pages/DealsPage';
import DeliveryPage from './pages/DeliveryPage';
import LoyaltyPage from './pages/LoyaltyPage';
import MenuPage from './pages/MenuPage';
import NotificationsPage from './pages/NotificationsPage';
import OfferPage from './pages/OfferPage';

const CART_STORAGE_KEY = 'pizza-tagil-cart';

function AppShell() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return initialCart;
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // ignore parse errors, fall back to seed cart
      }
    }
    return initialCart;
  });
  const [pricing] = useState({ deliveryFee: 799, discount: 499 });
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handlers = useMemo(
    () => ({
      onAddToCart: (item: CartItem) => {
        setCartItems((prev) => addItemToCart(prev, item));
      },
      onChangeQuantity: (id: string, delta: number) => {
        setCartItems((prev) => changeCartQuantity(prev, id, delta));
      },
      onSetQuantity: (id: string, quantity: number) => {
        setCartItems((prev) => updateCartQuantity(prev, id, quantity));
      },
      onRemoveFromCart: (id: string) => {
        setCartItems((prev) => removeItemFromCart(prev, id));
      },
      onGoToCheckout: () => navigate('/checkout'),
    }),
    [navigate],
  );

  return (
    <AppLayout
      cartItems={cartItems}
      deliveryFee={pricing.deliveryFee}
      discount={pricing.discount}
      onAddToCart={handlers.onAddToCart}
      onChangeQuantity={handlers.onChangeQuantity}
      onSetQuantity={handlers.onSetQuantity}
      onRemoveFromCart={handlers.onRemoveFromCart}
      onGoToCheckout={handlers.onGoToCheckout}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<MenuPage />} />
          <Route path="/menu" element={<Navigate to="/" replace />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/offer" element={<OfferPage />} />
        </Route>
        <Route path="/ds" element={<DesignSystemPage />} />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
