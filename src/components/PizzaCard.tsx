import type { CartItem } from '../core/cart';
import type { MenuItem } from '../data/uiContent';

interface PizzaCardProps {
  item: MenuItem;
  onAdd: (item: CartItem) => void;
}

function PizzaCard({ item, onAdd }: PizzaCardProps) {
  return (
    <article className="pt-pizza-card">
      <div className="pt-pizza-card__media">
        <img src={item.image} alt={item.name} />
        {item.badge ? <span className="pt-badge">{item.badge}</span> : null}
      </div>
      <div className="pt-pizza-card__body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="pt-pizza-card__meta">
          <span className="pt-price">{item.price} ₽</span>
          <span className="pt-muted">{item.size}</span>
        </div>
        <button
          className="pt-add-button"
          type="button"
          onClick={() => onAdd({ ...item, quantity: 1 })}
        >
          +
        </button>
      </div>
    </article>
  );
}

export default PizzaCard;
