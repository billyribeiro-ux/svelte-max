<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Example {
		folder: string;
		url: string;
		params: string;
		note: string;
	}

	const examples: Example[] = [
		{
			folder: 'src/routes/blog/[slug]/+page.svelte',
			url: '/blog/hello-world',
			params: "params.slug === 'hello-world'",
			note: 'Simple single-segment dynamic param.'
		},
		{
			folder: 'src/routes/users/[id]/posts/[postId]/+page.svelte',
			url: '/users/42/posts/7',
			params: "params.id === '42', params.postId === '7'",
			note: 'Multiple params on one route.'
		},
		{
			folder: 'src/routes/docs/[...path]/+page.svelte',
			url: '/docs/a/b/c',
			params: "params.path === 'a/b/c'",
			note: 'Rest parameter captures any number of segments.'
		},
		{
			folder: 'src/routes/shop/[[category]]/+page.svelte',
			url: '/shop  OR  /shop/shoes',
			params: "params.category is undefined | 'shoes'",
			note: 'Optional parameter — route matches with or without it.'
		},
		{
			folder: 'src/routes/[lang=locale]/+page.svelte',
			url: '/en  OR  /fr',
			params: "params.lang validated by src/params/locale.ts",
			note: 'Matcher function constrains which values are valid.'
		}
	];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Example {\n" +
		"\t\tfolder: string;\n" +
		"\t\turl: string;\n" +
		"\t\tparams: string;\n" +
		"\t\tnote: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst examples: Example[] = [\n" +
		"\t\t{\n" +
		"\t\t\tfolder: 'src/routes/blog/[slug]/+page.svelte',\n" +
		"\t\t\turl: '/blog/hello-world',\n" +
		"\t\t\tparams: \"params.slug === 'hello-world'\",\n" +
		"\t\t\tnote: 'Simple single-segment dynamic param.'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tfolder: 'src/routes/users/[id]/posts/[postId]/+page.svelte',\n" +
		"\t\t\turl: '/users/42/posts/7',\n" +
		"\t\t\tparams: \"params.id === '42', params.postId === '7'\",\n" +
		"\t\t\tnote: 'Multiple params on one route.'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tfolder: 'src/routes/docs/[...path]/+page.svelte',\n" +
		"\t\t\turl: '/docs/a/b/c',\n" +
		"\t\t\tparams: \"params.path === 'a/b/c'\",\n" +
		"\t\t\tnote: 'Rest parameter captures any number of segments.'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tfolder: 'src/routes/shop/[[category]]/+page.svelte',\n" +
		"\t\t\turl: '/shop  OR  /shop/shoes',\n" +
		"\t\t\tparams: \"params.category is undefined | 'shoes'\",\n" +
		"\t\t\tnote: 'Optional parameter — route matches with or without it.'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tfolder: 'src/routes/[lang=locale]/+page.svelte',\n" +
		"\t\t\turl: '/en  OR  /fr',\n" +
		"\t\t\tparams: \"params.lang validated by src/params/locale.ts\",\n" +
		"\t\t\tnote: 'Matcher function constrains which values are valid.'\n" +
		"\t\t}\n" +
		"\t];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.6 — Dynamic routes\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003e[slug]\u003c/code\u003e in a folder name becomes a URL parameter.\n" +
		"\t\t\u003ccode\u003e[slug]/+page.svelte\u003c/code\u003e matches \u003ccode\u003e/anything\u003c/code\u003e and exposes \u003ccode\u003eanything\u003c/code\u003e\n" +
		"\t\tas \u003ccode\u003epage.params.slug\u003c/code\u003e. \u003ccode\u003e[...rest]\u003c/code\u003e is a rest param capturing multiple\n" +
		"\t\tsegments. \u003ccode\u003e[[optional]]\u003c/code\u003e is optional. Matcher functions in \u003ccode\u003esrc/params/\u003c/code\u003e\n" +
		"\t\tcan validate shapes. Param types are auto-generated per route in \u003ccode\u003e$types\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eSyntax reference\u003c/h3\u003e\n" +
		"\t\t\u003cpre\u003e\u003ccode\u003e{`[slug]           single dynamic segment     →  params.slug\n" +
		"[...rest]        rest parameter (multi)     →  params.rest (string with slashes)\n" +
		"[[optional]]     optional segment           →  params.optional (string | undefined)\n" +
		"[[...all]]       optional rest              →  params.all (string | undefined)\n" +
		"[id=integer]     matcher-constrained param  →  validated by src/params/integer.ts`}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eExamples\u003c/h3\u003e\n" +
		"\t\t\u003cdl class=\"examples\"\u003e\n" +
		"\t\t\t{#each examples as ex (ex.folder)}\n" +
		"\t\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\t\u003cdt\u003e\u003ccode\u003e{ex.folder}\u003c/code\u003e\u003c/dt\u003e\n" +
		"\t\t\t\t\t\u003cdd\u003e\n" +
		"\t\t\t\t\t\t\u003cdiv\u003e\u003cstrong\u003eURL:\u003c/strong\u003e \u003ccode\u003e{ex.url}\u003c/code\u003e\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\u003cdiv\u003e\u003cstrong\u003eParams:\u003c/strong\u003e \u003ccode\u003e{ex.params}\u003c/code\u003e\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\u003cp class=\"note\"\u003e{ex.note}\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003c/dd\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/dl\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tThe Module 8 project builds an actual dynamic route. This lesson is just the reference —\n" +
		"\t\t\tread the syntax, then see it in action in the project.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eMatcher function example\u003c/h3\u003e\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cpre\u003e\u003ccode\u003e{`// src/params/integer.ts\n" +
		"export function match(param: string): boolean {\n" +
		"  return /^\\\\d+$/.test(param);\n" +
		"}`}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tUse matchers in route folders: \u003ccode\u003e[id=integer]\u003c/code\u003e — SvelteKit only matches if the param\n" +
		"\t\t\tpasses the matcher. If it doesn't match, SvelteKit falls through to the next route or returns a 404.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eSquare brackets in folder names create dynamic URL parameters.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e[...rest]\u003c/code\u003e captures multi-segment paths as a single string.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e[[optional]]\u003c/code\u003e makes the segment optional.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eMatchers in \u003ccode\u003esrc/params/\u003c/code\u003e validate param shape at the routing layer.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eTypes for params are auto-generated per route — import from \u003ccode\u003e./$types\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.6 — Dynamic routes</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>[slug]</code> in a folder name becomes a URL parameter.
		<code>[slug]/+page.svelte</code> matches <code>/anything</code> and exposes <code>anything</code>
		as <code>page.params.slug</code>. <code>[...rest]</code> is a rest param capturing multiple
		segments. <code>[[optional]]</code> is optional. Matcher functions in <code>src/params/</code>
		can validate shapes. Param types are auto-generated per route in <code>$types</code>.
	</p>

	<div class="build">
		<h3 class="sub">Syntax reference</h3>
		<pre><code>{`[slug]           single dynamic segment     →  params.slug
[...rest]        rest parameter (multi)     →  params.rest (string with slashes)
[[optional]]     optional segment           →  params.optional (string | undefined)
[[...all]]       optional rest              →  params.all (string | undefined)
[id=integer]     matcher-constrained param  →  validated by src/params/integer.ts`}</code></pre>

		<h3 class="sub">Examples</h3>
		<dl class="examples">
			{#each examples as ex (ex.folder)}
				<div class="row">
					<dt><code>{ex.folder}</code></dt>
					<dd>
						<div><strong>URL:</strong> <code>{ex.url}</code></div>
						<div><strong>Params:</strong> <code>{ex.params}</code></div>
						<p class="note">{ex.note}</p>
					</dd>
				</div>
			{/each}
		</dl>

		<p class="hint">
			The Module 8 project builds an actual dynamic route. This lesson is just the reference —
			read the syntax, then see it in action in the project.
		</p>
	</div>

	<h3>Matcher function example</h3>
	<div class="build">
		<pre><code>{`// src/params/integer.ts
export function match(param: string): boolean {
  return /^\\d+$/.test(param);
}`}</code></pre>
		<p class="hint">
			Use matchers in route folders: <code>[id=integer]</code> — SvelteKit only matches if the param
			passes the matcher. If it doesn't match, SvelteKit falls through to the next route or returns a 404.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Square brackets in folder names create dynamic URL parameters.</li>
		<li><code>[...rest]</code> captures multi-segment paths as a single string.</li>
		<li><code>[[optional]]</code> makes the segment optional.</li>
		<li>Matchers in <code>src/params/</code> validate param shape at the routing layer.</li>
		<li>Types for params are auto-generated per route — import from <code>./$types</code>.</li>
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
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	pre code { background: transparent; padding: 0; font-size: inherit; }
	.examples { display: flex; flex-direction: column; gap: var(--space-sm); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; }
	dd { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.5; display: flex; flex-direction: column; gap: 2px; }
	dd strong { color: var(--color-text); }
	.note { margin: var(--space-xs) 0 0; font-style: italic; }
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
