import { ComponentSection } from './components/ComponentSection';
import {
  componentAreas,
  createComponentLookup,
  designTokens,
  getSafeArea,
  getSpacingScale,
  getWebContainer,
  isTouchTargetCompliant,
  summarizeAreas,
  usesEightPointSpacing,
} from './index';
import './App.css';

const lookup = createComponentLookup(componentAreas);
const areaSummaries = summarizeAreas(componentAreas);
const spacingScale = getSpacingScale(designTokens);
const safeAreaIos = getSafeArea('ios', designTokens);
const safeAreaAndroid = getSafeArea('android', designTokens);
const webContainer = getWebContainer(designTokens);

function DesignSystemPage() {
  const totalComponents = Object.keys(lookup).length;
  const eightPointReady = usesEightPointSpacing(designTokens);
  const buttonHeight = Number(designTokens.components.button.height);
  const touchFriendly = isTouchTargetCompliant(buttonHeight, designTokens);

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Пицца Тагил · Дизайн-система</p>
        <h1>Компонентная карта под 8pt сетку</h1>
        <p className="lede">
          52 компонента сгруппированы по зонам продукта, включая состояния для
          авторизации, ошибок, логистики и юридического блока. Все карточки
          используют единые токены: оранжево-золотой акцент, зелёный для
          успеха, радиусы 8/12/16 и мягкие тени.
        </p>
        <div className="hero__meta">
          <span className="pill">{totalComponents} компонентов</span>
          <span className="pill pill--outline">
            {componentAreas.length} разделов
          </span>
          <span className="pill pill--ghost">
            {eightPointReady ? '8pt готово' : 'нужен 8pt'}
          </span>
          <span className="pill pill--ghost">
            {touchFriendly ? '48px touch' : 'Меньше 48px'}
          </span>
        </div>
      </header>

      <section className="tokens">
        <div className="token-card">
          <p className="eyebrow">Цвета</p>
          <ul>
            <li>
              <strong>Primary:</strong> {designTokens.core.color.orange['500']}
            </li>
            <li>
              <strong>Success:</strong> {designTokens.core.color.green['500']}
            </li>
            <li>
              <strong>Surface:</strong> {designTokens.core.color.neutral['0']}
            </li>
            <li>
              <strong>Border:</strong> {designTokens.semantic.border.default}
            </li>
          </ul>
        </div>
        <div className="token-card">
          <p className="eyebrow">Отступы 8pt</p>
          <p>{spacingScale.join(' / ')} px</p>
          <p className="muted">
            Используйте step=8 для паддингов, gaps, высот и размеров иконок
            (16/24/32).
          </p>
        </div>
        <div className="token-card">
          <p className="eyebrow">Радиусы и тени</p>
          <p>Radii: {Object.values(designTokens.core.radius).join(' / ')} px</p>
          <p>
            Shadow:{' '}
            {designTokens.core.shadow.md
              ? `${designTokens.core.shadow.md.x}/${designTokens.core.shadow.md.y}/${designTokens.core.shadow.md.blur}`
              : 'нет'}
          </p>
        </div>
        <div className="token-card">
          <p className="eyebrow">Типографика</p>
          <p>
            H1 {designTokens.typographyStyles.h1.size}px / Body{' '}
            {designTokens.typographyStyles.body.size}px
          </p>
          <p className="muted">Используем полужирный 500–700 для читаемости.</p>
        </div>
        <div className="token-card">
          <p className="eyebrow">Safe area</p>
          <p>iOS: top {safeAreaIos.topMin}px / bottom {safeAreaIos.bottomMin}px</p>
          <p>Android: top {safeAreaAndroid.topMin}px / bottom {safeAreaAndroid.bottomMin}px</p>
          <p>Web container: {webContainer.maxWidth}px, padding {webContainer.paddingX}px</p>
        </div>
      </section>

      <section className="area-grid">
        {componentAreas.map((area) => (
          <ComponentSection key={area.id} area={area} />
        ))}
      </section>

      <section className="area-summary">
        <h2>Покрытие по разделам</h2>
        <div className="summary-grid">
          {areaSummaries.map((summary) => (
            <article key={summary.id} className="summary-card">
              <p className="eyebrow">{summary.title}</p>
              <h3>{summary.totalComponents} компонентов</h3>
              <p className="label">
                States: {summary.statesCovered.join(', ')}
              </p>
              <p className="label">
                Tags: {summary.tagsCovered.slice(0, 6).join(', ')}
                {summary.tagsCovered.length > 6 ? '…' : ''}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DesignSystemPage;
