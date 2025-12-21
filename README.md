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

## Структура проекта

- `src/index.ts` — тестируемое ядро: список 52 компонентов, функции фильтрации, проверки и дизайн-токены (8pt для iOS/Android/Web).
- `src/data/componentAreas.ts` — декларативное описание всех зон и состояний компонентов (навигация, формы, логистика, юр-блок).
- `src/components/` — тонкие React-компоненты для отображения карт.
- `src/server/logger.ts` — node-only логгер, пишет в `data/app.log` (ISO дата, уровень, сообщение).
- `src/App.tsx` — экран с обзором компонентной карты, токенами и покрытием по разделам.
- `.github/workflows/test.yml` — CI: lint + тесты + отчёт покрытия в Codecov.

### Путеводитель для новичка

- Начните с `src/index.ts`: там лежат все публичные функции ядра (фильтры, валидации, токены) и именно их покрываем тестами (`src/index.test.ts`).
- Карта компонентов хранится в `src/data/componentAreas.ts`. Если добавляете компонент — следите за уникальностью `id`, состояниями и тегами; валидатор подскажет ошибки.
- UI-слой (`src/App.tsx` + `src/components`) тонкий и опирается на дизайн-токены: любые правки стилей держите кратно 8px.
- Логирование доступно только из Node-кода (`src/server/logger.ts`), в браузере автоматически уходит в `console.log`.

## Что важно знать новичку

- Мы держим UI на 8pt сетке: отступы 0–64 px с шагом 8, радиусы 8/12/16/24/32, тени sm/md/lg из core.shadow.
- Палитра: primary `#E57E22`, success `#2FAE63`, surface `#FFFFFF`, фон `#FFF3E6`, бордер `rgba(34,26,20,0.10)`.
- Все состояния компонентов перечислены заранее: default/active/pressed/disabled/loading/focused/error/skeleton и т.д. Фильтруйте их через `getComponentsByState` и `getComponentsByTag`.
- Логирование в файл доступно только в Node-среде (`src/server/logger.ts`); в браузере происходит graceful fallback в `console.log`.

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

- Добавлен архив заготовки проекта (Vite React TS).
- Развёрнут реальный код базы: компонентная карта на 52 пункта, токены 8pt, новый UI, логгер с записью в `data/app.log`.
- Настроены lint/тесты/coverage и GitHub Actions с отправкой отчёта в Codecov.
- Обновлены дизайн-токены до версии 1.0.0 для iOS/Android/Web, добавлены safe-area и контейнерные правила в UI.
- Расширены юнит-тесты: проверка 8pt сетки, safe-area, touch targets и контейнеров.

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
- Расширить тесты на UI-слой (React Testing Library) и добавить снапшоты для компонентных секций.
