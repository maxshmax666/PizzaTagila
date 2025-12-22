import { useAppContext } from './useAppContext';

function CartPage() {
  const { cartItems, totals, onChangeQuantity } = useAppContext();

  const increment = (id: string) => onChangeQuantity(id, 1);
  const decrement = (id: string) => onChangeQuantity(id, -1);

  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Корзина</h2>
      <div className="pt-card-list">
        {cartItems.map((item) => (
          <div key={item.id} className="pt-cart-row">
            <img src={item.image} alt={item.name} className="pt-card__image" />
            <div className="pt-stack">
              <div>
                <h3 className="pt-card__title">{item.name}</h3>
                <p className="pt-card__desc">Тесто: тонкое · {item.size}</p>
              </div>
              <div className="pt-row">
                <span className="pt-card__price">{item.price} ₽</span>
                <div className="pt-qty">
                  <button type="button" onClick={() => decrement(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => increment(item.id)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-total-card">
        <div className="pt-row">
          <span>Товаров</span>
          <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
        <div className="pt-row pt-row--muted">
          <span>Доставка</span>
          <span>{totals.deliveryFee} ₽</span>
        </div>
        <div className="pt-row">
          <span>Итого</span>
          <span>{totals.total} ₽</span>
        </div>
        <button className="pt-button" type="button">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default CartPage;
