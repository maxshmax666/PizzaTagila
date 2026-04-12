import { useMemo, useState } from 'react';

import type { CartItem } from '../core/cart';
import PizzaCard from '../components/PizzaCard';
import { menuCategories, menuItems } from '../data/uiContent';
import { useAppContext } from './useAppContext';

function MenuPage() {
  const [category, setCategory] = useState<(typeof menuCategories)[number]>('Классические');
  const [activeDot, setActiveDot] = useState(0);
  const { cartItems, onAddToCart, totals, onGoToCheckout, isTablet } = useAppContext();

  const filtered = useMemo(
    () => menuItems.filter((item) => (category === 'Все' ? true : item.category === category)),
    [category],
  );

  const handleAdd = (item: CartItem) => onAddToCart({ ...item, quantity: 1 });
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-menu-page">
      <section className="pt-hero-block">
        <div className="pt-hero-block__content">
          <p className="pt-hero-badge">⚡ Доставка от 30 минут</p>
          <h1>
            Горячая пицца
            <br />
            <span>в Нижнем Тагиле</span>
          </h1>
          <p>Свежие ингредиенты, фирменные рецепты и доставка прямо к тебе.</p>
          <div className="pt-hero-block__actions">
            <button className="pt-btn pt-btn--accent" type="button">
              Смотреть меню
            </button>
            <button className="pt-btn pt-btn--ghost" type="button">
              Повторить заказ
            </button>
          </div>
          <div className="pt-hero-dots" role="tablist" aria-label="Слайды">
            {[0, 1, 2, 3].map((dot) => (
              <button
                key={dot}
                className={`pt-dot ${activeDot === dot ? 'is-active' : ''}`}
                type="button"
                aria-label={`Слайд ${dot + 1}`}
                onClick={() => setActiveDot(dot)}
              />
            ))}
          </div>
        </div>
        <div className="pt-hero-block__image">
          <img src="/assets/background1.png" alt="Горячая пицца" />
        </div>
      </section>

      <section className="pt-categories">
        {menuCategories.map((entry) => (
          <button
            key={entry}
            className={`pt-category-tab ${entry === category ? 'is-active' : ''}`}
            type="button"
            onClick={() => setCategory(entry)}
          >
            {entry}
          </button>
        ))}
      </section>

      <section className="pt-popular">
        <div className="pt-popular__header">
          <h2>Популярное</h2>
          <button type="button">Сначала популярные</button>
        </div>
        <div className="pt-popular__filters">
          {['Популярное', 'Сырные', 'Острые', 'Мясные', 'Вегетарианские'].map((entry, index) => (
            <button key={entry} className={`pt-pill ${index === 0 ? 'is-active' : ''}`} type="button">
              {entry}
            </button>
          ))}
        </div>
      </section>

      <section className="pt-menu-grid">
        {filtered.map((item) => (
          <PizzaCard key={item.id} item={item} onAdd={handleAdd} />
        ))}
      </section>

      {itemsCount > 0 ? (
        <section className={`pt-cart-bar ${isTablet ? 'is-tablet' : ''}`}>
          <div className="pt-cart-bar__items">
            {cartItems.slice(0, 3).map((item) => (
              <img key={item.id} src={item.image} alt={item.name} />
            ))}
          </div>
          <div className="pt-cart-bar__summary">
            <p>{itemsCount} товара</p>
            <strong>{totals.total} ₽</strong>
          </div>
          <button className="pt-cart-bar__cta" type="button" onClick={onGoToCheckout}>
            Оформить заказ
          </button>
        </section>
      ) : null}
    </div>
  );
}

export default MenuPage;
