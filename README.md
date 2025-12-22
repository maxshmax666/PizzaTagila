# PizzaTagila

Компонентная карта и дизайн-слой для приложения «Пицца Тагил», собранные на Vite + React + TypeScript.

## Быстрый старт

```bash
npm install
npm run dev       # локальный сервер
npm run lint      # eslint
npm run test      # vitest
npm run test:coverage  # vitest + lcov отчёт
```

Требования: Node.js 20+ и npm. Используем только npm (см. `AGENTS.md`).

### Маршрутизация интерфейса

- `/` — основной экран доставки: TopBar, TabRow, список пицц и плавающая корзина.
- `/ds` и `/design-system` — страница дизайн-системы с компонентной картой и токенами.

## Структура проекта

- `src/index.ts` — фасад, который реэкспортирует ядро: список 52 компонентов, функции фильтрации/валидации и дизайн-токены (8pt для iOS/Android/Web). Вспомогательные фабрики `resolveFacadeConfig`, `createAreaServices` и `createLayoutServices` упрощают тестирование и инъекцию зависимостей.
- `src/core/*` — чистые функции над картой компонентов (lookup, фильтры, валидация) и токенами (spacing, safe area, touch targets).
- `src/design/tokens.ts` — единый источник правды по токенам, синхронизированный между iOS/Android/Web.
- `src/data/componentAreas.ts` — декларативное описание всех зон и состояний компонентов (навигация, формы, логистика, юр-блок).
- `src/components/` — тонкие React-компоненты для отображения карт.
- `src/server/logger.ts` — node-only логгер, пишет в `data/app.log` (ISO дата, уровень, сообщение).
- `src/App.tsx` — корневой роутер (главный экран доставки на `/`, дизайн-система на `/ds` и `/design-system`).
- `.github/workflows/test.yml` — CI: lint + тесты + отчёт покрытия в Codecov.
- `docs/architecture/README.md` — канвас архитектуры с краткой навигацией по фасаду, ядру, токенам и логгеру.

### Фасад для тестов и интеграции

- `createPizzaTagila(config?, factories?)` — отдаёт фасад с инжектируемыми `areas` и `tokens`, плюс методы `validate()`, `summarize()`, `findDuplicates()`, `findMissingMetadata()`, `getComponentsByTag()` и проверки сетки (`usesEightPointSpacing`, `isTouchTargetCompliant`). Фабрики сервисов можно подменять в тестах.
- `pizzaTagila` — готовый инстанс фасада поверх штатных данных (`componentAreas`, `designTokens`).
- `resolveFacadeConfig(config?)` — разворачивает конфиг в зависимости по умолчанию.
- `composePizzaTagila(deps, factories?)` — собирает фасад из уже подготовленных зависимостей (удобно, если конфиг распаковали заранее).
- `createAreaServices(areas, lookup?)` и `createLayoutServices(tokens)` — чистые обёртки, которые можно изолированно тестировать без побочных эффектов; проверка 8pt теперь строго требует `grid.base = 8`.

```ts
import { createPizzaTagila } from './src/index';

const facade = createPizzaTagila();
facade.validate(); // []
facade.summarize(); // покрытие по зонам

// Изолированный тест с кастомными данными
const isolated = createPizzaTagila({ areas: [{ /* ... */ }], tokens: customTokens });
isolated.usesEightPointSpacing(); // проверка кастомной сетки
```

### Путеводитель для новичка

- Начните с `src/index.ts`: там лежат все публичные функции ядра (фильтры, валидации, токены) и именно их покрываем тестами (`src/index.test.ts`).
- Если нужно быстро сориентироваться, откройте `docs/onboarding/README.md` и архитектурный канвас `docs/architecture/README.md` — там список входных точек и команд.
- Карта компонентов хранится в `src/data/componentAreas.ts`. Если добавляете компонент — следите за уникальностью `id`, состояниями и тегами; валидатор подскажет ошибки.
- UI-слой (`src/App.tsx` + `src/components`) тонкий и опирается на дизайн-токены: любые правки стилей держите кратно 8px.
- Логирование доступно только из Node-кода (`src/server/logger.ts`), в браузере автоматически уходит в `console.log`.
- Быстрый чек-лист: пройдитесь по `AGENTS.md` (корень) и `src/AGENTS.md` (гайды по чистым функциям и покрытию), затем откройте `docs/UI_SPEC.md`, чтобы увидеть ожидаемый визуал.
- Для лабораторных тестов используйте фасад `createPizzaTagila`: он позволяет изолировать тестовые данные без мутации реальной карты.
- Для ультра-быстрого старта есть навигатор `docs/onboarding/newcomers/README.md` (5 шагов с ссылками на входные файлы и команды).

## Что важно знать новичку

- Мы держим UI на 8pt сетке: отступы 0–64 px с шагом 8, радиусы 8/12/16/24/32, тени sm/md/lg из core.shadow.
- Палитра: primary `#E57E22`, success `#2FAE63`, surface `#FFFFFF`, фон `#FFF3E6`, бордер `rgba(34,26,20,0.10)`.
- Все состояния компонентов перечислены заранее: default/active/pressed/disabled/loading/focused/error/skeleton и т.д. Фильтруйте их через `getComponentsByState` и `getComponentsByTag`.
- Логирование в файл доступно только в Node-среде (`src/server/logger.ts`); в браузере происходит graceful fallback в `console.log`.
- Python-инструменты: `pyproject.toml` + `.pre-commit-config.yaml` настраивают `black` и `isort` (опционально, если появится Python-код).

## Компонентная карта (52 элемента)

Компоненты разбиты на 10 зон: навигация, базовые элементы, кнопки, формы, меню, корзина, доставка, аккаунт и лояльность, системные экраны, юридические блоки. Каждая карточка несёт список состояний и тегов, чтобы быстро собирать экраны LEGO-подходом.

## Дизайн-токены v1.0.0 (шаг 2/4)

Токены синхронизированы для iOS, Android и Web, держат 8pt сетку и safe-area правила.

- Core: палитра orange/green/neutral + red/blue, шаги `space 0–8` (0–64px), радиусы `8/12/16/24/32/pill`, тени sm/md/lg, stroke `1/2`, типографика с весами 400–700.
- Semantic: brand (primary/success/danger), состояния disabled/overlay, бордеры и текстовые роли (primary/secondary/muted/inverse/link).
- Layout: `grid.base=8`, `touchTargetMin=48`, safe-area (iOS 44/34, Android 24/16, Web 0/0), web-контейнер `maxWidth=480`, `paddingX=16`, брейкпоинты xs–xl.
- Components: пресеты для card, button, iconButton, input, chip, badge, listRow и modalDialog с ссылками на core/semantic токены.
- Typography styles: h1–micro с размерами 28 → 10 px и аккуратными letter-spacing.

## Изменения за последний месяц

- 2025-12-24: добавлен архитектурный канвас (`docs/architecture/README.md`), фасад собирается из кастомных фабрик (`composePizzaTagila`), проверка 8pt требует `grid.base=8`, тесты усилены на фабрики.
- 2025-12-22: фасад теперь клонирует зависимости (`createFacadeDependencies`, `cloneFacadeDependencies`), чтобы дефолтные данные и токены оставались неизменными; добавлен быстрый навигатор для новичков в `docs/onboarding/newcomers/README.md`.
- UI приведён к референсным фото: уточнены радиусы, тени, акценты и контуры по свежему макету.
- Вынесены дизайн-токены в `src/design/tokens.ts`, а функции ядра — в `src/core`, чтобы их было проще тестировать и подключать точечно.
- Добавлены Python-конфиги (`pyproject.toml`, `.pre-commit-config.yaml`) под black/isort, чтобы сразу форматировать любые будущие `.py`.
- Обновлена логика валидации карты компонентов: пустые карты теперь детектируются и дают осмысленную ошибку; логгер получил вспомогательные хелперы.
- Тесты расширены: проверка новых хелперов (`flattenComponentAreas`, форматирование логов), покрытие прежних функций сохранено.
- Создан `CHANGELOG.md` с историей PR за месяц: UI-спека (`docs/UI_SPEC.md`), расширенные дизайн-токены 8pt, карта компонентов на 52 элемента и CI с Codecov.
- Добавлен фасад `createPizzaTagila`, позволяющий инжектировать тестовые данные и проверять соответствие сетке без изменения основного датасета.
- Фасад декомпозирован на чистые сервисы (`createAreaServices`, `createLayoutServices`) и конфиг-резолвер для предсказуемых тестов; обновлён onboarding-гайд (`docs/onboarding/README.md`).

## Логирование

```ts
import { appendLog } from './src/server/logger';

await appendLog('Проверка записи', 'INFO'); // пишет ISO дату, уровень и сообщение в data/app.log
```

Файл логов не коммитим (игнорируется `*.log`), директория создаётся автоматически.

## CI

`test.yml` гоняет `npm run lint` и `npm run test:coverage`, после чего отправляет `coverage/lcov.info` в Codecov (нужен секрет `CODECOV_TOKEN` в GitHub).

## Планы дальше

- Получить токены от дизайнера (цвета/отступы/радиусы/шрифты) — шаг 2/4.
- Расширить тесты на UI-слой (React Testing Library) и добавить снапшоты для компонентных секций (`App.tsx`, `components/ComponentSection`).
- Исправить опечатку: переименовать `package.json#name` из `pizacrm` в `pizza-tagila`, чтобы совпадало с брендом.
- Покрыть иммутабельность фасада е2е-тестом в браузере (чтение карты без мутаций при навигации).
- Привести документацию в соответствие: дополнить `README.md` ссылками на CI-отчёты и Codecov badge.
- Улучшить тесты: добавить визуальные снапшоты для карточек меню и промо-блоков, чтобы зафиксировать палитру и сетку 8pt.

## Документация

- Полная UI-спека: `docs/UI_SPEC.md`.
- Руководство агента и основные правила: `AGENTS.md`.
