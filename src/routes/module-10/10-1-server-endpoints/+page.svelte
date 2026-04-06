<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Item {
		id: number;
		name: string;
	}
	interface GetResponse {
		items: Item[];
	}
	interface PostResponse {
		item?: Item;
		error?: string;
	}

	let getResult = $state<GetResponse | null>(null);
	let getError = $state<string | null>(null);
	let getLoading = $state(false);

	let newName = $state('');
	let postResult = $state<PostResponse | null>(null);
	let postLoading = $state(false);

	async function fetchItems() {
		getLoading = true;
		getError = null;
		try {
			const res = await fetch('./api');
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			getResult = (await res.json()) as GetResponse;
		} catch (e) {
			getError = e instanceof Error ? e.message : 'Unknown error';
		} finally {
			getLoading = false;
		}
	}

	async function createItem(e: SubmitEvent) {
		e.preventDefault();
		postLoading = true;
		try {
			const res = await fetch('./api', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name: newName })
			});
			postResult = (await res.json()) as PostResponse;
			if (res.ok) newName = '';
		} finally {
			postLoading = false;
		}
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface Item {\n" +
		"		id: number;\n" +
		"		name: string;\n" +
		"	}\n" +
		"	interface GetResponse {\n" +
		"		items: Item[];\n" +
		"	}\n" +
		"	interface PostResponse {\n" +
		"		item?: Item;\n" +
		"		error?: string;\n" +
		"	}\n" +
		"\n" +
		"	let getResult = $state\u003cGetResponse | null\u003e(null);\n" +
		"	let getError = $state\u003cstring | null\u003e(null);\n" +
		"	let getLoading = $state(false);\n" +
		"\n" +
		"	let newName = $state('');\n" +
		"	let postResult = $state\u003cPostResponse | null\u003e(null);\n" +
		"	let postLoading = $state(false);\n" +
		"\n" +
		"	async function fetchItems() {\n" +
		"		getLoading = true;\n" +
		"		getError = null;\n" +
		"		try {\n" +
		"			const res = await fetch('./api');\n" +
		"			if (!res.ok) throw new Error(`HTTP ${res.status}`);\n" +
		"			getResult = (await res.json()) as GetResponse;\n" +
		"		} catch (e) {\n" +
		"			getError = e instanceof Error ? e.message : 'Unknown error';\n" +
		"		} finally {\n" +
		"			getLoading = false;\n" +
		"		}\n" +
		"	}\n" +
		"\n" +
		"	async function createItem(e: SubmitEvent) {\n" +
		"		e.preventDefault();\n" +
		"		postLoading = true;\n" +
		"		try {\n" +
		"			const res = await fetch('./api', {\n" +
		"				method: 'POST',\n" +
		"				headers: { 'content-type': 'application/json' },\n" +
		"				body: JSON.stringify({ name: newName })\n" +
		"			});\n" +
		"			postResult = (await res.json()) as PostResponse;\n" +
		"			if (res.ok) newName = '';\n" +
		"		} finally {\n" +
		"			postLoading = false;\n" +
		"		}\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e10.1 — +server.ts endpoints\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"		\u003ccode\u003e+server.ts\u003c/code\u003e files define HTTP endpoints — GET, POST, PUT, DELETE, PATCH. Each method exports\n" +
		"		a function that receives a typed event and returns a \u003ccode\u003eResponse\u003c/code\u003e. Use the\n" +
		"		\u003ccode\u003ejson()\u003c/code\u003e helper for typed JSON and \u003ccode\u003eerror()\u003c/code\u003e for typed error throws. Reach for\n" +
		"		\u003ccode\u003e+server.ts\u003c/code\u003e when you need a public API for mobile apps, webhooks, or third parties; for\n" +
		"		internal page data prefer \u003ccode\u003eload()\u003c/code\u003e, and for mutations from forms prefer form actions.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cbutton type=\"button\" class=\"cta\" onclick={fetchItems} disabled={getLoading}\u003e\n" +
		"				{getLoading ? 'Loading...' : 'Fetch GET /api'}\n" +
		"			\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		{#if getError}\n" +
		"			\u003cp class=\"error\"\u003eError: {getError}\u003c/p\u003e\n" +
		"		{/if}\n" +
		"		{#if getResult}\n" +
		"			\u003cul class=\"items\"\u003e\n" +
		"				{#each getResult.items as item (item.id)}\n" +
		"					\u003cli\u003e\u003ccode\u003e#{item.id}\u003c/code\u003e {item.name}\u003c/li\u003e\n" +
		"				{/each}\n" +
		"			\u003c/ul\u003e\n" +
		"		{/if}\n" +
		"\n" +
		"		\u003cform onsubmit={createItem}\u003e\n" +
		"			\u003clabel class=\"field\"\u003e\n" +
		"				\u003cspan\u003eNew item name\u003c/span\u003e\n" +
		"				\u003cinput type=\"text\" bind:value={newName} placeholder=\"A fresh idea\" required /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003cbutton type=\"submit\" class=\"cta\" disabled={postLoading || !newName.trim()}\u003e\n" +
		"				{postLoading ? 'Posting...' : 'POST to /api'}\n" +
		"			\u003c/button\u003e\n" +
		"		\u003c/form\u003e\n" +
		"\n" +
		"		{#if postResult}\n" +
		"			\u003cpre\u003e{JSON.stringify(postResult, null, 2)}\u003c/pre\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		The endpoint is reachable from any client, for example\n" +
		"		\u003ccode\u003ecurl https://your.site/module-10/10-1-server-endpoints/api\u003c/code\u003e.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eExport HTTP method handlers (\u003ccode\u003eGET\u003c/code\u003e, \u003ccode\u003ePOST\u003c/code\u003e, ...) from \u003ccode\u003e+server.ts\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eReturn \u003ccode\u003ejson(data, init)\u003c/code\u003e for typed JSON responses.\u003c/li\u003e\n" +
		"		\u003cli\u003eCall endpoints from the client with \u003ccode\u003efetch\u003c/code\u003e, or from anywhere with \u003ccode\u003ecurl\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eUse \u003ccode\u003e+server.ts\u003c/code\u003e for public APIs; prefer \u003ccode\u003eload()\u003c/code\u003e/form actions for internal pages.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>10.1 — +server.ts endpoints</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>+server.ts</code> files define HTTP endpoints — GET, POST, PUT, DELETE, PATCH. Each method exports
		a function that receives a typed event and returns a <code>Response</code>. Use the
		<code>json()</code> helper for typed JSON and <code>error()</code> for typed error throws. Reach for
		<code>+server.ts</code> when you need a public API for mobile apps, webhooks, or third parties; for
		internal page data prefer <code>load()</code>, and for mutations from forms prefer form actions.
	</p>

	<div class="build">
		<div class="row">
			<button type="button" class="cta" onclick={fetchItems} disabled={getLoading}>
				{getLoading ? 'Loading...' : 'Fetch GET /api'}
			</button>
		</div>

		{#if getError}
			<p class="error">Error: {getError}</p>
		{/if}
		{#if getResult}
			<ul class="items">
				{#each getResult.items as item (item.id)}
					<li><code>#{item.id}</code> {item.name}</li>
				{/each}
			</ul>
		{/if}

		<form onsubmit={createItem}>
			<label class="field">
				<span>New item name</span>
				<input type="text" bind:value={newName} placeholder="A fresh idea" required />
			</label>
			<button type="submit" class="cta" disabled={postLoading || !newName.trim()}>
				{postLoading ? 'Posting...' : 'POST to /api'}
			</button>
		</form>

		{#if postResult}
			<pre>{JSON.stringify(postResult, null, 2)}</pre>
		{/if}
	</div>

	<p class="concept">
		The endpoint is reachable from any client, for example
		<code>curl https://your.site/module-10/10-1-server-endpoints/api</code>.
	</p>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Rename the exported function from <code>GET</code> to <code>get</code> (lowercase).</strong> SvelteKit only recognises uppercase HTTP method names, so the endpoint stops responding and the fetch call returns a 405 Method Not Allowed.</li>
		<li><strong>Remove the <code>json()</code> wrapper and return a raw <code>Response</code> with no <code>Content-Type</code> header.</strong> The browser receives the body but cannot parse it as JSON, so <code>res.json()</code> on the client throws a <code>SyntaxError</code>.</li>
		<li><strong>Delete the <code>POST</code> handler from <code>+server.ts</code> but keep the client form that calls it.</strong> Submitting the form now hits a 405 because the endpoint has no POST export, proving each method must be explicitly defined.</li>
		<li><strong>Change the fetch URL from <code>'./api'</code> to <code>'/api'</code> (absolute root path).</strong> The request goes to the site root instead of the route-relative API folder, returning a 404 and demonstrating why relative paths matter in nested routes.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>+server.ts</code> files turn any route directory into a full HTTP endpoint by exporting named functions that match HTTP verbs. SvelteKit hands each handler a typed <code>RequestEvent</code> and expects a standard <code>Response</code> back, which means you are writing against the Web Platform API rather than a framework-specific abstraction.</p>
	<p class="prose">The <code>json()</code> helper is a thin convenience that creates a <code>Response</code> with the correct <code>Content-Type</code> header and serialises your data. Pairing it with <code>error()</code> for failure paths gives you a consistent, typed contract between server and client without needing a separate API framework.</p>
	<p class="prose">Server endpoints shine when you need a publicly addressable API, for example for mobile clients, webhooks, or third-party integrations. For data that only your own pages consume, <code>load()</code> functions are simpler; for mutations triggered by HTML forms, form actions provide progressive enhancement out of the box.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-10/10-2-typed-handlers">10.2 — Typed RequestHandler</a> — learn how SvelteKit types every property on the request event.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
		margin-inline: auto;
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field > span {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.field input {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
	}
	.field input:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	button.cta {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-weight: 600;
		cursor: pointer;
		align-self: flex-start;
	}
	button.cta:hover:not(:disabled) {
		background: var(--color-brand-dim);
	}
	button.cta:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.row {
		display: flex;
		gap: var(--space-sm);
	}
	.items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.error {
		color: var(--color-error);
		margin: 0;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
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
