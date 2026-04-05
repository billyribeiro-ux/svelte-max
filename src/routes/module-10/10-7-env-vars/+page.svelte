<script lang="ts">
	const hooksExample = `// src/hooks.server.ts
import { DATABASE_URL, STRIPE_SECRET } from '$env/static/private';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';

// DATABASE_URL and STRIPE_SECRET are compile-time inlined
// into server bundles only. A client import would fail build.
export const handle = async ({ event, resolve }) => {
	event.locals.db = connect(DATABASE_URL);
	event.locals.sentryDsn = PUBLIC_SENTRY_DSN;
	return resolve(event);
};`;
</script>

<section class="page">
	<h1>10.7 — Environment variables</h1>
	<p class="concept">
		<strong>Concept.</strong> SvelteKit exposes env vars through four import paths. The path you
		pick decides <em>when</em> the value is read (build vs runtime) and <em>where</em> it can ship
		(server only vs client-safe). Anything in <code>$env/*/private</code> is rejected at build time
		if a client module imports it — your secrets can't leak by accident.
	</p>

	<div class="build">
		<h3>The four import paths</h3>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th>Import</th>
						<th>When</th>
						<th>Example</th>
						<th>Rules</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>$env/static/private</code></td>
						<td>Build time, server only</td>
						<td><code>DATABASE_URL</code></td>
						<td>Inlined at build; never ships to client.</td>
					</tr>
					<tr>
						<td><code>$env/static/public</code></td>
						<td>Build time, client + server</td>
						<td><code>PUBLIC_SENTRY_DSN</code></td>
						<td>Must be prefixed <code>PUBLIC_</code>. Inlined into both bundles.</td>
					</tr>
					<tr>
						<td><code>$env/dynamic/private</code></td>
						<td>Runtime, server only</td>
						<td><code>FEATURE_FLAG_X</code></td>
						<td>Read per request — good for rotating secrets.</td>
					</tr>
					<tr>
						<td><code>$env/dynamic/public</code></td>
						<td>Runtime, client + server</td>
						<td><code>PUBLIC_API_BASE</code></td>
						<td>Per request; still must be <code>PUBLIC_</code>-prefixed.</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3>Example — <code>hooks.server.ts</code></h3>
		<pre>{hooksExample}</pre>

		<h3>Golden rules</h3>
		<ul>
			<li>Any secret (API key, DB URL, signing key) goes in <code>$env/*/private</code>.</li>
			<li>Prefer <code>static</code> when the value doesn't change between deploys — better tree-shaking.</li>
			<li>Use <code>dynamic</code> when the same build must run in multiple environments.</li>
			<li>Prefix public vars with <code>PUBLIC_</code> or SvelteKit refuses to load them.</li>
			<li>Never read <code>process.env</code> directly — bypasses the build-time safety net.</li>
			<li>Server-only code belongs in <code>*.server.ts</code> or under <code>$lib/server/</code>.</li>
		</ul>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Four env paths = two axes: static/dynamic and private/public.</li>
		<li>SvelteKit enforces the server/client split at build time for you.</li>
		<li><code>PUBLIC_</code> prefix is mandatory for anything exposed to the browser.</li>
		<li><code>$lib/server/</code> and <code>.server.ts</code> make leaks a build error, not a security incident.</li>
	</ul>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	.table-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
	table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
	th, td { text-align: start; padding: var(--space-sm) var(--space-md); border-bottom: 1px solid var(--color-border); vertical-align: top; }
	th { background: var(--color-surface-2); font-weight: 600; color: var(--color-text); }
	td { color: var(--color-text-muted); }
	tr:last-child td { border-bottom: none; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
