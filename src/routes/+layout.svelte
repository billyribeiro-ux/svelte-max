<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	interface Lesson {
		slug: string;
		title: string;
	}

	interface Module {
		id: number;
		title: string;
		hasProject: boolean;
		lessons: readonly Lesson[];
	}

	const modules: readonly Module[] = [
		{
			id: 1,
			title: 'Module 1 — Foundation',
			hasProject: true,
			lessons: [
				{ slug: '1-1-hello-compiled', title: '1.1 — Hello, compiled' },
				{ slug: '1-2-project-setup', title: '1.2 — Project setup' },
				{ slug: '1-3-three-blocks', title: '1.3 — Three blocks' },
				{ slug: '1-4-primitives', title: '1.4 — TS primitives' },
				{ slug: '1-5-layers-tokens', title: '1.5 — @layer & tokens' },
				{ slug: '1-6-fluid-typography', title: '1.6 — Fluid typography' },
				{ slug: '1-7-scoping', title: '1.7 — Scoped styles' },
				{ slug: '1-8-interfaces', title: '1.8 — Interfaces' },
				{ slug: '1-9-expressions', title: '1.9 — Template expressions' }
			]
		},
		{
			id: 2,
			title: 'Module 2 — Reactivity',
			hasProject: true,
			lessons: [
				{ slug: '2-1-what-is-state', title: '2.1 — What state is' },
				{ slug: '2-2-primitive-state', title: '2.2 — Primitive $state' },
				{ slug: '2-3-object-state', title: '2.3 — Object $state' },
				{ slug: '2-4-array-state', title: '2.4 — Array $state' },
				{ slug: '2-5-state-raw', title: '2.5 — $state.raw' },
				{ slug: '2-6-state-snapshot', title: '2.6 — $state.snapshot' },
				{ slug: '2-7-derived', title: '2.7 — $derived' },
				{ slug: '2-8-derived-by', title: '2.8 — $derived.by' },
				{ slug: '2-9-effect', title: '2.9 — $effect' },
				{ slug: '2-10-effect-pre', title: '2.10 — $effect.pre' },
				{ slug: '2-11-effect-cleanup', title: '2.11 — Effect cleanup' },
				{ slug: '2-12-reactive-map-set', title: '2.12 — SvelteMap/Set' },
				{ slug: '2-13-reactive-url-media', title: '2.13 — URL & MediaQuery' },
				{ slug: '2-14-reactive-css', title: '2.14 — Reactive CSS' },
				{ slug: '2-15-typescript-reactive', title: '2.15 — Typed state' }
			]
		},
		{
			id: 3,
			title: 'Module 3 — Components & Props',
			hasProject: true,
			lessons: [
				{ slug: '3-1-what-components-are', title: '3.1 — What components are' },
				{ slug: '3-2-props', title: '3.2 — $props()' },
				{ slug: '3-3-typed-props', title: '3.3 — Typed props' },
				{ slug: '3-4-optional-props', title: '3.4 — Optional + defaults' },
				{ slug: '3-5-bindable', title: '3.5 — $bindable()' },
				{ slug: '3-6-function-bindings', title: '3.6 — Function bindings' },
				{ slug: '3-7-snippets', title: '3.7 — Snippets' },
				{ slug: '3-8-snippet-props', title: '3.8 — Snippets as props' },
				{ slug: '3-9-composition', title: '3.9 — Composition' },
				{ slug: '3-10-css-custom-props', title: '3.10 — CSS custom props' },
				{ slug: '3-11-responsive-components', title: '3.11 — Responsive components' }
			]
		},
		{
			id: 4,
			title: 'Module 4 — Control Flow',
			hasProject: true,
			lessons: [
				{ slug: '4-1-if', title: '4.1 — {#if}' },
				{ slug: '4-2-else-if', title: '4.2 — {:else if}' },
				{ slug: '4-3-each', title: '4.3 — {#each}' },
				{ slug: '4-4-each-keyed', title: '4.4 — {#each} with keys' },
				{ slug: '4-5-each-nested', title: '4.5 — Nested {#each}' },
				{ slug: '4-6-key-block', title: '4.6 — {#key} block' },
				{ slug: '4-7-async-await', title: '4.7 — Async/await' },
				{ slug: '4-8-await-block', title: '4.8 — {#await}' },
				{ slug: '4-9-catch-errors', title: '4.9 — {:catch} errors' },
				{ slug: '4-10-promise-types', title: '4.10 — Promise<T>' },
				{ slug: '4-11-svelte-window', title: '4.11 — <svelte:window>' },
				{ slug: '4-12-svelte-element', title: '4.12 — <svelte:element>' }
			]
		},
		{
			id: 5,
			title: 'Module 5 — Events & Interaction',
			hasProject: true,
			lessons: [
				{ slug: '5-1-event-handlers', title: '5.1 — Event handlers' },
				{ slug: '5-2-functions', title: '5.2 — JS functions deeply' },
				{ slug: '5-3-typed-events', title: '5.3 — Typed events' },
				{ slug: '5-4-prevent-stop', title: '5.4 — preventDefault/stopPropagation' },
				{ slug: '5-5-forwarding', title: '5.5 — Forwarding events' },
				{ slug: '5-6-on-function', title: '5.6 — on() from svelte/events' },
				{ slug: '5-7-closures', title: '5.7 — Closures' },
				{ slug: '5-8-debounce-throttle', title: '5.8 — Debounce & throttle' },
				{ slug: '5-9-callback-props', title: '5.9 — Callback prop pattern' },
				{ slug: '5-10-bindings', title: '5.10 — Bindings deep dive' },
				{ slug: '5-11-touch-pointer', title: '5.11 — Touch & pointer' },
				{ slug: '5-12-keyboard-a11y', title: '5.12 — Keyboard a11y' }
			]
		},
		{
			id: 6,
			title: 'Module 6 — Styling Mastery',
			hasProject: true,
			lessons: [
				{ slug: '6-1-layer-architecture', title: '6.1 — @layer in depth' },
				{ slug: '6-2-oklch-deep', title: '6.2 — OKLCH in depth' },
				{ slug: '6-3-token-system', title: '6.3 — Full token system' },
				{ slug: '6-4-nesting', title: '6.4 — Native CSS nesting' },
				{ slug: '6-5-logical-props', title: '6.5 — Logical properties' },
				{ slug: '6-6-grid', title: '6.6 — CSS Grid patterns' },
				{ slug: '6-7-flexbox', title: '6.7 — Flexbox patterns' },
				{ slug: '6-8-container-queries', title: '6.8 — Container queries' },
				{ slug: '6-9-page-personalities', title: '6.9 — Page personalities' },
				{ slug: '6-10-css-transitions', title: '6.10 — CSS transitions' },
				{ slug: '6-11-svelte-transitions', title: '6.11 — Svelte transition:' },
				{ slug: '6-12-in-out', title: '6.12 — in:/out: directives' },
				{ slug: '6-13-animate-flip', title: '6.13 — animate:flip' },
				{ slug: '6-14-tween', title: '6.14 — Tween class' },
				{ slug: '6-15-spring', title: '6.15 — Spring class' },
				{ slug: '6-16-custom-transitions', title: '6.16 — Custom transitions' },
				{ slug: '6-17-stagger-patterns', title: '6.17 — Stagger patterns' },
				{ slug: '6-18-reduced-motion', title: '6.18 — Reduced motion' }
			]
		},
		{
			id: 8,
			title: 'Module 8 — SvelteKit Routing',
			hasProject: true,
			lessons: [
				{ slug: '8-1-what-sveltekit-adds', title: '8.1 — What SvelteKit adds' },
				{ slug: '8-2-ssr', title: '8.2 — What SSR is' },
				{ slug: '8-3-hydration', title: '8.3 — What hydration is' },
				{ slug: '8-4-file-routing', title: '8.4 — File-based routing' },
				{ slug: '8-5-nested-layouts', title: '8.5 — Nested layouts' },
				{ slug: '8-6-dynamic-routes', title: '8.6 — Dynamic [slug]' },
				{ slug: '8-7-app-state', title: '8.7 — $app/state' },
				{ slug: '8-8-app-navigation', title: '8.8 — $app/navigation' },
				{ slug: '8-9-link-options', title: '8.9 — Link options' },
				{ slug: '8-10-hooks', title: '8.10 — hooks.server.ts' },
				{ slug: '8-11-shallow-routing', title: '8.11 — Shallow routing' },
				{ slug: '8-12-snapshots', title: '8.12 — Snapshots' },
				{ slug: '8-13-page-transitions', title: '8.13 — Page transitions' },
				{ slug: '8-14-rendering-modes', title: '8.14 — Rendering modes' }
			]
		},
		{
			id: 9,
			title: 'Module 9A — Data Loading (load)',
			hasProject: true,
			lessons: [
				{ slug: '9a-1-what-is-load', title: '9A.1 — What load() is' },
				{ slug: '9a-2-universal-vs-server', title: '9A.2 — Universal vs server' },
				{ slug: '9a-3-generated-types', title: '9A.3 — $types generated' },
				{ slug: '9a-4-fetch-in-load', title: '9A.4 — Enhanced fetch' },
				{ slug: '9a-5-layout-data', title: '9A.5 — Layout data' },
				{ slug: '9a-6-parallel-loading', title: '9A.6 — Parallel loading' },
				{ slug: '9a-7-depends-invalidate', title: '9A.7 — depends/invalidate' },
				{ slug: '9a-8-error-redirect', title: '9A.8 — error() + redirect()' },
				{ slug: '9a-9-streaming', title: '9A.9 — Streaming' },
				{ slug: '9a-10-prerender', title: '9A.10 — SSG prerender' }
			]
		},
		{
			id: 10,
			title: 'Module 10 — API Routes & Forms',
			hasProject: true,
			lessons: [
				{ slug: '10-1-server-endpoints', title: '10.1 — +server.ts endpoints' },
				{ slug: '10-2-typed-handlers', title: '10.2 — Typed RequestHandler' },
				{ slug: '10-3-form-actions', title: '10.3 — Form actions' },
				{ slug: '10-4-named-actions', title: '10.4 — Named actions' },
				{ slug: '10-5-use-enhance', title: '10.5 — use:enhance' },
				{ slug: '10-6-validation', title: '10.6 — Server validation' },
				{ slug: '10-7-env-vars', title: '10.7 — Environment vars' },
				{ slug: '10-8-auth', title: '10.8 — Cookie auth' },
				{ slug: '10-9-file-uploads', title: '10.9 — File uploads' }
			]
		},
		{
			id: 7,
			title: 'Module 7 — GSAP Integration',
			hasProject: true,
			lessons: [
				{ slug: '7-1-what-is-gsap', title: '7.1 — What GSAP is' },
				{ slug: '7-2-installing-gsap', title: '7.2 — Installing GSAP' },
				{ slug: '7-3-to-from-fromto', title: '7.3 — to/from/fromTo' },
				{ slug: '7-4-timelines', title: '7.4 — Timelines' },
				{ slug: '7-5-bind-this', title: '7.5 — bind:this' },
				{ slug: '7-6-effect-bridge', title: '7.6 — $effect bridge' },
				{ slug: '7-7-cleanup', title: '7.7 — GSAP cleanup' },
				{ slug: '7-8-stagger', title: '7.8 — Stagger animations' },
				{ slug: '7-9-scrolltrigger', title: '7.9 — ScrollTrigger' },
				{ slug: '7-10-scrolltrigger-nav', title: '7.10 — ScrollTrigger + nav' },
				{ slug: '7-11-actions', title: '7.11 — use: actions' },
				{ slug: '7-12-attachments', title: '7.12 — Attachments' },
				{ slug: '7-13-scroll-reveal', title: '7.13 — Scroll reveal' },
				{ slug: '7-14-gsap-svelte-together', title: '7.14 — GSAP + Svelte' }
			]
		},
		{
			id: 11,
			title: 'Module 11 — State at Scale',
			hasProject: true,
			lessons: [
				{ slug: '11-1-prop-drilling', title: '11.1 — Prop drilling' },
				{ slug: '11-2-context', title: '11.2 — createContext' },
				{ slug: '11-3-svelte-ts', title: '11.3 — .svelte.ts files' },
				{ slug: '11-4-shared-state', title: '11.4 — Shared state' },
				{ slug: '11-5-reactive-classes', title: '11.5 — Reactive classes' },
				{ slug: '11-6-url-state', title: '11.6 — URL as state' },
				{ slug: '11-7-reactive-window', title: '11.7 — Reactive window' },
				{ slug: '11-8-tanstack-table', title: '11.8 — TanStack Table' },
				{ slug: '11-9-tanstack-features', title: '11.9 — Sort/filter/page' },
				{ slug: '11-10-tanstack-typed', title: '11.10 — Typed tables' },
				{ slug: '11-11-optimistic-ui', title: '11.11 — Optimistic UI' }
			]
		},
		{
			id: 12,
			title: 'Module 12 — Performance',
			hasProject: true,
			lessons: [
				{ slug: '12-1-core-web-vitals', title: '12.1 — Vitals fundamentals' },
				{ slug: '12-2-images', title: '12.2 — Image optimization' },
				{ slug: '12-3-code-splitting', title: '12.3 — Code splitting' },
				{ slug: '12-4-effect-perf', title: '12.4 — $effect performance' },
				{ slug: '12-5-memoization', title: '12.5 — Memoization' },
				{ slug: '12-6-actions-attachments', title: '12.6 — Actions + attachments' },
				{ slug: '12-7-error-boundaries', title: '12.7 — Error boundaries' },
				{ slug: '12-8-accessibility', title: '12.8 — Accessibility' },
				{ slug: '12-9-vitest', title: '12.9 — Vitest unit tests' },
				{ slug: '12-10-playwright', title: '12.10 — Playwright E2E' },
				{ slug: '12-11-deployment', title: '12.11 — Deployment' },
				{ slug: '12-12-service-worker', title: '12.12 — Service workers' }
			]
		},
		{
			id: 14,
			title: 'Module 14 — Custom Elements',
			hasProject: true,
			lessons: [
				{ slug: '14-1-what-are-custom-elements', title: '14.1 — What custom elements are' },
				{ slug: '14-2-building', title: '14.2 — Building with Svelte' },
				{ slug: '14-3-lifecycle', title: '14.3 — Lifecycle + options' },
				{ slug: '14-4-host-rune', title: '14.4 — $host() rune' },
				{ slug: '14-5-packaging', title: '14.5 — @sveltejs/package' },
				{ slug: '14-6-publishing', title: '14.6 — Publishing' }
			]
		},
		{
			id: 15,
			title: 'Module 15 — Threlte 3D',
			hasProject: true,
			lessons: [
				{ slug: '15-1-what-is-threlte', title: '15.1 — What Threlte is' },
				{ slug: '15-2-fundamentals', title: '15.2 — Canvas + Camera' },
				{ slug: '15-3-reactive-scenes', title: '15.3 — Reactive scenes' },
				{ slug: '15-4-extras', title: '15.4 — Text + GLTF + Env' },
				{ slug: '15-5-performance', title: '15.5 — 3D performance' }
			]
		},
		{
			id: 16,
			title: 'Capstone — PE7 Flagship',
			hasProject: true,
			lessons: []
		},
		{
			id: 13,
			title: 'Module 13 — SEO',
			hasProject: true,
			lessons: [
				{ slug: '13-1-what-is-seo', title: '13.1 — SEO in 2026' },
				{ slug: '13-2-svelte-head', title: '13.2 — <svelte:head>' },
				{ slug: '13-3-title-meta', title: '13.3 — Title & meta description' },
				{ slug: '13-4-open-graph', title: '13.4 — Open Graph & Twitter' },
				{ slug: '13-5-canonical', title: '13.5 — Canonical URLs' },
				{ slug: '13-6-json-ld', title: '13.6 — JSON-LD fundamentals' },
				{ slug: '13-7-schema-article', title: '13.7 — Article & Breadcrumb' },
				{ slug: '13-8-schema-more', title: '13.8 — Product, FAQ, Org' },
				{ slug: '13-9-robots-txt', title: '13.9 — robots.txt' },
				{ slug: '13-10-sitemap', title: '13.10 — Dynamic sitemap.xml' },
				{ slug: '13-11-core-web-vitals', title: '13.11 — Core Web Vitals' },
				{ slug: '13-12-e-e-a-t', title: '13.12 — E-E-A-T signals' },
				{ slug: '13-13-ai-overviews', title: '13.13 — AI Overviews' },
				{ slug: '13-14-international', title: '13.14 — International SEO' }
			]
		}
	] as const;
</script>

<div class="shell">
	<aside class="sidebar">
		<a href="/" class="brand">svelte-max</a>
		<nav aria-label="Course navigation">
			{#each modules as m (m.id)}
				<p class="nav-heading">{m.title}</p>
				<ul>
					{#each m.lessons as lesson (lesson.slug)}
						<li><a href="/module-{m.id}/{lesson.slug}">{lesson.title}</a></li>
					{/each}
					{#if m.hasProject}
						<li>
							<a href="/module-{m.id}/project" class="project-link">
								→ Module {m.id} Project
							</a>
						</li>
					{/if}
				</ul>
			{/each}
		</nav>
	</aside>
	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	.shell {
		display: flex;
		flex-direction: column;
		min-block-size: 100dvh;
	}

	.sidebar {
		background: var(--color-surface-2);
		border-block-end: 1px solid var(--color-border);
		padding: var(--space-md);
	}

	.brand {
		display: inline-block;
		font-size: var(--text-lg);
		font-weight: 800;
		color: var(--color-text);
		text-decoration: none;
		margin-block-end: var(--space-sm);
	}

	.nav-heading {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		margin-block: var(--space-md) var(--space-xs);
	}

	.nav-heading:first-of-type {
		margin-block-start: var(--space-sm);
	}

	.sidebar ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.sidebar a {
		display: block;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		color: var(--color-text);
		text-decoration: none;
		font-size: var(--text-sm);
	}

	.sidebar a:hover {
		background: var(--color-surface);
		color: var(--color-brand);
	}

	.project-link {
		color: var(--color-brand);
		font-weight: 700;
		margin-block-start: var(--space-xs);
	}

	.content {
		flex: 1;
	}

	@media (min-width: 768px) {
		.shell {
			flex-direction: row;
		}

		.sidebar {
			inline-size: 18rem;
			border-block-end: none;
			border-inline-end: 1px solid var(--color-border);
			position: sticky;
			inset-block-start: 0;
			block-size: 100dvh;
			overflow-y: auto;
		}
	}
</style>
