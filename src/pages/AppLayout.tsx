import { Outlet } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import AppShell from '../components/AppShell';
import SideNav from '../components/SideNav';
import TopBar from '../components/TopBar';
import type { CartItem } from '../core/cart';
import { calculateCartTotals } from '../core/cart';
import '../styles/app.css';

export type AppNavigationKey =
  | '/'
  | '/menu'
  | '/cart'
  | '/checkout'
  | '/promos'
  | '/delivery'
  | '/account'
  | '/notifications'
  | '/loyalty';

export interface AppLayoutProps {
  cartItems: CartItem[];
  deliveryFee: number;
  discount: number;
  onAddToCart: (item: CartItem) => void;
  onChangeQuantity: (id: string, delta: number) => void;
  onSetQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  onGoToCheckout: () => void;
}

export interface AppContextValue extends AppLayoutProps {
  totals: ReturnType<typeof calculateCartTotals>;
  isTablet: boolean;
}

function useTabletQuery() {
  const [isTablet, setIsTablet] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px) and (max-width: 1280px)').matches
      : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const media = window.matchMedia('(min-width: 1024px) and (max-width: 1280px)');
    const onChange = () => setIsTablet(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return isTablet;
}

function AppLayout(props: AppLayoutProps) {
  const hasItems = props.cartItems.length > 0;
  const totals = useMemo(
    () =>
      calculateCartTotals(
        props.cartItems,
        hasItems ? props.deliveryFee : 0,
        hasItems ? props.discount : 0,
      ),
    [props.cartItems, props.deliveryFee, props.discount, hasItems],
  );
  const isTablet = useTabletQuery();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="pt-app">
      <AppShell>
        <div className="pt-layout">
          <SideNav
            isTablet={isTablet}
            isOpen={isTablet ? true : drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
          <section className="pt-main">
            <TopBar
              cartCount={totals.itemCount}
              onMenuToggle={() => setDrawerOpen((previous) => !previous)}
              isTablet={isTablet}
            />
            <main className="pt-content">
              <Outlet context={{ ...props, totals, isTablet }} />
            </main>
          </section>
        </div>
      </AppShell>
    </div>
  );
}

export default AppLayout;
