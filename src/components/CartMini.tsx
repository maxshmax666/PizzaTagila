import { Link } from 'react-router-dom';

import type { CartTotals } from '../core/cart';

interface CartMiniProps {
  totals: CartTotals;
  itemCount: number;
  variant: 'desktop' | 'mobile';
}

function CartMini({ totals, itemCount, variant }: CartMiniProps) {
  return (
    <section className={`pt-cart-mini pt-cart-mini--${variant}`}>
      <div className="pt-cart-mini__header">
        <h3>Корзина</h3>
        <span className="pt-muted">{itemCount} товаров</span>
      </div>
      <div className="pt-cart-mini__row">
        <span>Подытог</span>
        <span>{totals.subtotal} ₽</span>
      </div>
      <div className="pt-cart-mini__row pt-cart-mini__row--muted">
        <span>Доставка</span>
        <span>{totals.deliveryFee} ₽</span>
      </div>
      <div className="pt-cart-mini__divider" />
      <div className="pt-cart-mini__row pt-cart-mini__row--total">
        <span>Итого</span>
        <span>{totals.total} ₽</span>
      </div>
      <Link to="/cart" className="pt-cart-mini__cta">
        Оформить
      </Link>
    </section>
  );
}

export default CartMini;
