import { deliverySlots, deliverySummary, menuItems } from '../data/uiContent';
import { useAppContext } from './useAppContext';

function DeliveryPage() {
  const featured = menuItems.find((item) => item.id === deliverySummary.featured) ?? menuItems[0];
  const { onAddToCart, onGoToCheckout } = useAppContext();

  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Доставка</h2>
      <div className="pt-delivery-card">
        <div className="pt-delivery-card__map">
          <img src="/assets/map-placeholder.svg" alt="Карта доставки" className="pt-map" />
          <div className="pt-delivery-card__chip">{deliverySummary.address}</div>
        </div>
        <div className="pt-delivery-card__row">
          <div>
            <p className="pt-section__subtitle">Прибытие</p>
            <h3 className="pt-card__title">{deliverySummary.eta}</h3>
          </div>
          <div className="pt-pill pt-pill--ghost">Срочно</div>
        </div>
        <div className="pt-delivery-card__row">
          <div className="pt-delivery-card__item">
            <img src={featured.image} alt={featured.name} className="pt-card__image" />
            <div>
              <h3 className="pt-card__title">{featured.name}</h3>
              <p className="pt-card__desc">Горячая с печи, {featured.size}</p>
            </div>
          </div>
          <div className="pt-delivery-card__meta">
            <span className="pt-card__price">{featured.price} ₽</span>
            <span className="pt-muted">{deliverySummary.weight}</span>
          </div>
        </div>
        <button
          className="pt-button pt-button--secondary"
          type="button"
          onClick={() => {
            onAddToCart({ ...featured, quantity: 1 });
            onGoToCheckout();
          }}
        >
          Подтвердить заказ
        </button>
      </div>

      <div className="pt-list-card">
        <p className="pt-section__subtitle">Слот доставки</p>
        {deliverySlots.map((slot) => (
          <div key={slot.label} className="pt-list-item">
            <span>{slot.label}</span>
            <span className="pt-muted">{slot.window}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliveryPage;
