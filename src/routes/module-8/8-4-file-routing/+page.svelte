<script lang="ts">
	interface RouteEntry {
		path: string;
		url: string;
	}

	interface SpecialFile {
		name: string;
		role: string;
	}

	const routes: RouteEntry[] = [
		{ path: 'src/routes/+page.svelte', url: '/' },
		{ path: 'src/routes/module-1/+page.svelte', url: '/module-1' },
		{ path: 'src/routes/module-8/8-1-what-sveltekit-adds/+page.svelte', url: '/module-8/8-1-what-sveltekit-adds' },
		{ path: 'src/routes/module-8/8-4-file-routing/+page.svelte', url: '/module-8/8-4-file-routing' }
	];

	const specials: SpecialFile[] = [
		{ name: '+page.svelte', role: 'The page component for this route.' },
		{ name: '+page.ts', role: 'Universal load function — runs on server then client.' },
		{ name: '+page.server.ts', role: 'Server-only load and form actions. Safe for secrets.' },
		{ name: '+layout.svelte', role: 'Layout that wraps this folder and all descendants.' },
		{ name: '+layout.ts', role: 'Universal layout load. Data flows down to child pages.' },
		{ name: '+layout.server.ts', role: 'Server-only layout load. Runs once for the whole subtree on nav.' },
		{ name: '+server.ts', role: 'HTTP endpoint. Export GET/POST/PUT/PATCH/DELETE functions.' },
		{ name: '+error.svelte', role: 'Error boundary for this subtree. Receives page.error.' }
	];
</script>

<section class="page">
	<h1>8.4 — File-based routing</h1>
	<p class="concept">
		<strong>Concept.</strong> Every folder under <code>src/routes/</code> maps to a URL.
		<code>+page.svelte</code> is the page itself. <code>+layout.svelte</code> wraps every child.
		<code>+error.svelte</code> handles errors in that subtree. You don't write a route table — the
		file system IS the route table.
	</p>

	<div class="build">
		<h3 class="sub">Route inventory (sampled)</h3>
		<dl class="routes">
			{#each routes as route (route.path)}
				<div class="row">
					<dt><code>{route.path}</code></dt>
					<dd><code>{route.url}</code></dd>
				</div>
			{/each}
		</dl>

		<h3 class="sub">Special file names</h3>
		<dl class="routes">
			{#each specials as s (s.name)}
				<div class="row">
					<dt><code>{s.name}</code></dt>
					<dd>{s.role}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>The filesystem under <code>src/routes/</code> defines every URL.</li>
		<li>Files starting with <code>+</code> are SvelteKit-reserved; other files are just colocated modules.</li>
		<li>Every route can have its own page, layout, load, server load, endpoint, and error boundary.</li>
	</ul>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); color: var(--color-text); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	.sub { margin-block-start: 0; font-size: var(--text-lg); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	.routes { display: flex; flex-direction: column; gap: var(--space-xs); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; }
	dd { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.5; }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.row { display: grid; grid-template-columns: 18rem 1fr; gap: var(--space-md); align-items: start; }
	}
</style>
