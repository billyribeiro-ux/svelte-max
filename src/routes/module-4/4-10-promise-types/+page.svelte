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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Every async function returns <code>Promise&lt;T&gt;</code></li>
		<li>Explicit return types make intent clear and catch bugs at the boundary</li>
		<li>Strict TypeScript forbids <code>any</code> — type every layer</li>
		<li>Well-typed promises make <code>{`{#await}`}</code> blocks fully type-safe in the template</li>
	</ul>
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
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
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
