<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let navOpen = $state(false);

	if (!dev && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js', { type: 'module' });
	}

	interface Lesson {
		slug: string;
		title: string;
	}

	interface Module {
		id: number;
		title: string;
		hasProject: boolean;
		routePrefix?: string;
		lessons: readonly Lesson[];
	}

	const modules: readonly Module[] = [
		{
			id: 0,
			title: 'Module 0 — Zero to Hero Setup',
			hasProject: true,
			lessons: [
				{ slug: '0-1-what-is-terminal', title: '0.1 — What the Terminal is' },
				{ slug: '0-2-terminal-commands', title: '0.2 — Terminal commands' },
				{ slug: '0-3-paths-and-navigation', title: '0.3 — Paths & navigation' },
				{ slug: '0-4-installing-homebrew', title: '0.4 — Installing Homebrew' },
				{ slug: '0-5-installing-node', title: '0.5 — Installing Node.js' },
				{ slug: '0-6-pnpm-deep-dive', title: '0.6 — pnpm deep dive' },
				{ slug: '0-7-creating-a-project', title: '0.7 — Creating a SvelteKit project' },
				{ slug: '0-8-folder-structure', title: '0.8 — Folder structure & dev server' },
				{ slug: '0-9-what-is-git', title: '0.9 — What Git is' },
				{ slug: '0-10-git-basics', title: '0.10 — Git basics' },
				{ slug: '0-11-github', title: '0.11 — GitHub' },
				{ slug: '0-12-branches', title: '0.12 — Branches & PRs' },
				{ slug: '0-13-professional-git', title: '0.13 — Professional Git (PE7 way)' }
			]
		},
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
				{ slug: '1-9-expressions', title: '1.9 — Template expressions' },
				{ slug: '1-10-svelte5-changes', title: '1.10 — Svelte 5 changes' }
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
				{ slug: '2-15-typescript-reactive', title: '2.15 — Typed state' },
				{ slug: '2-16-decision-tree', title: '2.16 — Decision tree' },
				{ slug: '2-17-debug-rune', title: '2.17 — {@debug} rune' },
				{ slug: '2-17-inspect-debugging', title: '2.17 — $inspect & $inspect.trace' },
				{ slug: '2-18-reactive-window', title: '2.18 — Reactive window values' }
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
				{ slug: '4-12-svelte-element', title: '4.12 — <svelte:element>' },
				{ slug: '4-13-await-expressions', title: '4.13 — Await expressions' }
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
				{ slug: '6-18-reduced-motion', title: '6.18 — Reduced motion' },
				{ slug: '6-19-class-arrays', title: '6.19 — Class arrays & objects' }
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
				{ slug: '8-14-rendering-modes', title: '8.14 — Rendering modes' },
				{ slug: '8-15-environment-variables', title: '8.15 — Environment variables' },
				{ slug: '8-16-deployment', title: '8.16 — Deployment deep dive' }
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
				{ slug: '9a-10-prerender', title: '9A.10 — SSG prerender' },
				{ slug: '9a-11-hydratable', title: '9A.11 — Hydratable data' }
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
				{ slug: '10-9-file-uploads', title: '10.9 — File uploads' },
				{ slug: '10-10-file-uploads', title: '10.10 — File uploads' }
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
				{ slug: '7-14-gsap-svelte-together', title: '7.14 — GSAP + Svelte' },
				{ slug: '7-15-attachments-advanced', title: '7.15 — Advanced attachments' }
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
				{ slug: '12-2-image-optimization', title: '12.2 — Image optimization' },
				{ slug: '12-3-code-splitting', title: '12.3 — Code splitting' },
				{ slug: '12-4-effect-performance', title: '12.4 — $effect performance' },
				{ slug: '12-5-memoization', title: '12.5 — Memoization' },
				{ slug: '12-6-reusable-actions', title: '12.6 — Actions + attachments' },
				{ slug: '12-7-error-boundaries', title: '12.7 — Error boundaries' },
				{ slug: '12-8-accessibility', title: '12.8 — Accessibility' },
				{ slug: '12-9-vitest-unit-tests', title: '12.9 — Vitest unit tests' },
				{ slug: '12-10-playwright-e2e', title: '12.10 — Playwright E2E' },
				{ slug: '12-11-deployment', title: '12.11 — Deployment' },
				{ slug: '12-12-service-worker', title: '12.12 — Service workers' },
				{ slug: '12-13-effect-tracking', title: '12.13 — $effect.tracking()' },
				{ slug: '12-14-testing-svelte', title: '12.14 — Testing Svelte' },
				{ slug: '12-15-image-optimization', title: '12.15 — Image optimization' },
				{ slug: '12-16-error-monitoring', title: '12.16 — Error monitoring' }
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
			id: 17,
			title: 'Data Visualization',
			hasProject: true,
			routePrefix: 'data-viz',
			lessons: [
				{ slug: 'dv-1-svg-fundamentals', title: 'DV.1 — SVG in Svelte' },
				{ slug: 'dv-2-bar-chart', title: 'DV.2 — Bar chart' },
				{ slug: 'dv-3-line-chart', title: 'DV.3 — Line chart' },
				{ slug: 'dv-4-area-sparkline', title: 'DV.4 — Area + sparkline' },
				{ slug: 'dv-5-donut-pie', title: 'DV.5 — Donut + pie' },
				{ slug: 'dv-6-responsive-charts', title: 'DV.6 — Responsive charts' },
				{ slug: 'dv-7-animated-transitions', title: 'DV.7 — Animated transitions' },
				{ slug: 'dv-8-tooltips-annotations', title: 'DV.8 — Tooltips + annotations' },
				{ slug: 'dv-9-scroll-storytelling', title: 'DV.9 — Scroll storytelling' },
				{ slug: 'dv-10-accessible-charts', title: 'DV.10 — Accessible charts' }
			]
		},
		{
			id: 18,
			title: 'GSAP Cinema',
			hasProject: true,
			routePrefix: 'gsap-cinema',
			lessons: [
				{ slug: 'gc-1-advanced-easing', title: 'GC.1 — Custom easing' },
				{ slug: 'gc-2-splittext-manual', title: 'GC.2 — Text animation' },
				{ slug: 'gc-3-svg-path-drawing', title: 'GC.3 — SVG path drawing' },
				{ slug: 'gc-4-parallax-layers', title: 'GC.4 — Parallax layers' },
				{ slug: 'gc-5-scene-transitions', title: 'GC.5 — Scene choreography' },
				{ slug: 'gc-6-video-hero', title: 'GC.6 — Cinematic video hero' },
				{ slug: 'gc-7-stagger-choreography', title: 'GC.7 — Stagger choreography' },
				{ slug: 'gc-8-scroll-storytelling', title: 'GC.8 — Scroll storytelling' },
				{ slug: 'gc-9-page-transitions', title: 'GC.9 — Page transitions' },
				{ slug: 'gc-10-3d-transforms', title: 'GC.10 — 3D transforms' },
				{ slug: 'gc-11-responsive-cinema', title: 'GC.11 — Responsive cinema' },
				{ slug: 'gc-12-performance-a11y', title: 'GC.12 — Performance & a11y' }
			]
		},
		{
			id: 19,
			title: 'ApexCharts',
			hasProject: true,
			routePrefix: 'apex-charts',
			lessons: [
				{ slug: 'ac-1-installing-apex', title: 'AC.1 — Installing ApexCharts' },
				{ slug: 'ac-2-bar-column', title: 'AC.2 — Bar & column' },
				{ slug: 'ac-3-line-area', title: 'AC.3 — Line & area' },
				{ slug: 'ac-4-donut-radial', title: 'AC.4 — Donut & radial' },
				{ slug: 'ac-5-heatmap-treemap', title: 'AC.5 — Heatmap & treemap' },
				{ slug: 'ac-6-realtime-state', title: 'AC.6 — Real-time updates' },
				{ slug: 'ac-7-animated-transitions', title: 'AC.7 — Chart animations' },
				{ slug: 'ac-8-dark-mode-tokens', title: 'AC.8 — Dark mode + tokens' },
				{ slug: 'ac-9-responsive-charts', title: 'AC.9 — Responsive charts' },
				{ slug: 'ac-10-composite-dashboard', title: 'AC.10 — Multi-chart dashboard' }
			]
		},
		{
			id: 20,
			title: 'KPI Dashboard',
			hasProject: true,
			routePrefix: 'kpi-cards',
			lessons: [
				{ slug: 'kpi-1-anatomy', title: 'KPI.1 — Anatomy of a KPI card' },
				{ slug: 'kpi-2-simple-stat', title: 'KPI.2 — Simple stat card' },
				{ slug: 'kpi-3-trend-arrows', title: 'KPI.3 — Trend arrows' },
				{ slug: 'kpi-4-sparkline', title: 'KPI.4 — Sparkline' },
				{ slug: 'kpi-5-progress-ring', title: 'KPI.5 — Progress ring' },
				{ slug: 'kpi-6-animated-counter', title: 'KPI.6 — Animated counter' },
				{ slug: 'kpi-7-full-kpi-card', title: 'KPI.7 — Full KPI card' },
				{ slug: 'kpi-8-realtime-simulation', title: 'KPI.8 — Real-time data' },
				{ slug: 'kpi-9-responsive-grid', title: 'KPI.9 — Dashboard grid' },
				{ slug: 'kpi-10-dashboard-patterns', title: 'KPI.10 — DE patterns' }
			]
		},
		{
			id: 21,
			title: 'SVG & Icon Animation',
			hasProject: true,
			routePrefix: 'svg-icons',
			lessons: [
				{ slug: 'si-1-svg-anatomy', title: 'SI.1 — SVG anatomy' },
				{ slug: 'si-2-path-drawing', title: 'SI.2 — Path drawing' },
				{ slug: 'si-3-icon-systems', title: 'SI.3 — Icon systems' },
				{ slug: 'si-4-morphing', title: 'SI.4 — Shape morphing' },
				{ slug: 'si-5-line-art', title: 'SI.5 — Line art' },
				{ slug: 'si-6-loading-spinners', title: 'SI.6 — Spinners & progress' },
				{ slug: 'si-7-micro-interactions', title: 'SI.7 — Micro-interactions' },
				{ slug: 'si-8-interactive-svg', title: 'SI.8 — Interactive SVG' },
				{ slug: 'si-9-lottie-from-scratch', title: 'SI.9 — Lottie from scratch' },
				{ slug: 'si-10-performance-a11y', title: 'SI.10 — SVG perf & a11y' }
			]
		},
		{
			id: 22,
			title: 'Real-World Forms',
			hasProject: false,
			routePrefix: 'contact',
			lessons: [
				{ slug: '', title: 'Contact Form' },
				{ slug: 'cta', title: 'CTA + PDF Download' }
			]
		},
		{
			id: 16,
			title: 'Capstone — PE7 Flagship',
			hasProject: true,
			routePrefix: 'capstone',
			lessons: []
		},
		{
			id: 99,
			title: 'Module 9B — Remote Functions',
			hasProject: true,
			lessons: [
				{ slug: '9b-1-what-are-remote-functions', title: '9B.1 — What remote functions are' },
				{ slug: '9b-2-query', title: '9B.2 — query()' },
				{ slug: '9b-3-query-args', title: '9B.3 — Query with args' },
				{ slug: '9b-4-query-batch', title: '9B.4 — query.batch()' },
				{ slug: '9b-5-prerender', title: '9B.5 — prerender remote' },
				{ slug: '9b-6-form', title: '9B.6 — form()' },
				{ slug: '9b-7-form-fields', title: '9B.7 — Form fields API' },
				{ slug: '9b-8-form-validation', title: '9B.8 — Validation + enhance' },
				{ slug: '9b-9-command', title: '9B.9 — command()' },
				{ slug: '9b-10-single-flight-server', title: '9B.10 — Single-flight (server)' },
				{ slug: '9b-11-single-flight-client', title: '9B.11 — Single-flight (client)' },
				{ slug: '9b-12-async-ssr', title: '9B.12 — Async SSR' },
				{ slug: '9b-13-fork', title: '9B.13 — fork()' },
				{ slug: '9b-14-choosing', title: '9B.14 — Choosing the right tool' }
			]
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
				{ slug: '13-14-international', title: '13.14 — International SEO' },
				{ slug: '13-15-internationalization', title: '13.15 — Internationalization (i18n)' }
			]
		},
		{
			id: 23,
			title: 'SVG to Svelte',
			hasProject: true,
			routePrefix: 'svg-to-svelte',
			lessons: [
				{ slug: 's2s-1-why-svg-to-svelte', title: 'S2S.1 — Why SVG to Svelte?' },
				{ slug: 's2s-2-cli-setup', title: 'S2S.2 — CLI setup' },
				{ slug: 's2s-3-typed-icon-component', title: 'S2S.3 — Typed icon component' },
				{ slug: 's2s-4-attribute-overrides', title: 'S2S.4 — Attribute overrides' },
				{ slug: 's2s-5-registry-dynamic', title: 'S2S.5 — Registry & dynamic icons' },
				{ slug: 's2s-6-animation-pipeline', title: 'S2S.6 — Animation pipeline' }
			]
		},
		{
			id: 24,
			title: 'Motion GPU (WebGPU Shaders)',
			hasProject: true,
			routePrefix: 'motion-gpu',
			lessons: [
				{ slug: 'mg-1-what-is-webgpu', title: 'MG.1 — What is WebGPU?' },
				{ slug: 'mg-2-first-shader', title: 'MG.2 — Your first shader' },
				{ slug: 'mg-3-uniforms-time', title: 'MG.3 — Uniforms & time' },
				{ slug: 'mg-4-pointer-interaction', title: 'MG.4 — Pointer interaction' },
				{ slug: 'mg-5-multi-pass', title: 'MG.5 — Multi-pass pipelines' },
				{ slug: 'mg-6-compute-shaders', title: 'MG.6 — Compute shaders' },
				{ slug: 'mg-7-textures', title: 'MG.7 — Textures & images' },
				{ slug: 'mg-8-performance', title: 'MG.8 — Performance & modes' }
			]
		},
		{
			id: 25,
			title: 'Bonus — sv-agentation',
			hasProject: false,
			routePrefix: 'sv-agentation',
			lessons: [
				{ slug: 'ag-1-what-is-agentation', title: 'AG.1 — What is sv-agentation?' },
				{ slug: 'ag-2-inspection-source', title: 'AG.2 — Inspection & source' },
				{ slug: 'ag-3-annotations-copy', title: 'AG.3 — Annotations & copy' },
				{ slug: 'ag-4-ai-workflows', title: 'AG.4 — AI workflows' }
			]
		},
		{
			id: 26,
			title: 'Bonus — svelte-realtime',
			hasProject: false,
			routePrefix: 'svelte-realtime',
			lessons: [
				{ slug: 'rt-1-what-is-realtime', title: 'RT.1 — What is svelte-realtime?' },
				{ slug: 'rt-2-rpc-basics', title: 'RT.2 — RPC basics' },
				{ slug: 'rt-3-streams-merge', title: 'RT.3 — Streams & merge' },
				{ slug: 'rt-4-optimistic-offline', title: 'RT.4 — Optimistic & offline' },
				{ slug: 'rt-5-auth-channels', title: 'RT.5 — Auth & channels' },
				{ slug: 'rt-6-rooms-signals', title: 'RT.6 — Rooms & signals' },
				{ slug: 'rt-7-derived-effects', title: 'RT.7 — Derived & effects' },
				{ slug: 'rt-8-scaling-production', title: 'RT.8 — Scaling & production' }
			]
		},
		{
			id: 27,
			title: 'Bonus — Pterodactyl',
			hasProject: false,
			routePrefix: 'ptero',
			lessons: [
				{ slug: 'pt-1-what-is-ptero', title: 'PT.1 — What is Pterodactyl?' },
				{ slug: 'pt-2-content-frontmatter', title: 'PT.2 — Content & frontmatter' },
				{ slug: 'pt-3-theming-css', title: 'PT.3 — Theming & CSS' },
				{ slug: 'pt-4-components-layout', title: 'PT.4 — Components & layout' },
				{ slug: 'pt-5-search-versioning', title: 'PT.5 — Search & versioning' },
				{ slug: 'pt-6-cli-deployment', title: 'PT.6 — CLI & deployment' }
			]
		},
		{
			id: 28,
			title: 'Bonus — MDsveX',
			hasProject: false,
			routePrefix: 'mdsvex',
			lessons: [
				{ slug: 'mx-1-what-is-mdsvex', title: 'MX.1 — What is MDsveX?' },
				{ slug: 'mx-2-frontmatter-layouts', title: 'MX.2 — Frontmatter & layouts' },
				{ slug: 'mx-3-components-in-markdown', title: 'MX.3 — Components in markdown' },
				{ slug: 'mx-4-syntax-highlighting', title: 'MX.4 — Syntax highlighting' },
				{ slug: 'mx-5-remark-rehype', title: 'MX.5 — Remark & rehype' },
				{ slug: 'mx-6-blog-patterns', title: 'MX.6 — Blog patterns' }
			]
		}
	] as const;
</script>

<div class="shell">
	<aside class="sidebar">
		<div class="sidebar-header">
			<a href="/" class="brand">svelte-max</a>
			<button class="nav-toggle" onclick={() => navOpen = !navOpen} aria-label="Toggle navigation">
				{navOpen ? '✕' : '☰'}
			</button>
		</div>
		<nav aria-label="Course navigation" class:nav-open={navOpen}>
			{#each modules as m (m.id)}
				<p class="nav-heading">{m.title}</p>
				<ul>
					{#each m.lessons as lesson (lesson.slug)}
						<li><a href="/{m.routePrefix ?? `module-${m.id}`}/{lesson.slug}" onclick={() => navOpen = false}>{lesson.title}</a></li>
					{/each}
					{#if m.hasProject}
						<li>
							<a href="/{m.routePrefix ?? `module-${m.id}`}/project" class="project-link" onclick={() => navOpen = false}>
								→ Module {m.id} Project
							</a>
						</li>
					{/if}
				</ul>
			{/each}
		</nav>
	</aside>
	<main class="content" id="lesson-content">
		{@render children()}
	</main>
</div>

<style>
	.shell {
		display: flex;
		flex-direction: column;
		block-size: 100dvh;
	}

	.sidebar {
		background: var(--color-surface-2);
		border-block-end: 1px solid var(--color-border);
		padding: var(--space-md);
		flex-shrink: 0;
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-toggle {
		font-size: var(--text-lg);
		background: none;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		cursor: pointer;
		color: var(--color-text);
		line-height: 1;
	}

	.sidebar nav {
		display: none;
	}

	.sidebar nav.nav-open {
		display: block;
		max-block-size: 60dvh;
		overflow-y: auto;
		margin-block-start: var(--space-sm);
	}

	.brand {
		display: inline-block;
		font-size: var(--text-lg);
		font-weight: 800;
		color: var(--color-text);
		text-decoration: none;
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
		overflow-y: auto;
	}

	@media (min-inline-size: 768px) {
		.shell {
			flex-direction: row;
		}

		.nav-toggle {
			display: none;
		}

		.sidebar {
			inline-size: 18rem;
			border-block-end: none;
			border-inline-end: 1px solid var(--color-border);
			block-size: 100dvh;
			overflow-y: auto;
			flex-shrink: 0;
		}

		.sidebar nav {
			display: block;
		}
	}
</style>
