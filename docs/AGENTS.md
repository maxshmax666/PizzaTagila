# Documentation Agent Guide
Scope: `/docs`.

- Keep docs concise and parallel to the repository structure: reference `src/index.ts`, `src/core`, and `src/design/tokens.ts` as the primary entry points.
- Use Markdown only; prefer headings, short paragraphs, and bullet lists over long prose.
- When describing UI, align terminology with the design tokens (8pt spacing, radii 8/12/16/24/32, palette from `designTokens`).
- If you add code snippets, ensure they are runnable with `npm run dev` or `npm test` unless stated otherwise.
- Update `CHANGELOG.md` alongside any significant documentation changes.
