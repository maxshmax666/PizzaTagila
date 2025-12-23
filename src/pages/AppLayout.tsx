import { NavLink, Outlet, useLocation } from 'react-router-dom';
import type { CSSProperties, ReactNode } from 'react';

import type { CartItem } from '../core/cart';
import { calculateCartTotals } from '../core/cart';
import { designTokens } from '../index';
import './AppShell.css';

export type AppNavigationKey =
  | '/'
  | '/menu'
  | '/cart'
  | '/checkout'
  | '/deals'
  | '/delivery'
  | '/account'
  | '/notifications'
  | '/loyalty'
  | '/contacts'
  | '/offer';

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

const navLinks: { path: AppNavigationKey; label: string; end?: boolean }[] = [
  { path: '/', label: 'Меню', end: true },
  { path: '/delivery', label: 'Доставка' },
  { path: '/cart', label: 'Корзина' },
  { path: '/account', label: 'Кабинет' },
];

const bottomLinks: { path: AppNavigationKey; label: string }[] = [
  { path: '/', label: 'Меню' },
  { path: '/deals', label: 'Акции' },
  { path: '/delivery', label: 'Доставка' },
  { path: '/contacts', label: 'Контакты' },
  { path: '/offer', label: 'Оферта' },
];

function buildThemeVariables(): CSSProperties {
  const spacing = designTokens.core.space;
  const { radius, shadow, color } = designTokens.core;
  return {
    '--pt-bg': '#f1c183',
    '--pt-paper': '#f6d8ac',
    '--pt-primary': color.orange['500'],
    '--pt-primary-strong': color.orange['600'],
    '--pt-success': color.green['500'],
    '--pt-danger': '#d94a3a',
    '--pt-surface': '#f7e4c7',
    '--pt-surface-muted': '#f3d09e',
    '--pt-text': color.neutral['900'],
    '--pt-muted': color.neutral['500'],
    '--pt-border': 'rgba(34,26,20,0.16)',
    '--pt-radius-sm': `${radius.sm}px`,
    '--pt-radius-md': `${radius.md}px`,
    '--pt-radius-lg': `${radius.lg}px`,
    '--pt-radius-xl': `${radius.xl}px`,
    '--pt-shadow-sm': `${shadow.sm.x}px ${shadow.sm.y}px ${shadow.sm.blur}px ${shadow.sm.spread}px ${shadow.sm.color}`,
    '--pt-shadow-md': `${shadow.md.x}px ${shadow.md.y}px ${shadow.md.blur}px ${shadow.md.spread}px ${shadow.md.color}`,
    '--pt-shadow-lg': `${shadow.lg.x}px ${shadow.lg.y}px ${shadow.lg.blur}px ${shadow.lg.spread}px ${shadow.lg.color}`,
    '--pt-space-1': `${spacing['1']}px`,
    '--pt-space-2': `${spacing['2']}px`,
    '--pt-space-3': `${spacing['3']}px`,
    '--pt-space-4': `${spacing['4']}px`,
    '--pt-space-5': `${spacing['5']}px`,
    '--pt-space-6': `${spacing['6']}px`,
  } as CSSProperties;
}

function HeaderNavigation({ cartCount }: { cartCount: number }) {
  return (
    <header className="pt-top-nav">
      <div className="pt-top-nav__brand">
        <div className="pt-logo">Пицца Тагил</div>
        <div className="pt-top-nav__meta">
          <span className="pt-pill pt-pill--ghost">2025</span>
          <span className="pt-pill pt-pill--ghost">Нижний Тагил</span>
        </div>
      </div>
      <div className="pt-top-nav__links">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={({ isActive }) => `pt-top-link ${isActive ? 'is-active' : ''}`}
          >
            {link.label}
            {link.path === '/cart' && cartCount > 0 ? (
              <span className="pt-top-link__badge">{cartCount}</span>
            ) : null}
          </NavLink>
        ))}
        <button className="pt-top-call" type="button">
          NET72
        </button>
      </div>
    </header>
  );
}

function BottomNavigation() {
  return (
    <nav className="pt-bottom-nav">
      {bottomLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => `pt-bottom-link ${isActive ? 'is-active' : ''}`}
          end={link.path === '/'}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="pt-shell">
      <div className="pt-shell__grain" />
      <div className="pt-shell__frame">{children}</div>
    </div>
  );
}

function AppLayout(props: AppLayoutProps) {
  const location = useLocation();
  const hasItems = props.cartItems.length > 0;
  const totals = calculateCartTotals(
    props.cartItems,
    hasItems ? props.deliveryFee : 0,
    hasItems ? props.discount : 0,
  );
  const themeVariables = buildThemeVariables();

  return (
    <div className="pt-app" style={themeVariables}>
      <PhoneShell>
        <HeaderNavigation cartCount={totals.itemCount} />
        <main className="pt-content">
          <Outlet context={{ ...props, totals }} />
        </main>
        <BottomNavigation key={location.pathname} />
      </PhoneShell>
    </div>
  );
}

export default AppLayout;
