<script lang="ts">
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
</style>
