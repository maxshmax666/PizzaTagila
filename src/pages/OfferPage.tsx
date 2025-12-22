import { offerPoints } from '../data/uiContent';

function OfferPage() {
  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Оферта</h2>
      <div className="pt-list-card">
        {offerPoints.map((item) => (
          <div key={item} className="pt-list-item">
            <span>{item}</span>
            <span className="pt-muted">ℹ︎</span>
          </div>
        ))}
      </div>
      <div className="pt-notice">Все условия заказа и оплаты доступны здесь.</div>
    </div>
  );
}

export default OfferPage;
