import { useMemo, useState } from 'react';

import { calculateCartTotals } from '../core/cart';
import { useAppContext } from './useAppContext';

function CheckoutPage() {
  const { cartItems, totals } = useAppContext();
  const [phone, setPhone] = useState('+7 (902) 123-45-67');
  const [address, setAddress] = useState('Нижний Тагил, ул. Сенованная, д. 25');
  const [comment, setComment] = useState('Извиняюсь: курьеры, пожалуйста аккуратно');
  const [payment, setPayment] = useState('Наличными');

  const summary = useMemo(
    () => calculateCartTotals(cartItems, totals.deliveryFee, totals.discount),
    [cartItems, totals.deliveryFee, totals.discount],
  );

  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Оформление заказа</h2>

      <div className="pt-checkout">
        <div className="pt-checkout__card pt-checkout__card--accent">
          <div className="pt-checkout__row">
            <div className="pt-pill pt-pill--ghost">Телефон для связи</div>
            <div className="pt-pill pt-pill--solid">15:00</div>
          </div>
          <input
            className="pt-input"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            aria-label="Телефон"
          />
        </div>

        <div className="pt-checkout__card">
          <label className="pt-stack">
            <span className="pt-section__subtitle">Адрес</span>
            <input
              className="pt-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </label>
          <label className="pt-stack">
            <span className="pt-section__subtitle">Комментарий курьеру</span>
            <textarea
              className="pt-textarea"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
          <label className="pt-stack">
            <span className="pt-section__subtitle">Способ оплаты</span>
            <select
              className="pt-input"
              value={payment}
              onChange={(event) => setPayment(event.target.value)}
            >
              <option>Наличными</option>
              <option>Картой курьеру</option>
              <option>Онлайн</option>
            </select>
          </label>
        </div>

        <div className="pt-total-card">
          <div className="pt-row">
            <span>Товары</span>
            <span>{summary.subtotal} ₽</span>
          </div>
          <div className="pt-row pt-row--muted">
            <span>Доставка</span>
            <span>{summary.deliveryFee} ₽</span>
          </div>
          <div className="pt-row pt-row--muted">
            <span>Промокод</span>
            <span>{summary.discount} ₽</span>
          </div>
          <div className="pt-row">
            <span>Итого</span>
            <span>{summary.total} ₽</span>
          </div>
          <div className="pt-divider" />
          <div className="pt-cart-mini">
            {cartItems.map((item) => (
              <div key={item.id} className="pt-cart-mini__row">
                <span>{item.name}</span>
                <span className="pt-muted">
                  {item.quantity} × {item.price} ₽
                </span>
              </div>
            ))}
          </div>
          <button className="pt-button" type="button">
            Подтвердить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
