export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  description?: string;
  tag?: string;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

function clampQuantity(quantity: number) {
  return quantity < 1 ? 1 : quantity;
}

export function calculateCartTotals(
  items: CartItem[],
  deliveryFee = 99,
  discount = 0,
): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const normalizedDiscount = Math.min(Math.max(discount, 0), subtotal);
  const total = subtotal - normalizedDiscount + deliveryFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    itemCount,
    subtotal,
    deliveryFee,
    discount: normalizedDiscount,
    total,
  };
}

export function updateCartQuantity(
  items: CartItem[],
  id: string,
  quantity: number,
): CartItem[] {
  const nextQuantity = clampQuantity(quantity);
  return items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item));
}

export function changeCartQuantity(items: CartItem[], id: string, delta: number): CartItem[] {
  return items.map((item) => {
    if (item.id !== id) return item;
    const nextQuantity = clampQuantity(item.quantity + delta);
    return { ...item, quantity: nextQuantity };
  });
}

export function addItemToCart(items: CartItem[], incoming: CartItem): CartItem[] {
  const existing = items.find((item) => item.id === incoming.id);
  if (!existing) {
    return [...items, { ...incoming, quantity: clampQuantity(incoming.quantity) }];
  }

  return items.map((item) =>
    item.id === incoming.id
      ? { ...item, quantity: clampQuantity(item.quantity + incoming.quantity) }
      : item,
  );
}
