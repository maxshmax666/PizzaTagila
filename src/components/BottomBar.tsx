import { NavLink } from 'react-router-dom';

import { mainNavigation } from '../data/navigation';

interface BottomBarProps {
  cartCount: number;
}

function BottomBar({ cartCount }: BottomBarProps) {
  return (
    <footer className="pt-bottom-bar">
      <nav className="pt-bottom-bar__nav" aria-label="Нижняя навигация">
        {mainNavigation.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={({ isActive }) => `pt-bottom-bar__link ${isActive ? 'is-active' : ''}`}
          >
            <span>{link.label}</span>
            {link.path === '/cart' && cartCount > 0 ? (
              <span className="pt-bottom-bar__badge">{cartCount}</span>
            ) : null}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}

export default BottomBar;
