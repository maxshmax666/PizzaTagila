import { NavLink } from 'react-router-dom';

import { mainNavigation } from '../data/navigation';

interface TopBarProps {
  cartCount: number;
}

function TopBar({ cartCount }: TopBarProps) {
  return (
    <header className="pt-top-bar">
      <div className="pt-top-bar__brand">
        <div className="pt-logo" aria-hidden="true">
          <span className="pt-logo__mark">🍕</span>
        </div>
        <div>
          <p className="pt-brand-title">Пицца Тагил</p>
          <p className="pt-brand-subtitle">Горячая пицца · быстро и вкусно</p>
        </div>
      </div>

      <nav className="pt-nav" aria-label="Основная навигация">
        {mainNavigation.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={({ isActive }) => `pt-nav__link ${isActive ? 'is-active' : ''}`}
          >
            <span>{link.label}</span>
            {link.path === '/cart' && cartCount > 0 ? (
              <span className="pt-nav__badge">{cartCount}</span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      <div className="pt-top-bar__actions">
        <button className="pt-icon-button" type="button" aria-label="Профиль">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button className="pt-icon-button" type="button" aria-label="Меню">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
