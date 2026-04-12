import type { CartItem } from '../core/cart';
import type { MenuItem } from '../data/uiContent';

interface PizzaCardProps {
  item: MenuItem;
  onAdd: (item: CartItem) => void;
  onSelect?: (item: MenuItem) => void;
}

function PizzaCard({ item, onAdd, onSelect }: PizzaCardProps) {
  const handleSelect = () => onSelect?.(item);

  return (
    <article
      className="pt-pizza-card"
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleSelect();
        }
      }}
    >
      <div className="pt-pizza-card__media">
        <img src={item.image} alt={item.name} loading="lazy" />
        {item.badge ? <span className="pt-card-badge">{item.badge}</span> : null}
      </div>
      <div className="pt-pizza-card__body">
        <h3>{item.name}</h3>
        <p className="pt-pizza-card__desc">{item.description}</p>
        <div className="pt-pizza-card__meta">
          <span>⭐ {item.rating.toFixed(1)}</span>
          <span>◷ {item.cookTime} мин</span>
        </div>
        <p className="pt-pizza-card__price">от {item.price} ₽</p>
        <button
          className="pt-pizza-card__add"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAdd({ ...item, quantity: 1 });
          }}
          aria-label={`Добавить ${item.name}`}
        >
          +
        </button>
      </div>
    </article>
  );
}

export default PizzaCard;
