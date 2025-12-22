import { describe, expect, it } from 'vitest';

import { addItemToCart, calculateCartTotals, changeCartQuantity, updateCartQuantity } from './cart';

const baseCart = [
  { id: 'pepperoni', name: 'Пепперони', price: 690, size: '25 см', quantity: 1, image: '/assets/pizza-hero.svg' },
  { id: 'bbq', name: 'Барбекю', price: 590, size: '30 см', quantity: 2, image: '/assets/pizza-hero.svg' },
];

describe('cart helpers', () => {
  it('calculates totals with delivery and discount caps', () => {
    const totals = calculateCartTotals(baseCart, 99, 150);

    expect(totals.subtotal).toBe(1870);
    expect(totals.discount).toBe(150);
    expect(totals.total).toBe(1819);
    expect(totals.itemCount).toBe(3);
  });

  it('does not allow negative discounts or over-discounting', () => {
    const totals = calculateCartTotals(baseCart, 0, 9999);
    expect(totals.discount).toBe(1870);
    expect(totals.total).toBe(0);
  });

  it('updates quantity immutably and clamps to one', () => {
    const updated = updateCartQuantity(baseCart, 'pepperoni', 0);

    expect(updated.find((item) => item.id === 'pepperoni')?.quantity).toBe(1);
    expect(baseCart.find((item) => item.id === 'pepperoni')?.quantity).toBe(1);
  });

  it('changes quantity by delta without mutating the source', () => {
    const changed = changeCartQuantity(baseCart, 'bbq', -3);

    expect(changed.find((item) => item.id === 'bbq')?.quantity).toBe(1);
    expect(baseCart.find((item) => item.id === 'bbq')?.quantity).toBe(2);
  });

  it('adds a new item or increments an existing one', () => {
    const addedNew = addItemToCart(baseCart, {
      id: 'veggie',
      name: 'Веган',
      price: 520,
      size: '28 см',
      quantity: 1,
      image: '/assets/pizza-hero.svg',
    });
    expect(addedNew).toHaveLength(3);

    const incremented = addItemToCart(baseCart, {
      id: 'pepperoni',
      name: 'Пепперони',
      price: 690,
      size: '25 см',
      quantity: 2,
      image: '/assets/pizza-hero.svg',
    });

    expect(incremented.find((item) => item.id === 'pepperoni')?.quantity).toBe(3);
    expect(baseCart.find((item) => item.id === 'pepperoni')?.quantity).toBe(1);
  });
});
