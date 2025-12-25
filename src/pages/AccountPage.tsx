import { accountShortcuts, contactInfo } from '../data/uiContent';

function AccountPage() {
  return (
    <div className="pt-page">
      <header className="pt-page__header">
        <h2>Кабинет</h2>
        <p className="pt-muted">Профиль и история заказов.</p>
      </header>

      <section className="pt-panel">
        <h3>Вход по телефону</h3>
        <div className="pt-field">
          <span>{contactInfo.phone}</span>
          <button className="pt-chip" type="button">
            Изменить
          </button>
        </div>
        <div className="pt-field">
          <span>{contactInfo.address}</span>
          <span className="pt-muted">Сохранён</span>
        </div>
      </section>

      <section className="pt-panel">
        <h3>История заказов</h3>
        <div className="pt-slot-list">
          {accountShortcuts.map((item) => (
            <div key={item.id} className="pt-slot">
              <span>{item.label}</span>
              <span className="pt-muted">{item.action}</span>
            </div>
          ))}
        </div>
      </section>

      <button className="pt-cta pt-cta--danger" type="button">
        Выйти
      </button>
    </div>
  );
}

export default AccountPage;
