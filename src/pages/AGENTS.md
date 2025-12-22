# Pages Agent Guide
Scope: `/src/pages`.

- Keep each screen mobile-first: max container width ~480px, centered phone shell, warm paper background.
- Reuse design tokens from `src/index.ts` and `src/design/tokens.ts` for colors, radii (8/12/16/24/32), and shadows; avoid hard-coded magic numbers outside the 8pt scale.
- Components should stay thin: push data mocks to `src/data/uiContent.ts` and cart math to `src/core/cart.ts` so pages remain declarative.
- Do not pull remote assets; reference local files in `public/assets` for imagery and textures.
- Navigation must stay wired to react-router paths (`/menu`, `/cart`, `/checkout`, `/promos`, `/delivery`, `/account`, `/notifications`, `/loyalty`).
