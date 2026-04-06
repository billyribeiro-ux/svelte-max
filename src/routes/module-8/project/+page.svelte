<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { pushState, onNavigate } from '$app/navigation';\n" +
		"\timport { page } from '$app/state';\n" +
		"\timport type { Snapshot } from './$types';\n" +
		"\n" +
		"\tinterface Project {\n" +
		"\t\tid: string;\n" +
		"\t\ttitle: string;\n" +
		"\t\ttagline: string;\n" +
		"\t\tyear: number;\n" +
		"\t\tstack: readonly string[];\n" +
		"\t}\n" +
		"\n" +
		"\tinterface ContactDraft {\n" +
		"\t\tname: string;\n" +
		"\t\temail: string;\n" +
		"\t\tmessage: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst projects: readonly Project[] = [\n" +
		"\t\t{\n" +
		"\t\t\tid: 'atlas',\n" +
		"\t\t\ttitle: 'Atlas',\n" +
		"\t\t\ttagline: 'A cartography tool for distributed teams.',\n" +
		"\t\t\tyear: 2024,\n" +
		"\t\t\tstack: ['SvelteKit', 'PostgreSQL', 'MapLibre']\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tid: 'ember',\n" +
		"\t\t\ttitle: 'Ember',\n" +
		"\t\t\ttagline: 'Real-time collaborative notebook.',\n" +
		"\t\t\tyear: 2025,\n" +
		"\t\t\tstack: ['SvelteKit', 'Durable Objects', 'Yjs']\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tid: 'nomad',\n" +
		"\t\t\ttitle: 'Nomad',\n" +
		"\t\t\ttagline: 'Offline-first travel planner.',\n" +
		"\t\t\tyear: 2025,\n" +
		"\t\t\tstack: ['SvelteKit', 'SQLite', 'PWA']\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tid: 'prism',\n" +
		"\t\t\ttitle: 'Prism',\n" +
		"\t\t\ttagline: 'Design-token playground.',\n" +
		"\t\t\tyear: 2026,\n" +
		"\t\t\tstack: ['SvelteKit', 'OKLCH', 'Zod']\n" +
		"\t\t}\n" +
		"\t];\n" +
		"\n" +
		"\tlet draft = $state\u003cContactDraft\u003e({ name: '', email: '', message: '' });\n" +
		"\n" +
		"\texport const snapshot: Snapshot\u003cContactDraft\u003e = {\n" +
		"\t\tcapture: () =\u003e ({ ...draft }),\n" +
		"\t\trestore: (value) =\u003e {\n" +
		"\t\t\tdraft = { ...value };\n" +
		"\t\t}\n" +
		"\t};\n" +
		"\n" +
		"\tconst activeId = $derived((page.state as { project?: string } | undefined)?.project);\n" +
		"\tconst activeProject = $derived(projects.find((p) =\u003e p.id === activeId));\n" +
		"\n" +
		"\tfunction openProject(project: Project) {\n" +
		"\t\tpushState('', { project: project.id });\n" +
		"\t}\n" +
		"\n" +
		"\tfunction closeModal() {\n" +
		"\t\thistory.back();\n" +
		"\t}\n" +
		"\n" +
		"\tfunction onKey(e: KeyboardEvent) {\n" +
		"\t\tif (e.key === 'Escape' && activeId !== undefined) {\n" +
		"\t\t\tcloseModal();\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\n" +
		"\tonNavigate((navigation) =\u003e {\n" +
		"\t\tif (typeof document.startViewTransition !== 'function') return;\n" +
		"\t\treturn new Promise((resolve) =\u003e {\n" +
		"\t\t\tdocument.startViewTransition(async () =\u003e {\n" +
		"\t\t\t\tresolve();\n" +
		"\t\t\t\tawait navigation.complete;\n" +
		"\t\t\t});\n" +
		"\t\t});\n" +
		"\t});\n" +
		"\n" +
		"\tconst lessons: readonly { href: string; label: string; mode: 'hover' | 'viewport' }[] = [\n" +
		"\t\t{ href: '/', label: 'Home', mode: 'hover' },\n" +
		"\t\t{ href: '/module-8/8-1-routing', label: '8.1 Routing', mode: 'hover' },\n" +
		"\t\t{ href: '/module-8/8-2-layouts', label: '8.2 Layouts', mode: 'hover' },\n" +
		"\t\t{ href: '/module-8/8-3-loading-data', label: '8.3 Load', mode: 'hover' },\n" +
		"\t\t{ href: '/module-8/8-4-form-actions', label: '8.4 Forms', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-5-api-routes', label: '8.5 API', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-6-error-handling', label: '8.6 Errors', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-7-app-state', label: '8.7 App state', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-8-app-navigation', label: '8.8 Navigation', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-9-link-options', label: '8.9 Link options', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-10-hooks', label: '8.10 Hooks', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-11-shallow-routing', label: '8.11 Shallow', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-12-snapshots', label: '8.12 Snapshots', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-13-page-transitions', label: '8.13 Transitions', mode: 'viewport' },\n" +
		"\t\t{ href: '/module-8/8-14-rendering-modes', label: '8.14 Rendering', mode: 'viewport' }\n" +
		"\t];\n" +
		"\n" +
		"\tconst routeInfo = $derived({\n" +
		"\t\tpathname: page.url.pathname,\n" +
		"\t\tsearch: page.url.search || '(none)',\n" +
		"\t\tstate: JSON.stringify(page.state ?? {}, null, 2),\n" +
		"\t\tparams: JSON.stringify(page.params ?? {}, null, 2)\n" +
		"\t});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:window onkeydown={onKey} /\u003e\n" +
		"\n" +
		"\u003csection class=\"page portfolio\"\u003e\n" +
		"\t\u003cheader class=\"hero\"\u003e\n" +
		"\t\t\u003ch1\u003eModule 8 Project — Multi-Page Portfolio\u003c/h1\u003e\n" +
		"\t\t\u003cp class=\"tagline\"\u003e\n" +
		"\t\t\tA single-file portfolio that composes every Module 8 concept: routing data,\n" +
		"\t\t\tlink options, hooks philosophy, shallow routing, snapshots, view transitions, and\n" +
		"\t\t\trendering modes.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/header\u003e\n" +
		"\n" +
		"\t\u003ch2\u003eProjects\u003c/h2\u003e\n" +
		"\t\u003cdiv class=\"grid\"\u003e\n" +
		"\t\t{#each projects as project (project.id)}\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"card\" onclick={() =\u003e openProject(project)}\u003e\n" +
		"\t\t\t\t\u003cspan class=\"year\"\u003e{project.year}\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"title\"\u003e{project.title}\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"desc\"\u003e{project.tagline}\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"stack\"\u003e\n" +
		"\t\t\t\t\t{#each project.stack as tech (tech)}\n" +
		"\t\t\t\t\t\t\u003cspan class=\"chip\"\u003e{tech}\u003c/span\u003e\n" +
		"\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\u003c/span\u003e\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t{/each}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t{#if activeProject}\n" +
		"\t\t\u003cdiv class=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-label={activeProject.title}\u003e\n" +
		"\t\t\t\u003cdiv class=\"modal-card\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"year\"\u003e{activeProject.year}\u003c/span\u003e\n" +
		"\t\t\t\t\u003ch3\u003e{activeProject.title}\u003c/h3\u003e\n" +
		"\t\t\t\t\u003cp\u003e{activeProject.tagline}\u003c/p\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"stack\"\u003e\n" +
		"\t\t\t\t\t{#each activeProject.stack as tech (tech)}\n" +
		"\t\t\t\t\t\t\u003cspan class=\"chip\"\u003e{tech}\u003c/span\u003e\n" +
		"\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003cp class=\"small\"\u003e\n" +
		"\t\t\t\t\tOpened via \u003ccode\u003e{\"pushState('', { project: id })\"}\u003c/code\u003e — URL unchanged,\n" +
		"\t\t\t\t\thistory entry recorded. Press \u003ccode\u003eEsc\u003c/code\u003e or back to close.\n" +
		"\t\t\t\t\u003c/p\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" onclick={closeModal}\u003eClose\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t{/if}\n" +
		"\n" +
		"\t\u003ch2\u003eContact draft\u003c/h2\u003e\n" +
		"\t\u003cform class=\"contact\" onsubmit={(e) =\u003e e.preventDefault()}\u003e\n" +
		"\t\t\u003clabel\u003e\n" +
		"\t\t\t\u003cspan\u003eName\u003c/span\u003e\n" +
		"\t\t\t\u003cinput type=\"text\" bind:value={draft.name} /\u003e\n" +
		"\t\t\u003c/label\u003e\n" +
		"\t\t\u003clabel\u003e\n" +
		"\t\t\t\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"\t\t\t\u003cinput type=\"email\" bind:value={draft.email} /\u003e\n" +
		"\t\t\u003c/label\u003e\n" +
		"\t\t\u003clabel\u003e\n" +
		"\t\t\t\u003cspan\u003eMessage\u003c/span\u003e\n" +
		"\t\t\t\u003ctextarea bind:value={draft.message} rows=\"4\"\u003e\u003c/textarea\u003e\n" +
		"\t\t\u003c/label\u003e\n" +
		"\t\t\u003cp class=\"small\"\u003e\n" +
		"\t\t\tThis draft is preserved across client-side navigation via\n" +
		"\t\t\t\u003ccode\u003e{'export const snapshot'}\u003c/code\u003e. Navigate away, come back — still here.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/form\u003e\n" +
		"\n" +
		"\t\u003ch2\u003eRouting info\u003c/h2\u003e\n" +
		"\t\u003cdiv class=\"info\"\u003e\n" +
		"\t\t\u003cdiv\u003e\n" +
		"\t\t\t\u003cspan class=\"label\"\u003epage.url.pathname\u003c/span\u003e\n" +
		"\t\t\t\u003ccode\u003e{routeInfo.pathname}\u003c/code\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cdiv\u003e\n" +
		"\t\t\t\u003cspan class=\"label\"\u003epage.url.search\u003c/span\u003e\n" +
		"\t\t\t\u003ccode\u003e{routeInfo.search}\u003c/code\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cdiv\u003e\n" +
		"\t\t\t\u003cspan class=\"label\"\u003epage.state\u003c/span\u003e\n" +
		"\t\t\t\u003cpre\u003e{routeInfo.state}\u003c/pre\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cdiv\u003e\n" +
		"\t\t\t\u003cspan class=\"label\"\u003epage.params\u003c/span\u003e\n" +
		"\t\t\t\u003cpre\u003e{routeInfo.params}\u003c/pre\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch2\u003eNavigate\u003c/h2\u003e\n" +
		"\t\u003cnav class=\"nav\"\u003e\n" +
		"\t\t{#each lessons as link (link.href)}\n" +
		"\t\t\t{#if link.mode === 'hover'}\n" +
		"\t\t\t\t\u003ca href={link.href} data-sveltekit-preload-data=\"hover\"\u003e{link.label}\u003c/a\u003e\n" +
		"\t\t\t{:else}\n" +
		"\t\t\t\t\u003ca href={link.href} data-sveltekit-preload-code=\"viewport\"\u003e{link.label}\u003c/a\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t{/each}\n" +
		"\t\u003c/nav\u003e\n" +
		"\n" +
		"\t\u003cfooter\u003e\n" +
		"\t\t\u003cp\u003e\n" +
		"\t\t\tConcepts composed: routing, layouts, load, form actions, API routes, error\n" +
		"\t\t\thandling, app state, navigation APIs, link options, hooks, shallow routing,\n" +
		"\t\t\tsnapshots, view transitions, rendering modes.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/footer\u003e\n" +
		"\u003c/section\u003e";
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
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
		/* view-transition-class — groups elements so they share a single View Transition animation rule */
		view-transition-class: heading;
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

	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		h1 { max-inline-size: 65ch; }
		h2 { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
	}
	@media (min-width: 1024px) {
		h1 { max-inline-size: 80ch; }
		h2 { max-inline-size: 80ch; }
	}
</style>
