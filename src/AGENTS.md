# Src Agent Guide
Scope: `/src`.

- Keep helpers pure and composable; prefer data-in, data-out functions so they stay easy to unit test.
- React components must stay thin: reuse design tokens from `src/design/tokens.ts` and data from `src/data` instead of inlining values.
- Follow the 8pt spacing/radius palette (see `designTokens` in `src/index.ts`) and avoid commented-out code.
- Any new exports in `src/index.ts` should have coverage in `src/index.test.ts`; keep the facade small and dependency-injected for testability.
- Server-only utilities remain in `src/server/` to avoid bundling them into the client.
