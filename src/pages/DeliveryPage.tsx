import { deliverySlots, menuItems } from '../data/uiContent';

function DeliveryPage() {
  const featured = menuItems[0];

  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Доставка</h2>
      <img src="/assets/map-placeholder.svg" alt="Карта доставки" className="pt-map" />

      <div className="pt-total-card">
        <div className="pt-row">
          <span>Пепперони</span>
          <span>{featured.price} ₽</span>
        </div>
        <div className="pt-row pt-row--muted">
          <span>Прибытие</span>
          <span>15:00 · сейчас</span>
        </div>
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
