import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import DesignSystemPage from './DesignSystemPage';
import { initialCart } from './data/uiContent';
import AccountPage from './pages/AccountPage';
import AppLayout from './pages/AppLayout';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import DeliveryPage from './pages/DeliveryPage';
import LoyaltyPage from './pages/LoyaltyPage';
import MenuPage from './pages/MenuPage';
import NotificationsPage from './pages/NotificationsPage';
import PromosPage from './pages/PromosPage';
import { useCartStore } from './state/cartStore';

function AppShell() {
  const navigate = useNavigate();
  const {
    cartItems,
    onAddToCart,
    onChangeQuantity,
    onSetQuantity,
    onRemoveFromCart,
  } = useCartStore(initialCart);
  const [pricing] = useCartStoreConfig();

  return (
    <AppLayout
      cartItems={cartItems}
      deliveryFee={pricing.deliveryFee}
      discount={pricing.discount}
      onAddToCart={onAddToCart}
      onChangeQuantity={onChangeQuantity}
      onSetQuantity={onSetQuantity}
      onRemoveFromCart={onRemoveFromCart}
      onGoToCheckout={() => navigate('/checkout')}
    />
  );
}

function useCartStoreConfig() {
  return [{ deliveryFee: 199, discount: 0 }] as const;
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
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/promos" element={<PromosPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
        </Route>
        <Route path="/ds" element={<DesignSystemPage />} />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
