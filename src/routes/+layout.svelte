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
