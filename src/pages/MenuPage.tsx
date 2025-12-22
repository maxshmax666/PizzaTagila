import { useMemo, useState } from 'react';

import type { CartItem } from '../core/cart';
import { menuCategories, menuItems } from '../data/uiContent';
import { useAppContext } from './useAppContext';

function MenuPage() {
  const [category, setCategory] = useState<(typeof menuCategories)[number]>('Все');
  const { onAddToCart } = useAppContext();

  const filtered = useMemo(
    () =>
      category === 'Все'
        ? menuItems
        : menuItems.filter((item) => item.category === category),
    [category],
  );

  const handleAdd = (item: CartItem) => onAddToCart({ ...item, quantity: 1 });

  return (
    <div className="pt-stack">
      <section className="pt-hero">
        <img src="/assets/pizza-hero.svg" alt="Пицца" className="pt-hero__image" />
        <div className="pt-hero__text">
          <p className="pt-pill">Меню · Доставка</p>
          <h1 className="pt-hero__title">Тёплая пицца с печи</h1>
          <p className="pt-muted">Привезём вовремя или подарим десерт.</p>
        </div>
      </section>

      <div className="pt-chip-row">
        {menuCategories.map((entry) => (
          <button
            key={entry}
            className={`pt-chip ${entry === category ? 'is-active' : ''}`}
            type="button"
            onClick={() => setCategory(entry)}
          >
            {entry}
          </button>
        ))}
      </div>

      <div className="pt-card-list">
        {filtered.map((item) => (
          <article key={item.id} className="pt-card">
            <div>
              <div className="pt-card__meta">
                {item.badge ? <span className="pt-badge">{item.badge}</span> : null}
                {item.tag ? <span className="pt-badge pt-badge--ghost">{item.tag}</span> : null}
                {item.spicy ? <span className="pt-badge pt-badge--ghost">Остро</span> : null}
              </div>
              <h3 className="pt-card__title">{item.name}</h3>
              <p className="pt-card__desc">{item.description}</p>
              <div className="pt-card__meta">
                <span className="pt-card__price">{item.price} ₽</span>
                <span className="pt-muted">{item.size}</span>
              </div>
              <button
                className="pt-button"
                type="button"
                onClick={() => handleAdd(item)}
              >
                В корзину
              </button>
            </div>
            <img src={item.image} alt={item.name} className="pt-card__image" />
          </article>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
