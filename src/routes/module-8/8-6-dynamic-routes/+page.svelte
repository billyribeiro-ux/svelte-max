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

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments expose dynamic routing edge cases. Revert each change before the next.</p>
	<ol class="experiments">
		<li><strong>Create both <code>[slug]/+page.svelte</code> and <code>[id]/+page.svelte</code> as siblings in the same folder.</strong> SvelteKit throws a build error about conflicting routes because two single-segment dynamic params at the same level are ambiguous — the router cannot determine which one to match. This proves that param names must be unique per directory level.</li>
		<li><strong>Navigate to a <code>[...rest]</code> route with zero segments (e.g., <code>/docs</code> instead of <code>/docs/something</code>).</strong> The rest parameter is an empty string, not <code>undefined</code>. If your load function splits on <code>/</code> expecting at least one segment, it produces an array with a single empty string, which can cause subtle bugs. Use <code>[[...rest]]</code> (optional rest) if you want the empty case to be truly absent.</li>
		<li><strong>Create a matcher in <code>src/params/</code> that always returns <code>false</code> and use it on a route like <code>[id=always_false]</code>.</strong> Every URL that would match that route now 404s, because the matcher rejects all values. The route exists in the filesystem but is unreachable, demonstrating that matchers act as gatekeepers at the routing layer, not inside load functions.</li>
		<li><strong>Access <code>params.slug</code> without importing from <code>./$types</code> and use it as a number directly.</strong> TypeScript does not warn you that params are always strings. Passing a string param to an API that expects a number silently breaks. Importing the generated types from <code>./$types</code> would have caught this at compile time.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Dynamic routes in SvelteKit use square-bracket syntax in folder names to capture URL segments as parameters. A folder named <code>[slug]</code> matches any single segment and exposes it as <code>params.slug</code> in load functions and page components. Multiple dynamic segments can appear in a single route path, such as <code>[userId]/posts/[postId]</code>, and each one becomes a separate key in the params object. All param values are strings, regardless of whether they look like numbers in the URL.</p>
	<p class="prose">Rest parameters (<code>[...rest]</code>) capture an arbitrary number of path segments as a single slash-delimited string, making them ideal for catch-all routes like documentation trees or CMS paths. Optional parameters (<code>[[param]]</code>) match whether the segment is present or absent, allowing a single route to serve both <code>/shop</code> and <code>/shop/shoes</code>. These two features combine with regular dynamic segments to express complex URL patterns without a centralized route table.</p>
	<p class="prose">Matcher functions in <code>src/params/</code> add validation at the routing layer. A matcher receives the raw param string and returns a boolean; if it returns <code>false</code>, the route does not match and SvelteKit falls through to the next candidate or returns a 404. This pushes input validation upstream from load functions to the router itself, reducing boilerplate and ensuring that invalid params never reach your application logic. The generated types in <code>./$types</code> reflect these constraints, giving you compile-time safety for every parameter.</p>
	<p class="next">Next, you will explore the reactive <code>page</code> object from <code>$app/state</code> and how it tracks navigation in real time.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); color: var(--color-text); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.sub { margin-block-start: 0; font-size: var(--text-lg); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	pre code { background: transparent; padding: 0; font-size: inherit; }
	.examples { display: flex; flex-direction: column; gap: var(--space-sm); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; }
	dd { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.5; display: flex; flex-direction: column; gap: 2px; }
	dd strong { color: var(--color-text); }
	.note { margin: var(--space-xs) 0 0; font-style: italic; }
	.hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.6; }
	@media (min-inline-size: 768px) {
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
	@media (min-inline-size: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
