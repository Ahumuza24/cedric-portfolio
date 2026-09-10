# Project Instructions

## Tech Stack
React 18 + TypeScript + Vite 6 SPA (no backend). Tailwind CSS for styling, Framer Motion for animation, three.js/@react-three/fiber for the hero 3D scene, EmailJS for client-side contact-form email, react-router-dom for routing (two routes: Home, NotFound).

## Code Style
- Import via the `@/` alias (maps to `src/`), not relative paths crossing directories.
- Component files: PascalCase (`Navbar.tsx`). Lib/util files: camelCase (`data.ts`, `capabilities.ts`).
- Tailwind utility classes inline in JSX — no CSS modules, no styled-components.
- No repo-wide indentation rule is enforced (mixed 2- and 4-space files exist); match the surrounding file, don't reformat unrelated lines.
- Env vars are `VITE_`-prefixed and fall back to placeholder strings rather than throwing when unset — follow that pattern for any new client-exposed config.

## Testing
- Unit/component tests: `npm test` (Vitest + jsdom + React Testing Library). Coverage: `npm run test:coverage`.
- Test files are co-located next to their source (`Foo.tsx` + `Foo.test.tsx`), not in a separate `__tests__` tree.
- Mock side-effecting libraries with `vi.mock` (see `Contact.test.tsx` for the pattern with `@emailjs/browser` and `react-hot-toast`).
- Assert via accessible roles/labels (`getByRole`, `getByLabelText`), not test IDs.
- Coverage thresholds (80% branches/functions/lines/statements) are enforced only on the files listed in `vitest.config.ts` (`Navbar.tsx`, `capabilities.ts`, `Contact/Experience/Projects/Skills.tsx`) — if you add meaningful logic elsewhere, consider adding it to that include list.
- E2E: `npm run test:e2e` (Playwright, desktop + mobile-viewport projects) — specs in `tests/e2e/`.

## Build & Run
- Dev: `npm run dev`
- Build: `npm run build` (runs `tsc` then `vite build`)
- Lint: `npm run lint`
- Full check (type-check + lint + unit tests): `npm run check`

## Project Structure
- `src/lib/data.ts` — all portfolio content (experience, education, projects, websites, skills) as static arrays. Edit here for copy changes, not inside section components.
- `src/sections/` — one component per page section (Hero, Projects, Experience, Education, Skills, Contact, Websites), composed in order by `src/pages/Home.tsx`.
- `src/components/hero/` — 3D hero scene (`HeroScene.tsx`) and its visual wrapper.
- `src/lib/capabilities.ts` — feature detection (reduced-motion, WebGL support) that decides static vs. WebGL hero rendering.
- `src/components/layout/` — Navbar, Footer.
- `tests/e2e/` — Playwright journeys.

## Conventions
- No enforced commit message format; recent commits trend toward Conventional Commits (`feat:`, `chore:`) — prefer that style for new commits.
- `dist/` build output is tracked in git in this repo — don't assume it's ignored; check `git status` before broad `git add`.
- This is a fully static, content-driven site — new features should stay client-only unless the user explicitly asks for a backend.
