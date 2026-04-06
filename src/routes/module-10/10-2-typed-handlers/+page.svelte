<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface SubmitPayload {
		name: string;
		age: number;
		subscribe: boolean;
	}
	interface ApiResponse {
		echo?: SubmitPayload;
		receivedAt?: string;
		queryParam?: string | null;
		error?: string;
	}

	let name = $state('Ada');
	let age = $state(30);
	let subscribe = $state(true);
	let response = $state<ApiResponse | null>(null);
	let loading = $state(false);

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		try {
			const payload: SubmitPayload = { name, age, subscribe };
			const res = await fetch('./api?debug=1', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(payload)
			});
			response = (await res.json()) as ApiResponse;
		} finally {
			loading = false;
		}
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface SubmitPayload {\n" +
		"		name: string;\n" +
		"		age: number;\n" +
		"		subscribe: boolean;\n" +
		"	}\n" +
		"	interface ApiResponse {\n" +
		"		echo?: SubmitPayload;\n" +
		"		receivedAt?: string;\n" +
		"		queryParam?: string | null;\n" +
		"		error?: string;\n" +
		"	}\n" +
		"\n" +
		"	let name = $state('Ada');\n" +
		"	let age = $state(30);\n" +
		"	let subscribe = $state(true);\n" +
		"	let response = $state\u003cApiResponse | null\u003e(null);\n" +
		"	let loading = $state(false);\n" +
		"\n" +
		"	async function submit(e: SubmitEvent) {\n" +
		"		e.preventDefault();\n" +
		"		loading = true;\n" +
		"		try {\n" +
		"			const payload: SubmitPayload = { name, age, subscribe };\n" +
		"			const res = await fetch('./api?debug=1', {\n" +
		"				method: 'POST',\n" +
		"				headers: { 'content-type': 'application/json' },\n" +
		"				body: JSON.stringify(payload)\n" +
		"			});\n" +
		"			response = (await res.json()) as ApiResponse;\n" +
		"		} finally {\n" +
		"			loading = false;\n" +
		"		}\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e10.2 — Typed RequestHandler\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"		\u003ccode\u003eRequestHandler\u003c/code\u003e is generic over the route's param shape. Destructuring\n" +
		"		\u003ccode\u003e{'{ request, params, url, cookies, fetch, locals }'}\u003c/code\u003e\n" +
		"		gives you everything typed. \u003ccode\u003eparams\u003c/code\u003e reflects the dynamic segments automatically,\n" +
		"		\u003ccode\u003eurl\u003c/code\u003e is a \u003ccode\u003eURL\u003c/code\u003e object, and \u003ccode\u003erequest\u003c/code\u003e is a standard\n" +
		"		\u003ccode\u003eRequest\u003c/code\u003e. Read typed JSON with\n" +
		"		\u003ccode\u003e{'const body = (await request.json()) as SubmitPayload'}\u003c/code\u003e — but narrow it with a type\n" +
		"		predicate (or a schema library) before trusting it.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cform onsubmit={submit}\u003e\n" +
		"			\u003clabel class=\"field\"\u003e\n" +
		"				\u003cspan\u003eName\u003c/span\u003e\n" +
		"				\u003cinput type=\"text\" bind:value={name} required /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003clabel class=\"field\"\u003e\n" +
		"				\u003cspan\u003eAge\u003c/span\u003e\n" +
		"				\u003cinput type=\"number\" bind:value={age} min=\"0\" required /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003clabel class=\"checkbox\"\u003e\n" +
		"				\u003cinput type=\"checkbox\" bind:checked={subscribe} /\u003e\n" +
		"				\u003cspan\u003eSubscribe to newsletter\u003c/span\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003cbutton type=\"submit\" class=\"cta\" disabled={loading}\u003e\n" +
		"				{loading ? 'Posting...' : 'POST JSON'}\n" +
		"			\u003c/button\u003e\n" +
		"		\u003c/form\u003e\n" +
		"\n" +
		"		{#if response}\n" +
		"			\u003cpre\u003e{JSON.stringify(response, null, 2)}\u003c/pre\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eRequestHandler\u003c/code\u003e types the event and param shapes automatically.\u003c/li\u003e\n" +
		"		\u003cli\u003eAlways narrow \u003ccode\u003eawait request.json()\u003c/code\u003e with a validator — never trust raw input.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eurl.searchParams\u003c/code\u003e reads query strings as a typed \u003ccode\u003eURLSearchParams\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eReturn early with a \u003ccode\u003e400\u003c/code\u003e response when validation fails.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>10.2 — Typed RequestHandler</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>RequestHandler</code> is generic over the route's param shape. Destructuring
		<code>{'{ request, params, url, cookies, fetch, locals }'}</code>
		gives you everything typed. <code>params</code> reflects the dynamic segments automatically,
		<code>url</code> is a <code>URL</code> object, and <code>request</code> is a standard
		<code>Request</code>. Read typed JSON with
		<code>{'const body = (await request.json()) as SubmitPayload'}</code> — but narrow it with a type
		predicate (or a schema library) before trusting it.
	</p>

	<div class="build">
		<form onsubmit={submit}>
			<label class="field">
				<span>Name</span>
				<input type="text" bind:value={name} required />
			</label>
			<label class="field">
				<span>Age</span>
				<input type="number" bind:value={age} min="0" required />
			</label>
			<label class="checkbox">
				<input type="checkbox" bind:checked={subscribe} />
				<span>Subscribe to newsletter</span>
			</label>
			<button type="submit" class="cta" disabled={loading}>
				{loading ? 'Posting...' : 'POST JSON'}
			</button>
		</form>

		{#if response}
			<pre>{JSON.stringify(response, null, 2)}</pre>
		{/if}
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>RequestHandler</code> types the event and param shapes automatically.</li>
		<li>Always narrow <code>await request.json()</code> with a validator — never trust raw input.</li>
		<li><code>url.searchParams</code> reads query strings as a typed <code>URLSearchParams</code>.</li>
		<li>Return early with a <code>400</code> response when validation fails.</li>
	</ul>
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
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
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
	.checkbox {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-text);
		font-size: var(--text-sm);
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
