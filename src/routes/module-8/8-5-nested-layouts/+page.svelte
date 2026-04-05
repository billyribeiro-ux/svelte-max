<script lang="ts">
	interface TreeNode {
		label: string;
		note: string;
		children?: TreeNode[];
	}

	const tree: TreeNode = {
		label: 'src/routes/+layout.svelte',
		note: 'Root layout — wraps every page. Holds global nav and imports app.css.',
		children: [
			{
				label: 'src/routes/+page.svelte',
				note: 'Home page, rendered inside root layout.'
			},
			{
				label: 'src/routes/module-8/',
				note: 'No layout file here — module-8 pages render directly inside the root layout.',
				children: [
					{ label: '8-1-what-sveltekit-adds/+page.svelte', note: 'Rendered in root layout.' },
					{ label: '8-5-nested-layouts/+page.svelte', note: 'This lesson.' }
				]
			}
		]
	};
</script>

{#snippet node(n: TreeNode, depth: number)}
	<li style:--depth={depth}>
		<code>{n.label}</code>
		<span class="note">{n.note}</span>
		{#if n.children}
			<ul>
				{#each n.children as child (child.label)}
					{@render node(child, depth + 1)}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<section class="page">
	<h1>8.5 — Nested layouts</h1>
	<p class="concept">
		<strong>Concept.</strong> Layouts are inherited down the tree. Every <code>+layout.svelte</code>
		wraps its siblings and all descendants. A layout at <code>/module-8/+layout.svelte</code> would
		wrap every file under <code>/module-8/</code>. The outer layout's
		<code>{'{@render children()}'}</code> renders the inner layout, which renders the page. Route
		groups with <code>(group)</code> folder names let you share a layout without affecting the URL.
	</p>

	<div class="build">
		<h3 class="sub">This course's layout inheritance</h3>
		<ul class="tree">
			{@render node(tree, 0)}
		</ul>
		<p class="hint">
			You could add <code>src/routes/module-8/+layout.svelte</code> to give Module 8 its own chrome
			(a sidebar with all seven lesson links, say). This course doesn't — it keeps navigation in
			the root layout so every module looks and feels the same.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Every <code>+layout.svelte</code> wraps all descendants via <code>{'{@render children()}'}</code>.</li>
		<li>Layouts compose: root wraps module layout wraps page.</li>
		<li>Route groups <code>(group)/</code> share a layout without adding URL segments.</li>
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
	.tree { list-style: none; padding: 0; margin: 0; }
	.tree ul { list-style: none; padding: 0; margin: 0; border-inline-start: 1px dashed var(--color-border); padding-inline-start: var(--space-md); margin-inline-start: var(--space-xs); }
	.tree li { padding: var(--space-xs) 0; display: flex; flex-direction: column; gap: 2px; }
	.note { color: var(--color-text-muted); font-size: var(--text-xs); line-height: 1.5; }
	.hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.6; }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
	}
</style>
