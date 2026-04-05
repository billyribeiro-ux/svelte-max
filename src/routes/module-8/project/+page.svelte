<script lang="ts">
	import { pushState, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import type { Snapshot } from './$types';

	interface Project {
		id: string;
		title: string;
		tagline: string;
		year: number;
		stack: readonly string[];
	}

	interface ContactDraft {
		name: string;
		email: string;
		message: string;
	}

	const projects: readonly Project[] = [
		{
			id: 'atlas',
			title: 'Atlas',
			tagline: 'A cartography tool for distributed teams.',
			year: 2024,
			stack: ['SvelteKit', 'PostgreSQL', 'MapLibre']
		},
		{
			id: 'ember',
			title: 'Ember',
			tagline: 'Real-time collaborative notebook.',
			year: 2025,
			stack: ['SvelteKit', 'Durable Objects', 'Yjs']
		},
		{
			id: 'nomad',
			title: 'Nomad',
			tagline: 'Offline-first travel planner.',
			year: 2025,
			stack: ['SvelteKit', 'SQLite', 'PWA']
		},
		{
			id: 'prism',
			title: 'Prism',
			tagline: 'Design-token playground.',
			year: 2026,
			stack: ['SvelteKit', 'OKLCH', 'Zod']
		}
	];

	let draft = $state<ContactDraft>({ name: '', email: '', message: '' });

	export const snapshot: Snapshot<ContactDraft> = {
		capture: () => ({ ...draft }),
		restore: (value) => {
			draft = { ...value };
		}
	};

	const activeId = $derived((page.state as { project?: string } | undefined)?.project);
	const activeProject = $derived(projects.find((p) => p.id === activeId));

	function openProject(project: Project) {
		pushState('', { project: project.id });
	}

	function closeModal() {
		history.back();
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && activeId !== undefined) {
			closeModal();
		}
	}

	onNavigate((navigation) => {
		if (typeof document.startViewTransition !== 'function') return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const lessons: readonly { href: string; label: string; mode: 'hover' | 'viewport' }[] = [
		{ href: '/', label: 'Home', mode: 'hover' },
		{ href: '/module-8/8-1-routing', label: '8.1 Routing', mode: 'hover' },
		{ href: '/module-8/8-2-layouts', label: '8.2 Layouts', mode: 'hover' },
		{ href: '/module-8/8-3-loading-data', label: '8.3 Load', mode: 'hover' },
		{ href: '/module-8/8-4-form-actions', label: '8.4 Forms', mode: 'viewport' },
		{ href: '/module-8/8-5-api-routes', label: '8.5 API', mode: 'viewport' },
		{ href: '/module-8/8-6-error-handling', label: '8.6 Errors', mode: 'viewport' },
		{ href: '/module-8/8-7-app-state', label: '8.7 App state', mode: 'viewport' },
		{ href: '/module-8/8-8-app-navigation', label: '8.8 Navigation', mode: 'viewport' },
		{ href: '/module-8/8-9-link-options', label: '8.9 Link options', mode: 'viewport' },
		{ href: '/module-8/8-10-hooks', label: '8.10 Hooks', mode: 'viewport' },
		{ href: '/module-8/8-11-shallow-routing', label: '8.11 Shallow', mode: 'viewport' },
		{ href: '/module-8/8-12-snapshots', label: '8.12 Snapshots', mode: 'viewport' },
		{ href: '/module-8/8-13-page-transitions', label: '8.13 Transitions', mode: 'viewport' },
		{ href: '/module-8/8-14-rendering-modes', label: '8.14 Rendering', mode: 'viewport' }
	];

	const routeInfo = $derived({
		pathname: page.url.pathname,
		search: page.url.search || '(none)',
		state: JSON.stringify(page.state ?? {}, null, 2),
		params: JSON.stringify(page.params ?? {}, null, 2)
	});
</script>

<svelte:window onkeydown={onKey} />

<section class="page portfolio">
	<header class="hero">
		<h1>Module 8 Project — Multi-Page Portfolio</h1>
		<p class="tagline">
			A single-file portfolio that composes every Module 8 concept: routing data,
			link options, hooks philosophy, shallow routing, snapshots, view transitions, and
			rendering modes.
		</p>
	</header>

	<h2>Projects</h2>
	<div class="grid">
		{#each projects as project (project.id)}
			<button type="button" class="card" onclick={() => openProject(project)}>
				<span class="year">{project.year}</span>
				<span class="title">{project.title}</span>
				<span class="desc">{project.tagline}</span>
				<span class="stack">
					{#each project.stack as tech (tech)}
						<span class="chip">{tech}</span>
					{/each}
				</span>
			</button>
		{/each}
	</div>

	{#if activeProject}
		<div class="modal" role="dialog" aria-modal="true" aria-label={activeProject.title}>
			<div class="modal-card">
				<span class="year">{activeProject.year}</span>
				<h3>{activeProject.title}</h3>
				<p>{activeProject.tagline}</p>
				<div class="stack">
					{#each activeProject.stack as tech (tech)}
						<span class="chip">{tech}</span>
					{/each}
				</div>
				<p class="small">
					Opened via <code>{"pushState('', { project: id })"}</code> — URL unchanged,
					history entry recorded. Press <code>Esc</code> or back to close.
				</p>
				<button type="button" onclick={closeModal}>Close</button>
			</div>
		</div>
	{/if}

	<h2>Contact draft</h2>
	<form class="contact" onsubmit={(e) => e.preventDefault()}>
		<label>
			<span>Name</span>
			<input type="text" bind:value={draft.name} />
		</label>
		<label>
			<span>Email</span>
			<input type="email" bind:value={draft.email} />
		</label>
		<label>
			<span>Message</span>
			<textarea bind:value={draft.message} rows="4"></textarea>
		</label>
		<p class="small">
			This draft is preserved across client-side navigation via
			<code>{'export const snapshot'}</code>. Navigate away, come back — still here.
		</p>
	</form>

	<h2>Routing info</h2>
	<div class="info">
		<div>
			<span class="label">page.url.pathname</span>
			<code>{routeInfo.pathname}</code>
		</div>
		<div>
			<span class="label">page.url.search</span>
			<code>{routeInfo.search}</code>
		</div>
		<div>
			<span class="label">page.state</span>
			<pre>{routeInfo.state}</pre>
		</div>
		<div>
			<span class="label">page.params</span>
			<pre>{routeInfo.params}</pre>
		</div>
	</div>

	<h2>Navigate</h2>
	<nav class="nav">
		{#each lessons as link (link.href)}
			{#if link.mode === 'hover'}
				<a href={link.href} data-sveltekit-preload-data="hover">{link.label}</a>
			{:else}
				<a href={link.href} data-sveltekit-preload-code="viewport">{link.label}</a>
			{/if}
		{/each}
	</nav>

	<footer>
		<p>
			Concepts composed: routing, layouts, load, form actions, API routes, error
			handling, app state, navigation APIs, link options, hooks, shallow routing,
			snapshots, view transitions, rendering modes.
		</p>
	</footer>
</section>

<style>
	.portfolio {
		--color-brand: oklch(62% 0.15 240);
		--color-brand-dim: oklch(52% 0.12 240);
	}
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 90ch;
	}
	.hero {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding-block: var(--space-lg);
		border-block-end: 1px solid var(--color-border);
	}
	h1 {
		margin: 0;
		view-transition-name: portfolio-title;
		color: var(--color-brand);
	}
	.tagline {
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	h2 {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text);
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		text-align: start;
		cursor: pointer;
		font: inherit;
		color: var(--color-text);
		transition:
			transform var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}
	.card:hover {
		transform: translateY(-2px);
		border-color: var(--color-brand);
		box-shadow: var(--shadow-md);
	}
	.year {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.title {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-brand);
	}
	.desc {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.5;
	}
	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-block-start: var(--space-xs);
	}
	.chip {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
	}
	.modal {
		position: fixed;
		inset: 0;
		background: color-mix(in oklch, black 70%, transparent);
		display: grid;
		place-items: center;
		padding: var(--space-lg);
		z-index: 10;
	}
	.modal-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		box-shadow: var(--shadow-lg);
		min-inline-size: min(90vw, 32rem);
	}
	.modal-card h3 {
		margin: 0;
		color: var(--color-brand);
	}
	.modal-card button {
		font: inherit;
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		align-self: start;
	}
	.contact {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
	}
	.contact label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.contact span {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}
	input,
	textarea {
		font: inherit;
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
	}
	textarea {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		resize: vertical;
	}
	input:focus,
	textarea:focus {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.small {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}
	.info {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
	}
	.info > div {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.nav {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.nav a {
		font-size: var(--text-sm);
		color: var(--color-brand);
		text-decoration: none;
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-1);
		transition: background var(--dur-fast) var(--ease-out);
	}
	.nav a:hover {
		background: var(--color-surface-2);
		border-color: var(--color-brand);
	}
	footer {
		padding-block: var(--space-lg);
		border-block-start: 1px solid var(--color-border);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}
	footer p {
		margin: 0;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
		color: var(--color-text);
	}
	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		margin: 0;
		color: var(--color-text);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-hero);
		}
		h2 {
			font-size: var(--text-xl);
		}
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
