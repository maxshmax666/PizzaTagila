import { Outlet } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import AppShell from '../components/AppShell';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import type { CartItem } from '../core/cart';
import { calculateCartTotals } from '../core/cart';
import { designTokens } from '../index';
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
}

function buildThemeVariables(): CSSProperties {
  const { color, radius, shadow } = designTokens.core;
  return {
    '--bg-wood': color.neutral['900'],
    '--glass': 'rgba(26, 18, 14, 0.72)',
    '--glass-border': 'rgba(255, 226, 194, 0.18)',
    '--glow-orange': 'rgba(229, 126, 34, 0.5)',
    '--text': color.orange['50'],
    '--muted': color.neutral['300'],
    '--radius-xl': `${radius.lg}px`,
    '--shadow-soft': `${shadow.lg.x}px ${shadow.lg.y}px ${shadow.lg.blur}px ${shadow.lg.spread}px rgba(0, 0, 0, 0.45)`,
  } as CSSProperties;
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
  const themeVariables = buildThemeVariables();

  return (
    <div className="pt-app" style={themeVariables}>
      <AppShell>
        <TopBar cartCount={totals.itemCount} />
        <main className="pt-content">
          <Outlet context={{ ...props, totals }} />
        </main>
        <BottomBar cartCount={totals.itemCount} />
      </AppShell>
    </div>
  );
}

export default AppLayout;
