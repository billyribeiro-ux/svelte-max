<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface TreeNode {\n" +
		"\t\tlabel: string;\n" +
		"\t\tnote: string;\n" +
		"\t\tchildren?: TreeNode[];\n" +
		"\t}\n" +
		"\n" +
		"\tconst tree: TreeNode = {\n" +
		"\t\tlabel: 'src/routes/+layout.svelte',\n" +
		"\t\tnote: 'Root layout — wraps every page. Holds global nav and imports app.css.',\n" +
		"\t\tchildren: [\n" +
		"\t\t\t{\n" +
		"\t\t\t\tlabel: 'src/routes/+page.svelte',\n" +
		"\t\t\t\tnote: 'Home page, rendered inside root layout.'\n" +
		"\t\t\t},\n" +
		"\t\t\t{\n" +
		"\t\t\t\tlabel: 'src/routes/module-8/',\n" +
		"\t\t\t\tnote: 'No layout file here — module-8 pages render directly inside the root layout.',\n" +
		"\t\t\t\tchildren: [\n" +
		"\t\t\t\t\t{ label: '8-1-what-sveltekit-adds/+page.svelte', note: 'Rendered in root layout.' },\n" +
		"\t\t\t\t\t{ label: '8-5-nested-layouts/+page.svelte', note: 'This lesson.' }\n" +
		"\t\t\t\t]\n" +
		"\t\t\t}\n" +
		"\t\t]\n" +
		"\t};\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"{#snippet node(n: TreeNode, depth: number)}\n" +
		"\t\u003cli style:--depth={depth}\u003e\n" +
		"\t\t\u003ccode\u003e{n.label}\u003c/code\u003e\n" +
		"\t\t\u003cspan class=\"note\"\u003e{n.note}\u003c/span\u003e\n" +
		"\t\t{#if n.children}\n" +
		"\t\t\t\u003cul\u003e\n" +
		"\t\t\t\t{#each n.children as child (child.label)}\n" +
		"\t\t\t\t\t{@render node(child, depth + 1)}\n" +
		"\t\t\t\t{/each}\n" +
		"\t\t\t\u003c/ul\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/li\u003e\n" +
		"{/snippet}\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.5 — Nested layouts\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Layouts are inherited down the tree. Every \u003ccode\u003e+layout.svelte\u003c/code\u003e\n" +
		"\t\twraps its siblings and all descendants. A layout at \u003ccode\u003e/module-8/+layout.svelte\u003c/code\u003e would\n" +
		"\t\twrap every file under \u003ccode\u003e/module-8/\u003c/code\u003e. The outer layout's\n" +
		"\t\t\u003ccode\u003e{'{@render children()}'}\u003c/code\u003e renders the inner layout, which renders the page. Route\n" +
		"\t\tgroups with \u003ccode\u003e(group)\u003c/code\u003e folder names let you share a layout without affecting the URL.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eThis course's layout inheritance\u003c/h3\u003e\n" +
		"\t\t\u003cul class=\"tree\"\u003e\n" +
		"\t\t\t{@render node(tree, 0)}\n" +
		"\t\t\u003c/ul\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tYou could add \u003ccode\u003esrc/routes/module-8/+layout.svelte\u003c/code\u003e to give Module 8 its own chrome\n" +
		"\t\t\t(a sidebar with all seven lesson links, say). This course doesn't — it keeps navigation in\n" +
		"\t\t\tthe root layout so every module looks and feels the same.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eEvery \u003ccode\u003e+layout.svelte\u003c/code\u003e wraps all descendants via \u003ccode\u003e{'{@render children()}'}\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eLayouts compose: root wraps module layout wraps page.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRoute groups \u003ccode\u003e(group)/\u003c/code\u003e share a layout without adding URL segments.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
