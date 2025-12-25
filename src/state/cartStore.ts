import { useCallback, useEffect, useMemo, useState } from 'react';

import type { CartItem } from '../core/cart';
import {
  addItemToCart,
  changeCartQuantity,
  removeItemFromCart,
  updateCartQuantity,
} from '../core/cart';

const CART_STORAGE_KEY = 'pizza-tagil-cart';

type StorageProvider = Pick<Storage, 'getItem' | 'setItem'>;

function parseCartItems(raw: string | null, fallback: CartItem[]): CartItem[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function getStorage(): StorageProvider | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export function loadCartItems(fallback: CartItem[]): CartItem[] {
  const storage = getStorage();
  if (!storage) return fallback;
  return parseCartItems(storage.getItem(CART_STORAGE_KEY), fallback);
}

export function persistCartItems(items: CartItem[]): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function useCartStore(initialItems: CartItem[]) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCartItems(initialItems));

  useEffect(() => {
    persistCartItems(cartItems);
  }, [cartItems]);

  const handlers = useMemo(
    () => ({
      onAddToCart: (item: CartItem) => setCartItems((prev) => addItemToCart(prev, item)),
      onChangeQuantity: (id: string, delta: number) =>
        setCartItems((prev) => changeCartQuantity(prev, id, delta)),
      onSetQuantity: (id: string, quantity: number) =>
        setCartItems((prev) => updateCartQuantity(prev, id, quantity)),
      onRemoveFromCart: (id: string) => setCartItems((prev) => removeItemFromCart(prev, id)),
    }),
    [],
  );

  const resetCart = useCallback(() => setCartItems(initialItems), [initialItems]);

  return {
    cartItems,
    setCartItems,
    resetCart,
    ...handlers,
  };
}
