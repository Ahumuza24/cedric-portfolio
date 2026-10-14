# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

Single-page personal portfolio on **Next.js 16 (App Router) + React 19 + TypeScript**, styled with **Tailwind CSS v4** and **shadcn/ui** (`base-nova` style, built on `@base-ui/react`, not Radix). Icons come from `lucide-react`. There is no backend, no database and no API route.

The repo was migrated from a Vite + React 18 SPA. Old Vite-era guidance (Vitest, Playwright, Framer Motion, three.js, EmailJS, `src/sections/`, `src/lib/data.ts`) no longer applies. The leftover `VITE_EMAILJS_*` keys in `.env` are unused.

## Commands

- `npm run dev`: dev server at http://localhost:3000 (Turbopack)
- `npm run build`: production build (also type-checks)
- `npm run start`: serve the production build
- `npm run lint`: ESLint flat config (`eslint-config-next` core-web-vitals + typescript)
- Type-check only: `npx tsc --noEmit`

There is no test suite yet.

## Architecture

- **Content lives in one file: `src/lib/site.ts`.** The exported `site` object holds all copy (hero, about, experience, work/projects, clients, contact, résumé URL), plus the exported types `Project`, `Role`, `Credential`, `ClientSite` and `ProjectTone`. For copy changes, edit this file. Do not hardcode strings inside components.
- **Page composition:** `src/app/page.tsx` renders `SiteHeader` and then the sections in order: `Hero → About → Experience → Work → Clients → Contact`. Each section is a component in `src/components/<name>.tsx`, with kebab-case filenames and named exports.
- **Server-first:** components are React Server Components by default. Only components that need it are marked `"use client"`: `site-header`, `local-clock`, `ruler` and some `ui/` primitives. Keep new interactivity in small client leaves rather than making whole sections client components.
- **`next.config.ts`** enables `cacheComponents` and `partialPrefetching`, and routes `*.css` through `@tailwindcss/turbopack`. Because `cacheComponents` is on, the rules for dynamic data and `"use cache"` differ from older Next versions. Check `node_modules/next/dist/docs/` before adding anything time- or request-dependent to a server component. The live clock is client-only for this reason.
- **Shared visual pieces:** `decor.tsx` provides the hand-drawn `Note`, `Scribble` and `SelectionFrame` accents. `project-visual.tsx` renders the browser/dashboard/phones mockups chosen by `Project.visual` and `Project.tone`.
- **`src/components/ui/`** holds shadcn-generated primitives, managed through `components.json`. Add new ones with `npx shadcn add <component>` instead of writing them by hand.
- `cn` in `src/lib/utils.ts` is re-exported from the `cn` package.

## Styling

- Tailwind v4 is configured in CSS only: tokens live in `@theme inline` in `src/app/globals.css`, and there is no `tailwind.config`.
- Brand palette utilities: `ink`, `canvas` and `pop-{blue,brown,cream,green,mint,pink,yellow}` (e.g. `text-ink`, `bg-pop-yellow`). `canvas-grid` is the page background class.
- Fonts are loaded with `next/font/google` in `src/app/layout.tsx` and exposed as `font-sans` (Instrument Sans), `font-mono` (IBM Plex Mono), `font-hand` (Caveat) and `font-display` (Bitcount Prop Single).
- Import with the `@/` alias, which maps to `src/`.

## Conventions

- Commits follow Conventional Commits (`feat:`, `chore:`, …).
- Design-related agent skills are vendored in `.claude/skills/` and `.agents/skills/`, which mirror each other.

# Coding Standards

### General Rules (Apply to All Code)
- Write code that a junior developer can read and understand without explanation
- Every function/method does ONE thing only — if you need "and" to describe it, split it
- No function longer than 30 lines. No file longer than 300 lines. If it grows beyond
  this, refactor into smaller modules before continuing
- No commented-out code. Delete it. Git history exists for a reason
- No TODO comments in committed code — either build it now or create a task for it
- No magic numbers or strings — use named constants or enums
- All names (variables, functions, files) must be descriptive. No single-letter
  variables except loop counters.
- Never nest more than 3 levels deep. Use early returns, guard clauses, and
  extracted functions to flatten logic
- Prefer explicit over implicit — readable code over clever code

### General rule
while genereating the code please go for the easiest but best solution do not over engineer or over complicate solutions or features

## Security Rules
- Never store secrets in code — use environment variables via `.env`
- Never commit `.env` files — they must be in `.gitignore`
- All API endpoints must check permissions before returning data

## Git Rules
- Commit after every working unit of change
- Commit message format: `[area] short description of what changed`