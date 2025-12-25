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
    <div className="pt-page">
      <header className="pt-page__header">
        <h2>Оформление заказа</h2>
        <p className="pt-muted">Проверьте адрес и подтвердите оплату.</p>
      </header>

      <section className="pt-panel pt-panel--highlight">
        <div className="pt-panel__row">
          <span>Телефон для связи</span>
          <span className="pt-chip">15:00</span>
        </div>
        <input
          className="pt-input"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          aria-label="Телефон"
        />
      </section>

      <section className="pt-panel">
        <label className="pt-field-stack">
          <span>Адрес</span>
          <input
            className="pt-input"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <label className="pt-field-stack">
          <span>Комментарий курьеру</span>
          <textarea
            className="pt-textarea"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </label>
        <label className="pt-field-stack">
          <span>Способ оплаты</span>
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
      </section>

      <section className="pt-summary">
        <div className="pt-summary__row">
          <span>Товары</span>
          <span>{summary.subtotal} ₽</span>
        </div>
        <div className="pt-summary__row pt-summary__row--muted">
          <span>Доставка</span>
          <span>{summary.deliveryFee} ₽</span>
        </div>
        <div className="pt-summary__row pt-summary__row--muted">
          <span>Промокод</span>
          <span>{summary.discount} ₽</span>
        </div>
        <div className="pt-summary__row pt-summary__row--total">
          <span>Итого</span>
          <span>{summary.total} ₽</span>
        </div>
        <div className="pt-summary__divider" />
        <div className="pt-summary__list">
          {cartItems.map((item) => (
            <div key={item.id} className="pt-summary__item">
              <span>{item.name}</span>
              <span className="pt-muted">
                {item.quantity} × {item.price} ₽
              </span>
            </div>
          ))}
        </div>
        <button className="pt-cta" type="button">
          Подтвердить заказ
        </button>
      </section>
    </div>
  );
}

export default CheckoutPage;
