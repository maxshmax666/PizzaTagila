import { Link } from 'react-router-dom';

import { useAppContext } from './useAppContext';

function CartPage() {
  const { cartItems, totals, onChangeQuantity, onRemoveFromCart, onGoToCheckout } =
    useAppContext();

  const increment = (id: string) => onChangeQuantity(id, 1);
  const decrement = (id: string) => onChangeQuantity(id, -1);
  const isEmpty = cartItems.length === 0;

  return (
    <div className="pt-page">
      <header className="pt-page__header">
        <h2>Корзина</h2>
        <p className="pt-muted">Соберите заказ и оформите доставку.</p>
      </header>
      {isEmpty ? (
        <div className="pt-empty">
          Корзина пуста. <Link to="/">Перейти в меню</Link>
        </div>
      ) : (
        <div className="pt-cart-list">
          {cartItems.map((item) => (
            <article key={item.id} className="pt-cart-item">
              <img src={item.image} alt={item.name} />
              <div className="pt-cart-item__info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="pt-muted">Тесто: тонкое · {item.size}</p>
                </div>
                <button
                  type="button"
                  className="pt-icon-button pt-icon-button--ghost"
                  onClick={() => onRemoveFromCart(item.id)}
                  aria-label={`Удалить ${item.name}`}
                >
                  ×
                </button>
              </div>
              <div className="pt-cart-item__actions">
                <span className="pt-price">{item.price} ₽</span>
                <div className="pt-qty">
                  <button type="button" onClick={() => decrement(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => increment(item.id)}>
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="pt-summary">
        <div className="pt-summary__row">
          <span>Товаров</span>
          <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
        <div className="pt-summary__row pt-summary__row--muted">
          <span>Доставка</span>
          <span>{totals.deliveryFee} ₽</span>
        </div>
        <div className="pt-summary__row pt-summary__row--muted">
          <span>Промокод</span>
          <span>{totals.discount} ₽</span>
        </div>
        <div className="pt-summary__row pt-summary__row--total">
          <span>Итого</span>
          <span>{totals.total} ₽</span>
        </div>
        <button className="pt-cta" type="button" onClick={onGoToCheckout} disabled={isEmpty}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default CartPage;
