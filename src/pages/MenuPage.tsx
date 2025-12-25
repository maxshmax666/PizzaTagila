import { useMemo, useState } from 'react';

import type { CartItem } from '../core/cart';
import CartMini from '../components/CartMini';
import PizzaCard from '../components/PizzaCard';
import { menuCategories, menuItems } from '../data/uiContent';
import { useAppContext } from './useAppContext';

function MenuPage() {
  const [category, setCategory] = useState<(typeof menuCategories)[number]>('Все');
  const { cartItems, onAddToCart, totals, onGoToCheckout } = useAppContext();

  const filtered = useMemo(
    () =>
      category === 'Все'
        ? menuItems
        : menuItems.filter((item) => item.category === category),
    [category],
  );

  const handleAdd = (item: CartItem) => onAddToCart({ ...item, quantity: 1 });
  const handleHeroOrder = () => {
    const bestSeller = menuItems[0];
    onAddToCart({ ...bestSeller, quantity: 1 });
    onGoToCheckout();
  };
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-menu">
      <section className="pt-hero">
        <div className="pt-hero__media">
          <img src="/assets/pizza-hero.svg" alt="Большая пицца" />
        </div>
        <div className="pt-hero__content">
          <p className="pt-hero__eyebrow">Пицца Тагил</p>
          <h1>Горячая пицца — быстро и вкусно</h1>
          <p className="pt-muted">
            Местная печь, свежие ингредиенты и доставка за 45 минут по городу.
          </p>
          <button className="pt-cta" type="button" onClick={handleHeroOrder}>
            Заказать за 45 минут
          </button>
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

      <div className="pt-menu-layout">
        <section className="pt-menu-grid">
          {filtered.map((item) => (
            <PizzaCard key={item.id} item={item} onAdd={handleAdd} />
          ))}
        </section>
        <aside className="pt-menu-aside">
          <CartMini totals={totals} itemCount={itemsCount} variant="desktop" />
        </aside>
      </div>

      <CartMini totals={totals} itemCount={itemsCount} variant="mobile" />
    </div>
  );
}

export default MenuPage;
