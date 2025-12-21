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

- `src/index.ts` — тестируемое ядро: список 52 компонентов, функции фильтрации, проверки и design tokens.
- `src/data/componentAreas.ts` — декларативное описание всех зон и состояний компонентов (навигация, формы, логистика, юр-блок).
- `src/components/` — тонкие React-компоненты для отображения карт.
- `src/server/logger.ts` — node-only логгер, пишет в `data/app.log` (ISO дата, уровень, сообщение).
- `src/App.tsx` — экран с обзором компонентной карты, токенами и покрытием по разделам.
- `.github/workflows/test.yml` — CI: lint + тесты + отчёт покрытия в Codecov.

## Что важно знать новичку

- Мы держим UI на 8pt сетке: отступы 8/16/24/32/40/48 px, радиусы 4/8/12/16, мягкие тени.
- Палитра: primary `#f28c28`, accent `#1f8a4c`, surface `#fff`, фон `#fff7ec`, бордер `#e1d5c2`.
- Все состояния компонентов перечислены заранее: default/active/pressed/disabled/loading/focused/error/skeleton и т.д. Фильтруйте их через `getComponentsByState` и `getComponentsByTag`.
- Логирование в файл доступно только в Node-среде (`src/server/logger.ts`); в браузере происходит graceful fallback в `console.log`.

## Компонентная карта (52 элемента)

Компоненты разбиты на 10 зон: навигация, базовые элементы, кнопки, формы, меню, корзина, доставка, аккаунт и лояльность, системные экраны, юридические блоки. Каждая карточка несёт список состояний и тегов, чтобы быстро собирать экраны LEGO-подходом.

## Изменения за последний месяц

- Добавлен архив заготовки проекта (Vite React TS).
- Развёрнут реальный код базы: компонентная карта на 52 пункта, токены 8pt, новый UI, логгер с записью в `data/app.log`.
- Настроены lint/тесты/coverage и GitHub Actions с отправкой отчёта в Codecov.

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
