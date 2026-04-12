import { NavLink } from 'react-router-dom';

interface SideNavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

const NAV_ITEMS: SideNavItem[] = [
  { to: '/', label: 'Главная', end: true, icon: '🏠' },
  { to: '/menu', label: 'Меню', icon: '📋' },
  { to: '/promos', label: 'Акции', icon: '🏷️' },
  { to: '/cart', label: 'Заказы', icon: '🛍️' },
  { to: '/delivery', label: 'Контакты', icon: '📞' },
  { to: '/account', label: 'Профиль', icon: '👤' },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  isTablet: boolean;
}

function SideNav({ isOpen, onClose, isTablet }: SideNavProps) {
  return (
    <>
      {!isTablet ? (
        <button
          type="button"
          className={`pt-drawer-overlay ${isOpen ? 'is-open' : ''}`}
          aria-label="Закрыть меню"
          onClick={onClose}
        />
      ) : null}
      <aside className={`pt-sidebar ${isTablet ? 'is-static' : ''} ${isOpen ? 'is-open' : ''}`}>
        <div className="pt-sidebar__profile">
          <div className="pt-sidebar__avatar" aria-hidden="true">
            👨
          </div>
          <div>
            <p className="pt-sidebar__name">Алексей</p>
            <p className="pt-sidebar__phone">+7 912 345-55-21</p>
          </div>
        </div>

        <nav className="pt-sidebar__nav" aria-label="Навигация">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `pt-sidebar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                if (!isTablet) onClose();
              }}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <section className="pt-sidebar__bonus">
          <p className="pt-sidebar__bonus-title">Бонусы</p>
          <p className="pt-sidebar__bonus-points">1 250 ₽</p>
          <p className="pt-sidebar__bonus-subtitle">До следующего уровня</p>
          <div className="pt-sidebar__progress">
            <span />
          </div>
          <p className="pt-sidebar__bonus-footer">750 ₽</p>
        </section>
      </aside>
    </>
  );
}

export default SideNav;
