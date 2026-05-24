<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── CodeCanvas examples ── */
	const exampleProblem =
		"\u003cscript\u003e\n" +
		"  import { getUser } from 'my-database-library';\n" +
		"\n" +
		"  // Server: fetches user, renders HTML\n" +
		"  // Client: fetches user AGAIN during hydration\n" +
		"  // This re-fetch is wasteful and blocks hydration\n" +
		"  const user = await getUser();\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<h1>{user.name}</h1>";

	const exampleSolution =
		"\u003cscript\u003e\n" +
		"  import { hydratable } from 'svelte';\n" +
		"  import { getUser } from 'my-database-library';\n" +
		"\n" +
		"  // Server: fetches user, serializes result into <head>\n" +
		"  // Client: reads serialized data instead of re-fetching\n" +
		"  // After hydration: calls getUser() normally\n" +
		"  const user = await hydratable('user', () => getUser());\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<h1>{user.name}</h1>";

	const exampleHowItWorks =
		"// The lifecycle of hydratable:\n" +
		"//\n" +
		"// 1. SERVER RENDER\n" +
		"//    hydratable('key', fn) calls fn()\n" +
		"//    Result is serialized via devalue\n" +
		"//    Data is baked into a \u003cscript\u003e in <head>\n" +
		"//\n" +
		"// 2. CLIENT HYDRATION\n" +
		"//    hydratable('key', fn) finds the serialized data\n" +
		"//    Returns it immediately — fn() is NOT called\n" +
		"//    Hydration completes instantly\n" +
		"//\n" +
		"// 3. POST-HYDRATION (e.g. client-side navigation)\n" +
		"//    hydratable('key', fn) calls fn() normally\n" +
		"//    No cached data available, runs the function";

	const exampleDevalue =
		"import { hydratable } from 'svelte';\n" +
		"\n" +
		"// devalue can serialize more than JSON:\n" +
		"const data = await hydratable('rich-data', () => ({\n" +
		"  users: new Map([\n" +
		"    ['ada', { name: 'Ada Lovelace', role: 'admin' }],\n" +
		"    ['grace', { name: 'Grace Hopper', role: 'user' }]\n" +
		"  ]),\n" +
		"  tags: new Set(['svelte', 'typescript', 'ssr']),\n" +
		"  homepage: new URL('https://svelte.dev'),\n" +
		"  bigId: 9007199254740993n  // BigInt\n" +
		"}));";

	const examplePromises =
		"\u003cscript\u003e\n" +
		"  import { hydratable } from 'svelte';\n" +
		"\n" +
		"  // Promises are serializable too!\n" +
		"  const promises = hydratable('async-data', () => ({\n" +
		"    one: Promise.resolve(1),\n" +
		"    two: Promise.resolve(2)\n" +
		"  }));\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"{await promises.one}\n" +
		"{await promises.two}";

	const exampleCSP =
		"// server.js — using a nonce (recommended for dynamic SSR)\n" +
		"import { render } from 'svelte/server';\n" +
		"import App from './App.svelte';\n" +
		"\n" +
		"const nonce = crypto.randomUUID();\n" +
		"\n" +
		"const { head, body } = await render(App, {\n" +
		"  csp: { nonce }\n" +
		"});\n" +
		"\n" +
		"// Add to response headers:\n" +
		"// Content-Security-Policy: script-src 'nonce-<nonce>'\n" +
		"\n" +
		"// For static HTML (prerendered), use hashes instead:\n" +
		"const { head: h, body: b, hashes } = await render(App, {\n" +
		"  csp: { hash: true }\n" +
		"});\n" +
		"// hashes.script = ['sha256-abcd123']\n" +
		"// Content-Security-Policy: script-src 'sha256-abcd123'";

	const exampleLibrary =
		"// If you're a library author, prefix your keys:\n" +
		"import { hydratable } from 'svelte';\n" +
		"\n" +
		"// Good: namespaced key prevents conflicts\n" +
		"const data = await hydratable(\n" +
		"  'my-lib:user-session',\n" +
		"  () => fetchSession()\n" +
		");\n" +
		"\n" +
		"// Bad: generic key may clash with other libraries\n" +
		"const data2 = await hydratable(\n" +
		"  'session',\n" +
		"  () => fetchSession()\n" +
		");";

	const exampleRandom =
		"import { hydratable } from 'svelte';\n" +
		"\n" +
		"// Random value that stays stable across\n" +
		"// server render and client hydration:\n" +
		"const rand = hydratable('random', () => Math.random());\n" +
		"\n" +
		"// Without hydratable, Math.random() would produce\n" +
		"// a different value on server vs client, causing\n" +
		"// a hydration mismatch.";

	const fullCode =
		"\u003cscript\u003e\n" +
		"  import { hydratable } from 'svelte';\n" +
		"  import { getUser } from 'my-database-library';\n" +
		"\n" +
		"  // Server: serializes into <head>\n" +
		"  // Client hydration: reads serialized data\n" +
		"  // Post-hydration: calls getUser() normally\n" +
		"  const user = await hydratable('user', () => getUser());\n" +
		"\n" +
		"  // Also works with rich types via devalue\n" +
		"  const config = await hydratable('config', () => ({\n" +
		"    tags: new Set(['svelte', 'kit']),\n" +
		"    endpoints: new Map([['api', '/api/v1']])\n" +
		"  }));\n" +
		"\n" +
		"  // Stable random across server/client\n" +
		"  const rand = hydratable('rand', () => Math.random());\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<h1>{user.name}</h1>\n" +
		"<p>Random: {rand}</p>";
</script>

<section class="page">
	<h1>9A.11 — Hydratable Data</h1>

	<p class="prose">
		When Svelte renders a component on the server using top-level <code>await</code>,
		the data is fetched, HTML is generated, and everything looks great. But then the
		client loads and hydration begins — and the same <code>await</code> runs again,
		re-fetching data the server already had. <code>hydratable()</code> solves this
		by serializing the server's result into the HTML <code>&lt;head&gt;</code> so the
		client can read it directly during hydration instead of fetching again. Think of
		it like a chef who writes down the recipe results on a sticky note so the next
		shift doesn't have to cook the same dish from scratch.
	</p>

	<h3>The problem</h3>
	<p class="prose">
		Top-level <code>await</code> in a Svelte component re-executes during hydration.
		For fast local lookups this is fine, but for database queries or API calls it means
		unnecessary network round-trips that block the page from becoming interactive.
	</p>

	<div class="build">
		<CodeCanvas filename="problem.svelte" code={exampleProblem} />
		<div class="warning-box">
			<strong>Problem:</strong> <code>getUser()</code> runs on the server AND again on the
			client during hydration. Double fetch, wasted time.
		</div>
	</div>

	<h3>The solution: <code>hydratable()</code></h3>
	<p class="prose">
		Wrap your async call in <code>hydratable('key', () => getData())</code>. The key
		uniquely identifies this piece of data. On the server, the function runs and the
		result is serialized into the HTML. On the client during hydration, the serialized
		result is used directly — the function is never called.
	</p>

	<div class="build">
		<CodeCanvas filename="solution.svelte" code={exampleSolution} />
	</div>

	<h3>How it works internally</h3>
	<div class="build">
		<CodeCanvas filename="lifecycle.ts" code={exampleHowItWorks} />

		<div class="flow">
			<div class="flow-step">
				<span class="step-num">1</span>
				<div class="step-body">
					<strong>Server render</strong>
					<p>Calls <code>fn()</code>, serializes result with <code>devalue</code>, bakes it into <code>&lt;head&gt;</code></p>
				</div>
			</div>
			<div class="flow-arrow">&#8595;</div>
			<div class="flow-step">
				<span class="step-num">2</span>
				<div class="step-body">
					<strong>Client hydration</strong>
					<p>Finds serialized data in <code>&lt;head&gt;</code>, returns it immediately — <code>fn()</code> is NOT called</p>
				</div>
			</div>
			<div class="flow-arrow">&#8595;</div>
			<div class="flow-step">
				<span class="step-num">3</span>
				<div class="step-body">
					<strong>Post-hydration</strong>
					<p>On subsequent calls (e.g. client-side navigation), <code>fn()</code> runs normally</p>
				</div>
			</div>
		</div>
	</div>

	<h3>Rich serialization with <code>devalue</code></h3>
	<p class="prose">
		<code>hydratable</code> uses <a href="https://npmjs.com/package/devalue">devalue</a>
		for serialization, which handles far more than JSON. You can serialize
		<code>Map</code>, <code>Set</code>, <code>URL</code>, <code>BigInt</code>, and
		even <code>Promise</code> values.
	</p>

	<div class="build">
		<CodeCanvas filename="devalue.ts" code={exampleDevalue} />
	</div>

	<h3>Promises work too</h3>
	<p class="prose">
		Thanks to Svelte magic, you can return objects containing promises from
		<code>hydratable</code>. The promises are properly serialized and deserialized
		on the client.
	</p>

	<div class="build">
		<CodeCanvas filename="promises.svelte" code={examplePromises} />
	</div>

	<h3>Stable random / time values</h3>
	<p class="prose">
		<code>hydratable</code> also solves hydration mismatches for random or time-based
		values. Without it, <code>Math.random()</code> produces different values on server
		and client, causing Svelte to warn about mismatches. With <code>hydratable</code>,
		the server's random number is reused during hydration.
	</p>

	<div class="build">
		<CodeCanvas filename="random.ts" code={exampleRandom} />
	</div>

	<h3>CSP considerations</h3>
	<p class="prose">
		<code>hydratable</code> injects an inline <code>&lt;script&gt;</code> block into
		the <code>&lt;head&gt;</code>. If you use Content Security Policy, you need to
		either provide a <code>nonce</code> (for dynamic SSR) or enable
		<code>hash</code> mode (for prerendered/static HTML).
	</p>

	<div class="build">
		<CodeCanvas filename="csp.ts" code={exampleCSP} />
	</div>

	<h3>Library author tip</h3>
	<p class="prose">
		If you're building a library that uses <code>hydratable</code>, prefix your keys
		with the library name to avoid collisions with other libraries or the user's own
		code. This is the same convention used by <code>localStorage</code> keys.
	</p>

	<div class="build">
		<CodeCanvas filename="library.ts" code={exampleLibrary} />
	</div>

	<h3>Connection to SvelteKit</h3>
	<p class="prose">
		<code>hydratable</code> is the low-level primitive that powers SvelteKit's remote
		functions under the hood. When you use <code>query()</code> or <code>form()</code>
		in SvelteKit, the framework calls <code>hydratable</code> for you. Most application
		developers will never need <code>hydratable</code> directly — but library authors
		and advanced use cases benefit from understanding this foundational API.
	</p>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what happens, then revert.</p>
	<ol class="experiments">
		<li>
			<strong>Use the same key for two different <code>hydratable</code> calls.</strong>
			The second call gets the first call's data during hydration, because the key
			lookup is by exact string match. Keys must be unique within a render — this is
			why library authors should namespace their keys.
		</li>
		<li>
			<strong>Return a non-serializable value like a function from <code>hydratable</code>.</strong>
			<code>devalue</code> throws an error during server rendering because functions
			cannot be serialized. The error message will tell you exactly which value is
			the problem. Stick to data types listed in the devalue documentation.
		</li>
		<li>
			<strong>Use <code>hydratable</code> without the <code>experimental.async</code> flag.</strong>
			Top-level <code>await</code> requires the <code>experimental.async</code>
			compiler option. Without it, the component cannot use top-level <code>await</code>
			at all, and <code>hydratable</code> becomes pointless since it is designed to
			wrap awaited expressions.
		</li>
		<li>
			<strong>Omit the CSP nonce/hash when serving with a strict Content Security Policy.</strong>
			The injected <code>&lt;script&gt;</code> block is blocked by the browser. The
			console shows a CSP violation error and hydration fails because the serialized
			data never loads. Always configure CSP to allow the hydratable script.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		<code>hydratable('key', fn)</code> is a low-level Svelte API that prevents redundant
		data fetching during hydration. On the server, it calls <code>fn()</code>, serializes
		the result with <code>devalue</code>, and bakes it into the HTML
		<code>&lt;head&gt;</code>. On the client during hydration, it reads the serialized
		data directly instead of calling <code>fn()</code> again. After hydration completes,
		subsequent calls (e.g. during client-side navigation) run <code>fn()</code> normally.
	</p>
	<p class="prose">
		The serialization layer supports far more than JSON. <code>devalue</code> handles
		<code>Map</code>, <code>Set</code>, <code>URL</code>, <code>BigInt</code>, cyclic
		references, and even <code>Promise</code> values. This makes <code>hydratable</code>
		suitable for complex data structures without manual serialization. It also solves
		hydration mismatches for non-deterministic values like <code>Math.random()</code>
		or <code>Date.now()</code>, because the server's result is reused on the client.
	</p>
	<p class="prose">
		In practice, most Svelte developers will interact with <code>hydratable</code>
		indirectly — it powers SvelteKit's remote functions (<code>query()</code>,
		<code>form()</code>, <code>command()</code>) under the hood. Library authors
		building data-fetching abstractions are the primary direct consumers. If you
		use it directly, prefix keys with your library name, handle CSP by providing a
		<code>nonce</code> or enabling <code>hash</code> mode, and ensure all returned
		data is <code>devalue</code>-serializable.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-9/project">Module 9A Project</a> — build a data-loading architecture.
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

		& a {
			color: var(--color-brand);
			text-decoration: underline;
			text-underline-offset: 0.15em;
		}
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
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.warning-box {
		background: oklch(0.95 0.05 60);
		border: 1px solid oklch(0.8 0.1 60);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		color: oklch(0.3 0.05 60);

		& strong {
			color: oklch(0.4 0.1 30);
		}

		& code {
			background: oklch(0.9 0.03 60);
			color: oklch(0.3 0.05 60);
		}
	}

	.flow {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-xs);
	}

	.flow-step {
		display: flex;
		align-items: flex-start;
		gap: var(--space-sm);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		inline-size: 100%;
	}

	.step-num {
		display: flex;
		align-items: center;
		justify-content: center;
		inline-size: 28px;
		block-size: 28px;
		border-radius: var(--radius-full);
		background: var(--color-brand);
		color: var(--color-surface);
		font-weight: 700;
		font-size: var(--text-sm);
		flex-shrink: 0;
	}

	.step-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);

		& strong {
			font-size: var(--text-sm);
			color: var(--color-text);
		}

		& p {
			margin: 0;
			font-size: var(--text-sm);
			color: var(--color-text-muted);
			line-height: 1.5;
		}
	}

	.flow-arrow {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--text-lg);
		padding-inline-start: 10px;
	}

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

	@media (min-inline-size: 480px) {
		.flow-step { padding: var(--space-md); }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
	}

	@media (min-inline-size: 1024px) {
		.flow { gap: var(--space-sm); }
	}
</style>
