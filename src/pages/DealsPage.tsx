import { promotions } from '../data/uiContent';

function DealsPage() {
  return (
    <div className="pt-stack">
      <h2 className="pt-section__title">Акции</h2>
      <div className="pt-promos">
        {promotions.map((promo) => (
          <article key={promo.id} className="pt-promo-card" data-tone={promo.tone}>
            <div className="pt-promo-card__content">
              <div>
                <p className="pt-pill pt-pill--ghost">{promo.badge ?? 'Выгодно'}</p>
                <h3 className="pt-card__title" style={{ color: '#fff' }}>
                  {promo.title}
                </h3>
                <p className="pt-card__desc" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {promo.description}
                </p>
              </div>
              {promo.image ? (
                <img src={promo.image} alt={promo.title} className="pt-promo-card__image" />
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default DealsPage;
