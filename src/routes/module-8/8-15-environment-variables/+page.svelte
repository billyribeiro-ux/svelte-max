<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── CodeCanvas examples ── */
	const exampleStaticPrivate =
		"// src/routes/api/weather/+server.ts\n" +
		"import { WEATHER_API_KEY } from '$env/static/private';\n" +
		"import { json } from '@sveltejs/kit';\n" +
		"\n" +
		"export async function GET() {\n" +
		"  // WEATHER_API_KEY is inlined at build time.\n" +
		"  // This string literal never appears in client bundles.\n" +
		"  const res = await fetch(\n" +
		"    `https://api.weather.com/v1/forecast?key=${WEATHER_API_KEY}`\n" +
		"  );\n" +
		"  const data = await res.json();\n" +
		"  return json(data);\n" +
		"}\n" +
		"\n" +
		"// The bundler literally replaces WEATHER_API_KEY with the string value:\n" +
		"// `https://api.weather.com/v1/forecast?key=sk_abc123...`\n" +
		"// This enables dead code elimination — if a branch checks\n" +
		"// the key and it's always truthy, the else branch is removed.";

	const exampleStaticPublic =
		"// src/routes/+page.svelte\n" +
		"\u003cscript lang=\"ts\">\n" +
		"  import { PUBLIC_SITE_URL } from '$env/static/public';\n" +
		"  import { PUBLIC_SENTRY_DSN } from '$env/static/public';\n" +
		"  import { PUBLIC_GA_ID } from '$env/static/public';\n" +
		"\n" +
		"  // These values are safe to ship to the browser.\n" +
		"  // They are inlined at build time into BOTH server and client bundles.\n" +
		"  // The PUBLIC_ prefix is mandatory — without it, SvelteKit refuses\n" +
		"  // to expose the variable.\n" +
		"\u003c/script>\n" +
		"\n" +
		"<a href={PUBLIC_SITE_URL}>Visit our site</a>\n" +
		"\n" +
		"<!-- In your app.html or hooks: -->\n" +
		"<!-- \u003cscript src=\"https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA_ID}\"> -->";

	const exampleDynamicPrivate =
		"// src/routes/api/feature/+server.ts\n" +
		"import { env } from '$env/dynamic/private';\n" +
		"import { json } from '@sveltejs/kit';\n" +
		"\n" +
		"export async function GET() {\n" +
		"  // env.FEATURE_FLAG_NEW_CHECKOUT is read at REQUEST TIME,\n" +
		"  // not build time. Change it without rebuilding.\n" +
		"  const useNewCheckout = env.FEATURE_FLAG_NEW_CHECKOUT === 'true';\n" +
		"\n" +
		"  return json({\n" +
		"    checkout: useNewCheckout ? 'v2' : 'v1',\n" +
		"    // env also exposes the variable name for debugging\n" +
		"    dbHost: env.DATABASE_HOST // reads current process env\n" +
		"  });\n" +
		"}\n" +
		"\n" +
		"// Perfect for:\n" +
		"// - Feature flags you toggle without redeploying\n" +
		"// - Rotating secrets (new DB password every 24h)\n" +
		"// - One build deployed to staging + production with different env";

	const exampleDynamicPublic =
		"// src/routes/+page.svelte\n" +
		"\u003cscript lang=\"ts\">\n" +
		"  import { env } from '$env/dynamic/public';\n" +
		"\n" +
		"  // Read at runtime, available in both server and client.\n" +
		"  // Must still be prefixed with PUBLIC_.\n" +
		"  // Unlike static, these values can change between requests\n" +
		"  // without rebuilding the app.\n" +
		"  const apiBase = env.PUBLIC_API_BASE;\n" +
		"  const maintenanceMode = env.PUBLIC_MAINTENANCE === 'true';\n" +
		"\u003c/script>\n" +
		"\n" +
		"{#if maintenanceMode}\n" +
		"  <div class=\"banner\">We're performing scheduled maintenance.</div>\n" +
		"{/if}\n" +
		"\n" +
		"<!-- Use case: A/B test variant, maintenance banners,\n" +
		"     API base URL that differs per deployment region -->";

	const exampleDotEnv =
		"# .env — default values (committed to git for non-secrets)\n" +
		"# This file is loaded by Vite automatically.\n" +
		"PUBLIC_SITE_URL=http://localhost:5173\n" +
		"PUBLIC_GA_ID=G-XXXXXXXXXX\n" +
		"PUBLIC_SENTRY_DSN=https://abc@sentry.io/123\n" +
		"\n" +
		"# Private vars (server only) — default/placeholder values\n" +
		"DATABASE_URL=postgresql://localhost:5432/myapp_dev\n" +
		"STRIPE_SECRET=sk_test_placeholder\n" +
		"WEATHER_API_KEY=dev_key_placeholder\n" +
		"\n" +
		"# ─────────────────────────────────────────────\n" +
		"# .env.local — local overrides (gitignored, for real secrets)\n" +
		"# This file overrides values from .env\n" +
		"DATABASE_URL=postgresql://user:realpassword@db.example.com:5432/myapp\n" +
		"STRIPE_SECRET=sk_live_real_secret_key\n" +
		"WEATHER_API_KEY=real_api_key_here\n" +
		"\n" +
		"# ─────────────────────────────────────────────\n" +
		"# .env.production — production-specific defaults\n" +
		"PUBLIC_SITE_URL=https://myapp.com\n" +
		"PUBLIC_GA_ID=G-PRODUCTION123\n" +
		"\n" +
		"# ─────────────────────────────────────────────\n" +
		"# .env.development — development-specific defaults\n" +
		"PUBLIC_SITE_URL=http://localhost:5173\n" +
		"DATABASE_URL=postgresql://localhost:5432/myapp_dev";

	const exampleLoadFunction =
		"// src/routes/dashboard/+page.server.ts\n" +
		"import { API_KEY, DATABASE_URL } from '$env/static/private';\n" +
		"import { PUBLIC_SITE_URL } from '$env/static/public';\n" +
		"\n" +
		"export async function load() {\n" +
		"  // API_KEY and DATABASE_URL are server-only.\n" +
		"  // They're used here but NEVER returned to the client.\n" +
		"  const db = connectToDatabase(DATABASE_URL);\n" +
		"  const users = await db.query('SELECT * FROM users LIMIT 10');\n" +
		"\n" +
		"  // Only return serializable, non-secret data\n" +
		"  return {\n" +
		"    users: users.map(u => ({ id: u.id, name: u.name })),\n" +
		"    siteUrl: PUBLIC_SITE_URL // safe to return — it's public\n" +
		"  };\n" +
		"}\n" +
		"\n" +
		"// WRONG — never do this:\n" +
		"// return { apiKey: API_KEY };\n" +
		"// Even though the import is server-only, returning it\n" +
		"// in the load data sends it to the client via __data.json.";

	const exampleHooks =
		"// src/hooks.server.ts\n" +
		"import { DATABASE_URL } from '$env/static/private';\n" +
		"import type { Handle } from '@sveltejs/kit';\n" +
		"\n" +
		"// Initialize once at server startup\n" +
		"const db = createPool(DATABASE_URL);\n" +
		"\n" +
		"export const handle: Handle = async ({ event, resolve }) => {\n" +
		"  // Attach the db pool to every request via event.locals\n" +
		"  event.locals.db = db;\n" +
		"\n" +
		"  // All +page.server.ts and +server.ts files can now access\n" +
		"  // event.locals.db without importing the env var themselves.\n" +
		"  return resolve(event);\n" +
		"};\n" +
		"\n" +
		"// Override from CLI:\n" +
		"// DATABASE_URL=\"postgres://prod@db:5432/app\" pnpm dev\n" +
		"// Shell env vars override .env files.";

	const exampleClientError =
		"// This code WILL NOT BUILD.\n" +
		"// src/routes/+page.svelte (a CLIENT component)\n" +
		"\u003cscript lang=\"ts\">\n" +
		"  // ERROR: Cannot import $env/static/private into client-side code\n" +
		"  import { DATABASE_URL } from '$env/static/private';\n" +
		"  //       ~~~~~~~~~~~~\n" +
		"  // Build error:\n" +
		"  // \"Cannot import $env/static/private into client-side code\"\n" +
		"  //\n" +
		"  // This is SvelteKit's compile-time guard.\n" +
		"  // It prevents secrets from ever reaching the browser bundle.\n" +
		"  // The build fails BEFORE any code ships.\n" +
		"\u003c/script>\n" +
		"\n" +
		"<!-- Same error for $env/dynamic/private in client code.\n" +
		"     Private = server only. Always. -->";


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\">\n" +
		"  import CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"\n" +
		"  // This lesson is conceptual — no interactive state needed.\n" +
		"  // All examples are shown via CodeCanvas.\n" +
		"\u003c/script>\n" +
		"\n" +
		"<section class=\"page\">\n" +
		"  <h1>8.15 — Environment Variables</h1>\n" +
		"\n" +
		"  <p class=\"prose\">\n" +
		"    SvelteKit provides four import paths for environment variables, organized\n" +
		"    along two axes: when the value is read (build time vs runtime) and where\n" +
		"    it can ship (server only vs client safe). The compiler enforces the\n" +
		"    boundaries so a mistake becomes a build error, not a leaked secret.\n" +
		"  </p>\n" +
		"\n" +
		"  <h2>The four $env modules</h2>\n" +
		"  <div class=\"build\">\n" +
		"    <table>...</table>\n" +
		"  </div>\n" +
		"\n" +
		"  <h2>.env files</h2>\n" +
		"  <p class=\"prose\">Vite loads .env files automatically.</p>\n" +
		"\n" +
		"  <h2>Static vs Dynamic</h2>\n" +
		"  <p class=\"prose\">Static = inlined at build. Dynamic = read per request.</p>\n" +
		"\n" +
		"  <h2>Private vs Public</h2>\n" +
		"  <p class=\"prose\">Private = server only. Public = must start with PUBLIC_.</p>\n" +
		"\n" +
		"  <h2>Using in practice</h2>\n" +
		"  <p class=\"prose\">In load functions, hooks, and API routes.</p>\n" +
		"</section>";
</script>

<section class="page">
	<h1>8.15 — Environment Variables</h1>

	<p class="prose">
		Every real application needs configuration that varies between environments:
		database URLs, API keys, analytics IDs, feature flags. Hardcoding these values
		is a security risk and makes deployment inflexible. SvelteKit provides a
		first-class system for environment variables that enforces security boundaries
		at the compiler level — a mistake becomes a build error, not a leaked secret.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 1 — THE FOUR $env MODULES
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 1 — The four $env modules</h2>

	<p class="prose">
		SvelteKit organizes environment variables along two axes: <em>when</em> the value
		is read (build time vs runtime) and <em>where</em> it can be used (server only vs
		client safe). These two axes create four import paths. Choosing the right one is
		the most important decision you make when working with env vars.
	</p>

	<div class="build">
		<h3>Mental model</h3>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Build time (static)</th>
						<th>Runtime (dynamic)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><strong>Private (server only)</strong></td>
						<td><code>$env/static/private</code></td>
						<td><code>$env/dynamic/private</code></td>
					</tr>
					<tr>
						<td><strong>Public (client ok)</strong></td>
						<td><code>$env/static/public</code></td>
						<td><code>$env/dynamic/public</code></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="key-point">
			<strong>Key insight:</strong> The axis you choose first should always be
			<em>private vs public</em>. If the value is a secret, it must be private —
			end of discussion. Then decide static vs dynamic based on whether the value
			changes between deployments or between requests.
		</div>
	</div>

	<div class="build">
		<h3><code>$env/static/private</code> — build time, server only</h3>
		<p class="note">
			Values are replaced with string literals at build time. The bundler can
			tree-shake and dead-code-eliminate based on these values. Importing this
			module in client code causes a build error.
		</p>
		<CodeCanvas filename="+server.ts" code={exampleStaticPrivate} />
	</div>

	<div class="build">
		<h3><code>$env/static/public</code> — build time, client + server</h3>
		<p class="note">
			Values are inlined into both server and client bundles at build time.
			Every variable must be prefixed with <code>PUBLIC_</code> — SvelteKit
			refuses to expose variables without this prefix.
		</p>
		<CodeCanvas filename="+page.svelte" code={exampleStaticPublic} />
	</div>

	<div class="build">
		<h3><code>$env/dynamic/private</code> — runtime, server only</h3>
		<p class="note">
			Values are read from the process environment at request time, not build time.
			The same built artifact can run in different environments with different values.
			Still server-only — importing in client code is a build error.
		</p>
		<CodeCanvas filename="+server.ts" code={exampleDynamicPrivate} />
	</div>

	<div class="build">
		<h3><code>$env/dynamic/public</code> — runtime, client + server</h3>
		<p class="note">
			Read at runtime, available in both server and client code. Must still use
			the <code>PUBLIC_</code> prefix. Ideal for values that change per deployment
			region or per request without rebuilding.
		</p>
		<CodeCanvas filename="+page.svelte" code={exampleDynamicPublic} />
	</div>


	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 2 — .env FILES
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 2 — .env files</h2>

	<p class="prose">
		Vite automatically loads <code>.env</code> files from your project root. The
		loading order matters: more specific files override less specific ones, and
		<code>.local</code> files are always gitignored. This gives you a clean
		separation between committed defaults and local secrets.
	</p>

	<div class="build">
		<CodeCanvas filename=".env files" code={exampleDotEnv} />
		<h3>Loading priority (highest wins)</h3>
		<ol>
			<li><strong>Shell environment variables</strong> — <code>MY_VAR="x" pnpm dev</code> always wins</li>
			<li><strong><code>.env.production.local</code></strong> — production + local (gitignored)</li>
			<li><strong><code>.env.production</code></strong> — production-specific defaults</li>
			<li><strong><code>.env.local</code></strong> — local overrides (gitignored)</li>
			<li><strong><code>.env</code></strong> — shared defaults (committed to git)</li>
		</ol>
		<div class="key-point">
			<strong>Rule of thumb:</strong> Commit <code>.env</code> with placeholder/default
			values so your team knows which variables exist. Put real secrets in
			<code>.env.local</code> (gitignored) or your deployment platform's secret management.
			Never commit real API keys or database passwords.
		</div>
	</div>


	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 3 — STATIC VS DYNAMIC
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 3 — Static vs Dynamic</h2>

	<p class="prose">
		The static/dynamic distinction is about <em>when</em> the value is resolved.
		Static values are replaced with string literals during the build process — they
		become part of your compiled JavaScript. Dynamic values are read from the
		running process environment on every request.
	</p>

	<div class="build">
		<h3>When to use static</h3>
		<ul>
			<li><strong>API keys that don't rotate</strong> — e.g., a Stripe publishable key, Sentry DSN</li>
			<li><strong>Database URLs that are fixed per deployment</strong> — build once, deploy once</li>
			<li><strong>Feature flags resolved at build time</strong> — enables dead code elimination: if <code>FEATURE_X === 'false'</code>, the bundler removes the entire code branch</li>
			<li><strong>Any value that won't change until the next deploy</strong></li>
		</ul>

		<h3>When to use dynamic</h3>
		<ul>
			<li><strong>Rotating secrets</strong> — database passwords that change every 24 hours</li>
			<li><strong>Feature flags toggled without redeploying</strong> — flip a flag in your environment, and the next request picks it up</li>
			<li><strong>One build, multiple environments</strong> — the same Docker image runs in staging and production with different env vars</li>
			<li><strong>Per-region configuration</strong> — different CDN URLs or API endpoints per data center</li>
		</ul>

		<div class="key-point">
			<strong>Performance note:</strong> Static imports enable the bundler to inline the
			value and eliminate dead code. Dynamic imports add a tiny runtime cost per access.
			For most apps, this difference is negligible — choose based on deployment needs,
			not performance.
		</div>
	</div>


	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 4 — PRIVATE VS PUBLIC
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 4 — Private vs Public</h2>

	<p class="prose">
		This is the security boundary. Private variables are server-only — they can only
		be imported in files that run exclusively on the server (<code>+page.server.ts</code>,
		<code>+server.ts</code>, <code>hooks.server.ts</code>, or anything under
		<code>$lib/server/</code>). Importing a private variable in client-accessible code
		causes an immediate build error. This is not a convention — it is a hard compiler
		enforcement.
	</p>

	<div class="build">
		<h3>The build error you want to see</h3>
		<CodeCanvas filename="+page.svelte (THIS FAILS)" code={exampleClientError} />
		<p class="note">
			This error is your friend. It means the compiler caught a potential secret leak
			before any code shipped to production. Without SvelteKit's <code>$env</code>
			system, you might accidentally expose a database URL in a client bundle and
			never know until a security audit — or an attacker — finds it.
		</p>
	</div>

	<div class="build">
		<h3>The <code>PUBLIC_</code> prefix requirement</h3>
		<ul>
			<li>Any variable imported from <code>$env/*/public</code> <strong>must</strong> start with <code>PUBLIC_</code></li>
			<li>If you define <code>SITE_URL</code> in your <code>.env</code> and try to import it from <code>$env/static/public</code>, it resolves to <code>undefined</code></li>
			<li>The prefix is an explicit opt-in: you are consciously deciding "this value is safe for the browser to see"</li>
			<li>You can customize the prefix in <code>svelte.config.js</code> via <code>kit.env.publicPrefix</code>, but the default <code>PUBLIC_</code> is strongly recommended</li>
		</ul>
	</div>


	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 5 — USING IN PRACTICE
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 5 — Using in practice</h2>

	<p class="prose">
		Now that you understand the four modules and the .env file system, here is how
		you use them in real SvelteKit code. The patterns below cover the three most
		common locations: load functions, hooks, and API routes.
	</p>

	<div class="build">
		<h3>In <code>+page.server.ts</code> load functions</h3>
		<CodeCanvas filename="+page.server.ts" code={exampleLoadFunction} />
		<div class="key-point">
			<strong>Security warning:</strong> Even though <code>+page.server.ts</code> runs
			on the server, its <code>load</code> function returns data that is serialized
			and sent to the client as JSON. Never return secret values in the load data.
			Use secrets for server-side operations (database queries, API calls) and only
			return the <em>results</em>.
		</div>
	</div>

	<div class="build">
		<h3>In <code>hooks.server.ts</code></h3>
		<CodeCanvas filename="hooks.server.ts" code={exampleHooks} />
		<p class="note">
			Hooks run on every request and are a natural place to initialize shared resources
			like database pools. Attach them to <code>event.locals</code> so every route
			handler can access them without importing the env var directly.
		</p>
	</div>

	<div class="build">
		<h3>Override from the command line</h3>
		<pre>{'# Shell env vars override .env files\n' +
'DATABASE_URL="postgres://prod@db:5432/app" pnpm dev\n' +
'\n' +
'# Or export for the entire shell session\n' +
'export FEATURE_FLAG_NEW_CHECKOUT=true\n' +
'pnpm dev\n' +
'\n' +
'# In CI/CD, set env vars in your pipeline config.\n' +
'# Never commit real secrets to .env files in the repo.'}</pre>
	</div>

	<div class="build">
		<h3>Decision flowchart</h3>
		<div class="flow-grid">
			<div class="flow-card">
				<h4>Is it a secret?</h4>
				<p><strong>Yes</strong> → use <code>private</code>. Never returns to the client.</p>
				<p><strong>No</strong> → use <code>public</code>. Must prefix with <code>PUBLIC_</code>.</p>
			</div>
			<div class="flow-card">
				<h4>Does it change between deploys?</h4>
				<p><strong>No</strong> → use <code>static</code>. Inlined at build for best tree-shaking.</p>
				<p><strong>Yes</strong> → use <code>dynamic</code>. Read per request, one build for all environments.</p>
			</div>
		</div>
	</div>


	<!-- ═══════════════════════════════════════════════════════════════════
	     BREAK IT ON PURPOSE
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Import <code>DATABASE_URL</code> from <code>$env/static/private</code> in a <code>+page.svelte</code> component.</strong> The build fails immediately with a clear error message: "Cannot import $env/static/private into client-side code." This is the compiler-level guard that prevents secrets from ever reaching the browser. The same error occurs for <code>$env/dynamic/private</code>. This guard is the entire reason the <code>$env</code> system exists — it turns potential security incidents into build errors.</li>
		<li><strong>Create an env var <code>SITE_URL=https://example.com</code> (without the <code>PUBLIC_</code> prefix) and import it from <code>$env/static/public</code>.</strong> The import resolves to <code>undefined</code>. SvelteKit does not expose non-prefixed variables through the public modules. You must rename it to <code>PUBLIC_SITE_URL</code> for it to work. This is an intentional friction: adding the prefix is a conscious declaration that the value is safe for public consumption.</li>
		<li><strong>Import <code>$env/dynamic/private</code> in a client-side <code>+page.svelte</code> file.</strong> The build fails with the same private-import error. Dynamic or static, private is private. The dynamic/static axis controls <em>when</em> the value is read; the private/public axis controls <em>where</em>. These are independent.</li>
		<li><strong>Change a <code>$env/static/private</code> variable in your <code>.env</code> file while the dev server is running, then make a request.</strong> The value does <em>not</em> change because static values are inlined at build time. You must restart the dev server (or rebuild) to pick up the new value. With <code>$env/dynamic/private</code>, the same change would take effect immediately on the next request — this is the core difference between static and dynamic.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>


	<!-- ═══════════════════════════════════════════════════════════════════
	     WHAT YOU LEARNED
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>What you learned</h2>

	<p class="prose">
		SvelteKit's environment variable system is organized along two axes that create
		four import paths. The <em>private vs public</em> axis is a security boundary
		enforced at compile time: importing from <code>$env/*/private</code> in
		client-accessible code causes an immediate build error, making it impossible to
		accidentally ship a database URL or API key to the browser. Public variables
		require the <code>PUBLIC_</code> prefix — an intentional friction that forces you
		to consciously declare each value safe for client consumption.
	</p>

	<p class="prose">
		The <em>static vs dynamic</em> axis controls when values are resolved. Static
		imports (<code>$env/static/*</code>) are replaced with string literals at build
		time, enabling the bundler to tree-shake unreachable code branches and
		dead-code-eliminate based on the values. Dynamic imports
		(<code>$env/dynamic/*</code>) read from the process environment at request time,
		making them ideal for feature flags you toggle without redeploying, rotating
		secrets, or a single build artifact that runs in multiple environments with
		different configuration.
	</p>

	<p class="prose">
		Vite loads <code>.env</code> files automatically with a clear priority chain:
		shell variables override <code>.env.production.local</code>, which overrides
		<code>.env.production</code>, which overrides <code>.env.local</code>, which
		overrides <code>.env</code>. The convention is to commit <code>.env</code> with
		placeholder defaults so your team knows which variables the app expects, and put
		real secrets in <code>.env.local</code> (gitignored) or your deployment platform's
		secret management. In server code, use <code>hooks.server.ts</code> to initialize
		shared resources like database pools from env vars and attach them to
		<code>event.locals</code>, so route handlers access configuration through a single,
		auditable pathway.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-8/project">Module 8 Project</a> — build a multi-route application
		with real routing patterns.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text); }

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		font-style: italic;
	}

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
	}

	.key-point {
		background: var(--color-surface-2);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-text);
		line-height: 1.5;

		& strong { color: var(--color-brand); }
		& code { font-size: 0.85em; }
	}

	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}

	th, td {
		text-align: start;
		padding: var(--space-sm) var(--space-md);
		border-block-end: 1px solid var(--color-border);
		vertical-align: top;
	}

	th {
		background: var(--color-surface-2);
		font-weight: 600;
		color: var(--color-text);
	}

	td { color: var(--color-text-muted); }
	tr:last-child td { border-block-end: none; }

	.flow-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}

	.flow-card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.flow-card h4 {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-brand);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.flow-card p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.flow-card p code { font-size: 0.85em; }

	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.flow-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
	}

	@media (min-inline-size: 1024px) {
		.flow-grid { gap: var(--space-md); }
	}
</style>
