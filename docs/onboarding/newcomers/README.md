# Навигатор для новичка

- **Что это:** фасад `createPizzaTagila` поверх карты 52 компонентов и 8pt токенов; UI тонкий, вся логика — в чистых функциях.
- **Куда смотреть:** начните с `src/index.ts` и тестов `src/index.test.ts`, затем откройте ядро в `src/core/*` и токены в `src/design/tokens.ts`.
- **Команды:** `npm install`, `npm run dev`, `npm run lint`, `npm run test:coverage` — обязательный минимум перед любыми PR.
- **Валидации:** фасад проверяет карту (`validate`, `findDuplicates`, `findMissingMetadata`) и сетку (`usesEightPointSpacing`, `isTouchTargetCompliant`) без побочных эффектов.
- **UI-слой:** `src/App.tsx` + `src/components/*` только читают фасад; все значения тянут из `designTokens` (оранжево-зелёная палитра, отступы кратно 8).
- **Далее:** пролистайте `README.md` и `docs/onboarding/README.md`, сверяйтесь с `docs/UI_SPEC.md` для визуала и с `docs/architecture/README.md` для канваса.
