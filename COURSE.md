# Svelte 5 + SvelteKit 2 — Complete Frontend Course Curriculum (v2)

> **Stack**: Svelte 5 · SvelteKit 2 · TypeScript Strict Mode · CSS PE7 Architecture · GSAP · Svelte Built-in Animations
> **Syntax Standard**: April 12, 2026 — all runes, APIs, and best practices current as of svelte@5.55.3 / kit@2.57.1 / vite@8.0.8 / typescript@6.0.2 — includes async/await, remote functions, attachments, `$state.eager`, `fork()`, `hydratable()`, `transformError`
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
| `$state.eager()` | Immediate UI update — bypasses synchronized async batching (since 5.x) |
| `$derived()` | Computed value — pure, no side effects |
| `$derived.by()` | Complex derived — multiple statements |
| `$effect()` | Side effect — runs after DOM update |
| `$effect.pre()` | Side effect — runs before DOM update |
| `$effect.pending()` | Detect ongoing async work inside boundaries (experimental) |
| `$props()` | Component props |
| `$bindable()` | Two-way bindable prop |
| `$inspect()` | Dev-only logging of reactive values |
| `$inspect.trace()` | Dev-only reactive dependency tracer |
| `$host()` | Access host element in custom elements |

### Async & Concurrency APIs (Svelte 5 — April 2026)

| API | Purpose |
|-----|---------|
| `await` in markup | Top-level `await` in `<script>` and `{await expr}` in templates — requires `compilerOptions.experimental.async: true` |
| `hydratable(key, fn)` | Serialize async results during SSR, skip re-fetch during hydration — used internally by remote functions |
| `fork(fn)` | Pre-run async work (preloading) before committing state changes — `fork().commit()` / `fork().discard()` (since 5.42) |
| `settled()` | Returns a Promise that resolves when all pending async updates are complete |
| `<svelte:boundary pending={}>` | Show placeholder UI while boundary's `await` expressions first resolve; `failed` snippet for error recovery (since 5.3) |
| `transformError` | Server-side error sanitization for `<svelte:boundary>` during SSR — passed to `render()` (since 5.51) |

### Attachments (Svelte 5 — April 2026)

| API | Purpose |
|-----|---------|
| `{@attach fn}` | Declarative element attachment — runs on mount, optional cleanup on unmount |
| `createAttachmentKey()` | Programmatic attachment via object spreading — for library authors (since 5.29) |
| `fromAction(action, () => arg)` | Convert a `use:` action into an `{@attach}` attachment — migration bridge |

### SvelteKit Hooks & Server APIs (Kit 2.27+ — April 2026)

| API | Purpose |
|-----|---------|
| Remote functions (`query`, `form`, `command`, `prerender`) | Type-safe server functions callable from client — `$app/server` (since Kit 2.27) |
| `getRequestEvent()` | Access current `RequestEvent` inside remote functions |
| `handleValidationError` hook | Customize 400 responses for remote function schema validation failures |
| `transport` hook | Encode/decode custom types across server/client boundary (e.g. `Vector`, `Date` subclasses) |
| `reroute` (async) | Async reroute hook — can `fetch` to decide where to reroute (since Kit 2.18) |
| Standard Schema validation | Remote functions accept any Standard Schema (valibot, zod, arktype) for argument validation |

---

> The full module-by-module curriculum (Modules 1–15 + Capstone) is the canonical spec for this repository. It governs every future lesson, project, and refactor. Every module's content, mini-builds, and project requirements as delivered by the user are authoritative — consult the original curriculum document for complete module details. This file is the living source of truth; when module content is built, expand this section with the implementation notes and links to the routes under `src/routes/module-N/`.

## Module Index

1. **Module 1 — The Foundation** ✅ shipped — typed Svelte components, PE7 CSS baseline, mobile-first (Lessons 1.1–1.9, Portfolio Card project)
2. **Module 2 — Reactivity** ✅ shipped — runes deep dive, reactive built-ins (Lessons 2.1–2.15, Interactive Dashboard)
3. **Module 3 — Components & Props** ✅ shipped — see expanded detail below (Lessons 3.1–3.11, UI Component Library Part 1)
4. **Module 4 — Control Flow & Special Elements** ✅ shipped — see expanded detail below (Lessons 4.1–4.12, Dynamic Product Listing)
5. **Module 5 — Events & Interaction** ✅ shipped — see expanded detail below (Lessons 5.1–5.12, Interactive Form with Live Validation)
6. **Module 6 — Styling Mastery** ✅ shipped — see expanded detail below (Lessons 6.1–6.18, Animated Landing Page)
7. **Module 7 — GSAP Integration** ✅ shipped — timelines, ScrollTrigger, `use:` actions, `{@attach}` attachments, `createAttachmentKey`, `fromAction` (Lessons 7.1–7.14, Marketing Page)
8. **Module 8 — SvelteKit Routing & Layouts** ✅ shipped — see expanded detail below (Lessons 8.1–8.14, Multi-Page Portfolio Site)
9. **Module 9A — Data Loading (load)** ✅ shipped — see expanded detail below (Lessons 9A.1–9A.10, Weather Dashboard)
10. **Module 9B — Remote Functions** ✅ shipped — `query`/`form`/`command`/`prerender` from `$app/server`, Standard Schema validation, `fork()`, `hydratable()`, async `await` in markup, `<svelte:boundary pending={}>` (Lessons 9B.1–9B.14, Real-Time Data App)
11. **Module 10 — API Routes & Forms** ✅ shipped — see expanded detail below (Lessons 10.1–10.9, CRUD Note-Taking App)
12. **Module 11 — State Management at Scale** ✅ shipped — context, .svelte.ts, TanStack Table (Lessons 11.1–11.11, Admin Dashboard)
13. **Module 12 — Performance & Production** ✅ shipped — Core Web Vitals, `<svelte:boundary>` with `pending`/`failed`/`onerror`/`transformError`, testing, service workers (Lessons 12.1–12.12, Production App)
14. **Module 13 — SEO** ✅ shipped — see expanded detail below (Lessons 13.1–13.14, SEO-Optimized Content Site)
15. **Module 14 — Custom Elements & Library Publishing** ✅ shipped — `<svelte:options customElement>`, `@sveltejs/package` (Lessons 14.1–14.6, Library + CE Suite)
16. **Module 15 — 3D & Immersive with Threlte** ✅ shipped — Three.js via Threlte (Lessons 15.1–15.5, Immersive Landing)
17. **Capstone — PE7 Flagship Project** ✅ shipped — surgical-reveal chunk system across every skill

---

## Module 3 — Components & Props (expanded)

**Goal**: Student extracts reusable, typed components into `$lib/components/` — the foundation for every scaled Svelte app.
**JS/TS concepts**: Functions as props, default parameters, interfaces for props, unions, generics, TypeScript narrowing across files.
**New runes**: `$props()`, `$bindable()`. **New syntax**: `{#snippet}`, `{@render}`, function bindings `bind:value={getter, setter}`.

- **3.1 — What components are**. Extracting repeated UI logic into a `.svelte` file. Takes the Module 1 portfolio card and refactors it into `$lib/components/ProfileCard.svelte`. Mini-build: the lesson route renders the extracted component with the same `Profile` interface from `$lib/types/profile.ts`.
- **3.2 — `$props()`**. The Svelte 5 pattern for receiving data. Destructuring props. Mini-build: `Avatar.svelte` taking `src`, `alt`, `size` props; lesson demos multiple sizes side by side.
- **3.3 — Typed props with interfaces**. The `interface Props { ... }` pattern plus `let { ... }: Props = $props()`. TypeScript errors when wrong types are passed. Mini-build: `Button.svelte` with `variant: 'primary' | 'secondary' | 'ghost'` and `size: 'sm' | 'md' | 'lg'`; lesson renders a grid of every combination.
- **3.4 — Optional props + defaults**. `?` in the interface, default values in destructuring, required vs optional. Mini-build: `Badge.svelte` with optional `tone`, `rounded`, `label` with sensible defaults; lesson shows defaulted vs overridden.
- **3.5 — `$bindable()`**. Two-way binding from child to parent. `bind:value={myState}` in parent. Mini-build: `TextField.svelte` with `$bindable()` value; lesson parent renders the field and a live display of the bound state updating.
- **3.6 — Function bindings**. `bind:value={() => getter, (v) => setter}` available since svelte 5.9. Validation, transformation, masking on bind. Mini-build: `CurrencyInput.svelte` that strips non-digits on input and formats as currency on display.
- **3.7 — Snippets**. `{#snippet name()}...{/snippet}` and `{@render name()}` — the Svelte 5 replacement for slots. Mini-build: `Card.svelte` with `header` and `body` snippet regions defined at the call site.
- **3.8 — Snippets as props**. `Snippet` type from `svelte`. Parameterized snippets `Snippet<[title: string]>`. Mini-build: `Modal.svelte` with `title: string` prop plus `children: Snippet` for the body.
- **3.9 — Component composition**. Building complex UI from small typed pieces. Prop spreading `{...rest}`. Mini-build: `Notification` built from `Badge + Avatar + Card` composing.
- **3.10 — CSS custom properties bridge**. Per-component variant systems driven by CSS custom properties. `<Button --btn-bg="oklch(...)" />` passthrough. Mini-build: a single `Button.svelte` with four visible variants from CSS custom property overrides.
- **3.11 — Responsive components**. Container queries `@container`, `container-type: inline-size`, 44px touch targets. Mini-build: a `Card.svelte` that reflows between horizontal and vertical based on its container's width, not the viewport.
- **Module 3 Project — UI Component Library Part 1**. `src/routes/module-3/project/+page.svelte` imports every component from `$lib/components/` and renders a gallery showing every variant, every size, every state. Distinct OKLCH personality (`oklch(64% 0.16 220)`, a deep blue). Live modal trigger. Proves composition (`Notification`).

---

## Module 4 — Control Flow & Special Elements (expanded)

**Goal**: Student controls what renders, when it renders, handles async data, and uses Svelte's special elements.
**JS/TS concepts**: Conditionals, boolean logic, array iteration, destructuring, Promises, async/await, typed errors, `unknown` narrowing.

- **4.1 — `{#if}`** — boolean logic, truthy/falsy. Mini-build: password strength indicator with three `{#if}` branches (weak/medium/strong).
- **4.2 — `{:else if}` / `{:else}`** — multi-branch logic, the `'idle' | 'loading' | 'error' | 'success'` status pattern. Mini-build: status badge with four visual states from one typed union.
- **4.3 — `{#each}` + destructuring** — iterating typed arrays, index parameter. Mini-build: contact list from an array of typed `Contact` objects.
- **4.4 — `{#each}` with keys** — `(item.id)` for stable identity, why missing keys break. Mini-build: two side-by-side reorderable lists — one keyed, one unkeyed — sharing state, so the student sees the bug visually.
- **4.5 — Nested `{#each}`** — iterating arrays of arrays with nested typed interfaces. Mini-build: categorized product grid (category → nested products).
- **4.6 — `{#key}` block** — forcing re-mounts, resetting component state, triggering entrance animations. Mini-build: content switcher that animates in fresh on every key change.
- **4.7 — Promises + async/await** — the JS async model, `fetch`, manual loading/error/data state. Mini-build: manual data fetcher with three state variables.
- **4.8 — `{#await}`** — `{#await promise}`, `{:then data}`, `{:catch error}`. Mini-build: same fetcher rebuilt cleanly with `{#await}` — half the code.
- **4.9 — `{:catch}` + typed errors** — `catch (e: unknown)` narrowing, user-friendly error UI, retry. Mini-build: a robust API fetcher with typed error states and a retry button.
- **4.10 — `Promise<T>` return types** — typing async functions end to end. Mini-build: a fully typed user profile loader with zero `any`.
- **4.11 — `<svelte:window>` / `<svelte:document>` / `<svelte:body>`** — cleanup-free, SSR-safe event listeners; bindable properties (`innerWidth`, `scrollY`, `visibilitychange`). Mini-build: keyboard shortcut overlay detecting `Ctrl+K` via `<svelte:window onkeydown>`, displaying current window dimensions via bindings.
- **4.12 — `<svelte:element>` / `<svelte:options>`** — runtime-determined element tags, per-component compiler options. Mini-build: a dynamic `Heading` component that renders `h1`–`h6` based on a typed `level` prop via `<svelte:element this={...}>`.
- **Module 4 Project — Dynamic Product Listing**. `src/routes/module-4/project/+page.svelte` — filterable, searchable product grid. Typed `Product[]` hardcoded. `{#each}` with stable IDs. `{#if}` branches for empty state and no-results. `{#await}` loading state with skeleton cards (600 ms fake fetch). `<svelte:window onkeydown>` for `/` focusing search and `Escape` clearing. OKLCH personality `oklch(66% 0.17 35)` (warm orange). Mobile-first; 480px, 768px, 1024px breakpoints.

---

## Module 5 — Events & Interaction (expanded)

**Goal**: Student handles every user interaction pattern with fully typed DOM events.
**JS/TS concepts**: Functions deeply, arrow functions, closures, TypeScript event types, debounce, throttle.

- **5.1 — Event handlers in Svelte 5**. The modern `onclick`/`oninput`/`onchange` attribute syntax (NOT `on:click`). Inline vs named handlers. Mini-build: a like button with click counter and animated heart.
- **5.2 — JS functions deeply**. Declarations vs arrow functions. Typed parameters and returns. Functions as first-class values. Mini-build: a toolbar with several named handlers, each typed.
- **5.3 — Typed DOM events**. `MouseEvent`, `KeyboardEvent`, `InputEvent`, `FocusEvent`, `SubmitEvent`. `e.target` narrowing with `instanceof HTMLInputElement`. Mini-build: keyboard shortcut detector with typed `KeyboardEvent`.
- **5.4 — preventDefault and stopPropagation**. Default browser behaviors, `e.preventDefault()`, `e.stopPropagation()`. Mini-build: custom dropdown that doesn't close when clicking inside (stopPropagation on inner click).
- **5.5 — Forwarding events**. The Svelte 5 pattern — accept `onclick?: (e: MouseEvent) => void` as a prop and attach it to the inner element. Mini-build: reusable Button that forwards its click event to any parent handler.
- **5.6 — `on()` from svelte/events**. Programmatic event attachment for dynamic/conditional listeners. `on(window, 'keydown', handler)` returns a cleanup. Preserves ordering with declarative handlers. Mini-build: a global keyboard listener that attaches/detaches based on a toggle.
- **5.7 — Closures in handlers**. What a closure is. Why closures in `{#each}` work correctly in Svelte. Mini-build: multi-item accordion where each item's toggle closes over its own open state.
- **5.8 — Debounce and throttle**. The problem with firing on every keystroke. Implementing debounce (wait until typing stops) and throttle (fire at most every N ms) with `setTimeout`. Mini-build: search input with 300ms debounce showing a visible "searching..." state before the final query fires.
- **5.9 — Callback prop pattern**. Custom events in Svelte 5 are just typed callback props — no `createEventDispatcher`. `onselect?: (item: Item) => void`. Mini-build: a toast notification system where child components trigger toasts via a callback prop.
- **5.10 — Bindings deep dive**. `bind:group` for radios/checkboxes, media bindings (`bind:currentTime`, `bind:paused`, `bind:volume`), dimension bindings (`bind:clientWidth`), `bind:this` for DOM refs, `<details bind:open>`. Mini-build: a custom audio player with seek/volume/time bound to an `<audio>` element.
- **5.11 — Touch and pointer events**. `ontouchstart`/`ontouchend`/`onpointerdown`. `@media (hover: hover)` to differentiate. 44px touch targets. Mini-build: a swipe handler that works with mouse or touch via pointer events.
- **5.12 — Keyboard accessibility**. `tabindex`, `aria-*`, focus management, `onfocus`/`onblur`. Building interactions that work without a mouse. Mini-build: a fully keyboard-navigable custom select — Tab, Arrow, Enter, Escape all work.
- **Module 5 Project — Interactive Form with Live Validation**. Multi-field registration form with real-time debounced validation, typed event handlers, `bind:group` for preferences, animated error states, full keyboard accessibility, touch-friendly, zero dependencies. Per-page OKLCH personality `oklch(62% 0.19 155)` (mint green).

---

## Module 6 — Styling Mastery (expanded)

**Goal**: Student masters PE7 CSS architecture in depth AND Svelte's complete animation system.
**CSS concepts**: Every layer's purpose, OKLCH, container queries, CSS Grid, Flexbox, logical properties.
**Svelte APIs**: `transition:`, `in:`/`out:`, `animate:flip`, `svelte/motion` (Tween, Spring, prefersReducedMotion), custom transitions.

- **6.1 — @layer architecture in depth**. Each layer's purpose — reset, tokens, base, layout, components, animations. Why order matters. Adding to layers from component `<style>` blocks. Mini-build: a layer visualization page showing selectors in each layer with visible specificity notes.
- **6.2 — OKLCH in depth**. Lightness, Chroma, Hue. Perceptual uniformity vs hex/HSL. Building a ramp programmatically. Mini-build: an OKLCH ramp generator — adjust L/C/H to generate a consistent 9-step palette, display side by side.
- **6.3 — Full token system**. Every category composed. Motion tokens. Mini-build: a page that demonstrates every `--text-*`, `--space-*`, `--dur-*`, `--radius-*`, `--shadow-*` with a visible sample.
- **6.4 — Native CSS nesting in Svelte**. `&` combinator, nested rules in scoped styles. Cleanly nesting hover/focus/active states. Mini-build: a navigation component with every state nested cleanly inside one selector.
- **6.5 — Logical properties**. `margin-inline-*`, `padding-block-*`, `inset-inline-*`. Why physical properties break in RTL. Mini-build: a card that correctly mirrors in RTL using `dir="rtl"` attribute, proving logical props work both ways.
- **6.6 — CSS Grid patterns**. `auto-fill` vs `auto-fit`, `minmax()`, when Grid beats Flexbox. Mini-build: a card grid that reflows from 1 column on mobile to 4 on desktop with zero media queries using `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))`.
- **6.7 — Flexbox patterns**. `flex-wrap` for intrinsic layouts, holy grail patterns, `gap` with fluid tokens. Mini-build: a responsive sidebar that collapses to stacked on mobile and sidebar+main on tablet+.
- **6.8 — Container queries**. `@container (min-width: ...)` + `container-type: inline-size`. Why they solve the "same component in multiple contexts" problem. Mini-build: a widget that reflows correctly whether in a narrow sidebar or wide main, proven by rendering it twice on the same page in different containers.
- **6.9 — Per-page color personalities**. Overriding semantic color tokens in a scoped `<style>` block on the page's root element. Mini-build: three mini-pages on one route each with a distinct OKLCH palette (teal, rose, amber) from one shared component library.
- **6.10 — CSS transitions with motion tokens**. `transition: property var(--dur-base) var(--ease-out)`. Multi-property, `transition-delay`, reduced-motion respect. Mini-build: a button with smooth hover/focus/active/disabled state transitions all driven by motion tokens.
- **6.11 — Svelte `transition:` directive**. Built-in `fade`, `fly`, `slide`, `scale`, `blur`, `draw`. Parameters, delay, easing from `svelte/easing`. Mini-build: a notification stack where each notification uses `fly` on enter and `fade` on exit via a single bidirectional `transition:`.
- **6.12 — `in:` and `out:` directives**. Different enter/exit animations. `in:fly={{ y: -20 }}` plus `out:fade`. Mini-build: a modal that flies in from below on open and fades out on close.
- **6.13 — `animate:flip`**. The FLIP technique (First, Last, Invert, Play) for list reordering. Combining with keyed `{#each}`. Mini-build: a reorderable task list where items smoothly animate to their new positions via `animate:flip={{ duration: 300 }}`.
- **6.14 — `Tween` class**. `new Tween(initial, options)` from `svelte/motion`. `Tween.of(() => number)` for reactive binding. Easing functions. Mini-build: an animated progress bar that smoothly tweens from 0 to any target percentage.
- **6.15 — `Spring` class**. `new Spring(value, { stiffness, damping })` for physics-based motion. `prefersReducedMotion.current` from `svelte/motion`. Mini-build: a card that follows the cursor with spring physics; springs disable when the OS reduced-motion preference is on.
- **6.16 — Custom transitions**. Transition function signature `(node, params) => TransitionConfig`. Returning `css` or `tick` functions. Mini-build: a typewriter entrance transition that reveals text character by character.
- **6.17 — Stagger patterns**. Fine-tuning parameters, calculating delays from the `{#each}` index, staggered grid entrances. Mini-build: a grid of cards that fly in one by one with an index-based delay offset.
- **6.18 — `prefers-reduced-motion`**. Why some users need reduced motion. Respecting it in CSS (`@media (prefers-reduced-motion: reduce)`) and in Svelte transitions (`prefersReducedMotion.current`). Mini-build: the 6.17 staggered grid rewritten to fully respect the OS preference — no animation when reduced motion is on.
- **Module 6 Project — Animated Landing Page**. Hero section, feature cards, testimonials, CTA — distinct OKLCH palette (`oklch(58% 0.21 300)`, a violet), full PE7 architecture, container-query responsive grid, Svelte transitions throughout, Spring/Tween animations on scroll, reduced-motion respected, Lighthouse-ready mobile-first.

---

## Module 8 — SvelteKit Routing & Layouts (expanded)

**Goal**: Student understands file-based routing, SSR, hydration, and SvelteKit's application architecture in depth.
**New concepts**: SSR, hydration, nested layouts, dynamic routes, `$app/state` (replaces deprecated `$app/stores`), `$app/navigation`, hooks (`handle`, `handleError`, `handleFetch`, `reroute` (async since Kit 2.18), `transport`), shallow routing, snapshots, view transitions, rendering modes.

- **8.1 — What SvelteKit adds to Svelte**. Svelte is the component compiler; SvelteKit is the full-stack framework on top. `src/routes/` directory. Server vs client. Adapter system. Mini-build: a walkthrough page that inspects the full file structure with each file's role explained.
- **8.2 — What SSR actually is**. The server renders full HTML per request. Contrast with SPA (empty `<div id="app">`). View source on both to see. Mini-build: an SSR inspection page that shows the student what to look for in DevTools "view source" vs "Elements".
- **8.3 — What hydration actually is**. The browser receives rendered HTML, then Svelte "wakes it up" by attaching listeners to existing DOM. Hydration mismatches happen when server and client render differently. `<svelte:boundary>` can catch errors. Mini-build: a page that logs hydration status via `$effect` (browser-only) vs render-time JS (server-only) so the student sees the handoff.
- **8.4 — File-based routing**. `+page.svelte`, `+layout.svelte`, `+error.svelte`. File name maps to URL. Mini-build: a sub-section at `/module-8/8-4-file-routing/sample-child` with its own layout and error file, demonstrating the convention.
- **8.5 — Nested layouts**. Layouts inside layouts. Route groups with `(group)` folders. Mini-build: a page explaining the layout inheritance chain used by this course (root layout → module layouts).
- **8.6 — Dynamic routes `[slug]`**. `[slug]`, `[...rest]`, `[[optional]]`. Matcher functions in `src/params/`. Type-narrowed params via auto-generated `$types`. Mini-build: a demo page listing the conventions without actually creating nested dynamic routes inside the lesson (to avoid cluttering routing), pointing to an example in the Module 8 project.
- **8.7 — `$app/state`**. `page` from `$app/state` — reactive page object with `.url`, `.params`, `.data`, `.status`, `.state`. Replaces legacy `$app/stores`. Mini-build: a page that reads `page.url.pathname` and `page.url.searchParams` reactively and displays them live.
- **8.8 — `$app/navigation`**. `goto()`, `invalidate()`, `invalidateAll()`, `preloadData()`, `afterNavigate()`, `beforeNavigate()`. Mini-build: a programmatic-navigation demo with "Go home", "Open with preload on hover", and a beforeNavigate confirmation hook.
- **8.9 — Link options**. `data-sveltekit-preload-data="hover"`, `data-sveltekit-preload-code="viewport"`, `data-sveltekit-reload`, `data-sveltekit-replacestate`, `data-sveltekit-keepfocus`, `data-sveltekit-noscroll`. Mini-build: a navigation bar with optimized preloading applied to different link types.
- **8.10 — `hooks.server.ts`**. `handle`, `handleError`, `handleFetch`, `handleValidationError` (for remote function schema failures), `reroute` (async since Kit 2.18), `transport` (custom type serialization). `sequence()` from `@sveltejs/kit/hooks`. Mini-build: a page explaining what a realistic `hooks.server.ts` does (logging, auth, custom headers) with a code sample rendered in a `<pre>` — the actual hooks file is the Module 8 project's concern.
- **8.11 — Shallow routing**. `pushState('', { modal: true })` and `replaceState()` from `$app/navigation`. `page.state` for reading shallow routing state. Mini-build: a photo-gallery pattern where clicking a thumbnail pushes a modal via shallow routing, Escape or history back dismisses it, direct URL works as a fallback page.
- **8.12 — Snapshots**. `export const snapshot = { capture, restore }` to preserve ephemeral DOM state across navigation. Mini-build: a multi-field form whose inputs survive navigation via snapshots, demonstrated by a "Go home and come back" flow.
- **8.13 — Page transitions**. `onNavigate()` hook plus the View Transitions API for cross-document morphs. Mini-build: a smooth fade between three sibling lesson pages via an `onNavigate` handler calling `document.startViewTransition`.
- **8.14 — Rendering modes deep dive**. SSR (default), SSG (`export const prerender = true`), CSR (`export const ssr = false`), hybrid. Mini-build: a page that documents the current route's mode and explains when to pick each.
- **Module 8 Project — Multi-Page Portfolio Site**. Home, About, Projects, Blog with dynamic `[slug]` routes for project detail pages; shared root layout; per-section nested layouts; active-link highlighting via `page.url.pathname`; `onNavigate` page transitions; shallow routing for inline project previews; snapshot-preserved contact form draft; SSG for prerenderable pages, SSR for dynamic ones. Per-page OKLCH personality `oklch(62% 0.15 240)` (steel blue).

---

## Module 9A — Data Loading (load) (expanded)

**Goal**: Student masters SvelteKit's server-driven data layer with full TypeScript safety.
**New concepts**: `+page.ts` vs `+page.server.ts`, auto-generated `$types`, enhanced fetch, layout data, parallel loading, `depends/invalidate`, streaming, SSG with prerender.

- **9A.1 — What load functions are**. `load()` runs before the component exists — on the server first (SSR) or in the browser (during navigation). The return value becomes `data` in the component via `let { data } = $props()`. Mini-build: a page with a `+page.ts` returning a static typed object, displayed in the component.
- **9A.2 — `+page.ts` vs `+page.server.ts`**. Universal load runs on server AND client; server load runs only on server. Use universal for public data, server for anything requiring secrets or direct DB access. Mini-build: two sibling pages, one of each kind, showing how to pick.
- **9A.3 — Auto-generated `$types`**. SvelteKit generates `PageLoad`, `PageServerLoad`, `PageData` per route. Import with `import type { PageLoad } from './$types'`. Zero manual typing. Mini-build: a fully typed `+page.ts` demonstrating that TypeScript already knows `data.user.name`.
- **9A.4 — Enhanced fetch in load**. SvelteKit's `fetch` argument (first param of load) adds credentials, deduplicates, and inlines responses during SSR. Mini-build: a page loading data from a locally simulated async source via the enhanced fetch, comparing hydration behavior to a raw `globalThis.fetch`.
- **9A.5 — Layout data**. `+layout.ts` / `+layout.server.ts` loaders run for every child route. Use `parent()` in child loads to merge. Mini-build: a nested layout that loads a typed user profile once; child pages access it via `data.user` without reloading.
- **9A.6 — Parallel data loading**. Calling multiple async operations simultaneously with `Promise.all`. Waterfalls explained. Mini-build: a dashboard that loads user + stats + posts in parallel, timed in the load function and displayed.
- **9A.7 — `depends()` / `invalidate()`**. Manual cache control — `depends('app:user')` in load, `invalidate('app:user')` from a component. Mini-build: a refresh button that invalidates a specific key and watches the loader rerun.
- **9A.8 — `error()` and `redirect()`**. Throwing `error(404, 'Not found')` or `redirect(302, '/login')` from load. `+error.svelte` catches errors. Mini-build: a "protected" route pattern that redirects to a login page when a fake auth check fails.
- **9A.9 — Streaming with Promise returns**. Returning an unresolved Promise from load streams that data after the initial HTML. The component uses `{#await data.slow}`. Mini-build: a page that renders fast header content immediately, streams a 1.5-second "slow" query after.
- **9A.10 — SSG prerender**. `export const prerender = true`. `entries()` for dynamic routes. Blogs, docs, marketing. Mini-build: a prerenderable page with `prerender = true` and an explanation of when to use it vs SSR.
- **Module 9A Project — Weather Dashboard**. Parallel data loading for current + forecast + alerts; layout data for user preferences (units); `depends('app:weather')` + refresh button; streaming for a slow "historical comparison" panel; typed throughout; loading skeletons; OKLCH personality `oklch(72% 0.12 220)` (sky blue). All async is simulated — no real API calls.

---

## Module 10 — API Routes & Forms (expanded)

**Goal**: Student builds the full SvelteKit server layer — endpoints, form actions, progressive enhancement, environment variables, cookie-based auth, file uploads.
**Concepts**: `+server.ts`, `RequestHandler`, form actions via `+page.server.ts`, named actions, `use:enhance`, `ActionData`, `$env/*`, cookies, `FormData`.

- **10.1 — `+server.ts` endpoints**. Define HTTP method handlers (`GET`, `POST`, `PUT`, `DELETE`). `json()` and `error()` helpers. When to build a public API endpoint vs a form action vs a remote function. Mini-build: a `+server.ts` with a GET returning typed JSON and a POST that accepts and echoes JSON, plus a sibling page that fetches from it.
- **10.2 — Typed `RequestHandler`**. `import type { RequestHandler } from './$types'`. Destructuring `{ request, params, url, cookies, fetch, locals }`. Reading typed request bodies. Returning typed responses. Mini-build: a fully typed POST endpoint that validates its input shape and returns a typed result.
- **10.3 — Form actions**. `+page.server.ts` exports an `actions` object. Each action is `async ({ request, cookies }) => ...`. Works without JavaScript — forms post natively and the server returns a redirect or action data. Mini-build: a contact form that submits via native form post, no JS required.
- **10.4 — Named actions**. Multiple forms on one page via `?/login`, `?/register` querystring routing. The `action` attribute on the form determines which action runs. Mini-build: a page with login and register forms routed via named actions.
- **10.5 — `use:enhance`**. Progressive enhancement: `use:enhance` wraps a form so JS intercepts the submit and posts in the background, but still works if JS is disabled. The optional callback lets you handle loading/success/error states. Mini-build: the contact form from 10.3 enhanced with pending state and success toast.
- **10.6 — Server-side validation and `ActionData`**. Validate `formData` on the server, return `fail(400, { errors })` for invalid input. `ActionData` is the typed union of all possible action returns. Narrow it in the page to render errors inline. Mini-build: a registration form with email/password validation, inline errors displayed via `form.errors`.
- **10.7 — Environment variables**. `$env/static/private`, `$env/static/public`, `$env/dynamic/private`, `$env/dynamic/public`. `.server.ts` suffix and `$lib/server/` directory for server-only modules. The import chain guard that prevents secrets leaking to the client. Mini-build: a teaching page showing the four variants, when to use each, and a `<pre>` example of reading a `PUBLIC_*` var at build time.
- **10.8 — Cookie-based authentication**. Setting a session cookie via `cookies.set(name, value, { path, httpOnly, secure, sameSite, maxAge })`. Reading it via `cookies.get()`. Storing a session map on the server. Protected routes via load functions that throw `redirect(302, '/login')`. `locals.user` populated in `hooks.server.ts`. Mini-build: a tiny auth demo with a login form that sets a session cookie, a "profile" page that reads it, and a logout button that clears it. In-memory session store, no `better-auth`, no DB.
- **10.9 — File uploads**. `request.formData()` returns a `FormData` with `File` entries. Size limits, type validation, storing or processing. Mini-build: an avatar upload form that accepts an image, validates size and MIME type server-side, and returns a preview URL or error.
- **Module 10 Project — CRUD Note-Taking App**. A full create/read/update/delete notes app built entirely with form actions. In-memory store in `$lib/server/notes.ts`. Form actions for every mutation. `use:enhance` for smooth UX. Typed validation with inline errors. Simple cookie auth gating write operations (read is public). Environment variables for app config. OKLCH personality `oklch(68% 0.14 100)` (olive). Full progressive enhancement — the app works with JavaScript disabled.

---

## Module 13 — SEO (expanded)

**Goal**: Student ships SEO-optimized SvelteKit applications aligned with the March 2026 Google Core Update.
**Concepts**: `<svelte:head>`, meta tags, Open Graph, JSON-LD, robots.txt, sitemap.xml, Core Web Vitals, E-E-A-T, AI Overviews, international SEO.

- **13.1 — SEO in 2026**. What SEO means today — not keyword stuffing, but helping search engines and AI answerers understand and surface your content. March 2026 Core Update emphasized experience signals and E-E-A-T. Mini-build: a "SEO audit" page that displays the current page's title, description, canonical URL, and OG tags as live JS reads of `document.head`.
- **13.2 — `<svelte:head>`**. SvelteKit's way to inject into `<head>`. Works in SSR (rendered to the server HTML) and client-side navigation (updates dynamically). Mini-build: a demo page that sets a dynamic title based on `$state` and shows it updating live in the browser tab.
- **13.3 — Title & meta description**. Title tag rules: unique per page, 50–60 characters, important words front-loaded. Meta description: 120–160 characters, compelling, keyword-relevant. Mini-build: a title and description previewer that shows exactly how Google might render them in search results.
- **13.4 — Open Graph and Twitter Cards**. `og:title`, `og:description`, `og:image`, `og:url`, `og:type`. Twitter Card variants. Mini-build: an OG previewer that builds a fake social card preview from state-driven tag values.
- **13.5 — Canonical URLs**. `<link rel="canonical">` solves duplicate content. Same content on `/product?a=1` and `/product?a=2` should both point to one canonical. Mini-build: a demo page showing how to build the canonical URL from `page.url` inside `<svelte:head>`.
- **13.6 — JSON-LD fundamentals**. Structured data in `<script type="application/ld+json">`. Schema.org vocabulary. Why JSON-LD beats microdata. Mini-build: a minimal `Article` JSON-LD block rendered and validated against the structure.
- **13.7 — `Article` + `BreadcrumbList` schemas**. Writing real JSON-LD for a blog post with author, publish date, and breadcrumb trail. Mini-build: a fake blog post page with complete Article and BreadcrumbList JSON-LD.
- **13.8 — `Product`, `FAQPage`, `Organization` schemas**. The other common schemas. Mini-build: a single page with three JSON-LD blocks demonstrating each.
- **13.9 — `robots.txt` via `+server.ts`**. Even though Module 10 teaches `+server.ts` in depth, a `robots.txt` endpoint is a natural use case here. Mini-build: explains the pattern in text and includes the endpoint file `src/routes/module-13/robots.txt/+server.ts` actually shipping alongside the lesson page.
- **13.10 — Dynamic sitemap.xml**. Another `+server.ts` endpoint, returning XML. Lists every shipped lesson route. Mini-build: a `+server.ts` sitemap generator at `src/routes/module-13/sitemap.xml/+server.ts` returning a valid XML sitemap built from the course's own route list.
- **13.11 — Core Web Vitals**. LCP (Largest Contentful Paint — 2.5s), CLS (Cumulative Layout Shift — 0.1), INP (Interaction to Next Paint — 200ms). How Svelte's zero-runtime architecture helps all three. Mini-build: a "vitals cheat sheet" page with the targets, common causes of failure, and mitigation for each.
- **13.12 — E-E-A-T signals**. Experience, Expertise, Authoritativeness, Trust. Author bios, citations, real names, secure connections, structured data. Mini-build: an article-quality checklist page.
- **13.13 — AI Overviews and generative search**. Google's AI Overviews summarize answers at the top of results. Optimizing for inclusion: clear question-answer structure, schema.org `FAQPage`, unambiguous data. Mini-build: a page rewrite showing "before" and "after" versions of the same content optimized for AI extraction.
- **13.14 — International SEO**. `hreflang` tags, `lang` attribute on `<html>`, locale-specific routes. Mini-build: a page explaining the hreflang pattern with a code sample, plus setting the `lang` attribute via `<svelte:head>`.
- **Module 13 Project — SEO-Optimized Content Site**. A multi-page content site with prerendered blog posts, `<svelte:head>` titles/descriptions, full Open Graph, Article JSON-LD, BreadcrumbList, `robots.txt` + `sitemap.xml` endpoints, canonical URLs, `hreflang` stubs. Passes a mental Google Rich Results check. OKLCH personality `oklch(60% 0.14 140)` (verdant green).

---

## Module 1 — The Foundation (expanded)

**Goal**: Student builds their first compiled Svelte component with TypeScript strict mode and PE7 CSS from the very first lesson.
**Concepts**: Svelte compilation, project scaffolding, `<script>` / `<style>` / markup blocks, TypeScript primitives, `@layer` & tokens, fluid typography, scoped styles, interfaces, template expressions.

- **1.1 — Hello compiled**. What Svelte compiles to — no virtual DOM. The student runs `pnpm dev` and sees output.
- **1.2 — Project setup**. Scaffolding with `sv create`, `pnpm`, folder structure walkthrough.
- **1.3 — Three blocks**. `<script lang="ts">`, markup, `<style>` — the anatomy of every `.svelte` file.
- **1.4 — TS primitives**. `string`, `number`, `boolean`, `null`, `undefined` — typed from day one.
- **1.5 — @layer & tokens**. Establishing the PE7 `@layer` stack and global token system in `app.css`.
- **1.6 — Fluid typography**. `clamp()` for type scale, `--text-*` tokens.
- **1.7 — Scoping**. How Svelte scopes `<style>` to the component — no leaks, no BEM needed.
- **1.8 — Interfaces**. TypeScript `interface` for structuring component data.
- **1.9 — Expressions**. `{variable}`, `{expression}` in markup — binding data to the DOM.
- **Module 1 Project — Personal Portfolio Card**. A single-page portfolio card component demonstrating every concept from the module. OKLCH personality: teal.

---

## Module 2 — Reactivity (expanded)

**Goal**: Student masters every Svelte 5 rune and reactive primitive.
**Concepts**: `$state`, `$state.raw`, `$state.snapshot`, `$state.eager`, `$derived`, `$derived.by`, `$effect`, `$effect.pre`, `$effect.pending`, effect cleanup, `SvelteMap`/`SvelteSet`/`SvelteDate`/`SvelteURL`/`SvelteURLSearchParams`, `MediaQuery`, reactive CSS, typed state.

- **2.1 — What state is**. Reactivity as a concept — data changes, UI updates automatically.
- **2.2 — Primitive `$state`**. `let count = $state(0)` — the simplest reactive value.
- **2.3 — Object `$state`**. Deep reactivity on objects — nested property changes trigger updates.
- **2.4 — Array `$state`**. Reactive arrays — push, splice, reassign all tracked.
- **2.5 — `$state.raw`**. Non-deep reactive state for performance-sensitive large objects.
- **2.6 — `$state.snapshot`**. Extracting a plain object from reactive state for API calls or logging.
- **2.7 — `$derived`**. Pure computed values that auto-update when dependencies change.
- **2.8 — `$derived.by`**. Multi-statement derived values with a function body.
- **2.9 — `$effect`**. Side effects that run after DOM updates.
- **2.10 — `$effect.pre`**. Side effects that run before DOM updates.
- **2.11 — Effect cleanup**. Returning a cleanup function from `$effect` — subscriptions, timers, listeners.
- **2.12 — SvelteMap/Set**. Reactive `Map` and `Set` from `svelte/reactivity`.
- **2.13 — URL & MediaQuery**. Reactive `MediaQuery` and URL primitives from `svelte/reactivity`.
- **2.14 — Reactive CSS**. Driving CSS custom properties from reactive state.
- **2.15 — Typed state**. Generics with `$state<T>()`, ensuring type safety across the reactive graph.
- **Module 2 Project — Interactive Dashboard**. A multi-widget dashboard exercising every rune and reactive primitive. OKLCH personality: amber.

---

## Module 7 — GSAP Integration (expanded)

**Goal**: Student integrates GSAP with Svelte's lifecycle for production animation work.
**Concepts**: GSAP core API, timelines, `bind:this`, `$effect` bridge, cleanup, stagger, ScrollTrigger, `use:` actions, `{@attach}` attachments.

- **7.1 — What GSAP is**. The GreenSock Animation Platform — why it exists alongside CSS transitions and Svelte's built-in animation.
- **7.2 — Installing**. `pnpm add gsap` and importing correctly in a Svelte component.
- **7.3 — to/from/fromTo**. `gsap.to()`, `gsap.from()`, `gsap.fromTo()` — the three core tweens.
- **7.4 — Timelines**. `gsap.timeline()` for sequencing multiple animations with labels and offsets.
- **7.5 — bind:this**. Getting a DOM reference in Svelte to pass to GSAP.
- **7.6 — $effect bridge**. Running GSAP animations inside `$effect` so they react to state changes.
- **7.7 — Cleanup**. Killing tweens and timelines in effect cleanup to prevent memory leaks.
- **7.8 — Stagger**. `stagger` property for animating lists of elements with offset delays.
- **7.9 — ScrollTrigger**. `ScrollTrigger.create()` for scroll-driven animations — pin, scrub, snap.
- **7.10 — ScrollTrigger + nav**. Combining ScrollTrigger with navigation state for active-section highlighting.
- **7.11 — use: actions**. Encapsulating GSAP logic in reusable Svelte actions via `use:gsapFade`.
- **7.12 — Attachments**. Using `{@attach}` for declarative GSAP integration on elements. `createAttachmentKey()` for programmatic attachments (since 5.29). `fromAction()` to convert existing `use:` actions to attachments.
- **7.13 — Scroll reveal**. A production scroll-reveal pattern combining ScrollTrigger + stagger + actions.
- **7.14 — GSAP + Svelte together**. When to use GSAP vs Svelte transitions vs CSS — decision framework.
- **Module 7 Project — Marketing Page**. A full marketing landing page with GSAP-powered hero animation, scroll-triggered feature reveals, staggered testimonial cards, and smooth section transitions. OKLCH personality: magenta.

---

## Module 9B — Remote Functions (expanded)

**Goal**: Student masters SvelteKit's remote function API (since Kit 2.27) for type-safe client-server communication without manual fetch.
**Concepts**: `.remote.ts` files, `query`, `form`, `command`, `prerender` from `$app/server`, Standard Schema validation (valibot), `getRequestEvent()`, `handleValidationError` hook, `transport` hook, `$state.eager`, `fork()`, async `await` in markup, `<svelte:boundary pending={}>`, `$effect.pending()`, single-flight mutations, simulated demos.

- **9B.1 — What remote functions are**. Server functions callable from the client with full type safety — no manual `fetch`. Exported from `.remote.ts` files; four flavours: `query`, `form`, `command`, `prerender`.
- **9B.2 — Remote query functions**. Reading data from the server via `query()` from `$app/server`. Returns a Promise usable with `await` in markup.
- **9B.3 — Query arguments**. Passing typed arguments to remote queries with Standard Schema validation (valibot).
- **9B.4 — Query batching**. Multiple queries resolve concurrently — no waterfalls. Independent `await` expressions run in parallel.
- **9B.5 — Remote prerender functions**. `prerender()` for static data — saved at build time, served without a running server. `inputs` option and `dynamic: true` for hybrid.
- **9B.6 — Remote form functions**. Progressive-enhancement-friendly form submissions via `form()` from `$app/server`. Works without JS.
- **9B.7 — Form fields and validation**. Standard Schema validation on form data. `handleValidationError` hook for custom 400 responses.
- **9B.8 — Form validation deep dive**. Server-side validation with typed error returns, `fail()` integration, inline error display.
- **9B.9 — Remote command functions**. Imperative mutations via `command()` — button clicks, toggles, no form needed.
- **9B.10 — Single-flight mutations (server)**. Deduplicating concurrent server mutations automatically. `getRequestEvent()` for auth context.
- **9B.11 — Single-flight mutations (client)**. Client-side deduplication. `$state.eager()` for immediate UI feedback during async work.
- **9B.12 — Async SSR and `<svelte:boundary>`**. `compilerOptions.experimental.async: true`. `await` in markup. `<svelte:boundary pending={}>` for loading states. `$effect.pending()` for subsequent updates. `settled()` for coordinating updates. `hydratable()` for SSR-to-client data handoff.
- **9B.13 — `fork()` for preloading**. `fork(fn)` pre-runs async work on hover/focus before committing. `fork().commit()` and `fork().discard()` (since 5.42).
- **9B.14 — Choosing the right pattern**. Decision framework: `load` vs `query` vs `form` vs `command` vs `prerender`. When to use `transport` hook for custom types. `reroute` (async) for dynamic routing.
- **Module 9B Project — Real-Time Data App**. A data-driven application using remote functions for all server communication, with `<svelte:boundary>` loading states, `fork()` preloading on hover, optimistic UI via `$state.eager`, and full type safety. All demos simulated. OKLCH personality: cyan.

---

## Module 11 — State Management at Scale (expanded)

**Goal**: Student manages complex application state across deeply nested component trees and data-heavy interfaces.
**Concepts**: Prop drilling problem, `createContext`/`getContext`, `.svelte.ts` modules, shared reactive state, reactive classes, URL state, reactive window, TanStack Table, optimistic UI.

- **11.1 — Prop drilling**. The problem — passing state through 5+ levels of components. Why it breaks.
- **11.2 — Context**. `createContext()` and `getContext()` — providing and consuming values through the tree without props.
- **11.3 — .svelte.ts**. Reactive modules — `.svelte.ts` files that export reactive state usable anywhere.
- **11.4 — Shared state**. Building a typed shared state module in `$lib/state/` with `$state` in a `.svelte.ts` file.
- **11.5 — Reactive classes**. Using `$state` inside ES6 classes for encapsulated reactive logic.
- **11.6 — URL state**. Syncing state with URL search params for shareable, bookmarkable UI state.
- **11.7 — Reactive window**. `SvelteURLSearchParams` and reactive window dimensions from `svelte/reactivity`.
- **11.8 — TanStack Table setup**. Installing `@tanstack/svelte-table`, defining column defs, creating the table instance.
- **11.9 — TanStack Table features**. Sorting, filtering, pagination — all reactive, all typed.
- **11.10 — TanStack Table customization**. Custom cell renderers, row selection, column visibility.
- **11.11 — Optimistic UI**. Updating the UI before server confirmation, handling rollbacks on failure.
- **Module 11 Project — Admin Dashboard**. A data-intensive admin interface with context-driven theme, shared auth state, TanStack Table with sorting/filtering/pagination, URL-synced filters, and optimistic mutations. OKLCH personality: deep purple.

---

## Module 12 — Performance & Production (expanded)

**Goal**: Student ships production-quality applications with optimized performance, comprehensive testing, and robust error handling.
**Concepts**: Core Web Vitals, image optimization, code splitting, effect performance, memoization, actions, error boundaries, accessibility, Vitest, Playwright, deployment, service workers.

- **12.1 — Core Web Vitals**. LCP, CLS, INP — what they measure, target thresholds, how to diagnose.
- **12.2 — Image optimization**. `@sveltejs/enhanced-img`, responsive images, lazy loading, format selection.
- **12.3 — Code splitting**. Dynamic `import()`, route-level splitting, component lazy loading.
- **12.4 — Effect performance**. Avoiding unnecessary `$effect` runs, batching, fine-grained reactivity.
- **12.5 — Memoization**. Caching expensive computations with `$derived` and manual memoization patterns.
- **12.6 — Actions for performance**. Using `use:` actions for DOM-heavy operations outside Svelte's reactivity.
- **12.7 — Error boundaries**. `<svelte:boundary>` for graceful degradation — `failed` snippet for error recovery, `pending` snippet for async loading states, `onerror` handler for error reporting. `transformError` (since 5.51) for server-side error sanitization during SSR.
- **12.8 — Accessibility**. `a11y` compile warnings, ARIA patterns, focus management, screen reader testing.
- **12.9 — Vitest**. Unit testing Svelte components and utility functions with Vitest.
- **12.10 — Playwright**. End-to-end testing SvelteKit routes, forms, and navigation flows.
- **12.11 — Deployment**. Adapter selection (`adapter-auto`, `adapter-node`, `adapter-static`, `adapter-vercel`), environment config, build optimization.
- **12.12 — Service workers**. `src/service-worker.ts`, offline support, cache strategies, background sync.
- **Module 12 Project — Production App**. A performance-optimized application with error boundaries, full test suite (Vitest + Playwright), Lighthouse scores above 95, and deployment-ready configuration. OKLCH personality: taupe.

---

## Module 14 — Custom Elements & Library Publishing (expanded)

**Goal**: Student creates framework-agnostic custom elements from Svelte components and publishes a component library.
**Concepts**: `<svelte:options customElement>`, shadow DOM, attributes vs properties, `@sveltejs/package`, `exports` map, publishing.

- **14.1 — What custom elements are**. Web Components standard, `customElements.define()`, why Svelte is ideal for building them.
- **14.2 — `<svelte:options customElement>`**. The compiler flag that turns a Svelte component into a custom element.
- **14.3 — Shadow DOM and styling**. How styles work inside shadow DOM, CSS custom properties as the styling API.
- **14.4 — Attributes and properties**. Mapping between HTML attributes (strings) and component props (typed), `reflect`.
- **14.5 — Events from custom elements**. Dispatching `CustomEvent` from a Svelte custom element for framework-agnostic communication.
- **14.6 — `@sveltejs/package`**. Packaging a component library with proper `exports` map, TypeScript declarations, and `svelte` field in `package.json`.
- **Module 14 Project — Library + CE Suite**. A published component library containing both standard Svelte components and custom element variants, with full TypeScript types and documentation. OKLCH personality: warm sand.

---

## Module 15 — 3D & Immersive with Threlte (expanded)

**Goal**: Student renders interactive 3D scenes in a SvelteKit application using Threlte.
**Concepts**: Three.js fundamentals via Threlte's declarative API, `<Canvas>`, `<T>`, lighting, materials, camera control.

- **15.1 — What Threlte is**. Three.js wrapped in Svelte components — declarative 3D in `.svelte` files.
- **15.2 — Scene setup**. `<Canvas>`, `<T.PerspectiveCamera>`, `<T.AmbientLight>`, `<T.DirectionalLight>` — the minimal scene.
- **15.3 — Meshes and materials**. `<T.Mesh>`, `<T.BoxGeometry>`, `<T.MeshStandardMaterial>` — rendering 3D objects.
- **15.4 — Interactivity**. Click, hover, and pointer events on 3D objects via Threlte's event system.
- **15.5 — Animation loop**. `useFrame()` for per-frame updates, integrating with Svelte's reactive state.
- **Module 15 Project — Immersive Landing**. A landing page with an interactive 3D hero scene — rotating geometry, hover effects, scroll-driven camera movement. OKLCH personality: deep indigo.

---

## Capstone — PE7 Flagship Project (expanded)

**Goal**: Student composes every skill from every module into a single production-grade SvelteKit application.
**Concepts**: Server loader + form actions, component composition, Svelte transitions, Tween, Spring, GSAP timelines, shallow routing, SEO with JSON-LD, CartStore via reactive classes, error boundaries.

- Integrates server loaders and form actions (Modules 9A, 10) for data flow.
- Builds a full component library (Module 3) with typed props, snippets, and composition.
- Applies Svelte transitions and Spring/Tween animations (Module 6) throughout.
- Adds GSAP-powered scroll reveals and timelines (Module 7) for hero and feature sections.
- Uses shallow routing (Module 8) for modal-based product previews.
- Implements SEO with `<svelte:head>`, JSON-LD, OG tags, sitemap (Module 13).
- Manages cart state via a reactive `CartStore` class (Module 11) with context.
- Wraps critical sections in `<svelte:boundary>` error boundaries (Module 12).
- Ships with Vitest + Playwright test coverage (Module 12).
- Full PE7 CSS architecture, mobile-first, fluid everything.
- **Capstone Project — PE7 Flagship**. The most advanced application in the course — an e-commerce-style storefront proving mastery of every module. OKLCH personality: hot pink.

---

## Version Reference (April 12, 2026 — all latest)

| Package | Version | Notes |
|---|---|---|
| svelte | 5.55.3 | Runes, attachments, `$state.eager`, async `await` in markup, `fork()`, `hydratable()`, `transformError` |
| @sveltejs/kit | 2.57.1 | Remote functions (`query`/`form`/`command`/`prerender`), `transport` hook, `handleValidationError`, async `reroute`, Standard Schema validation |
| @sveltejs/adapter-auto | 7.0.1 | Zero-config deployment adapter |
| @sveltejs/vite-plugin-svelte | 7.0.0 | Vite 8 compatible Svelte plugin |
| @sveltejs/package | 2.5.7 | Component library packaging |
| @sveltejs/cli (sv) | 0.12.6+ | better-auth addon |
| vite | 8.0.8 | Rolldown-powered — TanStack Table excluded from optimizer via `vite.config.ts` |
| typescript | 6.0.2 | Strict mode always |
| svelte-check | 4.4.6 | Type checking & diagnostics |
| gsap | 3.14.2 | Built-in TypeScript types |
| three | 0.183.2 | 3D rendering engine |
| @threlte/core | 8.5.9 | Svelte 5 Three.js wrapper |
| @threlte/extras | 9.14.5 | Threlte helper components |
| @tanstack/svelte-table | 8.21.3 | Data table — uses Svelte 3/4 internals, requires `ssr = false` on pages that import it; v9 (Svelte 5 native) still alpha |
| valibot | 1.3.1 | Remote form schema validation — Standard Schema compatible |
| vitest | 4.1.4 | Unit testing |
| @playwright/test | 1.59.1 | E2E testing |
| @testing-library/svelte | 5.3.1 | Component testing utilities |
| @types/node | 25.6.0 | Node.js type definitions |
| @types/three | 0.183.1 | Three.js type definitions |
| jsdom | 29.0.2 | DOM simulation for tests |
| apexcharts | 5.10.6 | Charting library |
| dompurify | 3.3.3 | HTML sanitizer |
| pnpm | 10.x+ | Package manager — always |

---

## What This Course Produces

A student who completes all 17 modules and the capstone can:

- **Build from scratch** — scaffold a SvelteKit project, configure TypeScript strict mode, establish a PE7 CSS architecture, and ship a production-ready application.
- **Think in reactivity** — use every Svelte 5 rune (`$state`, `$derived`, `$effect` and variants) correctly, understanding when each is appropriate and how the reactive graph works.
- **Compose component systems** — design typed, reusable component libraries with `$props()`, `$bindable()`, snippets, and CSS custom property APIs.
- **Handle every interaction** — wire typed DOM events, keyboard accessibility, touch/pointer support, debounce/throttle, and focus management.
- **Style with intention** — apply the full PE7 layer stack, OKLCH color, fluid typography, container queries, logical properties, and per-page color personalities without any utility framework.
- **Animate professionally** — use Svelte transitions, Tween, Spring, `animate:flip`, and GSAP (timelines, ScrollTrigger, stagger) with proper lifecycle cleanup and reduced-motion respect.
- **Architect full-stack routes** — implement SSR, SSG, CSR, and hybrid rendering; nested layouts; dynamic routes; shallow routing; snapshots; view transitions.
- **Load and mutate data** — write typed load functions, streaming responses, form actions, `use:enhance`, remote functions (`query`/`form`/`command`/`prerender`), `fork()` preloading, `$state.eager` for immediate feedback, `<svelte:boundary pending={}>` for loading states, and optimistic UI patterns.
- **Manage state at scale** — use context, `.svelte.ts` modules, reactive classes, URL state, and TanStack Table for data-heavy interfaces.
- **Ship production quality** — optimize Core Web Vitals, implement error boundaries, write Vitest and Playwright tests, configure deployment adapters, and add service workers.
- **Optimize for discovery** — implement SEO with `<svelte:head>`, JSON-LD structured data, Open Graph, sitemaps, and AI Overview optimization.
- **Extend the platform** — build custom elements from Svelte components, publish typed libraries with `@sveltejs/package`, and render 3D scenes with Threlte.
- **Prove it all** — deliver a capstone e-commerce storefront that integrates every skill into one cohesive, tested, accessible, performant application.
