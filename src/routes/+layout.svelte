<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const module1Lessons = [
		{ slug: '1-1-hello-compiled', title: '1.1 — Hello, compiled' },
		{ slug: '1-2-project-setup', title: '1.2 — Project setup' },
		{ slug: '1-3-three-blocks', title: '1.3 — Three blocks' },
		{ slug: '1-4-primitives', title: '1.4 — TS primitives' },
		{ slug: '1-5-layers-tokens', title: '1.5 — @layer & tokens' },
		{ slug: '1-6-fluid-typography', title: '1.6 — Fluid typography' },
		{ slug: '1-7-scoping', title: '1.7 — Scoped styles' },
		{ slug: '1-8-interfaces', title: '1.8 — Interfaces' },
		{ slug: '1-9-expressions', title: '1.9 — Template expressions' }
	] as const;
</script>

<div class="shell">
	<aside class="sidebar">
		<a href="/" class="brand">svelte-max</a>
		<nav aria-label="Course navigation">
			<p class="nav-heading">Module 1 — Foundation</p>
			<ul>
				{#each module1Lessons as lesson (lesson.slug)}
					<li><a href="/module-1/{lesson.slug}">{lesson.title}</a></li>
				{/each}
				<li><a href="/module-1/project" class="project-link">→ Module 1 Project</a></li>
			</ul>
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
		margin-block: var(--space-sm) var(--space-xs);
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
