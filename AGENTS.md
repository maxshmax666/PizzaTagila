# PizzaTagila Agent Guide
Scope: repository root.

- Use npm (not yarn/pnpm) for installs and scripts. Required checks before pushing: `npm run lint` and `npm run test:coverage`.
- UI follows 8pt spacing, shared radii (4/8/12/16) and the orange/green palette from `designTokens` in `src/index.ts`.
- Keep logic pure and testable: prefer small functions in `src/index.ts` and `src/server/logger.ts`, and keep React components thin.
- Node-only utilities live under `src/server/` to avoid bundling into the client.
- If you add Python code, format it with **black** and **isort**, and register them in pre-commit.
- Do not wrap imports in try/catch. Use descriptive names and avoid commented-out code.
