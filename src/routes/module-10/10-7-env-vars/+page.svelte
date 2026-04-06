<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const hooksExample = `// src/hooks.server.ts\n" +
		"import { DATABASE_URL, STRIPE_SECRET } from '$env/static/private';\n" +
		"import { PUBLIC_SENTRY_DSN } from '$env/static/public';\n" +
		"\n" +
		"// DATABASE_URL and STRIPE_SECRET are compile-time inlined\n" +
		"// into server bundles only. A client import would fail build.\n" +
		"export const handle = async ({ event, resolve }) =\u003e {\n" +
		"	event.locals.db = connect(DATABASE_URL);\n" +
		"	event.locals.sentryDsn = PUBLIC_SENTRY_DSN;\n" +
		"	return resolve(event);\n" +
		"};`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e10.7 — Environment variables\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e SvelteKit exposes env vars through four import paths. The path you\n" +
		"		pick decides \u003cem\u003ewhen\u003c/em\u003e the value is read (build vs runtime) and \u003cem\u003ewhere\u003c/em\u003e it can ship\n" +
		"		(server only vs client-safe). Anything in \u003ccode\u003e$env/*/private\u003c/code\u003e is rejected at build time\n" +
		"		if a client module imports it — your secrets can't leak by accident.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch3\u003eThe four import paths\u003c/h3\u003e\n" +
		"		\u003cdiv class=\"table-wrap\"\u003e\n" +
		"			\u003ctable\u003e\n" +
		"				\u003cthead\u003e\n" +
		"					\u003ctr\u003e\n" +
		"						\u003cth\u003eImport\u003c/th\u003e\n" +
		"						\u003cth\u003eWhen\u003c/th\u003e\n" +
		"						\u003cth\u003eExample\u003c/th\u003e\n" +
		"						\u003cth\u003eRules\u003c/th\u003e\n" +
		"					\u003c/tr\u003e\n" +
		"				\u003c/thead\u003e\n" +
		"				\u003ctbody\u003e\n" +
		"					\u003ctr\u003e\n" +
		"						\u003ctd\u003e\u003ccode\u003e$env/static/private\u003c/code\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003eBuild time, server only\u003c/td\u003e\n" +
		"						\u003ctd\u003e\u003ccode\u003eDATABASE_URL\u003c/code\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003eInlined at build; never ships to client.\u003c/td\u003e\n" +
		"					\u003c/tr\u003e\n" +
		"					\u003ctr\u003e\n" +
		"						\u003ctd\u003e\u003ccode\u003e$env/static/public\u003c/code\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003eBuild time, client + server\u003c/td\u003e\n" +
		"						\u003ctd\u003e\u003ccode\u003ePUBLIC_SENTRY_DSN\u003c/code\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003eMust be prefixed \u003ccode\u003ePUBLIC_\u003c/code\u003e. Inlined into both bundles.\u003c/td\u003e\n" +
		"					\u003c/tr\u003e\n" +
		"					\u003ctr\u003e\n" +
		"						\u003ctd\u003e\u003ccode\u003e$env/dynamic/private\u003c/code\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003eRuntime, server only\u003c/td\u003e\n" +
		"						\u003ctd\u003e\u003ccode\u003eFEATURE_FLAG_X\u003c/code\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003eRead per request — good for rotating secrets.\u003c/td\u003e\n" +
		"					\u003c/tr\u003e\n" +
		"					\u003ctr\u003e\n" +
		"						\u003ctd\u003e\u003ccode\u003e$env/dynamic/public\u003c/code\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003eRuntime, client + server\u003c/td\u003e\n" +
		"						\u003ctd\u003e\u003ccode\u003ePUBLIC_API_BASE\u003c/code\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003ePer request; still must be \u003ccode\u003ePUBLIC_\u003c/code\u003e-prefixed.\u003c/td\u003e\n" +
		"					\u003c/tr\u003e\n" +
		"				\u003c/tbody\u003e\n" +
		"			\u003c/table\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ch3\u003eExample — \u003ccode\u003ehooks.server.ts\u003c/code\u003e\u003c/h3\u003e\n" +
		"		\u003cpre\u003e{hooksExample}\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch3\u003eGolden rules\u003c/h3\u003e\n" +
		"		\u003cul\u003e\n" +
		"			\u003cli\u003eAny secret (API key, DB URL, signing key) goes in \u003ccode\u003e$env/*/private\u003c/code\u003e.\u003c/li\u003e\n" +
		"			\u003cli\u003ePrefer \u003ccode\u003estatic\u003c/code\u003e when the value doesn't change between deploys — better tree-shaking.\u003c/li\u003e\n" +
		"			\u003cli\u003eUse \u003ccode\u003edynamic\u003c/code\u003e when the same build must run in multiple environments.\u003c/li\u003e\n" +
		"			\u003cli\u003ePrefix public vars with \u003ccode\u003ePUBLIC_\u003c/code\u003e or SvelteKit refuses to load them.\u003c/li\u003e\n" +
		"			\u003cli\u003eNever read \u003ccode\u003eprocess.env\u003c/code\u003e directly — bypasses the build-time safety net.\u003c/li\u003e\n" +
		"			\u003cli\u003eServer-only code belongs in \u003ccode\u003e*.server.ts\u003c/code\u003e or under \u003ccode\u003e$lib/server/\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eFour env paths = two axes: static/dynamic and private/public.\u003c/li\u003e\n" +
		"		\u003cli\u003eSvelteKit enforces the server/client split at build time for you.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003ePUBLIC_\u003c/code\u003e prefix is mandatory for anything exposed to the browser.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$lib/server/\u003c/code\u003e and \u003ccode\u003e.server.ts\u003c/code\u003e make leaks a build error, not a security incident.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Import <code>DATABASE_URL</code> from <code>$env/static/private</code> in a <code>+page.svelte</code> component.</strong> The build fails immediately with an error telling you that private env vars cannot be imported into client-side code, proving the compile-time guard works.</li>
		<li><strong>Create a public env var without the <code>PUBLIC_</code> prefix and import it from <code>$env/static/public</code>.</strong> SvelteKit refuses to expose it because the prefix is mandatory for client-safe variables, so the import resolves to <code>undefined</code>.</li>
		<li><strong>Read <code>process.env.DATABASE_URL</code> directly instead of using the <code>$env</code> modules.</strong> It may work in Node but bypasses SvelteKit's safety net entirely, so there is no build-time check preventing you from accidentally shipping the value to the client.</li>
		<li><strong>Use <code>$env/static/private</code> in a file that is not <code>.server.ts</code> or under <code>$lib/server/</code>.</strong> If that file is ever imported by a client module, the build breaks, showing that the file naming convention is your first line of defence.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit's environment variable system is organised along two axes: <em>when</em> the value is read (static at build time vs dynamic at request time) and <em>where</em> the value can ship (private server-only vs public client-safe). These four combinations map to four import paths, and the compiler enforces the boundaries so a mistake becomes a build error rather than a leaked secret.</p>
	<p class="prose">Static imports are inlined at build time, which means the bundler can tree-shake unreachable branches and dead-code-eliminate based on the value. Dynamic imports read from the environment at request time, making them ideal for feature flags, rotating secrets, or deployments where a single build runs in multiple environments.</p>
	<p class="prose">The <code>PUBLIC_</code> prefix is not a convention but a hard requirement: SvelteKit will not expose a variable to the browser unless its name starts with <code>PUBLIC_</code>. Combined with the <code>.server.ts</code> file convention and the <code>$lib/server/</code> directory, this gives you three layers of protection against accidentally shipping sensitive data to the client.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-10/10-8-auth">10.8 — Cookie-based authentication</a> — implement sessions with httpOnly cookies.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	.table-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
	table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
	th, td { text-align: start; padding: var(--space-sm) var(--space-md); border-bottom: 1px solid var(--color-border); vertical-align: top; }
	th { background: var(--color-surface-2); font-weight: 600; color: var(--color-text); }
	td { color: var(--color-text-muted); }
	tr:last-child td { border-bottom: none; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }


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

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
