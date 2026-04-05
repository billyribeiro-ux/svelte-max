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
