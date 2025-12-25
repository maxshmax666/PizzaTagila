import { useEffect, useMemo } from 'react';

import type { MenuItem } from '../data/uiContent';

interface PizzaGalleryModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  activeIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const getGallery = (item: MenuItem | null) =>
  item ? (item.gallery?.length ? item.gallery : [item.image]) : [];

function PizzaGalleryModal({
  item,
  isOpen,
  activeIndex,
  onClose,
  onSelect,
}: PizzaGalleryModalProps) {
  const gallery = useMemo(() => getGallery(item), [item]);
  const safeIndex = Math.min(activeIndex, Math.max(gallery.length - 1, 0));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'ArrowRight' && gallery.length > 1) {
        onSelect((safeIndex + 1) % gallery.length);
      }

      if (event.key === 'ArrowLeft' && gallery.length > 1) {
        onSelect((safeIndex - 1 + gallery.length) % gallery.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gallery.length, isOpen, onClose, onSelect, safeIndex]);

  if (!isOpen || !item) {
    return null;
  }

  return (
    <div className="pt-gallery-modal" role="dialog" aria-modal="true" aria-label={item.name}>
      <button className="pt-gallery-modal__overlay" type="button" onClick={onClose} />
      <div className="pt-gallery-modal__panel" role="document">
        <header className="pt-gallery-modal__header">
          <div>
            <p className="pt-muted">Галерея</p>
            <h3>{item.name}</h3>
          </div>
          <button className="pt-gallery-modal__close" type="button" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="pt-gallery-modal__image">
          <img src={gallery[safeIndex]} alt={`${item.name} ${safeIndex + 1}`} />
        </div>

        <div className="pt-gallery-modal__thumbs" role="tablist" aria-label="Выбор фото">
          {gallery.map((image, index) => (
            <button
              key={image}
              className={`pt-gallery-modal__thumb ${index === safeIndex ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={index === safeIndex}
              onClick={() => onSelect(index)}
            >
              <img src={image} alt={`${item.name} миниатюра ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PizzaGalleryModal;
