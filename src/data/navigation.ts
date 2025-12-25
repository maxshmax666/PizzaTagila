import type { AppNavigationKey } from '../pages/AppLayout';

export interface NavigationItem {
  path: AppNavigationKey;
  label: string;
  end?: boolean;
}

export const mainNavigation: NavigationItem[] = [
  { path: '/', label: 'Меню', end: true },
  { path: '/delivery', label: 'Доставка' },
  { path: '/cart', label: 'Корзина' },
  { path: '/account', label: 'Кабинет' },
];
