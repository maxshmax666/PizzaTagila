import type { ComponentArea } from '../types/design';

interface ComponentSectionProps {
  area: ComponentArea;
}

export function ComponentSection({ area }: ComponentSectionProps) {
  return (
    <section className="component-section">
      <header className="component-section__header">
        <div>
          <p className="eyebrow">{area.title}</p>
          <h2>{area.summary}</h2>
        </div>
        <span className="pill">{area.components.length} компонентов</span>
      </header>

      <ul className="component-list">
        {area.components.map((component) => (
          <li key={component.id} className="component-card">
            <div className="component-card__title">
              <h3>{component.title}</h3>
              <p className="component-card__description">{component.description}</p>
            </div>
            <div className="component-card__meta">
              <div className="meta-block">
                <p className="label">States</p>
                <div className="pill-row">
                  {component.states.map((state) => (
                    <span className="pill pill--muted" key={`${component.id}-${state}`}>
                      {state}
                    </span>
                  ))}
                </div>
              </div>
              <div className="meta-block">
                <p className="label">Tags</p>
                <div className="pill-row">
                  {component.tags.map((tag) => (
                    <span className="pill pill--ghost" key={`${component.id}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {component.notes ? (
                <p className="component-card__notes">{component.notes}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
