# Архитектура и навигация по коду

## Ключевые входные точки
- `src/index.ts` — публичный фасад: резолвит конфиг, собирает сервисы по областям и layout, экспортирует данные (`componentAreas`, `designTokens`) и все ядро.
- `src/core/*` — чистые функции для карты компонентов (`componentMap.ts`) и лейаута (`layout.ts`). Никаких побочных эффектов, удобно тестировать точечно.
- `src/design/tokens.ts` — токены 8pt и safe-area для iOS/Android/Web. Все UI-значения тянем отсюда.
- `src/server/logger.ts` — Node-only логгер, пишет строки вида `ISO [LEVEL] message` в `data/app.log` с автосозданием директории.
- `src/components/*` + `src/App.tsx` — тонкий UI-слой, использует фасад и токены без прямой работы с данными.

## Как работать и что проверить
- Команды: `npm install`, `npm run dev` (локальный сервер), `npm run lint`, `npm run test:coverage`.
- Если меняете публичные функции в `src/index.ts`, добавьте или обновите тесты в `src/index.test.ts`.
- Любые серверные утилиты держим в `src/server/*`, чтобы не утянуть их в бандл.
- Новички начинают с `README.md` и `docs/onboarding/README.md`; далее смотрим `docs/UI_SPEC.md` для визуала.

## Последние опорные изменения
- Фасад разложен на чистые сервисы (areas/layout) и конфиг-резолвер, чтобы инжектировать данные в тестах.
- CI (`.github/workflows/test.yml`) гоняет lint + coverage и отправляет `coverage/lcov.info` в Codecov.
- Логгер формирует строки с ISO-датой и уровнем, пути настраиваются через `cwd`/`fileName`.
