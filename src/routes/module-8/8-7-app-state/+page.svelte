<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="page">
	<h1>8.7 — $app/state — reactive page state</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>import {'{ page }'} from '$app/state'</code> gives a reactive
		object: <code>page.url</code>, <code>page.params</code>, <code>page.data</code>,
		<code>page.status</code>, <code>page.state</code>, <code>page.error</code>. Reading
		<code>page.url.pathname</code> inside a derived or template makes that read reactive — the
		value updates on navigation without a subscription. This replaces the deprecated
		<code>$page</code> store from kit pre-2.12.
	</p>

	<div class="build">
		<h3 class="sub">Import</h3>
		<pre><code>{"import { page } from '$app/state';"}</code></pre>

		<h3 class="sub">Live page state</h3>
		<dl class="state">
			<div class="row">
				<dt>page.url.pathname</dt>
				<dd><code>{page.url.pathname}</code></dd>
			</div>
			<div class="row">
				<dt>page.url.search</dt>
				<dd><code>{page.url.search || '(empty)'}</code></dd>
			</div>
			<div class="row">
				<dt>page.url.searchParams.get('demo')</dt>
				<dd><code>{page.url.searchParams.get('demo') ?? '(null)'}</code></dd>
			</div>
			<div class="row">
				<dt>page.params</dt>
				<dd><code>{JSON.stringify(page.params)}</code></dd>
			</div>
			<div class="row">
				<dt>page.status</dt>
				<dd><code>{page.status}</code></dd>
			</div>
		</dl>

		<h3 class="sub">Try it</h3>
		<nav class="links">
			<a href="?demo=hello">?demo=hello</a>
			<a href="?demo=world">?demo=world</a>
			<a href="?">clear</a>
		</nav>
		<p class="hint">
			Click a link — the display above updates instantly, no full reload. SvelteKit intercepts the
			navigation, updates <code>page.url</code>, and the template re-reads the new value.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$app/state</code> exposes a reactive <code>page</code> object — no store subscription needed.</li>
		<li>Reading <code>page.url</code> in markup or in a <code>$derived</code> is automatically reactive.</li>
		<li>It replaces the deprecated <code>$page</code> store from <code>$app/stores</code>.</li>
		<li>Use it for pathname-aware nav highlights, query-string state, error pages, and more.</li>
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
	.state { display: flex; flex-direction: column; gap: var(--space-xs); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-text-muted); }
	dd { margin: 0; }
	.links { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
	.links a { padding: var(--space-xs) var(--space-sm); background: var(--color-brand); color: var(--color-surface); border-radius: var(--radius-md); text-decoration: none; font-size: var(--text-sm); transition: background var(--dur-fast) var(--ease-out); }
	.links a:hover { background: var(--color-brand-dim); }
	.hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.6; }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.row { display: grid; grid-template-columns: 18rem 1fr; gap: var(--space-md); align-items: center; }
	}
</style>
