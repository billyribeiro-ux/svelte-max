<script lang="ts">
	// Computed at module load. On first request, this runs on the server.
	// On client navigation, it runs in the browser (this time in the module's client eval).
	const serverTime: string = new Date().toISOString();

	let browserTime: string = $state('(waiting for hydration...)');

	$effect(() => {
		browserTime = new Date().toISOString();
	});
</script>

<section class="page">
	<h1>8.2 — What SSR actually is</h1>
	<p class="concept">
		<strong>Concept.</strong> Server-Side Rendering means the server receives a request,
		runs the component to produce HTML, and sends the fully-rendered page. The browser sees real
		content on first paint — not a blank <code>&lt;div id="app"&gt;</code>. SSR is SvelteKit's default.
		You can disable per-route with <code>export const ssr = false</code> or prerender at build time with
		<code>export const prerender = true</code>.
	</p>

	<div class="build">
		<h3 class="sub">SSR inspector</h3>
		<dl class="times">
			<div class="row">
				<dt>Module-load time (server during SSR)</dt>
				<dd><code>{serverTime}</code></dd>
			</div>
			<div class="row">
				<dt>Hydration time (browser)</dt>
				<dd><code>{browserTime}</code></dd>
			</div>
		</dl>
		<p class="hint">
			Open DevTools → Network tab, filter to <code>Doc</code>, click the page response, and view
			the Response body — you'll see the full rendered HTML, not a shell. If SSR is working, the
			server time is older than the browser time by exactly the round-trip delay.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>SSR produces real HTML on first paint — good for SEO, perceived speed, and no-JS fallback.</li>
		<li>SvelteKit does SSR by default for every route.</li>
		<li><code>export const ssr = false</code> turns a route into an SPA page.</li>
		<li><code>export const prerender = true</code> renders the route at build time to static HTML.</li>
		<li>Module-level code runs on the server for SSR and again on the client during hydration.</li>
	</ul>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); color: var(--color-text); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	.sub { margin-block-start: 0; }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	.times { display: flex; flex-direction: column; gap: var(--space-sm); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; font-size: var(--text-sm); color: var(--color-text-muted); }
	dd { margin: 0; }
	.hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.6; }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
	}
</style>
