<script lang="ts">
	interface BuildItem {
		title: string;
		description: string;
	}

	interface ModuleCard {
		id: number;
		title: string;
		summary: string;
		project: string;
		status: 'ready' | 'soon';
		href: string;
	}

	const courseModules: readonly ModuleCard[] = [
		{
			id: 1,
			title: 'Foundation',
			summary:
				'Typed components, PE7 CSS tokens, fluid mobile-first layouts, template expressions.',
			project: 'Personal Portfolio Card',
			status: 'ready',
			href: '/module-1/1-1-hello-compiled'
		},
		{
			id: 2,
			title: 'Reactivity',
			summary:
				'$state, $derived, $effect, SvelteMap/Set, MediaQuery — the full Svelte 5 rune system.',
			project: 'Interactive Dashboard',
			status: 'ready',
			href: '/module-2/2-1-what-is-state'
		},
		{
			id: 3,
			title: 'Components & Props',
			summary:
				'$props, $bindable, snippets, composition, CSS custom property bridges, container queries.',
			project: 'UI Component Library Part 1',
			status: 'ready',
			href: '/module-3/3-1-what-components-are'
		},
		{
			id: 4,
			title: 'Control Flow & Special Elements',
			summary:
				'{#if}, {#each} with keys, {#await}, typed errors, <svelte:window>, <svelte:element>.',
			project: 'Dynamic Product Listing',
			status: 'ready',
			href: '/module-4/4-1-if'
		},
		{
			id: 5,
			title: 'Events & Interaction',
			summary:
				'Typed DOM events, on() from svelte/events, closures, debounce/throttle, bindings deep dive, keyboard a11y.',
			project: 'Validated Form',
			status: 'ready',
			href: '/module-5/5-1-event-handlers'
		},
		{
			id: 6,
			title: 'Styling Mastery',
			summary:
				'PE7 @layer depth, OKLCH, container queries, Svelte transitions, Tween + Spring, custom transitions, reduced motion.',
			project: 'Animated Landing Page',
			status: 'ready',
			href: '/module-6/6-1-layer-architecture'
		},
		{
			id: 8,
			title: 'SvelteKit Routing & Layouts',
			summary:
				'File-based routes, SSR vs hydration, nested layouts, dynamic [slug], shallow routing, snapshots, hooks.',
			project: 'Multi-Page Portfolio Site',
			status: 'ready',
			href: '/module-8/8-1-what-sveltekit-adds'
		},
		{
			id: 9,
			title: 'Data Loading (load)',
			summary:
				'Typed load(), universal vs server, parallel loading, depends/invalidate, streaming, SSG prerender.',
			project: 'Weather Dashboard',
			status: 'ready',
			href: '/module-9/9a-1-what-is-load'
		},
		{
			id: 10,
			title: 'API Routes & Forms',
			summary:
				'+server.ts endpoints, form actions, use:enhance, server validation, env vars, cookie auth, file uploads.',
			project: 'CRUD Note-Taking App',
			status: 'ready',
			href: '/module-10/10-1-server-endpoints'
		},
		{
			id: 7,
			title: 'GSAP Integration',
			summary:
				'GSAP timelines, ScrollTrigger, bind:this, $effect bridge, stagger, use: actions, {@attach} attachments.',
			project: 'Premium Marketing Page',
			status: 'ready',
			href: '/module-7/7-1-what-is-gsap'
		},
		{
			id: 11,
			title: 'State Management at Scale',
			summary:
				'createContext, .svelte.ts stores, reactive classes, URL state, TanStack Table, optimistic UI.',
			project: 'Admin Dashboard',
			status: 'ready',
			href: '/module-11/11-1-prop-drilling'
		},
		{
			id: 12,
			title: 'Performance & Production',
			summary:
				'Core Web Vitals, error boundaries, Vitest + Playwright, service workers, deployment.',
			project: 'Production-Ready App',
			status: 'ready',
			href: '/module-12/12-1-core-web-vitals'
		},
		{
			id: 14,
			title: 'Custom Elements & Library Publishing',
			summary:
				'<svelte:options customElement>, $host(), @sveltejs/package, npm publishing.',
			project: 'Component Library + Custom Elements',
			status: 'ready',
			href: '/module-14/14-1-what-are-custom-elements'
		},
		{
			id: 15,
			title: '3D with Threlte',
			summary:
				'Three.js via Threlte — Canvas, cameras, lights, reactive scenes, GLTF models, performance.',
			project: 'Immersive 3D Landing Page',
			status: 'ready',
			href: '/module-15/15-1-what-is-threlte'
		},
		{
			id: 13,
			title: 'SEO',
			summary:
				'<svelte:head>, Open Graph, JSON-LD, dynamic sitemap/robots, Core Web Vitals, E-E-A-T, AI Overviews.',
			project: 'SEO-Optimized Content Site',
			status: 'ready',
			href: '/module-13/13-1-what-is-seo'
		}
	] as const;

	const buildList: readonly BuildItem[] = [
		{
			title: 'A compiler-first mental model',
			description:
				'Understand how Svelte 5 turns .svelte files into surgical DOM updates, and why runes replace the old reactive label.'
		},
		{
			title: 'A modern CSS foundation',
			description:
				'Cascade layers, fluid clamp() type and space scales, OKLCH color, and scoped component styles that never leak.'
		},
		{
			title: 'TypeScript that pulls its weight',
			description:
				'Strict mode from day one, interfaces for props, and type-safe template expressions without ceremony.'
		},
		{
			title: 'Nine lessons and a capstone',
			description:
				'Module 1 walks from "hello, compiled" to a portfolio project that ties every primitive together.'
		}
	] as const;
</script>

<div class="page">
	<section class="stack hero">
		<p class="eyebrow">Module 1 — Foundation</p>
		<h1>svelte-max</h1>
		<p class="lede">A Svelte 5 + SvelteKit 2 course, built in the open.</p>
		<p class="intro">
			This repository is the source of truth for the course. Every lesson is a real route, every
			concept ships as runnable code, and every commit is a checkpoint you can diff against. Start
			at the top, work through the primitives, and end Module 1 with a project you fully own.
		</p>
		<a class="cta" href="/module-1/1-1-hello-compiled">Start here → Lesson 1.1</a>
	</section>

	<section class="stack">
		<h2>Modules shipped</h2>
		<ul class="module-grid">
			{#each courseModules as m (m.id)}
				<li class="module-card">
					<p class="module-eyebrow">Module {m.id} · {m.status === 'ready' ? 'Ready' : 'Soon'}</p>
					<h3>{m.title}</h3>
					<p class="module-summary">{m.summary}</p>
					<p class="module-project">Project: <strong>{m.project}</strong></p>
					<a href={m.href} class="module-link">Enter Module {m.id} →</a>
				</li>
			{/each}
		</ul>
	</section>

	<section class="stack">
		<h2>What you will build</h2>
		<ul class="build-list">
			{#each buildList as item (item.title)}
				<li>
					<h3>{item.title}</h3>
					<p>{item.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="stack note">
		<h2>How this codebase is wired</h2>
		<p>
			The styling foundation uses the <strong>PE7 architecture</strong>: a single declared
			cascade-layer order — reset, tokens, base, layout, components, animations — so specificity
			stays predictable no matter how many components we add. Colors are expressed in OKLCH for
			perceptual uniformity, and the type and space scales are fluid
			<code>clamp()</code> values so every breakpoint looks intentional without a single utility class.
		</p>
		<p>
			TypeScript runs in <strong>strict mode</strong> from the first lesson. Props are described with
			<code>interface</code>, template expressions stay narrow, and every Svelte 5 rune carries its
			type through the compiler untouched. If it type-checks, it ships.
		</p>
	</section>
</div>

<style>
	.hero {
		padding-block-end: var(--space-lg);
		border-block-end: 1px solid var(--color-border);
		margin-block-end: var(--space-xl);
	}

	.eyebrow {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
		font-weight: 700;
	}

	.lede {
		font-size: var(--text-xl);
		color: var(--color-text-muted);
		max-inline-size: 50ch;
	}

	.intro {
		max-inline-size: 65ch;
	}

	.cta {
		align-self: start;
		display: inline-block;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: oklch(99% 0.005 270);
		border-radius: var(--radius-md);
		font-weight: 700;
		text-decoration: none;
		margin-block-start: var(--space-sm);
		transition:
			background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-expressive);
	}

	.cta:hover {
		background: var(--color-brand-dim);
		color: oklch(99% 0.005 270);
		transform: translateY(-1px);
	}

	.module-grid {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: var(--space-md);
		grid-template-columns: 1fr;
	}

	.module-card {
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.module-eyebrow {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-brand);
		font-weight: 700;
	}

	.module-summary {
		color: var(--color-text-muted);
		max-inline-size: 60ch;
	}

	.module-project {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.module-link {
		align-self: start;
		margin-block-start: var(--space-xs);
		font-weight: 700;
		text-decoration: none;
		color: var(--color-brand);
	}

	.module-link:hover {
		color: var(--color-brand-dim);
	}

	@media (min-width: 768px) {
		.module-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.build-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: var(--space-md);
		grid-template-columns: 1fr;
	}

	.build-list li {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.build-list h3 {
		margin-block-end: var(--space-xs);
	}

	.build-list p {
		color: var(--color-text-muted);
	}

	@media (min-width: 768px) {
		.build-list {
			grid-template-columns: 1fr 1fr;
		}
	}

	.note {
		margin-block-start: var(--space-xl);
		padding: var(--space-lg);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.note p {
		max-inline-size: 72ch;
	}

	.note code {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.9em;
		padding: 0.1em 0.35em;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}
</style>
