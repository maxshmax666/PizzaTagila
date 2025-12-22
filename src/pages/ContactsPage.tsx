import { contactInfo, contactLinks } from '../data/uiContent';

function ContactsPage() {
  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Контакты</h2>
      <div className="pt-list-card">
        <p className="pt-section__subtitle">Служба поддержки</p>
        {contactLinks.map((entry) => (
          <a key={entry.id} href={entry.href} className="pt-list-item pt-list-item--link">
            <span>{entry.label}</span>
            <span className="pt-pill pt-pill--ghost">{entry.action}</span>
          </a>
        ))}
      </div>
      <div className="pt-total-card">
        <p className="pt-section__subtitle">Адрес</p>
        <p className="pt-card__desc">{contactInfo.address}</p>
        <p className="pt-card__desc">Работаем: {contactInfo.schedule}</p>
        <img src="/assets/map-placeholder.svg" alt="Карта" className="pt-map" />
      </div>
    </div>
  );
}

export default ContactsPage;
