# Svelte 5 + SvelteKit 2 — Complete Frontend Course Curriculum (v2)

> **Stack**: Svelte 5 · SvelteKit 2 · TypeScript Strict Mode · CSS PE7 Architecture · GSAP · Svelte Built-in Animations
> **Syntax Standard**: April 2026 — all runes, APIs, and best practices current as of svelte@5.55.x / kit@2.55.x
> **Target Student**: Complete beginner — zero JS, zero TS, basic HTML/CSS
> **Philosophy**: DiCenso root-level understanding — never memorize surface patterns, always understand why
> **Package Manager**: pnpm exclusively
> **Icons**: Iconify with Phosphor or Carbon sets — never Lucide

---

## Core Learning Principles

### The Atomic Lesson Unit

Every single lesson follows this three-part structure — no exceptions:

1. **Concept** — what it is, why it exists, the root-level understanding
2. **Style it** — PE7 CSS applied immediately, mobile-first from lesson one
3. **Interact** — JS/TS concept introduced through the problem it solves
4. **Mini-build** — tangible working output the student can see on screen

### The Three-Tier Project System

- **Lesson level** → every lesson produces a mini-build
- **Module level** → all lesson mini-builds compound into one cohesive module project
- **Course level** → capstone — the most advanced PE7 SvelteKit application possible

### Mobile-First Non-Negotiable

Every mini-build and module project is:

- Built mobile-first — base styles are mobile, enhanced upward with min-width
- Tested at 320px, 375px, 768px, 1024px, 1440px before considered complete
- Uses fluid clamp() values from PE7 token system before reaching for media queries
- Uses @media (min-width) — never @media (max-width) except in rare override cases
- Passes Lighthouse mobile audit before moving to next lesson

### JS/TS Learning Model

JavaScript and TypeScript are never taught in isolation. Every JS/TS concept is introduced inside Svelte — in context, solving a real UI problem. The concept and its visual expression are always taught together in the same lesson.

---

## CSS PE7 Architecture — Non-Negotiable Throughout

### The Layer Stack (established Lesson 1.5, enforced forever)

```css
@layer reset, tokens, base, layout, components, animations;
```

### Global Token System (app.css)

```css
:root {
  /* === BREAKPOINTS — mobile first, min-width up === */
  --bp-sm: 480px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;

  /* === FLUID TYPOGRAPHY === */
  --text-xs:   clamp(0.75rem,  1.5vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 2vw,   1rem);
  --text-base: clamp(1rem,     2.5vw, 1.125rem);
  --text-lg:   clamp(1.125rem, 3vw,   1.5rem);
  --text-xl:   clamp(1.5rem,   4vw,   2rem);
  --text-2xl:  clamp(2rem,     5vw,   3rem);
  --text-hero: clamp(2.5rem,   8vw,   5rem);

  /* === FLUID SPACING === */
  --space-xs:  clamp(0.25rem, 1vw,  0.5rem);
  --space-sm:  clamp(0.5rem,  2vw,  1rem);
  --space-md:  clamp(1rem,    3vw,  1.5rem);
  --space-lg:  clamp(1.5rem,  4vw,  2.5rem);
  --space-xl:  clamp(2rem,    6vw,  4rem);
  --space-2xl: clamp(3rem,    8vw,  6rem);

  /* === COLORS — OKLCH exclusively === */
  --color-brand:      oklch(65% 0.22 270);
  --color-brand-dim:  oklch(55% 0.18 270);
  --color-surface:    oklch(98% 0.01 270);
  --color-surface-2:  oklch(94% 0.02 270);
  --color-text:       oklch(20% 0.02 270);
  --color-text-muted: oklch(50% 0.02 270);
  --color-border:     oklch(88% 0.02 270);
  --color-error:      oklch(60% 0.22 25);
  --color-success:    oklch(65% 0.18 145);
  --color-warning:    oklch(75% 0.18 85);

  /* === MOTION TOKENS === */
  --dur-instant: 100ms;
  --dur-fast:    200ms;
  --dur-base:    300ms;
  --dur-slow:    500ms;
  --dur-slower:  800ms;

  --ease-out:        cubic-bezier(0.0, 0, 0.2, 1);
  --ease-in:         cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
  --ease-expressive: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:     cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* === RADII === */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   1rem;
  --radius-xl:   1.5rem;
  --radius-full: 9999px;

  /* === SHADOWS === */
  --shadow-sm: 0 1px 3px oklch(0% 0 0 / 0.08);
  --shadow-md: 0 4px 12px oklch(0% 0 0 / 0.1);
  --shadow-lg: 0 8px 32px oklch(0% 0 0 / 0.12);
}
```

### Rules

- OKLCH color space exclusively — no hex, no rgb, no hsl
- Scoped `<style>` blocks per component — no `:global()` unless absolutely necessary
- Per-page color personalities via scoped CSS custom property overrides
- Native CSS nesting — no preprocessors
- Logical properties — inline, block, start, end
- No Tailwind, no utility classes, no inline styles

### Rendering Model Reference

| Mode | Config | When to Use |
|------|--------|-------------|
| SSR | Default — zero config | Dynamic data, auth-gated pages, personalized content |
| SSG | `export const prerender = true` | Blogs, docs, landing pages, marketing |
| CSR | `export const ssr = false` | Dashboards behind auth, highly interactive tools |
| Hybrid | Mix per route | Most real production apps |

### Runes Reference (Svelte 5 — April 2026)

| Rune | Purpose |
|------|---------|
| `$state()` | Reactive state — deep by default |
| `$state.raw()` | Non-deep reactive state — performance sensitive |
| `$state.snapshot()` | Plain object from reactive state — for API calls |
| `$derived()` | Computed value — pure, no side effects |
| `$derived.by()` | Complex derived — multiple statements |
| `$effect()` | Side effect — runs after DOM update |
| `$effect.pre()` | Side effect — runs before DOM update |
| `$effect.pending()` | Detect ongoing async work (experimental) |
| `$props()` | Component props |
| `$bindable()` | Two-way bindable prop |
| `$inspect()` | Dev-only logging of reactive values |
| `$inspect.trace()` | Dev-only reactive dependency tracer |
| `$host()` | Access host element in custom elements |

---

> The full module-by-module curriculum (Modules 1–15 + Capstone) is the canonical spec for this repository. It governs every future lesson, project, and refactor. Every module's content, mini-builds, and project requirements as delivered by the user are authoritative — consult the original curriculum document for complete module details. This file is the living source of truth; when module content is built, expand this section with the implementation notes and links to the routes under `src/routes/module-N/`.

## Module Index

1. **Module 1 — The Foundation** — typed Svelte components, PE7 CSS baseline, mobile-first (Lessons 1.1–1.9, Portfolio Card project)
2. **Module 2 — Reactivity** — runes deep dive, reactive built-ins (Lessons 2.1–2.15, Interactive Dashboard)
3. **Module 3 — Components & Props** — `$props`, `$bindable`, snippets (Lessons 3.1–3.11, Component Library Part 1)
4. **Module 4 — Control Flow & Special Elements** — `{#if}`, `{#each}`, `{#await}`, `<svelte:*>` (Lessons 4.1–4.12, Product Listing)
5. **Module 5 — Events & Interaction** — typed events, `on()`, bindings, accessibility (Lessons 5.1–5.12, Validated Form)
6. **Module 6 — Styling Mastery** — full PE7 architecture, transitions, Tween/Spring (Lessons 6.1–6.18, Animated Landing Page)
7. **Module 7 — GSAP Integration** — timelines, ScrollTrigger, actions, `{@attach}` (Lessons 7.1–7.14, Marketing Page)
8. **Module 8 — SvelteKit Routing & Layouts** — SSR, hydration, shallow routing, snapshots (Lessons 8.1–8.14, Portfolio Site)
9. **Module 9A — Data Loading (load)** — typed load, streaming, SSG (Lessons 9A.1–9A.10, Weather Dashboard)
10. **Module 9B — Remote Functions** — query/form/command/prerender, single-flight mutations (Lessons 9B.1–9B.14, Real-Time App)
11. **Module 10 — API Routes & Forms** — `+server.ts`, form actions, auth (Lessons 10.1–10.9, CRUD Notes)
12. **Module 11 — State Management at Scale** — `createContext`, `.svelte.ts`, TanStack Table (Lessons 11.1–11.11, Admin Dashboard)
13. **Module 12 — Performance & Production** — Core Web Vitals, error boundaries, testing, service workers (Lessons 12.1–12.12)
14. **Module 13 — SEO** — structured data, E-E-A-T, INP, AI Overviews (Lessons 13.1–13.14)
15. **Module 14 — Custom Elements & Library Publishing** — `<svelte:options customElement>`, `@sveltejs/package` (Lessons 14.1–14.6)
16. **Module 15 — 3D & Immersive with Threlte** — Three.js via Threlte (Lessons 15.1–15.5)
17. **Capstone — PE7 Flagship Project** — surgical-reveal chunk system across every skill

See the original curriculum briefing for full per-lesson content, mini-build descriptions, reveal-system tables, and version pinning (svelte@5.55.x, kit@2.55.x, vite@7, TypeScript strict, pnpm 9+). That briefing is the authoritative specification.

---

## Version Reference

| Package | Version | Notes |
|---|---|---|
| svelte | 5.55.x+ | Runes, attachments stable, function-based config |
| @sveltejs/kit | 2.55.x+ | Matcher type narrowing, server error boundaries, remote functions |
| @sveltejs/cli (sv) | 0.12.6+ | better-auth addon |
| @sveltejs/package | Latest | Component library packaging |
| vite | 7.x | Rolldown-powered |
| typescript | 5.x | Strict mode always |
| gsap | 3.12+ | Built-in TypeScript types |
| three + @threlte/core + @threlte/extras | Latest | 3D rendering |
| @tanstack/svelte-table | Latest | Svelte 5 adapter |
| valibot | Latest | Remote form schema validation |
| vitest | Latest | Unit testing |
| @playwright/test | Latest | E2E testing |
| pnpm | 9.x+ | Package manager — always |
