# PizzaTagila Agent Guide
Scope: repository root.

- Use npm (not yarn/pnpm) for installs and scripts. Required checks before pushing: `npm run lint` and `npm run test:coverage`.
- UI follows 8pt spacing, shared radii (8/12/16/24/32) and the orange/green palette from `designTokens` in `src/index.ts`.
- Keep logic pure and testable: prefer small functions in `src/index.ts` and `src/server/logger.ts`, and keep React components thin.
- Node-only utilities live under `src/server/` to avoid bundling into the client.
- If you add Python code, format it with **black** and **isort**, and register them in pre-commit.
- Do not wrap imports in try/catch. Use descriptive names and avoid commented-out code.
- Safe areas: iOS 44/34, Android 24/16, Web 0/0. Keep touch targets ≥48px and sizes in multiples of 8.
- When changing design tokens, mirror updates across iOS/Android/Web and add/adjust tests in `src/index.test.ts`.
- Newcomer map: start in `src/index.ts` (core logic, tokens), then `src/data/componentAreas.ts` (content), `src/App.tsx` (UI), and `src/server/logger.ts` (file logging). Keep these files small and composable.
