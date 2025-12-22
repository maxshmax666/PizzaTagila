import { loyaltyHighlights } from '../data/uiContent';

function LoyaltyPage() {
  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Программа лояльности</h2>

      <div className="pt-list-card">
        {loyaltyHighlights.map((item) => (
          <div key={item} className="pt-list-item">
            <span>{item}</span>
            <span className="pt-muted">›</span>
          </div>
        ))}
      </div>

      <img src="/assets/map-placeholder.svg" alt="Карта" className="pt-map" />

      <div className="pt-total-card">
        <p className="pt-section__subtitle">Торговая география</p>
        <div className="pt-row">
          <span>Работаем в черте города</span>
          <span className="pt-muted">Онлайн</span>
        </div>
      </div>
    </div>
  );
}

export default LoyaltyPage;
