# Changelog

## 2025-12-23 (testable facade + onboarding)
- Refactored `src/index.ts` into pure config resolvers (`resolveFacadeConfig`) plus area/layout service factories to keep the facade thin and unit-testable.
- Added helper coverage in `src/index.test.ts` to lock in injected lookups and custom token handling.
- Documented newcomer entry points in `docs/onboarding/README.md` and linked them from the main README.

## 2025-12-21 (facade)
- Added injectable facade `createPizzaTagila` plus ready-to-use `pizzaTagila` instance to simplify testing and integration.
- Expanded onboarding docs (`README.md`, `src/AGENTS.md`) so newcomers see structure, façade usage, and 8pt rules up front.
- Hardened index tests with injected data to keep coverage high around the public API surface.

## 2025-12-21
- Refactored core helpers into `src/core` and moved design tokens to `src/design/tokens.ts` for better testability and newcomer onboarding.
- Added Python formatting toolchain (`black`, `isort`) via `pyproject.toml` and `.pre-commit-config.yaml`.
- Documented repo structure for contributors with new `docs/AGENTS.md` and refreshed README guidance.
- Strengthened logger helpers/tests and validated empty component maps to prevent silent failures.

## 2025-12-20
- Added the complete UI specification in `docs/UI_SPEC.md` and refactored component helper utilities.
- Brought in platform design tokens (8pt grid, safe areas, touch targets) and expanded coverage checks.
- Created the component map (52 items) with CI for lint + tests + coverage upload to Codecov.
