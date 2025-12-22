import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import type { CartItem } from '../core/cart';
import { menuCategories, menuItems } from '../data/uiContent';
import { useAppContext } from './useAppContext';

function MenuPage() {
  const [category, setCategory] = useState<(typeof menuCategories)[number]>('Все');
  const { cartItems, onAddToCart, totals } = useAppContext();

  const filtered = useMemo(
    () =>
      category === 'Все'
        ? menuItems
        : menuItems.filter((item) => item.category === category),
    [category],
  );

  const handleAdd = (item: CartItem) => onAddToCart({ ...item, quantity: 1 });
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-stack pt-menu">
      <section className="pt-hero-card">
        <div className="pt-hero-card__content">
          <p className="pt-pill pt-pill--solid">Пицца Тагил</p>
          <h1 className="pt-hero-card__title">Горячая пицца — быстро и вкусно</h1>
          <p className="pt-hero-card__subtitle">Меню на сегодня: хиты, классика и новые вкусы.</p>
          <button className="pt-hero-card__cta" type="button">Заказать за 45 минут</button>
        </div>
        <div className="pt-hero-card__image" aria-hidden>
          <img src="/assets/pizza-hero.svg" alt="Пицца Тагил" />
        </div>
      </section>

      <div className="pt-chip-row pt-chip-row--flush">
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

      <div className="pt-menu-grid">
        {filtered.map((item) => (
          <article key={item.id} className="pt-menu-card">
            <div className="pt-menu-card__media">
              <img src={item.image} alt={item.name} className="pt-menu-card__image" />
              <div className="pt-menu-card__badges">
                {item.badge ? <span className="pt-badge">{item.badge}</span> : null}
                {item.tag ? <span className="pt-badge pt-badge--ghost">{item.tag}</span> : null}
                {item.spicy ? <span className="pt-badge pt-badge--ghost">Остро</span> : null}
              </div>
              <button className="pt-menu-card__cta" type="button" onClick={() => handleAdd(item)}>
                +
              </button>
            </div>
            <div className="pt-menu-card__body">
              <h3 className="pt-menu-card__title">{item.name}</h3>
              <p className="pt-menu-card__desc">{item.description}</p>
              <div className="pt-menu-card__meta">
                <span className="pt-card__price">{item.price} ₽</span>
                <span className="pt-muted">{item.size}</span>
              </div>
            </div>
          </article>
        ))}

        <Link to="/cart" className="pt-cart-card">
          <div className="pt-cart-card__header">
            <p className="pt-cart-card__title">Корзина</p>
            <span className="pt-cart-card__tag">Главная</span>
          </div>
          <div className="pt-cart-card__row">
            <span className="pt-muted">Товаров</span>
            <span className="pt-card__price">{itemsCount}</span>
          </div>
          <div className="pt-cart-card__row">
            <span className="pt-muted">Итого</span>
            <span className="pt-card__price">{totals.total} ₽</span>
          </div>
          <div className="pt-cart-card__cta">Перейти в корзину</div>
        </Link>
      </div>
    </div>
  );
}

export default MenuPage;
