import { offerPoints } from '../data/uiContent';

function NotificationsPage() {
  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Уведомления</h2>
      <div className="pt-notice">
        Здесь будут уведомления о заказах и акциях.
      </div>
      <div className="pt-list-card">
        {offerPoints.map((item) => (
          <div key={item} className="pt-list-item">
            <span>{item}</span>
            <span className="pt-muted">i</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
