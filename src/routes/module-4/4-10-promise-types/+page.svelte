<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface ProfilePayload {
		user: {
			id: number;
			name: string;
			email: string;
		};
		stats: {
			posts: number;
			followers: number;
		};
		lastSeen: string;
	}

	// Return type is explicit — the reader never has to guess what awaiting this yields.
	async function loadProfile(userId: number): Promise<ProfilePayload> {
		await new Promise((resolve) => setTimeout(resolve, 700));
		return {
			user: { id: userId, name: 'Katherine Johnson', email: 'katherine@nasa.example' },
			stats: { posts: 128, followers: 9421 },
			lastSeen: new Date(Date.now() - 1000 * 60 * 17).toISOString()
		};
	}

	let promise = $state<Promise<ProfilePayload>>(loadProfile(1));

	function reload(): void {
		promise = loadProfile(1);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface ProfilePayload {\n" +
		"\t\tuser: {\n" +
		"\t\t\tid: number;\n" +
		"\t\t\tname: string;\n" +
		"\t\t\temail: string;\n" +
		"\t\t};\n" +
		"\t\tstats: {\n" +
		"\t\t\tposts: number;\n" +
		"\t\t\tfollowers: number;\n" +
		"\t\t};\n" +
		"\t\tlastSeen: string;\n" +
		"\t}\n" +
		"\n" +
		"\t// Return type is explicit — the reader never has to guess what awaiting this yields.\n" +
		"\tasync function loadProfile(userId: number): Promise\u003cProfilePayload\u003e {\n" +
		"\t\tawait new Promise((resolve) =\u003e setTimeout(resolve, 700));\n" +
		"\t\treturn {\n" +
		"\t\t\tuser: { id: userId, name: 'Katherine Johnson', email: 'katherine@nasa.example' },\n" +
		"\t\t\tstats: { posts: 128, followers: 9421 },\n" +
		"\t\t\tlastSeen: new Date(Date.now() - 1000 * 60 * 17).toISOString()\n" +
		"\t\t};\n" +
		"\t}\n" +
		"\n" +
		"\tlet promise = $state\u003cPromise\u003cProfilePayload\u003e\u003e(loadProfile(1));\n" +
		"\n" +
		"\tfunction reload(): void {\n" +
		"\t\tpromise = loadProfile(1);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.10 — Promise&lt;T&gt; return types\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Every async function returns a \u003ccode\u003ePromise&lt;T&gt;\u003c/code\u003e, where\n" +
		"\t\t\u003ccode\u003eT\u003c/code\u003e is the type of the value you get when you \u003ccode\u003eawait\u003c/code\u003e it. Typing async\n" +
		"\t\tfunctions explicitly (rather than relying on inference) makes contracts crystal clear: any reader\n" +
		"\t\tknows at a glance what data flows through your code. This matters more as promises chain:\n" +
		"\t\t\u003ccode\u003efetch(url).then(r =&gt; r.json() as Promise&lt;User[]&gt;)\u003c/code\u003e. No \u003ccode\u003eany\u003c/code\u003e,\n" +
		"\t\tever.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cbutton type=\"button\" onclick={reload}\u003eReload profile\u003c/button\u003e\n" +
		"\n" +
		"\t\t{#await promise}\n" +
		"\t\t\t\u003cp class=\"status\"\u003eLoading profile…\u003c/p\u003e\n" +
		"\t\t{:then payload}\n" +
		"\t\t\t\u003carticle class=\"profile\"\u003e\n" +
		"\t\t\t\t\u003cheader\u003e\n" +
		"\t\t\t\t\t\u003ch2\u003e{payload.user.name}\u003c/h2\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"muted\"\u003e{payload.user.email}\u003c/p\u003e\n" +
		"\t\t\t\t\u003c/header\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"stats\"\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"stat\"\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"stat-num\"\u003e{payload.stats.posts}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"stat-label\"\u003ePosts\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"stat\"\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"stat-num\"\u003e{payload.stats.followers.toLocaleString()}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"stat-label\"\u003eFollowers\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003cp class=\"muted last-seen\"\u003e\n" +
		"\t\t\t\t\tLast seen: \u003ccode\u003e{payload.lastSeen}\u003c/code\u003e\n" +
		"\t\t\t\t\u003c/p\u003e\n" +
		"\t\t\t\u003c/article\u003e\n" +
		"\t\t{:catch err}\n" +
		"\t\t\t\u003cp class=\"error\"\u003eError: {err instanceof Error ? err.message : 'Unknown'}\u003c/p\u003e\n" +
		"\t\t{/await}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eEvery async function returns \u003ccode\u003ePromise&lt;T&gt;\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eExplicit return types make intent clear and catch bugs at the boundary\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eStrict TypeScript forbids \u003ccode\u003eany\u003c/code\u003e — type every layer\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eWell-typed promises make \u003ccode\u003e{`{#await}`}\u003c/code\u003e blocks fully type-safe in the template\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.10 — Promise&lt;T&gt; return types</h1>
	<p class="concept">
		<strong>Concept.</strong> Every async function returns a <code>Promise&lt;T&gt;</code>, where
		<code>T</code> is the type of the value you get when you <code>await</code> it. Typing async
		functions explicitly (rather than relying on inference) makes contracts crystal clear: any reader
		knows at a glance what data flows through your code. This matters more as promises chain:
		<code>fetch(url).then(r =&gt; r.json() as Promise&lt;User[]&gt;)</code>. No <code>any</code>,
		ever.
	</p>

	<div class="build">
		<button type="button" onclick={reload}>Reload profile</button>

		{#await promise}
			<p class="status">Loading profile…</p>
		{:then payload}
			<article class="profile">
				<header>
					<h2>{payload.user.name}</h2>
					<p class="muted">{payload.user.email}</p>
				</header>
				<div class="stats">
					<div class="stat">
						<span class="stat-num">{payload.stats.posts}</span>
						<span class="stat-label">Posts</span>
					</div>
					<div class="stat">
						<span class="stat-num">{payload.stats.followers.toLocaleString()}</span>
						<span class="stat-label">Followers</span>
					</div>
				</div>
				<p class="muted last-seen">
					Last seen: <code>{payload.lastSeen}</code>
				</p>
			</article>
		{:catch err}
			<p class="error">Error: {err instanceof Error ? err.message : 'Unknown'}</p>
		{/await}
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments in your own code. Breaking things is how you build a mental model of what Svelte actually enforces versus what it merely prefers.</p>
	<ol class="experiments">
		<li><strong>Type a promise as <code>Promise&lt;string&gt;</code> but resolve with a number.</strong> TypeScript catches this at compile time with a type mismatch error. The explicit return type acts as a contract: anything that awaits this promise is guaranteed to receive a string, and the compiler enforces that guarantee at the definition site.</li>
		<li><strong>Use a generic async function and check the inferred return type.</strong> When you write <code>async function load&lt;T&gt;(url: string): Promise&lt;T&gt;</code>, TypeScript infers the resolved type as <code>T</code> wherever you call the function. Hover over the call site in your editor to confirm the type flows through the generic correctly.</li>
		<li><strong>Use <code>{'{#await}'}</code> with a typed promise and inspect the <code>{'{:then}'}</code> value.</strong> Svelte's template type checker infers the resolved type from the promise, so <code>{'{:then payload}'}</code> gives <code>payload</code> the correct type. Try accessing a property that does not exist -- your editor will underline it immediately.</li>
		<li><strong>Chain promises with <code>.then()</code> and check how each step infers the next type.</strong> Each <code>.then()</code> callback transforms the type: <code>Promise&lt;Response&gt;</code> becomes <code>Promise&lt;string&gt;</code> after <code>.then(r =&gt; r.text())</code>. TypeScript tracks every transformation through the chain, ensuring end-to-end type safety.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Every <code>async</code> function in TypeScript returns a <code>Promise&lt;T&gt;</code>, where <code>T</code> is the type of the value you get when you <code>await</code> the result. Typing this return type explicitly -- <code>async function loadProfile(id: number): Promise&lt;ProfilePayload&gt;</code> -- turns the function signature into a contract that both the implementation and every call site must satisfy. If the implementation returns the wrong shape, TypeScript catches it at the definition; if a caller misuses the resolved value, TypeScript catches it at the call site.</p>
	<p class="prose">Explicit promise types are especially valuable in Svelte templates because the <code>{'{#await}'}</code> block infers the resolved type from the promise. When your promise is typed as <code>Promise&lt;ProfilePayload&gt;</code>, the <code>{'{:then payload}'}</code> binding gives <code>payload</code> the full <code>ProfilePayload</code> type, including autocomplete for nested fields like <code>payload.user.name</code> and <code>payload.stats.followers</code>. This makes templates fully type-safe without any extra annotations.</p>
	<p class="prose">The discipline of typing every async boundary eliminates the most dangerous type in TypeScript: <code>any</code>. Untyped <code>fetch</code> responses default to <code>any</code>, which silently disables all type checking downstream. Always cast the parsed JSON to a known interface -- <code>const data = await res.json() as ProfilePayload</code> -- or use a runtime validation library like Zod to parse and validate at the boundary. Typed promises, typed responses, and typed templates form a chain of guarantees from the server to the DOM.</p>
	<p class="next">Next lesson: <a href="/module-4/4-11-svelte-window">4.11 — &lt;svelte:window&gt;</a></p>
</section>

<style>
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
	button {
		align-self: flex-start;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	button:hover {
		background: var(--color-brand-dim);
	}
	.status {
		color: var(--color-text-muted);
		margin: 0;
	}
	.profile {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.profile header h2 {
		margin: 0 0 var(--space-xs) 0;
		font-size: var(--text-lg);
	}
	.profile header p {
		margin: 0;
	}
	.stats {
		display: flex;
		gap: var(--space-lg);
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.stat-num {
		font-size: var(--text-xl);
		color: var(--color-brand);
		font-weight: 600;
	}
	.stat-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.muted {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}
	.last-seen {
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-sm);
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

	.prose {
		color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
