# Onboarding: Pizza Tagila

- Начните со `src/index.ts`: фасад и фабрики `createComponentMapApi`/`createDesignTokenApi` реэкспортируют ядро и позволяют тестировать чистые функции без UI.
- Данные: `src/data/componentAreas.ts` (52 компонента, зоны, теги, состояния). Для правок держите `id` уникальными и обновляйте тесты фасада.
- Токены: `src/design/tokens.ts` (8pt, радиусы 8/12/16/24/32, safe area, touchTargetMin=48). Проверяйте сетку через `usesEightPointSpacing` и `isTouchTargetCompliant`.
- UI-слой: `src/App.tsx` и `src/components/ComponentSection.tsx` собирают «канвас» компонентной карты. Поддерживайте 8pt отступы и палитру designTokens.
- Логирование: `src/server/logger.ts` пишет ISO дату/уровень/сообщение в `data/app.log` в Node-среде; в браузере — fallback в консоль.
- Чек-лист проверок: `npm run lint`, `npm run test:coverage`, CI `test.yml` заливает `coverage/lcov.info` в Codecov.
- Подсказки новичку: читайте `AGENTS.md` (корень, src, docs), `docs/UI_SPEC.md` для визуала, `CHANGELOG.md` за контекст последних правок.
