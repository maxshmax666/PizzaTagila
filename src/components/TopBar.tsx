import { memo } from 'react';

interface TopBarProps {
  cartCount: number;
  onMenuToggle: () => void;
  isTablet: boolean;
}

function TopBar({ cartCount, onMenuToggle, isTablet }: TopBarProps) {
  return (
    <header className="pt-top-bar">
      <div className="pt-top-bar__left">
        {!isTablet ? (
          <button className="pt-circle-button" type="button" aria-label="Открыть меню" onClick={onMenuToggle}>
            ☰
          </button>
        ) : null}
        <p className="pt-brand">
          <span className="pt-brand__tagil">Tagil</span>
          <span className="pt-brand__pizza">Pizza</span>
          <span className="pt-brand__icon" aria-hidden="true">
            🍕
          </span>
        </p>
      </div>

      <div className="pt-top-bar__actions">
        <button className="pt-icon-button" type="button" aria-label="Поиск">
          🔍
        </button>
        <button className="pt-icon-button" type="button" aria-label="Уведомления">
          🔔
        </button>
        <button className="pt-icon-button pt-icon-button--accent" type="button" aria-label="Корзина">
          🛒
          {cartCount > 0 ? <span className="pt-icon-badge">{cartCount}</span> : null}
        </button>
      </div>
    </header>
  );
}

export default memo(TopBar);
