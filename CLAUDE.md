# CLAUDE.md

Guidance for Claude Code (and any other contributor) when working in this repository.

## Stack & Conventions

**Hard constraint: vanilla HTML, CSS, and JavaScript only — no frameworks, no build step.**

- No frontend frameworks or libraries (React, Vue, Angular, Svelte, jQuery, etc.).
- No build tooling, bundlers, or transpilers (webpack, Vite, esbuild, Babel, TypeScript compilation, npm build scripts, etc.).
- Write plain `.html`, `.css`, and `.js` files that run directly in the browser with no compilation or bundling step.
- Do not introduce `package.json` build scripts, module bundler configs, or transpiled syntax that requires a build step to run.

## Working conventions

- Before implementing any non-trivial feature, ask clarifying questions about scope, edge cases, and constraints first — don't propose a plan until you've asked.
