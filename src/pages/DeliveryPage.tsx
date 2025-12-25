import { deliverySlots, deliverySummary, menuItems } from '../data/uiContent';
import { useAppContext } from './useAppContext';

function DeliveryPage() {
  const featured = menuItems.find((item) => item.id === deliverySummary.featured) ?? menuItems[0];
  const { onAddToCart, onGoToCheckout } = useAppContext();

  return (
    <div className="pt-page">
      <header className="pt-page__header">
        <h2>Доставка</h2>
        <p className="pt-muted">Ближайшие окна и адрес курьера.</p>
      </header>

      <section className="pt-delivery">
        <div className="pt-delivery__map">
          <img src="/assets/map-placeholder.svg" alt="Карта доставки" />
          <div className="pt-delivery__address">{deliverySummary.address}</div>
        </div>
        <div className="pt-delivery__meta">
          <div>
            <p className="pt-muted">Прибытие</p>
            <h3>{deliverySummary.eta}</h3>
          </div>
          <span className="pt-chip is-active">Срочно</span>
        </div>
        <div className="pt-delivery__item">
          <img src={featured.image} alt={featured.name} />
          <div>
            <h4>{featured.name}</h4>
            <p className="pt-muted">Горячая с печи, {featured.size}</p>
          </div>
          <div className="pt-delivery__price">
            <span className="pt-price">{featured.price} ₽</span>
            <span className="pt-muted">{deliverySummary.weight}</span>
          </div>
        </div>
        <button
          className="pt-cta pt-cta--secondary"
          type="button"
          onClick={() => {
            onAddToCart({ ...featured, quantity: 1 });
            onGoToCheckout();
          }}
        >
          Подтвердить заказ
        </button>
      </section>

      <section className="pt-panel">
        <h3>Слот доставки</h3>
        <div className="pt-slot-list">
          {deliverySlots.map((slot) => (
            <div key={slot.label} className="pt-slot">
              <span>{slot.label}</span>
              <span className="pt-muted">{slot.window}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DeliveryPage;
