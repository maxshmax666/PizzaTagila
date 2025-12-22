import { describe, expect, it } from 'vitest';

import {
  addItemToCart,
  calculateCartTotals,
  changeCartQuantity,
  normalizeQuantity,
  updateCartQuantity,
} from './cart';

const baseItem = {
  id: 'margherita',
  name: 'Маргарита',
  price: 500,
  size: '25 см',
  quantity: 1,
  image: '/assets/pizza-hero.svg',
};

describe('normalizeQuantity', () => {
  it('guards against zero, negatives and NaN', () => {
    expect(normalizeQuantity(0)).toBe(1);
    expect(normalizeQuantity(-3)).toBe(1);
    expect(normalizeQuantity(Number.NaN)).toBe(1);
  });

  it('rounds floating values to the nearest integer', () => {
    expect(normalizeQuantity(1.2)).toBe(1);
    expect(normalizeQuantity(2.8)).toBe(3);
  });
});

describe('cart helpers', () => {
  it('adds a new item with normalized quantity', () => {
    const result = addItemToCart([], { ...baseItem, quantity: 0 });
    expect(result[0]?.quantity).toBe(1);
  });

  it('increments an existing item instead of duplicating', () => {
    const start = [baseItem];
    const result = addItemToCart(start, { ...baseItem, quantity: 2 });
    expect(result).toHaveLength(1);
    expect(result[0]?.quantity).toBe(3);
  });

  it('updates quantity directly', () => {
    const result = updateCartQuantity([baseItem], baseItem.id, 5);
    expect(result[0]?.quantity).toBe(5);
  });

  it('applies deltas safely', () => {
    const result = changeCartQuantity([baseItem], baseItem.id, -5);
    expect(result[0]?.quantity).toBe(1);
  });

  it('calculates totals with delivery and discount', () => {
    const totals = calculateCartTotals(
      [
        baseItem,
        { ...baseItem, id: 'pepperoni', price: 700, quantity: 2 },
      ],
      99,
      50,
    );

    expect(totals.subtotal).toBe(1900);
    expect(totals.total).toBe(1949);
    expect(totals.itemCount).toBe(3);
  });
});
