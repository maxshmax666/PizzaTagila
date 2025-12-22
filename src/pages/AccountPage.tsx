import { accountShortcuts, contactInfo } from '../data/uiContent';

function AccountPage() {
  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Аккаунт</h2>

      <div className="pt-list-card">
        <p className="pt-section__subtitle">Контакты</p>
        <div className="pt-list-item">
          <span>{contactInfo.phone}</span>
          <span className="pt-muted">Изменить</span>
        </div>
        <div className="pt-list-item">
          <span>{contactInfo.address}</span>
          <span className="pt-muted">Сохранён</span>
        </div>
      </div>

      <div className="pt-list-card">
        <p className="pt-section__subtitle">Действия</p>
        {accountShortcuts.map((item) => (
          <div key={item.id} className="pt-list-item">
            <span>{item.label}</span>
            <span className="pt-muted">{item.action}</span>
          </div>
        ))}
      </div>

      <button className="pt-button" type="button">
        Выйти
      </button>
    </div>
  );
}

export default AccountPage;
