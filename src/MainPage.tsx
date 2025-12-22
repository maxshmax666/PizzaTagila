import type { CSSProperties } from 'react';

import './MainPage.css';
import { designTokens } from './index';

type PizzaItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  badge?: string;
  tag?: string;
  spicy?: boolean;
};

const tabs = ['Меню', 'Акции', 'Доставка', 'Контакты'] as const;

const pizzas: PizzaItem[] = [
  {
    id: 'pepperoni',
    name: 'Пепперони Классик',
    description: 'Двойная пепперони, моцарелла, томатный соус на тонком тесте.',
    price: 540,
    weight: '460 г',
    badge: 'ХИТ',
    spicy: true,
  },
  {
    id: 'four-cheese',
    name: '4 сыра',
    description: 'Моцарелла, чеддер, дорблю и пармезан с медовой корочкой.',
    price: 620,
    weight: '430 г',
    tag: 'Вегетарианская',
  },
  {
    id: 'veggie',
    name: 'Овощная с соусом песто',
    description: 'Цукини, сладкий перец, томаты, базилик и фирменный зелёный соус.',
    price: 590,
    weight: '440 г',
    tag: 'Лёгкая',
  },
  {
    id: 'meat',
    name: 'Мясной микс',
    description: 'Бекон, ветчина, курица BBQ, моцарелла и сладкий лук.',
    price: 670,
    weight: '520 г',
    badge: 'Новинка',
  },
];

const cartSummary = {
  items: 3,
  total: 1690,
  eta: '35–45 мин',
};

const spacing = designTokens.core.space;
const toShadow = (shadow: { x: number; y: number; blur: number; spread: number; color: string }) =>
  `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;

const themeVariables: CSSProperties = {
  '--pt-surface': designTokens.core.color.neutral['0'],
  '--pt-surface-muted': designTokens.core.color.orange['50'],
  '--pt-text-primary': designTokens.core.color.neutral['900'],
  '--pt-text-muted': designTokens.core.color.neutral['500'],
  '--pt-primary': designTokens.core.color.orange['500'],
  '--pt-primary-strong': designTokens.core.color.orange['600'],
  '--pt-success': designTokens.core.color.green['500'],
  '--pt-border': designTokens.semantic.border.default,
  '--pt-radius-card': `${designTokens.core.radius.lg}px`,
  '--pt-radius-md': `${designTokens.core.radius.md}px`,
  '--pt-radius-pill': `${designTokens.core.radius.pill}px`,
  '--pt-shadow-card': toShadow(designTokens.core.shadow.md),
  '--pt-shadow-soft': toShadow(designTokens.core.shadow.sm),
  '--pt-space-1': `${spacing[1]}px`,
  '--pt-space-2': `${spacing[2]}px`,
  '--pt-space-3': `${spacing[3]}px`,
  '--pt-space-4': `${spacing[4]}px`,
  '--pt-space-5': `${spacing[5]}px`,
  '--pt-space-6': `${spacing[6]}px`,
};

const priceFormatter = new Intl.NumberFormat('ru-RU');

function MainPage() {
  return (
    <div className="main-app" style={themeVariables}>
      <div className="main-app__shell">
        <header className="top-bar">
          <div className="brand">
            <div className="logo">PT</div>
            <div className="brand__info">
              <p className="eyebrow">Пицца Тагил</p>
              <p className="brand__title">Доставка · Нижний Тагил</p>
              <p className="muted">Работаем ежедневно с 10:00 до 23:00</p>
            </div>
          </div>
          <div className="top-bar__actions">
            <div className="pill pill--ghost">Доставляем на Тимирязева, 12</div>
            <button className="ghost-button">8 (800) 555-35-35</button>
          </div>
        </header>

        <nav className="tab-row">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`tab ${index === 0 ? 'tab--active' : ''}`}
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>

        <section className="promo-card">
          <div>
            <p className="eyebrow">Доставка за {cartSummary.eta}</p>
            <h2>Теплая пицца с печи</h2>
            <p className="muted">
              Привезём вовремя или подарим десерт. Тестируем 8pt-сетку и придерживаемся
              фирменной палитры.
            </p>
          </div>
          <div className="promo-card__badge">-15% на вторую пиццу</div>
        </section>

        <section className="pizza-section">
          <div className="section-header">
            <h3>Популярное</h3>
            <span className="label">4 позиции · шаг сетки 8pt</span>
          </div>
          <div className="pizza-grid">
            {pizzas.map((pizza) => (
              <article key={pizza.id} className="pizza-card">
                <div className="pizza-card__header">
                  <div className="badge-row">
                    {pizza.badge ? <span className="badge">{pizza.badge}</span> : null}
                    {pizza.tag ? <span className="badge badge--ghost">{pizza.tag}</span> : null}
                    {pizza.spicy ? <span className="badge badge--ghost">Остро</span> : null}
                  </div>
                  <span className="label">{pizza.weight}</span>
                </div>
                <h4>{pizza.name}</h4>
                <p className="muted">{pizza.description}</p>
                <div className="pizza-card__footer">
                  <div className="price-block">
                    <span className="price">{priceFormatter.format(pizza.price)} ₽</span>
                    <span className="label">Тесто 30 см · тонкое</span>
                  </div>
                  <button className="primary-button" type="button">
                    В корзину
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="floating-cart">
        <p className="eyebrow">Корзина</p>
        <p className="muted">
          {cartSummary.items} товара · доставка {cartSummary.eta}
        </p>
        <div className="cart-total">
          <div>
            <strong>{priceFormatter.format(cartSummary.total)} ₽</strong>
            <p className="label">Оплата онлайн или при получении</p>
          </div>
          <button className="primary-button primary-button--compact" type="button">
            Оформить
          </button>
        </div>
      </aside>
    </div>
  );
}

export default MainPage;
